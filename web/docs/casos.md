# Diseño de pruebas — Web

P0: flujo o integridad crítica. P1: validación relevante. La tabla contiene únicamente los casos implementados para esta entrega; cada fila representa una ejecución por configuración.

**Total: 8 casos automatizados**, generados por 6 Scenario Outlines. WEB-04 aporta tres filas de ejemplos; cada uno de los otros cinco outlines aporta una. La regresión en Chromium y Firefox produce 16 ejecuciones de estos mismos 8 casos.

## Web

Precondición: SauceDemo disponible, navegador/contexto limpio. Salvo WEB-02/03 se usa `standard_user` / `secret_sauce`.

| ID | Escenario | Prioridad | Técnica | Automatizado |
|---|---|---|---|---|
| WEB-01 | Comprar Backpack + Bike Light, validar unidades, subtotal calculado desde el catálogo, impuesto según tasa configurada, total y confirmación | P0 | Transición de estados, caso de uso, consistencia de precios y regla tributaria independiente | Sí |
| WEB-02 | Login de locked_out_user debe denegarse y no mostrar inventario | P0 | Partición de equivalencia (bloqueado) | Sí |
| WEB-03 | Contraseña incorrecta no da acceso | P1 | Partición de equivalencia (credencial inválida) | Sí |
| WEB-04a | Nombre vacío: impide avanzar y muestra First Name is required | P1 | Tabla de decisión reducida; entrada obligatoria vacía | Sí |
| WEB-04b | Apellido vacío: impide avanzar y muestra Last Name is required | P1 | Tabla de decisión reducida; entrada obligatoria vacía | Sí |
| WEB-04c | Código postal vacío: impide avanzar y muestra Postal Code is required | P1 | Tabla de decisión reducida; entrada obligatoria vacía | Sí |
| WEB-05 | Quitar Backpack de carrito de dos; queda Bike Light y se recalculan subtotal, impuesto y total | P1 | Transición de estados e integridad de importes | Sí |
| WEB-06 | Cancelar primer paso de checkout conserva Backpack | P1 | Transición de estados | Sí |

Procedimiento WEB-01: login → agregar dos productos → verificar carrito → completar entrega → comprobar resumen → Finish → confirmar mensaje. WEB-02/03: login con la fila negativa → verificar texto de error exacto y permanecer en login. WEB-04: agregar Backpack → checkout → completar los otros dos campos → Continue → error específico y misma URL. WEB-05: dos productos → remove Backpack → verificar el único producto y badge → checkout → total. WEB-06: un producto → checkout → Cancel → comprobar contenido y URL de carrito.

| Variante WEB-04 | Nombre | Apellido | Postal | Esperado |
|---|---|---|---|---|
| a | vacío | Prueba | 15001 | First Name is required |
| b | Ana | vacío | 15001 | Last Name is required |
| c | Ana | Prueba | vacío | Postal Code is required |

El camino con todos los campos válidos está cubierto por WEB-01. No se prueban las ocho combinaciones porque los primeros errores enmascaran campos posteriores; aislar una condición por fila permite diagnóstico directo.


## Fuera del alcance de esta entrega

Se excluyeron ordenamiento por precio/nombre para priorizar la compra y la integridad del carrito; checkout sin productos y campos con solo espacios requieren completar el análisis del comportamiento esperado. Estas ideas no forman parte de los 8 casos entregados ni se cuentan como automatizadas.
