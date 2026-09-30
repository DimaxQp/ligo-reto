# POM por página

Flujo de dependencias: **Gherkin → Steps → Page Object → Locators → Playwright**. Cada pantalla tiene tres archivos y una responsabilidad acotada.

| Pantalla | Steps | Page Object | Clase de locators |
|---|---|---|---|
| Login | [login.steps.ts](../steps/login.steps.ts) | [LoginPage](../pages/login.page.ts) | [LoginLocators](../locators/login.locators.ts) |
| Catálogo | [catalog.steps.ts](../steps/catalog.steps.ts) | [CatalogPage](../pages/catalog.page.ts) | [CatalogLocators](../locators/catalog.locators.ts) |
| Carrito | [cart.steps.ts](../steps/cart.steps.ts) | [CartPage](../pages/cart.page.ts) | [CartLocators](../locators/cart.locators.ts) |
| Datos de entrega | [checkout-information.steps.ts](../steps/checkout-information.steps.ts) | [CheckoutInformationPage](../pages/checkout-information.page.ts) | [CheckoutInformationLocators](../locators/checkout-information.locators.ts) |
| Resumen de compra | [checkout-overview.steps.ts](../steps/checkout-overview.steps.ts) | [CheckoutOverviewPage](../pages/checkout-overview.page.ts) | [CheckoutOverviewLocators](../locators/checkout-overview.locators.ts) |
| Confirmación | [checkout-complete.steps.ts](../steps/checkout-complete.steps.ts) | [CheckoutCompletePage](../pages/checkout-complete.page.ts) | [CheckoutCompleteLocators](../locators/checkout-complete.locators.ts) |

## Responsabilidades

- **Steps:** registran las expresiones Cucumber, interpretan DataTables/argumentos y preparan esperados. No usan getByTestId, locator ni Page directamente.
- **Page Objects:** acciones y métodos de comprobación de su pantalla. Reciben esperados por parámetro; no guardan credenciales ni duplican datos de negocio. Las aserciones reintentables usan support/assertions.ts.
- **Locators:** clases que reciben Page y exponen getters o métodos de localización. No hacen clicks, validaciones ni cargan datos de prueba. Los locators dinámicos de agregar/quitar se parametrizan por slug.
- **World:** composición de las seis páginas y estado de productos seleccionados aislado por escenario. support/pricing.ts contiene el cálculo monetario.
- **Hooks:** ciclo de vida, capturas por paso, traces y Allure, separados del modelo de páginas.

El login puede comprobar la transición llamando a CatalogPage.expectLoaded desde su step; LoginPage no depende de CatalogPage ni de sus selectores. Los objetos no se instancian globalmente, para conservar aislamiento.

## Ejemplo de mantenimiento

Si cambia el selector de Remove, editar CartLocators.removeButton. Si cambia la operación de eliminar, editar CartPage.remove. Si cambia la redacción del paso, editar cart.steps.ts. Los imports relativos mantienen el proyecto portable.

Se retiraron los archivos monolíticos shop.steps.ts y pages/shop.ts. Cucumber carga exclusivamente los steps y hooks .ts mediante tsx/cjs; no hay archivos compilados que puedan duplicar definiciones. El dry-run comprueba que los ocho escenarios se resuelvan sin ambigüedades.

Los features usan Scenario Outline con tablas Ejemplos y aserciones monetarias calculadas; se mantiene la organización por página y la reportería Allure con captura después de cada paso ejecutado.
