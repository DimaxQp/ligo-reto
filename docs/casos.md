# Diseño de pruebas

La entrega contiene **21 casos automatizados: 8 Web + 9 API + 4 Mobile**. Cada fila de las tablas detalladas corresponde a un caso ejecutable, incluidas las variantes parametrizadas. La columna «Automatizado» indica implementación, no posibilidad futura de automatización.

| Módulo | Casos automatizados | Cómo se obtiene el total | Detalle |
|---|---|---|---|
| Web | 8 | 5 outlines de una fila + 1 outline de tres filas | [8 filas Web](../web/docs/casos.md) |
| API | 9 | 4 escenarios individuales + 3 ejemplos de autorización + 2 de precio/depósito | [9 filas API](../api/docs/casos.md) |
| Mobile | 4 | 4 tests Android independientes | [4 filas Mobile](../mobile/docs/casos.md) |
| **Total** | **21** | Casos por una configuración de cada módulo | |

La regresión Web usa dos navegadores: ejecuta los mismos 8 casos dos veces (16 ejecuciones). Con API y Mobile, la regresión completa suma 29 ejecuciones, no 29 casos distintos.

Las tres capas tienen ejecución local aprobada y los tres jobs de la [primera ejecución CI](https://github.com/DimaxQp/ligo-reto/actions/runs/36730241985) aprobaron. Ese push ejecutó Web en Chromium, API y Mobile.

P0 protege el flujo principal y la integridad/autorización; P1 cubre errores relevantes y cambios de estado. Las exclusiones se explican fuera de las tablas, sin sumarse a los casos entregados, tal como pide justificar el alcance del reto. La [estrategia](estrategia.md) explica las decisiones comunes.
