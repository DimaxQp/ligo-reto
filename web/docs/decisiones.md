# Decisiones técnicas

## Selección por riesgo

Se prioriza compra, importes e integridad de carrito (WEB-01/05/06), acceso bloqueado/incorrecto (WEB-02/03) y entrega incompleta (WEB-04). Los tests validan resultados de negocio, no solo que se pueda hacer click. P0: compra y cuenta bloqueada. P1: restantes automatizados.

## Cucumber y Gherkin

Se incorpora Cucumber por solicitud del usuario. Los .feature en español expresan comportamiento, tablas de datos e IDs; el Outline de campos genera tres escenarios aislados. Cucumber.js es el único runner. Playwright se utiliza como librería de navegador y aserciones; ya no se mantiene una suite .spec.ts paralela.

World mantiene contexto y seis Page Objects propios de cada escenario. Hooks crean/cierran recursos y adjuntan evidencia. Cada pantalla tiene steps, Page Object y clase de locators separados. Los steps interpretan Gherkin/datos y delegan acciones y comprobaciones al objeto correspondiente; no conocen selectores ni manipulan Page. Cada Page Object solo usa su clase de locators, donde residen todos los getByTestId. Los esperados de negocio permanecen en Gherkin/data, no se derivan de la UI. Los pasos pueden reutilizarse sin compartir estado entre escenarios. Ver [arquitectura POM](arquitectura-pom.md).

Cucumber ejecuta los archivos .ts mediante tsx/cjs, fijado en package-lock.json y cargado también en cada worker. No se generan archivos JavaScript ni se requiere dist. La validación de tipos se hace con tsc --noEmit. Las dependencias vienen del proyecto vía npm ci; no hay scripts de shell exclusivos de Linux ni rutas fijas de Windows.

## Configuración y datos

config/env.ts obtiene URL, cuentas, navegador, headless, timeouts y workers de variables de entorno o .env. Los defaults son los de la demo pública y están documentados; se valida protocolo, navegador y valores numéricos. Nunca se envía una contraseña por Gherkin ni se deja como valor por defecto en un Page Object.

data/shop-data.ts contiene nombres, slugs y mensajes del dominio. Los precios se capturan del catálogo antes de agregar cada producto y se conservan por escenario. Carrito y resumen deben mantener esos precios y cantidades. El subtotal esperado suma los productos seleccionados; el impuesto aplica WEB_TAX_RATE_PERCENT (8 % por defecto), con redondeo a centavos; el total suma ambos. Los cálculos usan centavos enteros. Esto verifica consistencia y cálculo, pero no detecta un precio de catálogo incorrecto sin una fuente comercial independiente.

Todos los escenarios usan Esquema del escenario (Scenario Outline) y tablas Ejemplos. Las tablas de productos usan parámetros de cada ejemplo; los importes se calculan y no son datos fijos del Gherkin.

## Independencia y sincronización

Cada escenario recibe un contexto nuevo (cookies/storage vacíos), abre login y agrega sus propios productos. Un navegador por worker reduce coste sin compartir sesión. No hay pruebas que dependan de que la anterior pase. Dos workers por defecto.

Localizadores data-test, acciones autoesperables y asserts de Playwright reintentables. No hay sleep fijo. Cero retries automáticos de escenario, tanto local como CI, para no esconder flakiness. Ante fallo se conserva pantalla, trace y video; se distingue error de producto, automatización o infraestructura antes de cambiar expectativas.

## Reportes y portabilidad

HTML, JSON, JUnit y artifacts por navegador; Allure agrega ambos navegadores diferenciados por parámetro browser. AfterStep adjunta PNG de cada paso ejecutado (éxito o fallo), con número/texto. Se cierran contextos en finally aunque falle captura/trace y navegador al finalizar worker. El trace se adjunta como ruta relativa; se abre con Playwright CLI. Los resultados Allure se limpian una sola vez al iniciar la suite para no mezclar ejecuciones anteriores. Dry-run no escribe reportes. Allure HTML se genera mediante CLI local; CI instala Java 17 y genera el reporte incluso ante fallos.

No se versionan node_modules, .env ni reportes con metadatos específicos de una máquina. Un resumen portable conserva conteos reales. El lockfile fija dependencias y CI instala navegadores con sus librerías Linux. La matriz usa Node para lanzar Cucumber sin sintaxis de variables dependiente del shell.

## CI y alcance pendiente

PR: dos smoke, comprobación TypeScript y resolución Gherkin. Post-merge/push: ocho Chromium. Nightly/manual: ocho en cada navegador. Los artifacts se conservan 14 días incluso al fallar. Una validación local de clon no demuestra que GitHub Actions haya corrido: ese paso queda pendiente de publicación.

Se mantienen fuera ordenamiento, visual completo, usuarios con defectos intencionales y nuevas reglas de checkout vacío/espacios. V2: reglas pactadas, accesibilidad, más navegadores según audiencia, entorno controlado y métricas de flake rate.

Referencias: [Cucumber: configuración](https://github.com/cucumber/cucumber-js/blob/v13.2.1/docs/configuration.md), [World](https://github.com/cucumber/cucumber-js/blob/v13.2.1/docs/support_files/world.md), [hooks](https://github.com/cucumber/cucumber-js/blob/v13.2.1/docs/support_files/hooks.md).

La validación monetaria se ejecuta mediante los escenarios BDD WEB-01 (compra) y WEB-05 (eliminación de producto). support/pricing.ts es un helper de cálculo utilizado por los Page Objects, no una suite de pruebas independiente.
