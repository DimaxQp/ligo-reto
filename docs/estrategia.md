# Estrategia del proyecto

## Riesgo y selección

Web protege la compra, importes y acceso; API protege integridad y autorización de reservas; Mobile protege selección, cantidades y carrito. Se prioriza un conjunto pequeño de comprobaciones de negocio con datos aislados, evidencia y diagnóstico.

Los módulos comparten repositorio, revisión y pipeline, no un framework universal. Karate tiene su propia DSL y runtime Java; Web usa Cucumber/Playwright; Mobile usa WDIO/Mocha/Appium. Mantener manifiestos separados evita acoplar dependencias incompatibles.

## Arquitectura

Web: feature → steps por página → Page Object → clase de locators. Todos los casos de negocio son Scenario Outline.
API: feature por responsabilidad → helpers auth/cleanup → contrato JSON. Los casos parametrizados utilizan Scenario Outline.
Mobile: test → Screen Object → clase de locators por pantalla (catálogo, detalle, carrito, login, dirección, pago, revisión y confirmación). Se conserva Mocha como ejecutor nativo de WDIO.

Las pantallas no dependen entre sí. Los tests/steps coordinan transiciones; los selectores viven en sus clases. El repositorio tiene un único workflow con tres jobs.

## Datos y aislamiento

Web crea un contexto por escenario. API crea reservas con UUID, conserva solo su propio ID y limpia mediante DELETE seguido de GET 404. Mobile crea una sesión e instalación limpias por caso. Ningún test consume resultados de otro.

Los precios se capturan antes de agregar productos. Web aplica una tasa esperada configurable y cálculos en centavos; Mobile compara total con precio capturado por cantidad. Un precio inicial incorrecto exige una fuente comercial independiente.

## Flakiness y localizadores

Se esperan estados observables, sin sleeps ni reintentos automáticos de tests. Web usa data-test; Mobile prefiere accessibility ID y resource ID. API usa concurrencia uno para limitar interferencia en el servicio público. Ante fallos se revisan trace, screenshot, respuesta HTTP o logs según la capa.

## CI y evidencia

PR ejecuta smoke; merge ejecuta las suites; nightly agrega el segundo navegador Web. Cada job guarda sus artifacts aunque falle. evidence:collect permite reunir resultados locales sin alterar su procedencia ni declarar resultados nuevos.

## Límites y siguiente versión

Antes de ampliar cobertura: ejecutar el workflow en GitHub. Mobile ya cuenta con baseline local de cuatro casos aprobados en Android API 30. Después: entorno API controlado, limpieza recuperable ante pérdida de respuesta de creación, negativos de checkout Mobile y matriz Android adicional. No se presenta análisis estático como evidencia de estabilidad runtime.

Detalles: [Web](../web/docs/decisiones.md), [API](../api/docs/decisiones.md), [Mobile](../mobile/docs/decisiones.md).
