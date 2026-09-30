# Automatización QA — Web, API y Mobile

Un solo repositorio con tres módulos de prueba y un workflow común. Web usa Cucumber + Playwright + TypeScript; API usa Karate DSL + Java; Mobile usa Appium + WebdriverIO + TypeScript. Cada módulo conserva sus dependencias y configuración para poder ejecutarse por separado dentro del mismo proyecto.

## Estructura

```text
web/                 SauceDemo: Gherkin, steps, páginas y locators
api/                 Restful Booker: features Karate, contratos y helpers
mobile/              Android: tests, pantallas y locators
docs/                Estrategia, casos, trazabilidad y presentación
evidence/            Índice de validación y recopilación de resultados
scripts/             Comandos comunes de API y recopilación de evidencia
.github/workflows/   qa.yml: trabajos web, api y mobile
README.md            Esta guía
package.json         Comandos desde la raíz
```

La carpeta que se publica en GitHub es **esta raíz**, no cada módulo por separado. Los manifiestos y archivos de bloqueo se versionan; node_modules, .tools, .env, APK y reportes generados están ignorados.

## Requisitos

- Node.js 24.12 o posterior de la rama 24 y npm, para Web, Mobile y los comandos comunes.
- JDK 17 y Maven 3.9 para API. JDK 17 también se utiliza en Mobile y para generar Allure.
- Navegadores Playwright para Web.
- Android SDK, platform-tools, un emulador iniciado o un dispositivo autorizado para Mobile. La configuración CI utiliza Android API 30 x86_64.
- Acceso a npm, Maven Central, las descargas de navegadores/APK y las aplicaciones públicas.

En Windows, usa npm.cmd y npx.cmd si PowerShell bloquea los scripts npm.ps1. Todos los comandos siguientes parten de la raíz del repositorio.

## Clonar

```sh
git clone https://github.com/DimaxQp/ligo-reto.git
cd ligo-reto
```

El repositorio es público: puedes clonarlo por HTTPS sin autenticarte.

## Instalación

```sh
npm run install:modules
npm --prefix web run browsers:install
npm --prefix mobile run app:download
npm --prefix mobile run driver:install
```

No hace falta instalar dependencias en la raíz: package.json solo coordina comandos. Web y Mobile tienen sus propios package-lock.json. API descarga sus dependencias Maven en la primera ejecución.

En Linux, instala los navegadores con sus dependencias del sistema:

```sh
cd web
npx playwright install --with-deps chromium firefox
cd ..
```

Para API, verifica java -version y mvn -version. El script común también admite herramientas portátiles existentes en api/.tools; esas herramientas no se distribuyen ni se requieren al clonar. Si hay un JDK portátil allí, el script lo utiliza solo para su proceso.

## Configuración

**Web:** copia web/.env.example a web/.env si necesitas cambiar valores. El archivo es opcional; la demo funciona con los valores predeterminados. Para ver el navegador, establece HEADLESS=false. La [guía Web](web/README.md) explica todas las variables y los reportes Allure.

**API:** configura variables del proceso API_BASE_URL, BOOKER_USERNAME y BOOKER_PASSWORD, si necesitas cambiar la demo pública. Karate no carga archivos .env. Consulta la [guía API](api/README.md).

**Mobile:** para usar el emulador ya preparado en esta copia de Windows, ejecuta . ./mobile/scripts/start-local-emulator.ps1 desde la raíz. En un clon nuevo, configura JAVA_HOME (JDK 17), ANDROID_HOME y añade platform-tools/emulator al PATH. Inicia Android y comprueba adb devices -l. Usa ANDROID_UDID si hay varios dispositivos. El módulo no carga .env; utiliza variables del proceso. La [guía Mobile](mobile/README.md) incluye instalación, diagnóstico y limitaciones.

Cada prueba Mobile reinstala la aplicación demo y borra sus datos. Utiliza un emulador o dispositivo de pruebas. El APK se descarga desde una release fijada y se valida con SHA-256.

## Comandos desde la raíz

| Comando | Resultado |
|---|---|
| npm run check | TypeScript Web/Mobile y dry-run Gherkin; no ejecuta Android ni API |
| npm run web:smoke | Dos casos críticos en el navegador configurado |
| npm run web:test | Ocho ejemplos en el navegador configurado |
| npm run web:regression | Ocho ejemplos en Chromium y ocho en Firefox |
| npm run api:smoke | Cuatro casos Karate: ciclo CRUD y tres operaciones sin autorización |
| npm run api:test | Los nueve escenarios Karate |
| npm run mobile:smoke | Compra E2E: catálogo → carrito → login → dirección → pago → confirmación |
| npm run mobile:test | Los cuatro casos Android |
| npm run evidence:collect | Copia los reportes disponibles a evidence/runs/<fecha>/ con un manifiesto |

También puedes entrar en un módulo y ejecutar sus comandos directamente. No ejecutes dos suites del mismo módulo a la vez porque comparten carpetas de salida.

## Reportes

| Módulo | Ubicación |
|---|---|
| Web | web/evidence/chromium/ y web/evidence/firefox/: HTML, JSON, JUnit y artifacts |
| Allure Web | web/evidence/allure-results/ y web/evidence/allure-report/ |
| API | api/target/karate-reports/karate-summary.html y api/target/surefire-reports/ |
| Mobile | mobile/evidence/: capturas, XML, JSON, JUnit y logs |
| Copia de entrega | evidence/runs/<fecha>/, creada con evidence:collect |

Para generar y abrir Allure Web:

```sh
npm --prefix web run allure:generate
npm --prefix web run allure:open
```

Cucumber captura cada paso Web ejecutado. Mobile captura al terminar cada caso; una sesión Android que no arranca solo puede producir diagnóstico y logs. API genera reportes con peticiones, respuestas y aserciones; los screenshots no aplican a esa capa.

La recopilación conserva los resultados disponibles: **no ejecuta pruebas ni demuestra que sean nuevos**. Consulta la fecha y el estado de cada reporte. Los resultados generados pueden contener datos de sesión.

## CI/CD compartido

[qa.yml](.github/workflows/qa.yml) contiene tres jobs, cada uno con su directorio de trabajo, herramientas y artifacts. Un fallo de API no impide que se ejecute el job Mobile o Web.

| Evento | Web | API | Mobile |
|---|---|---|---|
| Pull request | 2 smoke Chromium | 4 smoke | 1 smoke Android |
| Push main/master o merge | 8 Chromium | 9 casos | 4 casos |
| Nightly, 03:00 Lima | 16 en dos navegadores | 9 casos | 4 casos |
| Manual | Regresión completa | 9 casos | 4 casos |

Web también ejecuta typecheck y dry-run; Mobile comprueba TypeScript. CI instala el SDK/emulador para Mobile mediante android-emulator-runner. Los artifacts se suben aunque fallen pruebas y se conservan 14 días. Consulta Actions → ejecución → Artifacts.

La programación requiere el workflow en la rama predeterminada y Actions habilitado. La [primera ejecución de GitHub Actions](https://github.com/DimaxQp/ligo-reto/actions/runs/36730241985) aprobó los tres jobs: Web, API y Mobile.

## Estado comprobado y pendientes

- Web integrado: 16/16 ejecuciones aprobadas en modo headless.
- API: 9/9 escenarios aprobados contra Restful Booker.
- Mobile: 4/4 casos aprobados en emulador Pixel 2, Android 11 / API 30. TypeScript, checksum del APK y comprobaciones obligatorias de Appium Doctor aprobados. SDK y JDK 17 locales; instrucciones en la guía Mobile.
- CI: Web, API y Mobile aprobados.

Consulta [evidence/README.md](evidence/README.md) para distinguir evidencia real de comprobaciones estáticas. La copia original de qa-web no se modificó durante la integración; a partir de ahora los cambios de este repositorio se realizan en web/.

## Documentación de entrega

- [Índice de entregables y configuración de GitHub](docs/entrega.md)

- [Estrategia y decisiones comunes](docs/estrategia.md)
- [Casos priorizados](docs/casos.md)
- [Trazabilidad](docs/trazabilidad.md)
- [Guion del video de 10–15 minutos](docs/guion-video.md)
- Guías: [Web](web/README.md), [API](api/README.md), [Mobile](mobile/README.md)

La persistencia API se valida mediante GET posterior a escritura, sin acceso a base de datos. Mobile cubre la compra completa dentro de la demo, con datos ficticios de pago y confirmación; no procesa cobros bancarios reales. Los importes Web/Mobile se calculan desde precios capturados; esto valida consistencia, no el precio comercial inicial.
