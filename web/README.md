# QA Web — Guía de usuario

Automatización del flujo de compra de SauceDemo con **Cucumber, Gherkin en español, Playwright y TypeScript**. Este es el módulo Web del repositorio común Web/API/Mobile. Sus dependencias se instalan dentro de web/.

Los escenarios usan **Scenario Outline** (`Esquema del escenario`) con tablas `Ejemplos`. Allure y Cucumber generan reportes con una captura después de cada paso ejecutado.

## Contenido

- [Requisitos](#requisitos)
- [Primera ejecución](#primera-ejecución)
- [Configurar el entorno](#configurar-el-entorno)
- [Ejecutar las pruebas](#ejecutar-las-pruebas)
- [Consultar reportes y evidencias](#consultar-reportes-y-evidencias)
- [Entender las validaciones de importes](#entender-las-validaciones-de-importes)
- [Organización y mantenimiento](#organización-y-mantenimiento)
- [GitHub Actions](#github-actions)
- [Solución de problemas](#solución-de-problemas)
- [Alcance y documentación](#alcance-y-documentación)

## Requisitos

| Requisito                           | Uso                                                          |
| ----------------------------------- | ------------------------------------------------------------ |
| Node.js 22 desde 22.12.0, o rama 24 | Ejecutar el proyecto. La configuración de CI utiliza 24.12.0 |
| npm                                 | Instalar las dependencias y ejecutar los comandos            |
| Git                                 | Clonar el repositorio, si no tienes ya una copia local       |
| Acceso a internet                   | Descargar paquetes y navegadores, y acceder a SauceDemo      |
| Java disponible en PATH o JAVA_HOME | Generar y abrir el reporte Allure; CI utiliza JDK 17         |

Java no es necesario para ejecutar las pruebas ni para generar el HTML de Cucumber o los resultados JSON de Allure. Las librerías de automatización y el CLI de Allure se instalan localmente con npm.

Comprueba las herramientas desde tu terminal:

```sh
node --version
npm --version
java -version
```

Ejecuta la comprobación de Java si vas a utilizar el reporte HTML de Allure.

## Primera ejecución

Clona tu repositorio o abre la copia local. Todos los comandos de esta guía se ejecutan **dentro de web/, que contiene el package.json de este módulo**. Al clonar, utiliza la URL real de tu repositorio; el proyecto no requiere una ruta específica del equipo.

1. Instala las dependencias con las versiones del archivo de bloqueo:

   ```sh
   npm ci
   ```

2. Instala los navegadores de Playwright:

   ```sh
   npm run browsers:install
   ```

   En Linux, sustituye ese comando por el siguiente para instalar también las dependencias del sistema:

   ```sh
   npx playwright install --with-deps chromium firefox
   ```

3. Comprueba TypeScript y la correspondencia entre Gherkin y steps:

   ```sh
   npm run typecheck
   npm run test:dry-run
   ```

   El dry-run no abre navegadores ni ejecuta acciones. Los casos aparecen como `skipped`; es lo esperado en esta comprobación.

4. Ejecuta las pruebas principales y abre su reporte:

   ```sh
   npm run test:smoke
   npm run report
   ```

   Con la configuración predeterminada se ejecutan dos casos en Chromium sin ventana visible: compra y acceso bloqueado.

**Windows / PowerShell:** si la política de ejecución bloquea `npm.ps1`, usa `npm.cmd` en lugar de `npm`, y `npx.cmd` en lugar de `npx`. Por ejemplo: `npm.cmd run test:smoke`.

## Configurar el entorno

### Crear un archivo .env

El archivo `.env` es **opcional**: el proyecto incluye valores predeterminados para las cuentas públicas de la demo. Créalo cuando quieras cambiar navegador, visibilidad, tiempos u otras opciones.

Si todavía no tienes un `.env`, copia la plantilla en la raíz del proyecto:

**PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**

```sh
cp .env.example .env
```

Si ya existe, edítalo sin reemplazar tu configuración. `.env` está ignorado por Git; `.env.example` sí se versiona para que otra persona pueda preparar su entorno.

El orden de prioridad es: **variables del proceso o CI → archivo .env → valores predeterminados**.

### Variables disponibles

| Variable               | Valor predeterminado        | Descripción                                                             |
| ---------------------- | --------------------------- | ----------------------------------------------------------------------- |
| `WEB_BASE_URL`         | `https://www.saucedemo.com` | URL de una aplicación compatible con la UI de SauceDemo                 |
| `WEB_USERNAME`         | `standard_user`             | Cuenta válida                                                           |
| `WEB_PASSWORD`         | `secret_sauce`              | Contraseña pública de la demo                                           |
| `WEB_LOCKED_USERNAME`  | `locked_out_user`           | Cuenta utilizada para probar el bloqueo                                 |
| `BROWSER`              | `chromium`                  | Acepta `chromium` o `firefox`                                           |
| `HEADLESS`             | `true`                      | `true`: sin ventana; `false`: navegador visible                         |
| `STEP_TIMEOUT_MS`      | `45000`                     | Límite de ejecución de pasos y hooks, en milisegundos                   |
| `EXPECT_TIMEOUT_MS`    | `10000`                     | Tiempo de espera de acciones y aserciones, en milisegundos              |
| `CUCUMBER_WORKERS`     | `2`                         | Número de workers paralelos; entero positivo                            |
| `WEB_TAX_RATE_PERCENT` | `8`                         | Porcentaje de impuesto esperado, entre 0 y 100, con hasta dos decimales |

Los timeouts deben ser enteros positivos. Escribe `HEADLESS=true` o `HEADLESS=false`. Las URL se escriben como texto plano, sin sintaxis de enlaces Markdown:

```dotenv
WEB_BASE_URL=https://www.saucedemo.com
BROWSER=chromium
HEADLESS=false
CUCUMBER_WORKERS=1
WEB_TAX_RATE_PERCENT=8
```

Con un solo worker y el navegador visible puedes seguir una ejecución con mayor facilidad.

### Cambiar opciones temporalmente

Para ejecutar un caso en Firefox sin editar `.env`, en PowerShell:

```powershell
$env:BROWSER = 'firefox'
$env:HEADLESS = 'true'
npm test -- --tags "@WEB-01"
Remove-Item Env:BROWSER
Remove-Item Env:HEADLESS
```

Las dos últimas instrucciones quitan los overrides de esa terminal para volver a utilizar `.env` o los valores predeterminados.

En Bash:

```sh
BROWSER=firefox HEADLESS=true npm test -- --tags "@WEB-01"
```

## Ejecutar las pruebas

### Elegir una ejecución

| Comando                                           | Qué hace                                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `npm test`                                        | Ejecuta todos los ejemplos en el navegador indicado por `BROWSER`                         |
| `npm run test:smoke`                              | Ejecuta los casos etiquetados `@smoke` en ese navegador                                   |
| `npm run test:regression`                         | Ejecuta la suite primero en Chromium y después en Firefox; intenta ambos aunque uno falle |
| `npm test -- --tags "@WEB-01"`                    | Ejecuta únicamente la compra                                                              |
| `npm test -- --tags "@WEB-04"`                    | Ejecuta los tres ejemplos de campos obligatorios                                          |
| `npm test -- --tags "@regression and not @smoke"` | Ejecuta los casos que no pertenecen al smoke                                              |
| `npm run test:dry-run`                            | Comprueba Gherkin y resolución de pasos sin ejecutar la aplicación                        |
| `npm run typecheck`                               | Comprueba tipos de TypeScript sin generar JavaScript                                      |

Actualmente hay **6 outlines y 8 ejemplos ejecutables por navegador**: WEB-04 contiene tres filas de ejemplos. La regresión completa produce 16 ejecuciones.

Cucumber carga los archivos TypeScript directamente mediante tsx, instalado como dependencia local. No hay paso de build ni carpeta dist. Cucumber es el ejecutor de los escenarios; no utilices `npx playwright test` para esta suite.

### Interpretar el resultado

Una ejecución correcta muestra los escenarios como `passed` y termina con código 0. Los errores de configuración o las pruebas fallidas devuelven un código distinto de cero.

En una ejecución real, un paso fallido puede dejar pasos posteriores como `skipped`. Revisa el primer fallo y sus evidencias. Cucumber también incluye hooks en algunos totales de consola; ese número puede diferir del número de pasos Gherkin y capturas.

Cada escenario utiliza un contexto de navegador nuevo y datos aislados. No necesita que otro escenario se ejecute primero. Los reintentos automáticos están desactivados.

## Consultar reportes y evidencias

### Allure

Después de ejecutar las pruebas:

```sh
npm run allure:generate
npm run allure:open
```

Para un reporte que incluya ambos navegadores:

```sh
npm run test:regression
npm run allure:generate
npm run allure:open
```

En Allure abre **Suites → escenario → paso** y despliega la captura PNG adjunta. El parámetro `browser` identifica el navegador de cada resultado.

`npm run allure:serve` genera y abre una vista temporal como alternativa a los dos comandos de generación y apertura. Detén el servidor con **Ctrl+C**. No abras el `index.html` de Allure con doble clic; utiliza el servidor de estos comandos.

### HTML de Cucumber

Este reporte no requiere Java:

```sh
npm run report
npm run report -- chromium
npm run report -- firefox
```

Sin argumento se utiliza `BROWSER` del entorno o de `.env`, y Chromium si no está configurado. El reporte del navegador elegido debe existir: ejecuta sus pruebas primero.

### Ubicación de los archivos

| Ruta relativa al proyecto                       | Contenido                                          |
| ----------------------------------------------- | -------------------------------------------------- |
| `evidence/<navegador>/report.html`              | Reporte HTML de Cucumber                           |
| `evidence/<navegador>/results.json`             | Resultados estructurados de Cucumber               |
| `evidence/<navegador>/junit.xml`                | Resultados para herramientas compatibles con JUnit |
| `evidence/<navegador>/artifacts/<caso>-<uuid>/` | Capturas, trace y video cuando corresponda         |
| `evidence/allure-results/`                      | Resultados y adjuntos usados para generar Allure   |
| `evidence/allure-report/`                       | Sitio HTML generado de Allure                      |

El hook captura la pantalla **después de cada paso Gherkin ejecutado**, incluidos los antecedentes, tanto si pasa como si falla. Los pasos omitidos no producen una nueva captura. Si no hay una página disponible, el reporte registra esa limitación.

En cada carpeta de artifacts encontrarás `step-01.png`, `step-02.png`, etc., y `trace.zip` cuando la captura de traza se complete. Se conserva video de los escenarios fallidos y se elimina el de los aprobados.

Para investigar una traza, copia su ruta desde la evidencia y sustituye la ruta ilustrativa siguiente:

```sh
npx playwright show-trace "evidence/chromium/artifacts/CARPETA_DEL_CASO/trace.zip"
```

### Conservar una ejecución

- `npm test`, `test:smoke` y `test:regression` limpian los resultados Allure anteriores. Regresión limpia una sola vez antes de ejecutar ambos navegadores.
- El HTML, JSON y JUnit de Cucumber se reemplazan para el navegador ejecutado. Los artifacts de ejecuciones anteriores permanecen en sus carpetas.
- El dry-run no reemplaza los reportes de escenarios.
- `allure:open` abre el último HTML generado. Ejecuta `allure:generate` después de nuevas pruebas para actualizarlo.
- Para conservar o compartir una ejecución, copia la carpeta `evidence/` antes de volver a ejecutar. Evita suites simultáneas en la misma copia del proyecto porque comparten rutas de salida.

Los reportes completos están ignorados por Git. El resumen en `evidence/baseline/resumen.json` es una referencia guardada, no un reporte que se actualice automáticamente con cada prueba.

## Entender las validaciones de importes

El Gherkin expresa la intención sin fijar precios:

```gherkin
Y los importes del resumen corresponden a los productos seleccionados
```

La validación sigue estas reglas:

1. Captura el precio del producto en el catálogo antes de agregarlo.
2. Conserva el precio y la cantidad en el estado del escenario.
3. Verifica productos, precios y cantidades en carrito y resumen.
4. Calcula el subtotal esperado sumando precio por cantidad de los productos seleccionados.
5. Aplica `WEB_TAX_RATE_PERCENT` al subtotal y redondea el impuesto al centavo.
6. Compara subtotal, impuesto y total contra los valores mostrados.

Al eliminar un producto también se elimina del estado esperado. Los cálculos usan centavos enteros. La tasa es una regla esperada independiente del valor mostrado: no se deduce del impuesto de la pantalla.

Esto permite variar los precios del catálogo y detectar inconsistencias posteriores. No demuestra que el precio inicial del catálogo sea comercialmente correcto; para eso haría falta otra fuente de precios autorizada.

## Organización y mantenimiento

```text
features/           Gherkin en español: outlines y ejemplos
steps/              Pasos Cucumber separados por página
pages/              Page Objects: acciones y comprobaciones por página
locators/           Clases de localizadores por página
support/            World, hooks, aserciones y cálculo monetario
data/               Productos, mensajes y datos de prueba
config/             Lectura y validación de variables de entorno
scripts/            Ejecución y apertura de reportes
docs/               Diseño, trazabilidad y decisiones
evidence/           Reportes y archivos de ejecución
../.github/workflows/  Workflow común del repositorio
```

La relación principal es **Gherkin → Steps → Page Object → Locators → Playwright**.

Hay seis pantallas: login, catálogo, carrito, datos de entrega, resumen y confirmación. Cada una tiene su propio archivo de steps, Page Object y clase de locators. Por ejemplo: `cart.steps.ts → CartPage → CartLocators`.

### Agregar o modificar un caso

1. Edita el feature correspondiente. Mantén `Esquema del escenario`, parámetros `<nombre>` y una tabla `Ejemplos`. Cada fila genera una ejecución independiente.
2. Reutiliza pasos existentes. Si necesitas uno nuevo, colócalo en el archivo de steps de su página.
3. Implementa las acciones y comprobaciones de UI en el Page Object. Define los selectores en su clase de locators.
4. Si usas otro producto, registra su clave, nombre y slug en `data/shop-data.ts`. El precio se obtiene durante la prueba.
5. Actualiza los casos, la trazabilidad y las etiquetas. Reserva `@smoke` para los flujos críticos.
6. Ejecuta `npm run typecheck`, `npm run test:dry-run` y el caso modificado mediante su etiqueta. Si cambias cálculos, ejecuta los escenarios BDD WEB-01 y WEB-05.

Edita los archivos .ts directamente; typecheck comprueba tipos sin generar JavaScript. Al aumentar la cantidad de casos, actualiza también los conteos documentados y la expectativa de ocho escenarios en `scripts/summarize.cjs`, si utilizas ese script.

Consulta el detalle en [Arquitectura POM](docs/arquitectura-pom.md).

## GitHub Actions

El job web del workflow común [qa.yml](../.github/workflows/qa.yml) ejecuta los comandos dentro de web/. Publica la raíz que contiene web, api y mobile.

| Evento                                           | Pruebas de navegador                            |
| ------------------------------------------------ | ----------------------------------------------- |
| Pull request                                     | Smoke en Chromium: 2 casos                      |
| Push a main o master, incluido un merge          | Suite en Chromium: 8 casos                      |
| Programación diaria a las 08:00 UTC / 03:00 Lima | Regresión en Chromium y Firefox: 16 ejecuciones |
| Ejecución manual desde Actions                   | Regresión en ambos navegadores                  |

El workflow instala Node, Java, dependencias y navegadores; ejecuta typecheck y dry-run; intenta generar Allure y subir `web-evidence` incluso si falla una prueba. Los artifacts tienen una retención configurada de 14 días.

Para consultar resultados remotos, abre **Actions → ejecución → Artifacts → web-evidence**. Descarga y extrae el artifact; para servir su reporte Allure desde una copia del proyecto con dependencias y Java, utiliza:

```sh
npx allure open "RUTA_EXTRAIDA/allure-report"
```

Sustituye la ruta por la carpeta real del reporte extraído. También puedes abrir directamente el HTML de Cucumber.

La ejecución programada requiere el workflow en la rama predeterminada y Actions habilitado. Las cuentas públicas de la demo no requieren secretos. Para otras credenciales utiliza variables o secretos de CI y revisa las evidencias antes de compartirlas, ya que pueden mostrar datos de sesión.

## Solución de problemas

| Síntoma                                             | Qué revisar o hacer                                                                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PowerShell bloquea npm.ps1                          | Ejecuta `npm.cmd` o `npx.cmd`                                                                                                                                            |
| Error cargando cucumber.cjs                         | Lee la sección `cause`: normalmente identifica la variable o módulo que impide cargarlo                                                                                  |
| HEADLESS debe ser true o false                      | Corrige `HEADLESS=fasle` por `HEADLESS=false`; revisa también variables del proceso                                                                                      |
| Playwright no encuentra el ejecutable del navegador | Ejecuta `npm run browsers:install`; en Linux usa la variante `--with-deps`                                                                                               |
| Allure no encuentra Java                            | Comprueba `java -version`, PATH y JAVA_HOME; el HTML de Cucumber sigue disponible                                                                                        |
| No existe el reporte                                | Ejecuta pruebas del navegador elegido antes de `npm run report`                                                                                                          |
| Allure muestra resultados anteriores                | Ejecuta `npm run allure:generate` y vuelve a abrirlo                                                                                                                     |
| Un paso aparece undefined o ambiguous               | Revisa su texto y definiciones; ejecuta `npm run test:dry-run`                                                                                                           |
| Cambié .env y no se aplica                          | Una variable del proceso o CI tiene prioridad; retira el override o abre otra terminal                                                                                   |
| Timeout o navegación fallida                        | Revisa conectividad, captura y trace del primer fallo antes de modificar esperas                                                                                         |
| Firefox falla con ventana visible                   | En este entorno se observaron timeouts en login con `HEADLESS=false`; la regresión validada usa `HEADLESS=true`. Revisa la traza si necesitas investigar el modo visible |
| Falla el impuesto                                   | Verifica la regla esperada y `WEB_TAX_RATE_PERCENT`; no ajustes la tasa solo para hacer pasar el test                                                                    |

## Alcance y documentación

La suite cubre compra, bloqueo de acceso, credenciales incorrectas, campos obligatorios, eliminación de productos y cancelación del checkout. No cubre exhaustivamente ordenamiento, usuarios defectuosos, accesibilidad o regresión visual. Cambiar la URL no adapta automáticamente los selectores y flujos a otra aplicación.

La última validación local registrada aprobó 8 casos en Chromium y 8 en Firefox con modo headless. Se verificaron 116 capturas de pasos en Allure. Es una referencia de esa ejecución, no una garantía sobre el estado actual de la demo ni una ejecución remota de GitHub Actions.

- [Diseño y prioridades de casos](docs/casos.md)
- [Matriz de trazabilidad](docs/trazabilidad.md)
- [Decisiones técnicas](docs/decisiones.md)
- [Arquitectura POM](docs/arquitectura-pom.md)
- [Portabilidad](docs/portabilidad.md)
- [Evidencias registradas](evidence/README.md)

## Ejecución directa de TypeScript


**data/shop-data.ts** concentra datos compartidos: claves y nombres de productos, slugs para localizar botones, cliente de entrega, contraseña inválida y mensajes esperados. También exporta el formateador monetario. No contiene escenarios ni precios fijos: los precios se capturan durante la ejecución. Los datos de entorno y credenciales configurables se leen desde config/env.ts.

Las pruebas Web se definen exclusivamente en features/*.feature y se ejecutan con Cucumber. Los helpers de datos y cálculo apoyan esos escenarios BDD.

Cucumber registra tsx/cjs tanto en la configuración como en cada worker y carga support/**/*.ts y steps/**/*.ts. tsx transforma el código en memoria durante la ejecución, sin generar archivos JavaScript en el proyecto. npm run typecheck mantiene la validación estática separada (tsc --noEmit).
