# Evidencias del repositorio

Los resultados originales permanecen en cada módulo. Ejecuta npm run evidence:collect desde la raíz para reunirlos en runs/<fecha>/. El manifiesto indica qué carpetas existían; no afirma que todas contengan una ejecución nueva o completa.

## Validación de la integración

- Web: 8/8 Chromium y 8/8 Firefox, headless. TypeScript y dry-run aprobados.
- API: 9/9 escenarios Karate contra el servicio público. Reporte en api/target/karate-reports.
- Mobile: 4/4 aprobados en Android 11 / API 30, Pixel 2 x86_64. Capturas y XML de los cuatro casos, JUnit y logs disponibles. Appium Doctor: cero correcciones obligatorias.
- CI: Web y API aprobados; Mobile en curso en la [primera ejecución de GitHub Actions](https://github.com/DimaxQp/ligo-reto/actions/runs/36730241985).

El resumen verificado está en [validation-summary.json](validation-summary.json). Los diagnósticos iniciales de bloqueo son históricos. Conserva reportes completos antes de nuevas ejecuciones y no uses evidencia Web/API para presentar Mobile como aprobado.

Las [capturas del checkout Mobile](samples/mobile/) conservan dirección, pago ficticio, revisión y confirmación del E2E ejecutado. Los reportes completos de CI se descargan desde Actions → ejecución → Artifacts.
