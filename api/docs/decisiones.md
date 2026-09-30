# Decisiones técnicas — API

## Riesgos y selección

Integridad de reserva y autorización son P0: pérdida/corrupción de datos y modificación ajena tienen impacto alto. API-01 recorre el ciclo de vida y consulta después de cada escritura. API-02 prueba PUT/PATCH/DELETE sin autorización y verifica que la reserva siga intacta; un 403 por sí solo no basta.

Se revisó documentación/código de Restful Booker y se ejecutaron escenarios reales. Contrato observado: POST 200, DELETE 201 y auth incorrecta 200 con `reason`. No imponer 201 para crear, 204 al borrar ni 401 al autenticar solo por convenciones REST. El GET sin Accept compatible devuelve 418; el cliente configura Accept y Content-Type globalmente.

## Arquitectura

Karate DSL con runner JUnit y Maven independiente; no requiere npm. Features por responsabilidad, contrato JSON reusable, helpers auth/cleanup y fábrica de datos. El CRUD es un único escenario transaccional, pero ningún escenario depende de otro. Un worker limita la carga del servicio público.

Esquema valida tipos, campos y formato de fecha; igualdad completa con el payload comprueba valores. PUT reemplaza apellido, precio y depósito. PATCH cambia solo additionalneeds, y el GET posterior debe mantener el resto. La validación es de persistencia **observable por API**, no de SQL ni durabilidad tras reinicio.

## Datos, limpieza e independencia

Cada reserva lleva `QA-<UUID>` y su propio ID; token por caso, no compartido. El ID se guarda antes de validar la respuesta para ejecutar limpieza aunque fallen asserts posteriores. afterScenario borra solo el ID creado y comprueba GET 404; el caso CRUD evita doble borrado mediante deleted. Nunca se usan IDs fijos ni se borran datos listados globalmente.

Límite: si POST se procesa pero se pierde la respuesta/ID, la limpieza ordinaria no puede garantizarse. Investigar usando el UUID registrado en la petición. V2: entorno aislado y recolector de datos propios por identificador de ejecución. No reintentar POST automáticamente: podría crear duplicados.

## Técnicas y reglas de negocio

Tabla verbo × autorización para 3 operaciones sin auth; particiones de token/credenciales válidas e inválidas; valores representativos 0/1 para precio y false/true para depósito. No se afirma que precio negativo esté prohibido: el contrato no define una validación de negocio completa. Fechas invertidas, campos omitidos y precios negativos quedan para exploración y acuerdo de expectativas. No escribir un test “espera 400” sin justificar la regla.

404 se comprueba sobre un ID recién eliminado, no un número arbitrario que podría existir. La búsqueda usa el nombre UUID y verifica inclusión del ID propio, evitando depender de cuántas reservas haya en el servidor.

## CI, diagnóstico y evidencia

PR: 4 smoke (CRUD + 3 verbos sin autorización). Merge/push y nightly/manual: 9 escenarios. Reporte Karate HTML con HTTP, JUnit por feature y Surefire para el runner. Guardar la carpeta completa. No hay retries que puedan ocultar un defecto. Distinguir indisponibilidad pública, reinicio de datos, fallo de contrato y error del cliente antes de cambiar expectativas.

El primer run devolvió 418 en algunos pasos por un header Accept de una sola petición. Se corrigió a `configure headers` global y se reejecutó. Los resultados finales son reales: 9/9. Los casos no se desactivaron para obtener verde.

## Exclusiones y V2

No se realizan carga, pentest, SQL ni negociación XML/URL-encoded completa. Se prioriza JSON, integridad y autorización. V2: entorno controlado, reglas de negocio pactadas, limpieza recuperable, contratos de consumidor, caducidad/renovación de tokens y más particiones. CI remoto pendiente de ejecutar antes de declarar entrega validada en Actions.

Fuentes: [documentación Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html) y [código fuente](https://github.com/mwinteringham/restful-booker). Credenciales publicadas de demo, sin datos personales.
