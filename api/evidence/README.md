# Evidencia API

Validación real el 28/09/2026, Windows, JDK 17.0.20.1, Maven 3.9.11, Karate 1.5.1. Desde este proyecto: `./scripts/run-api.ps1`, equivalente a `mvn -B -ntp test`.

Resultado: **9 escenarios aprobados, 0 fallidos** en 3 features. Karate tardó 17.64 s; Maven completo 19.783 s. Surefire cuenta 1 test Java (el runner), no debe confundirse con 1 escenario.

Los logs y XML originales se conservan localmente y no se versionan porque contienen respuestas y tokens de sesión. El [resumen común](../../evidence/validation-summary.json) registra los resultados; CI publica reportes completos como artifacts.

Reporte HTML completo en `target/karate-reports/karate-summary.html`, regenerable y fuera de Git. Los reportes incluyen requests/responses de datos demo y tokens; no usar credenciales privadas sin revisar antes de compartir.

Primer run durante desarrollo: fallos 418 por configuración de Accept de una sola petición. Se corrigió en el cliente y la suite completa pasó. Se consultaron por UUID las dos creaciones potencialmente incompletas de ese run: ya no había reservas coincidentes. No se borraron datos de terceros.

API también aprobó en la [primera ejecución de GitHub Actions](https://github.com/DimaxQp/ligo-reto/actions/runs/36730241985). Su artifact api-evidence contiene la evidencia remota.
