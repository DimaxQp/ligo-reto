# Evidencia Mobile

El 30/09/2026 se ejecutaron los cuatro casos con Appium/UiAutomator2 sobre un emulador Pixel 2 x86_64, Android 11 / API 30. **Resultado: 4 aprobados, 0 fallidos.**

[Resumen portable](baseline/regression-summary.json): versión y SHA-256 del APK, estado y fecha de cada caso. En esta carpeta están las capturas PNG, jerarquías XML y JSON de los cuatro tests; junit/ contiene el reporte del runner; logs/ y appium/ contienen el diagnóstico de ejecución.

El entorno se preparó en .tools/android-sdk de la raíz, con JDK 17 y drivers locales. Appium Doctor pasó sus requisitos obligatorios; bundletool/GStreamer son opcionales para esta suite de APK y screenshots.

La primera ejecución falló por controles fuera del viewport. Se añadió scroll por resource ID; después se corrigió Items con mayúscula según el XML de la aplicación. La ejecución final completa pasó sin retries.

Los diagnósticos históricos permanecen locales. Para generar un diagnóstico actual, ejecuta Appium Doctor según la guía Mobile.

[npm audit histórico](baseline/npm-audit.json): las dependencias de herramientas todavía reportan 15 avisos transitivos (1 moderate y 14 high); no se aplicaron downgrades incompatibles.

La primera ejecución de esta suite en GitHub Actions aprobó. Una ejecución local en un emulador no garantiza estabilidad en toda la matriz de dispositivos.

La regresión actual incluye el E2E ampliado MOB-01: login, dirección, pago ficticio, revisión de datos/importes, confirmación y carrito vacío al continuar. Las cuatro capturas de checkout/ muestran dirección, pago, revisión y Checkout Complete. Smoke E2E aprobado y regresión completa 4/4 aprobada.
