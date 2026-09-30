# Matriz de trazabilidad

| Flujo/requisito | Casos | Gherkin | Implementación |
|---|---|---|---|
| Compra completa y totales | WEB-01 | [compra.feature](../features/compra.feature) | [catálogo](../steps/catalog.steps.ts), [carrito](../steps/cart.steps.ts), [entrega](../steps/checkout-information.steps.ts), [resumen](../steps/checkout-overview.steps.ts), [confirmación](../steps/checkout-complete.steps.ts) |
| Control de acceso | WEB-02, WEB-03 | [acceso.feature](../features/acceso.feature) | [login.steps.ts](../steps/login.steps.ts) |
| Campos obligatorios | WEB-04a/b/c | Outline en [compra.feature](../features/compra.feature) | [checkout-information.steps.ts](../steps/checkout-information.steps.ts) |
| Quitar producto y recalcular | WEB-05 | [compra.feature](../features/compra.feature) | [carrito](../steps/cart.steps.ts), [resumen](../steps/checkout-overview.steps.ts) |
| Cancelar y conservar selección | WEB-06 | [compra.feature](../features/compra.feature) | [entrega](../steps/checkout-information.steps.ts), [carrito](../steps/cart.steps.ts) |

Los IDs figuran en los nombres del escenario y resultados Cucumber/JUnit. WEB-04 se expande en tres filas con IDs distintos. Ocho escenarios por navegador; dieciséis ejecuciones en regresión.

Evidencia: HTML/JSON/JUnit por navegador y traces/capturas en artifacts. Smoke: @WEB-01 y @WEB-02, seleccionados por @smoke. Todos pertenecen a @regression.

CI: [qa.yml](../../.github/workflows/qa.yml). Reglas y exclusiones: [casos](casos.md).
