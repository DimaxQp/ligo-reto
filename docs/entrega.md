# Índice de entregables

| Criterio | Entregable |
|---|---|
| 5.1 Automatización | [Web](../web/README.md), [API Karate](../api/README.md), [Mobile Appium](../mobile/README.md) |
| 5.2 Diseño | [Casos y justificación por módulo](casos.md) |
| 5.3 Trazabilidad | [Flujo → caso → código](trazabilidad.md) |
| 5.4 Guía de usuario | [README principal](../README.md) y guías por módulo |
| 5.5 Evidencias | [Resultados locales](../evidence/validation-summary.json), [capturas E2E Mobile](../evidence/samples/mobile/), artifacts de GitHub Actions |

## Acceso y configuración de GitHub

Repositorio público: https://github.com/DimaxQp/ligo-reto. El evaluador puede consultar el código y clonarlo sin invitación.

Las suites usan cuentas públicas de las aplicaciones demo y datos ficticios. No requieren secretos personalizados. GitHub proporciona GITHUB_TOKEN automáticamente; el workflow limita sus permisos a contents: read. No se utiliza la contraseña personal de GitHub en pruebas, archivos ni secretos.

Si se adapta a un entorno privado, configurar credenciales en Settings → Secrets and variables → Actions e inyectarlas como variables de entorno en el job correspondiente. Revisar las capturas y reportes antes de compartir datos privados.

El guion de video está preparado en [guion-video.md](guion-video.md); la grabación de la presentación todavía debe realizarse.

## Primera ejecución remota

[GitHub Actions: ejecución inicial](https://github.com/DimaxQp/ligo-reto/actions/runs/36730241985). Web, API y Mobile aprobados al publicar esta nota. Descargar web-evidence, api-evidence y mobile-evidence desde esa página.
