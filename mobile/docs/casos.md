# Diseño de pruebas — Mobile

P0: flujo o integridad crítica. P1: validación relevante. La tabla contiene únicamente los casos implementados para esta entrega; cada fila representa una ejecución por configuración.

**Total: 4 casos automatizados**, una ejecución por cada test MOB-01 a MOB-04.

## Mobile

Precondición: Android API 30, app 2.2.0 build 25 instalada por Appium, `en-US`, sesión limpia. Cada caso prepara su propia sesión. Consulta evidence/baseline/regression-summary.json para el resultado de ejecución registrado.

| ID | Escenario | Prioridad | Técnica | Automatizado |
|---|---|---|---|---|
| MOB-01 | Catálogo → 2 unidades → carrito → login → dirección → pago → revisión → confirmación → carrito vacío | P0 | Caso de uso, transición de estados y oráculo monetario | Sí |
| MOB-02 | Carrito: 1 → 2 → 1, validar cantidad e importes | P1 | Transiciones e integridad de cálculo | Sí |
| MOB-03 | Eliminar único producto muestra No Items y desaparece item | P1 | Transición no vacío → vacío | Sí |
| MOB-04 | Detalle: 1 → 0 deshabilita Add; no baja de 0; volver a 1 habilita | P1 | Valor límite 0/1 y transición de habilitación | Sí |

MOB-01 comprueba nombre y precio en detalle, título de carrito, nombre, cantidad, cantidad total e importe; después completa login, dirección y pago, valida datos e importes en revisión y confirma el pedido. MOB-02 prepara su propio carrito y verifica los importes calculados al cambiar entre dos y una unidad. MOB-03 crea su producto y usa Remove; se espera por la pantalla vacía. MOB-04 actúa sin agregar al carrito y comprueba enabled/disabled, no solo el texto de cantidad.

La operación principal seleccionada es completar una compra en la demo. Se verifica confirmación y limpieza del carrito, no liquidación en una pasarela bancaria real. Los cuatro casos pasaron localmente en Android API 30 y el job Mobile de la primera ejecución de GitHub Actions también aprobó.

## Fuera del alcance de esta entrega

Se excluyeron negativos de dirección y pago para priorizar la compra E2E y la integridad del carrito. Rotación, otras versiones Android y restauración del proceso requieren ampliar la matriz de dispositivos. Estas ideas no forman parte de los 4 casos entregados.
