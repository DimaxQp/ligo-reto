# Diseño de pruebas — API

P0: flujo o integridad crítica. P1: validación relevante. La tabla contiene únicamente los casos implementados para esta entrega; cada fila representa una ejecución por configuración.

**Total: 9 casos automatizados**: 4 escenarios individuales + 3 ejemplos de API-02 + 2 ejemplos de API-06. Los sufijos a/b/c identifican las filas de Examples en orden; el reporte Karate muestra el ID base y los parámetros de cada fila.

## API

Precondición: API pública disponible y credenciales demo. Cada caso mutante crea su reserva con UUID y elimina únicamente esa reserva. El runner verifica contenido, tipos y estado HTTP; cabeceras JSON en los puntos de contrato.

| ID | Escenario | Prioridad | Técnica | Automatizado |
|---|---|---|---|---|
| API-01 | Auth → POST → GET → PUT → GET → PATCH → GET → DELETE → GET 404 | P0 | Ciclo de estados, contrato y persistencia observable | Sí |
| API-02a | PUT sin autenticación: 403 y reserva intacta | P0 | Tabla de decisión verbo × autorización; ejemplo put | Sí |
| API-02b | PATCH sin autenticación: 403 y reserva intacta | P0 | Tabla de decisión verbo × autorización; ejemplo patch | Sí |
| API-02c | DELETE sin autenticación: 403 y reserva intacta | P0 | Tabla de decisión verbo × autorización; ejemplo delete | Sí |
| API-03 | DELETE con token inválido: 403 y reserva intacta | P1 | Partición de credencial inválida | Sí |
| API-04 | Filtrar por firstname/lastname propios devuelve ID creado | P1 | Partición coincidente, aislamiento de datos | Sí |
| API-05 | Credenciales incorrectas devuelven reason y no token | P1 | Partición inválida y contrato negativo | Sí |
| API-06a | Precio 0 y depósito false conservan sus valores tras GET | P1 | Frontera representativa 0 y partición booleana false | Sí |
| API-06b | Precio 1 y depósito true conservan sus valores tras GET | P1 | Frontera representativa 1 y partición booleana true | Sí |

API-06 son valores cercanos a cero, **no una afirmación de que el API prohíbe negativos**. No se inventa un límite máximo. El 404 usa un ID que acaba de eliminarse, evitando asumir que un número arbitrario no existe. El PUT cambia apellido, precio y depósito; PATCH cambia una sola propiedad y la igualdad completa detecta pérdida de los demás campos. No se confunde “status 200” con autenticación válida: API-05 exige exactamente `reason: Bad credentials`.

Selección: integridad y autorización antes que CRUD repetitivo de bajo valor.


## Fuera del alcance de esta entrega

Precio negativo, campos ausentes y fechas invertidas requieren explorar y acordar el resultado esperado; no se fuerza una expectativa 400 sin contrato. XML y URL encoded se excluyeron para priorizar integridad y autorización sobre representaciones alternativas. Estas ideas no forman parte de los 9 casos entregados.
