# Trazabilidad — api

Los IDs conectan el requisito, caso y resultado del runner.

| Requerimiento / flujo | Casos | Test automatizado | Evidencia |
|---|---|---|---|
| Auth, crear/leer/actualizar/eliminar reserva | API-01 | [bookings.feature](../src/test/resources/features/bookings.feature) | Karate HTML con tráfico HTTP |
| Protección de PUT/PATCH/DELETE | API-02 | [bookings.feature](../src/test/resources/features/bookings.feature) | Tres filas independientes |
| Rechazo de token inválido | API-03 | [bookings.feature](../src/test/resources/features/bookings.feature) | 403 + GET de integridad |
| Consulta por nombre | API-04 | [bookings.feature](../src/test/resources/features/bookings.feature) | Lista con ID propio |
| Autenticación incorrecta | API-05 | [auth.feature](../src/test/resources/features/auth.feature) | JSON de error sin token |
| Datos y persistencia API | API-06 | [boundaries.feature](../src/test/resources/features/boundaries.feature) | Dos filas con POST/GET |
| Esquema/contrato de reserva | API-01, API-06; creación de API-02/03/04 | [booking.json](../src/test/resources/schemas/booking.json) | Asserts de esquema en Karate |

CI: job api en [qa.yml](../../.github/workflows/qa.yml), dentro del repositorio común.
