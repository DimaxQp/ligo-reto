# Trazabilidad — mobile

Los IDs conectan el requisito, caso y resultado del runner.

| Requerimiento / flujo | Casos | Test automatizado | Evidencia |
|---|---|---|---|
| Productos → carrito → login → dirección → pago → revisión → confirmación | MOB-01 | [cart.spec.ts](../tests/cart.spec.ts) | JUnit, captura y XML; aprobado en Android API 30 |
| Modificar/eliminar carrito | MOB-02, MOB-03 | [cart.spec.ts](../tests/cart.spec.ts) | JUnit, captura y XML; aprobado en Android API 30 |
| Cantidad mínima y estado de botón | MOB-04 | [cart.spec.ts](../tests/cart.spec.ts) | JUnit, captura y XML; aprobado en Android API 30 |

CI: job mobile en [qa.yml](../../.github/workflows/qa.yml), dentro del repositorio común.
