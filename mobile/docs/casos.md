# Diseño de pruebas — Mobile

P0: flujo/integridad crítica. P1: validación relevante. P2: cobertura adicional. Automatizado significa implementado; no necesariamente ejecutado.

## Mobile

Precondición: Android API 30, app 2.2.0 build 25 instalada por Appium, `en-US`, sesión limpia. Cada caso prepara su propia sesión. Consulta evidence/baseline/regression-summary.json para el resultado de ejecución registrado.

| ID | Escenario | Prioridad | Técnica | Automatizado |
|---|---|---|---|---|
| MOB-01 | Catálogo → 2 unidades → carrito → login → dirección → pago → revisión → confirmación → carrito vacío | P0 | Caso de uso, transición de estados y oráculo monetario | Sí |
| MOB-02 | Carrito: 1 → 2 → 1, validar cantidad e importes | P1 | Transiciones e integridad de cálculo | Sí |
| MOB-03 | Eliminar único producto muestra No Items y desaparece item | P1 | Transición no vacío → vacío | Sí |
| MOB-04 | Detalle: 1 → 0 deshabilita Add; no baja de 0; volver a 1 habilita | P1 | Valor límite 0/1 y transición de habilitación | Sí |
| MOB-05 | Errores de dirección y pago incompletos | P1 | Particiones inválidas y campos obligatorios | No |
| MOB-06 | Rotación, segundo nivel Android, restauración de proceso | P2 | Matriz de compatibilidad y transiciones del ciclo de vida | No |

MOB-01 comprueba nombre y precio en detalle, título de carrito, nombre, cantidad, cantidad total e importe; después completa login, dirección y pago, valida datos e importes en revisión y confirma el pedido. MOB-02 prepara su propio carrito y verifica los importes calculados al cambiar entre dos y una unidad. MOB-03 crea su producto y usa Remove; se espera por la pantalla vacía. MOB-04 actúa sin agregar al carrito y comprueba enabled/disabled, no solo el texto de cantidad.

La operación principal seleccionada es completar una compra en la demo. Se verifica confirmación y limpieza del carrito, no liquidación en una pasarela bancaria real. Los cuatro casos pasaron localmente en Android API 30; ampliar dispositivos y CI es trabajo posterior.
