# Evidencia de validación

El resumen actual está en [baseline/resumen.json](baseline/resumen.json). Contiene conteos derivados de los reportes reales de Cucumber, sin rutas de una máquina específica.

Validación posterior a convertir todos los escenarios a Outline y calcular importes desde precios del catálogo: Chromium 8/8 y Firefox 8/8 aprobados con HEADLESS=true (override del proceso, sin modificar .env). Los Gherkin actuales contienen 58 pasos por navegador: **116 capturas** verificadas como adjuntos existentes del paso correspondiente. Cucumber también cuenta hooks en su total de steps de consola; ese total no representa solo pasos Gherkin. Se verificaron 6 outlines y 8 ejemplos por navegador.

Se generó el HTML Allure y se verificaron 16 resultados aprobados con 16 history IDs distintos: ambos navegadores no se agrupan como retries. Un dry-run posterior conservó esos resultados. TypeScript y npm audit sin errores/avisos. Los resultados completos están en allure-results/ y el HTML en allure-report/, ignorados por Git.

Durante la verificación con HEADLESS=false aparecieron timeouts al hacer clic en login de Firefox; los pasos fallidos también adjuntaron captura. No se cambiaron expectativas ni se añadieron retries. La validación completa final usa headless; la estabilidad de Firefox con ventana visible en este equipo queda pendiente. Chromium pasó en ambos modos.

La comprobación anterior de clon limpio validó la configuración Cucumber previa a Allure; no se presenta como un nuevo clon probado tras incorporar estas dependencias. No se ha ejecutado el workflow en un runner remoto de GitHub.

Para regenerar el resumen de regresión, ejecutar primero npm run test:regression y después node scripts/summarize.cjs. El resumen se sobrescribe; el apartado de verificación del clon corresponde solo a la validación documentada de esta entrega.

Los reportes completos se regeneran en chromium/ y firefox/: report.html, results.json, junit.xml y artifacts/. Git los ignora; GitHub Actions los adjunta como artifacts. Abrir HTML con npm run report y traces con npx playwright show-trace.

Se retiraron del proyecto las evidencias anteriores del runner Playwright Test que contenían rutas personales y enlaces a traces ausentes. Se conservó una copia local fuera del proyecto antes de retirarlas. No se mezclan esos resultados históricos con la ejecución Cucumber.

La validación de portabilidad utiliza un clon Git temporal limpio en una ruta con espacios. No equivale a una publicación ni ejecución en GitHub.

Validación de ejecución directa: Cucumber + tsx/cjs, sin build ni dist; Chromium 8/8 y Firefox 8/8 aprobados. Allure conserva 116 capturas de pasos.
