# Matriz de trazabilidad

| Requisito / flujo | Casos | Implementación | Evidencia |
|---|---|---|---|
| Web: login → productos → carrito → checkout → confirmación | WEB-01 a WEB-06, con WEB-04a/b/c | [features](../web/features/compra.feature), [acceso](../web/features/acceso.feature) | Cucumber y Allure; ejecución local aprobada |
| API: auth → crear → consultar → actualizar → eliminar | API-01 | [bookings.feature](../api/src/test/resources/features/bookings.feature) | Karate HTML/JSON/JUnit; ejecución local aprobada |
| API: autorización, autenticación negativa y búsqueda | API-02 a API-05 | [reservas](../api/src/test/resources/features/bookings.feature), [auth](../api/src/test/resources/features/auth.feature) | Karate; ejecución local aprobada |
| API: precio y depósito | API-06 | [boundaries.feature](../api/src/test/resources/features/boundaries.feature) | Karate; ejecución local aprobada |
| Mobile: productos → carrito → login → dirección → pago → revisión → confirmación | MOB-01 | [cart.spec.ts](../mobile/tests/cart.spec.ts) | JUnit, capturas y XML; 4/4 aprobados en Android API 30 |
| Mobile: cantidades, eliminar y frontera cero | MOB-02 a MOB-04 | [cart.spec.ts](../mobile/tests/cart.spec.ts) | JUnit, capturas y XML; 4/4 aprobados en Android API 30 |
| CI/CD por evento para las tres capas | Smoke / suite / nightly | [qa.yml](../.github/workflows/qa.yml) | Pendiente primera ejecución GitHub |

Matrices detalladas: [Web](../web/docs/trazabilidad.md), [API](../api/docs/trazabilidad.md), [Mobile](../mobile/docs/trazabilidad.md).
