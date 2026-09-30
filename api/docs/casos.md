# Diseño de pruebas — API

P0: flujo/integridad crítica. P1: validación relevante. P2: cobertura adicional. Automatizado significa implementado; no necesariamente ejecutado.

## API

Precondición: API pública disponible y credenciales demo. Cada caso mutante crea su reserva con UUID y elimina únicamente esa reserva. El runner verifica contenido, tipos y estado HTTP; cabeceras JSON en los puntos de contrato.

| ID | Escenario | Prioridad | Técnica | Automatizado |
|---|---|---|---|---|
| API-01 | Auth → POST → GET → PUT → GET → PATCH → GET → DELETE → GET 404 | P0 | Ciclo de estados, contrato y persistencia observable | Sí |
| API-02 | PUT/PATCH/DELETE sin autenticación: 403 y reserva intacta | P0 | Tabla de decisión verbo × autorización, Outline (3 filas) | Sí |
| API-03 | DELETE con token inválido: 403 y reserva intacta | P1 | Partición de credencial inválida | Sí |
| API-04 | Filtrar por firstname/lastname propios devuelve ID creado | P1 | Partición coincidente, aislamiento de datos | Sí |
| API-05 | Credenciales incorrectas devuelven reason y no token | P1 | Partición inválida y contrato negativo | Sí |
| API-06 | Precio 0/1, depósito false/true mantienen valor tras GET | P1 | Valores frontera representativos y partición booleana | Sí |
| API-07 | Precio negativo, campos ausentes, fechas invertidas | P1 | Particiones inválidas y análisis de fronteras | No |
| API-08 | Content negotiation XML y URL encoded | P2 | Particiones de representación | No |

API-06 son valores cercanos a cero, **no una afirmación de que el API prohíbe negativos**. No se inventa un límite máximo. El 404 usa un ID que acaba de eliminarse, evitando asumir que un número arbitrario no existe. El PUT cambia apellido, precio y depósito; PATCH cambia una sola propiedad y la igualdad completa detecta pérdida de los demás campos. No se confunde “status 200” con autenticación válida: API-05 exige exactamente `reason: Bad credentials`.

Selección: integridad y autorización antes que CRUD repetitivo de bajo valor. API-07 requiere explorar y acordar resultado esperado; documentar aceptación de datos incorrectos como posible defecto, no forzar una expectativa 400 sin contrato.

