# Decisiones técnicas — Mobile

## Riesgo y alcance

Prioridad a selección/cantidad/importes del carrito: un producto equivocado o total erróneo bloquea la confianza en la compra. MOB-01 es el flujo principal: catálogo → detalle → dos unidades → carrito → login → dirección → pago → revisión → confirmación → carrito vacío. MOB-02/03 modifican/eliminan; MOB-04 cubre frontera 0/1 y habilitación del botón.

El E2E completa dirección y pago de la demo con datos ficticios y valida la confirmación. Quedan fuera los negativos exhaustivos de formularios y la integración con pasarelas bancarias reales.

## Exploración y limitación real

Se inspeccionaron layouts, strings y listeners de la release 2.2.0, commit `36b012eecdf6a2b488b9504e16b3d0c3ca9a0e7b`. APK build 25 descargado y SHA-256 verificado. Se completó la ejecución local: 4/4 casos aprobados en Pixel 2, Android 11 / API 30. El bloqueo inicial de SDK se resolvió con herramientas portátiles y JDK 17; no se cambió Java global.

Hallazgos del código: productIV es clicable y titleTV no; quantity en detalle baja a cero y deshabilita Add, pero no a negativo; eliminar carrito bloquea intencionalmente UI durante 5 segundos. El comentario fuente dice 2 segundos, pero la operación usa 5000 ms. Se espera condición hasta 15 s, no se agrega sleep fijo.

## Arquitectura y datos

Appium/UiAutomator2 + WebdriverIO/Mocha + TypeScript con Screen Object. El test expresa intención; cada pantalla encapsula acciones y aserciones, y su clase de locators contiene los selectores. Módulo npm con dependencias propias dentro del repositorio común. No se añade Gherkin porque aquí generaría otra capa sin necesidad de negocio.

Un worker y reinstalación/sesión nueva por test mediante fullReset. Evita heredar cantidades, login o memoria incluso cuando el anterior falla. Coste: ejecución más lenta. App, locale en-US y emulador CI API 30 fijados. El precio se captura en detalle antes de agregar. El total esperado se calcula en centavos por cantidad, y se comprueban nombre y cantidad. Esto verifica consistencia; no detecta un precio inicial incorrecto sin una fuente independiente.

## Localizadores

Accessibility ID para acciones únicas (View cart, Tap to add product to cart). Resource ID para valores. Producto de catálogo se ubica por resource ID + título y `fromParent` a su imagen; evita índices y coordenadas, y se contrastó con la jerarquía runtime. Selectores centralizados, sin XPath absoluto. Si cambia APK/idioma, revalidar selectores; un checksum nuevo no implica compatibilidad automática.

## Flakiness, reportes y CI

Sin sleeps ni retries de test. Esperas hasta condición y autoespera WDIO. Errores se investigan con captura, XML y logs Appium/WDIO; CI extrae logcat antes de apagar el emulador. Una sesión que no llega a arrancar no tiene screenshot. No confundir setup failure con fallo funcional.

PR: MOB-01 smoke. Merge/push y nightly/manual: 4 casos en emulador x86_64 API 30. El job mobile vive en el workflow común de la raíz y se ejecuta sin depender de los otros jobs. APK se descarga con checksum comprobado; se usa un emulador nuevo en cada job y se limita duración. Aún no se ha ejecutado en GitHub.

## Dependencias y V2

npm audit reporta vulnerabilidades transitivas en extract-zip y serialize-javascript propagadas a herramientas WDIO/Mocha. No ejecutar `audit fix --force` sin revisar: propone degradaciones incompatibles. Solo se descargan artefactos oficiales fijados, y el APK se verifica. Esto no elimina los avisos; se conservan en evidencia para revisar actualización/mitigación.

Primero completar la ejecución remota de Actions y ampliar el baseline más allá de un dispositivo. Después negativos de checkout, segundo nivel Android/resolución, rotación/restauración, métricas de flake rate y gestión de versiones/acciones CI por SHA. No ampliar antes de contar con baseline estable.

Fuentes: [release 2.2.0](https://github.com/saucelabs/my-demo-app-android/releases/tag/2.2.0), [fuente fijada](https://github.com/saucelabs/my-demo-app-android/tree/36b012eecdf6a2b488b9504e16b3d0c3ca9a0e7b), [WDIO con Appium](https://webdriver.io/docs/appium/) y [requisitos Appium](https://appium.io/docs/en/latest/quickstart/requirements/).

## Hallazgos de ejecución Android

La primera ejecución mostró que la imagen ocupa la pantalla y deja precio/controles fuera del viewport. DetailScreen desplaza el ScrollView hasta cartBt mediante un UiScrollable definido en DetailLocators; no usa coordenadas. El XML real confirmó el texto Items con mayúscula. Tras corregir ambas expectativas, la suite completa pasó: 4/4. No se añadieron sleeps ni retries para ocultar los fallos.

## Checkout E2E

MOB-01 continúa hasta Checkout Complete y después comprueba el carrito vacío. Dirección, pago, revisión y confirmación tienen Screen Object y locators propios. Los botones y campos fuera de pantalla se alcanzan con scroll por resource ID. En revisión la aplicación oculta el selector de cantidad; se valida el total de unidades, además del producto, precio y total monetario. Se verifica la tarjeta con el formato espaciado mostrado por la demo. La tarifa esperada de envío se configura con MOBILE_SHIPPING_CENTS (599 por defecto); no se deduce del total mostrado. Credenciales públicas y tarjeta ficticia en data/checkout-data.ts; sin transacción bancaria real.
