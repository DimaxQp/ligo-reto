# Guion para grabación — objetivo: 12 minutos

Usa tus palabras y comprende el código antes de grabar. No presentes Mobile como ejecutado hasta tener un reporte real; si sigue bloqueado, muestra el diagnóstico y explica la limitación. No uses el reporte Web/API para insinuar cobertura Mobile.

| Tiempo | Mostrar | Explicación sugerida |
|---|---|---|
| 0:00–1:15 | README general y decisiones de cada proyecto | “Organicé un repositorio con tres módulos y prioricé compra, importes y autorización. Cada módulo conserva su runtime, y un workflow común ejecuta los tres.” |
| 1:15–2:30 | docs/casos.md de cada proyecto | Mostrar WEB-01, API-02 y MOB-04. Explicar estado, particiones y frontera 0/1; por qué se excluyen ordenamiento, usuarios defectuosos y negativos exhaustivos de pago móvil. |
| 2:30–4:00 | Árbol de carpetas, fixtures y Page Objects | Explicar responsabilidades: test contiene intención/asserts, objeto de página contiene interacción. Separar runners, compartir TypeScript donde aporta valor. |
| 4:00–5:30 | web/features/compra.feature y steps por página | Leer compra: dos productos, centavos, total, confirmación. Explicar contexto nuevo, data-test, error de campos parametrizado y trace. |
| 5:30–7:15 | bookings.feature, schema, karate-config | UUID, token por caso, POST/GET, PUT/PATCH, limpieza, 403 más persistencia intacta. Explicar que 200/201 son contrato de esta demo. |
| 7:15–8:30 | mobile/screens/, mobile/locators/ y wdio.conf.ts | APK con hash, accessibility/resource IDs, selector de producto por título y reset por caso. Explicar la espera de eliminación de 5 segundos observada en el código. |
| 8:30–10:15 | Terminal y reportes reales | Ejecutar smoke Web y API; abrir HTML y una traza. Mostrar Mobile en emulador solo si ya fue validado; si no, mostrar diagnóstico real y tarea pendiente. |
| 10:15–11:15 | .github/workflows/qa.yml | Un repositorio y tres jobs. Diferenciar PR rápido, post-merge completo y nightly multi-browser. Artifacts always, límites de tiempo y fallo por flakiness. |
| 11:15–12:00 | Estrategia V2 | Primera prioridad: validar Actions y un segundo dispositivo Android. Después reglas API, checkout Mobile, segundo dispositivo y métricas de flake rate. |

## Preparar la demostración

1. Abrir editor, terminal y reportes; cerrar pestañas con información personal.
2. Comprobar requisitos antes de grabar. Para Mobile, `adb devices -l` debe listar el dispositivo; ejecutar los cuatro casos y conservar evidencia.
3. En una terminal dentro de `web`, ejecutar `npm run test:smoke`. En otra dentro de `api`, `mvn test -Dkarate.tags=@smoke` (o `./scripts/run-api.ps1 -Smoke`). Esto crea reportes smoke; cada proyecto conserva su propia carpeta `evidence/baseline` de regresión.
4. Desde `web`, abrir `npm run report`; para API, `api/target/karate-reports/karate-summary.html`. Desde `mobile`, ejecutar `npm run test:smoke` solo con Android preparado. Mostrar evidencia indicando dispositivo y APK.
5. Grabar pantalla y micrófono con una herramienta disponible. Objetivo 10–15 minutos; evitar leer cada línea del código. El archivo de video final no se ha generado en esta entrega.

## Preguntas que debes poder responder

- **¿Por qué esos casos?** Protegen compra, dinero, integridad y autorización. WEB-01 valida resultados, no solo clicks.
- **¿Qué no automatizaste?** Mostrar tabla de exclusiones con motivo y riesgo residual.
- **¿Qué patrón?** Page/Screen Objects pequeños con fixtures; DSL declarativo Karate para API. No una capa universal para tecnologías distintas.
- **¿Cómo administras datos?** Contextos nuevos, UUID por reserva y reinstalación de app demo. Ningún caso consume la salida de otro.
- **¿Cómo controlas flakiness?** Esperas por condición, versión de app fija, sin sleeps, trace y cero reintentos automáticos de tests.
- **¿Qué ejecutas como smoke?** Compra y bloqueo Web, CRUD y autorización API, compra completa Mobile con pago de prueba y confirmación.
- **¿Qué mejorarías?** Validación pendiente de CI y ampliación de dispositivos antes de aumentar cobertura, entorno API controlado y datos recuperables aun si falla la respuesta POST.
