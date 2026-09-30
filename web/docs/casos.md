# Diseño de pruebas — Web

P0: flujo/integridad crítica. P1: validación relevante. P2: cobertura adicional. Automatizado significa implementado; no necesariamente ejecutado.

## Web

Precondición: SauceDemo disponible, navegador/contexto limpio. Salvo WEB-02/03 se usa `standard_user` / `secret_sauce`.

| ID | Escenario | Prioridad | Técnica | Automatizado |
|---|---|---|---|---|
| WEB-01 | Comprar Backpack + Bike Light, validar unidades, subtotal calculado desde el catálogo, impuesto según tasa configurada total y confirmación | P0 | Transición de estados, caso de uso, consistencia de precios y regla tributaria independiente | Sí |
| WEB-02 | Login de locked_out_user debe denegarse y no mostrar inventario | P0 | Partición de equivalencia (bloqueado) | Sí |
| WEB-03 | Contraseña incorrecta no da acceso | P1 | Partición de equivalencia (credencial inválida) | Sí |
| WEB-04a/b/c | Un campo obligatorio vacío por prueba: nombre, apellido, código postal | P1 | Tabla de decisión reducida y datos parametrizados | Sí |
| WEB-05 | Quitar Backpack de carrito de dos; queda Bike Light y se recalculan subtotal, impuesto y total | P1 | Transición de estados e integridad de importes | Sí |
| WEB-06 | Cancelar primer paso de checkout conserva Backpack | P1 | Transición de estados | Sí |
| WEB-07 | Ordenamiento por precio/nombre | P2 | Particiones y propiedades de orden | No |
| WEB-08 | Intentar checkout sin productos | P1 | Partición vacío/no vacío | No |
| WEB-09 | Campos con solo espacios | P1 | Partición de entrada semánticamente vacía | No |

Procedimiento WEB-01: login → agregar dos productos → verificar carrito → completar entrega → comprobar resumen → Finish → confirmar mensaje. WEB-02/03: login con la fila negativa → verificar texto de error exacto y permanecer en login. WEB-04: agregar Backpack → checkout → completar los otros dos campos → Continue → error específico y misma URL. WEB-05: dos productos → remove Backpack → verificar el único producto y badge → checkout → total. WEB-06: un producto → checkout → Cancel → comprobar contenido y URL de carrito.

| Variante WEB-04 | Nombre | Apellido | Postal | Esperado |
|---|---|---|---|---|
| a | vacío | Prueba | 15001 | First Name is required |
| b | Ana | vacío | 15001 | Last Name is required |
| c | Ana | Prueba | vacío | Postal Code is required |

El camino con todos los campos válidos está cubierto por WEB-01. No se prueban las ocho combinaciones porque los primeros errores enmascaran campos posteriores; aislar una condición por fila permite diagnóstico directo. WEB-08/09 permanecen como análisis de reglas pendiente, no se cuentan como aprobados.

