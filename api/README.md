# API — reservas Restful Booker

Módulo API del repositorio común, con Karate DSL + JUnit/Maven. Valida autenticación, contrato, persistencia observable, actualización parcial/total, búsqueda y protección de operaciones. No requiere Node, Web ni Mobile.

## Requisitos y ejecución

JDK 17, Maven 3.9.11 probado, Karate 1.5.1. Definir `JAVA_HOME` y disponer de `java`/`mvn` en PATH. Desde la carpeta **api/**:

```sh
mvn -B -ntp test
mvn -B -ntp test -Dkarate.tags=@smoke
```

La primera ejecución descarga dependencias desde Maven Central. En Windows puede utilizarse `./scripts/run-api.ps1` o `./scripts/run-api.ps1 -Smoke`; utiliza JDK/Maven locales de `.tools` si existen, o Maven del PATH. Esta máquina tiene herramientas portátiles en `.tools`, ignoradas por Git; no son necesarias si Java/Maven ya están instalados.

| Variable opcional | Valor por defecto |
|---|---|
| `API_BASE_URL` | `https://restful-booker.herokuapp.com` |
| `BOOKER_USERNAME` | `admin` |
| `BOOKER_PASSWORD` | `password123` |

Desde la raíz común también puedes usar npm run api:test o npm run api:smoke. Karate no carga .env; configura variables del proceso. También se admite `mvn test -DbaseUrl=URL`. Las credenciales anteriores son públicas de la demo. Los reportes contienen tráfico y tokens; revisar su contenido si se usan credenciales privadas.

## Estructura y diseño

```text
src/test/java/qa/           Runner JUnit
src/test/resources/
  features/                Casos de negocio
  helpers/                 Autenticación y limpieza
  schemas/                 Contrato JSON
  karate-config.js          Entorno y fábrica UUID
docs/                      Casos, trazabilidad y decisiones
evidence/                  Baseline de ejecución
../.github/workflows/      CI común: job api
```

[Casos](docs/casos.md) · [Trazabilidad](docs/trazabilidad.md) · [Decisiones](docs/decisiones.md) · [Evidencias](evidence/README.md).

## Reportes

Abrir `target/karate-reports/karate-summary.html`; conserva pasos, HTTP y asserts. Karate genera JUnit/XML y Cucumber JSON por feature. Surefire informa 1 test Java porque el runner invoca la suite; el resultado real es **9 escenarios Karate**. Los reportes anteriores se archivan por Karate dentro de target; no se versionan. `evidence/baseline` conserva el resumen de esta validación.

## CI/CD

Publicar la raíz común que contiene web, api y mobile. El job api de [qa.yml](../.github/workflows/qa.yml) instala JDK 17 y utiliza Maven del runner. PR: 4 smoke (CRUD y PUT/PATCH/DELETE sin auth). Push main/master: 9 escenarios. Nightly 03:00 Lima y manual: 9 escenarios. Artifacts de `target/karate-reports` y `target/surefire-reports` se conservan 14 días, incluso ante fallo. Configurar `api` como check requerido después de publicar.

## Estado y límites

9/9 escenarios aprobados contra el servicio público. Workflow todavía no ejecutado en GitHub. No se dispone de acceso a base de datos: GET posterior valida persistencia por API, no durabilidad física. No se realizan pruebas de carga. El servidor compartido puede reiniciarse y otros usuarios pueden interferir. No se borran IDs fijos ni reservas ajenas; cada escenario crea su propia reserva con UUID.
