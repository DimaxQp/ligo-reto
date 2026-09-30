# Análisis de portabilidad y correcciones

## Hallazgos

| Hallazgo | Efecto real | Corrección |
|---|---|---|
| JSON histórico contenía rutas absolutas de la máquina original | No impedía correr tests, pero sus enlaces a traces eran inválidos en un clon | Reportes completos fuera de Git; resumen sin rutas personales |
| Usuario/contraseña en parámetros por defecto del Page Object | Acoplaba interacción a una cuenta y dificultaba cambiar entorno | Variables de entorno/.env y argumentos explícitos |
| Datos de entrega y catálogo mezclados con acciones | Duplicación y mantenimiento disperso | Fixtures de datos separadas y expectativas en Gherkin |
| Dependencias npm y binarios de navegador son instalaciones distintas | Un clon con solo npm ci podría fallar al lanzar browser | Comando browsers:install y --with-deps en CI |
| Suite anterior no tenía Cucumber/Gherkin | No cumplía la nueva arquitectura solicitada | Features en español, steps, World y hooks; un solo runner |
| Precios e impuesto | Precios capturados por escenario; tasa esperada configurable | WEB_TAX_RATE_PERCENT; cálculo en centavos y mensajes como contrato |

No había imports ejecutables a la carpeta del proyecto anterior: las rutas de PC encontradas estaban en las evidencias. Se retiraron igualmente para entregar un repositorio portable y evitar confusión.

## Qué se conserva fijo deliberadamente

Nombres de data-test, slugs, mensajes esperados y archivos de la aplicación son parte de SauceDemo. La URL/cuentas son configurables; apuntar a otra aplicación diferente requiere adaptar el contrato de UI. Las versiones fijadas por lockfile mejoran reproducibilidad.

## Comprobación

Se validan tipos sin emitir JavaScript, resolución de todos los pasos y ocho escenarios reales en dos navegadores. Además se prepara un repositorio Git temporal con únicamente los archivos de entrega, se clona a una ruta distinta con espacios y se ejecuta npm ci, instalación de navegadores y smoke. No se copian node_modules, .env ni evidencias generadas al clon.

Esta comprobación se hace localmente; no acredita una ejecución de Actions en GitHub ni que se haya subido código. Resultado y conteos en [evidencias](../evidence/README.md).

