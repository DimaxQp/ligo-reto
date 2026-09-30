# Mobile — carrito My Demo App Android

Módulo Mobile del repositorio común, con Appium + WebdriverIO + TypeScript. Cubre producto, detalle, cantidades, carrito, login, dirección, pago de prueba, revisión y confirmación del pedido. Sus dependencias permanecen en mobile/ y el CI se configura en la raíz común.

**Estado:** 4/4 tests aprobados en emulador Pixel 2 con Android 11 / API 30, APK 2.2.0 build 25. TypeScript y hash del APK verificados. La primera ejecución en GitHub Actions aprobó.

## Requisitos

Node 24.12.0, JDK 17, Android SDK y platform-tools, emulador API 30 o teléfono autorizado. Appium 3.8.0, driver UiAutomator2 8.7.0, WDIO 9.32.0 (globals 9.31.3), TypeScript 5.9.3, APK 2.2.0 build 25. El APK está fijado por URL y SHA-256 en `app-lock.json`.

Definir `ANDROID_HOME`, `JAVA_HOME`, y añadir `platform-tools`/`emulator` al PATH. Iniciar un emulador en inglés. `adb devices -l` debe mostrar un dispositivo en estado `device`; usar `ANDROID_UDID` si hay varios.

Desde la carpeta **mobile/**:

```sh
npm ci
npm run typecheck
npm run app:download
npm run driver:install
npx appium driver doctor uiautomator2
npm run test:smoke
npm test
```

En PowerShell puede utilizarse `npm.cmd`/`npx.cmd` si se bloquean los scripts `.ps1`. WDIO inicia y detiene Appium en `127.0.0.1:4723`; el puerto debe estar libre. Cada test reinstala la app demo mediante `fullReset`: usar un dispositivo en el que no importe perder sus datos de esta app.

El módulo no carga .env; define estas variables en el proceso. Desde la raíz común, npm run mobile:test ejecuta la suite.

| Variable opcional | Uso |
|---|---|
| `ANDROID_UDID` | Identificador exacto de adb |
| `ANDROID_DEVICE_NAME` | Nombre descriptivo |
| `ANDROID_APP` | Ruta absoluta alternativa; revalidar selectores si cambia versión |
| `APPIUM_HOME` | Carpeta de drivers Appium; por defecto la del usuario |

Para aislar drivers al proyecto: PowerShell `$env:APPIUM_HOME = "$PWD/.tools/appium"`; Bash `export APPIUM_HOME="$PWD/.tools/appium"`. Definirlo **antes de instalar driver y antes de ejecutar**.

## Estructura

```text
screens/                   Acciones y aserciones por pantalla
locators/                  Clase de localizadores por pantalla
tests/                     Escenarios Mocha
scripts/                   APK con hash y ejecución CI
app-lock.json              Fuente y checksum del APK
wdio.conf.ts               Capacidades, servicio, hooks, reportes
docs/                      Casos, trazabilidad y decisiones
evidence/                  Reportes y diagnóstico baseline
../.github/workflows/      CI común: job mobile
```

[Casos](docs/casos.md) · [Trazabilidad](docs/trazabilidad.md) · [Decisiones](docs/decisiones.md) · [Evidencias](evidence/README.md).

## Evidencia

`evidence/` recibe captura PNG y jerarquía XML al terminar cada caso, JSON de estado, JUnit y logs WDIO/Appium. El script CI captura logcat antes de apagar el emulador. Un error de creación de sesión solo produce logs, no una captura ficticia. No se genera video automáticamente; las capturas son suficientes para esta suite, y la presentación narrada es un entregable separado.

## CI/CD

Publicar la raíz común que contiene web, api y mobile. El job mobile de [qa.yml](../.github/workflows/qa.yml) configura Node/JDK, driver, APK con checksum y Android API 30 x86_64. PR: MOB-01 smoke. Push main/master, nightly 03:00 Lima y ejecución manual: 4 casos. Sube artifacts durante 14 días aun con fallos. No usa secretos Sauce Labs. La primera ejecución real en GitHub aprobó. Configurar `mobile` como check requerido es una mejora posterior a validar CI.

## Límites

MOB-01 completa el checkout de la aplicación demo y comprueba que el carrito quede vacío al volver al catálogo. Usa una tarjeta de prueba, sin cobros reales. Selectores contrastados con el código y el XML runtime de los cuatro casos. Una sola versión Android/idioma; ampliar después de obtener baseline estable. Se preparó un SDK local y Appium Doctor ya no informa correcciones obligatorias. npm informa dependencias transitivas vulnerables en herramientas WDIO/Mocha; consultar la evidencia de audit y decisiones antes de uso fuera de esta demo.

## Entorno local preparado en Windows

En esta copia se instalaron herramientas Android portátiles bajo .tools/android-sdk en la raíz común y un AVD qa_api30 bajo .tools/avd. No se versionan. JDK 17 permanece en api/.tools y los drivers en mobile/.tools/appium.

Desde la raíz, configura solo la terminal actual e inicia el emulador sin ventana:

```powershell
. ./mobile/scripts/start-local-emulator.ps1
npm run mobile:test
adb -s emulator-5556 emu kill
```

El primer comando comprueba el AVD, espera el arranque y desactiva animaciones. El último detiene el emulador al terminar. Para trabajar con otro AVD, pasa -Avd NOMBRE y -Port PUERTO. Si Android ya está iniciado, puedes configurar la terminal con:

```powershell
. ./mobile/scripts/use-local-android.ps1
$env:ANDROID_UDID = 'emulator-5556'
npm --prefix mobile run driver:doctor
npm run mobile:test
```

En un clon nuevo instala Android SDK desde las [herramientas oficiales](https://developer.android.com/studio#command-tools), selecciona JDK 17 y crea un AVD API 30 google_apis x86_64. El helper utiliza el SDK portable si existe; de lo contrario conserva ANDROID_HOME. Si utilizas el helper para aislar APPIUM_HOME, ejecútalo también antes de npm --prefix mobile run driver:install.

Con sdkmanager en PATH, los paquetes del entorno utilizado son:

```sh
sdkmanager "platform-tools" "emulator" "platforms;android-30" "build-tools;30.0.3" "system-images;android-30;google_apis;x86_64"
avdmanager create avd --name qa_api30 --package "system-images;android-30;google_apis;x86_64" --device pixel_2
```

Revisa y acepta las licencias que presente sdkmanager. El emulador requiere aceleración disponible; consulta la [guía oficial de Android](https://developer.android.com/studio/run/emulator-acceleration).

## Compra completa (MOB-01)

Ejecuta npm run mobile:smoke desde la raíz con Android iniciado. El caso selecciona dos unidades, captura el precio, verifica el carrito, inicia sesión y completa dirección y pago con datos ficticios. Antes de Place Order compara producto, cantidad, precio unitario, dirección, titular, número de tarjeta de prueba y vencimiento; además verifica envío y total calculado. Finalmente comprueba Checkout Complete, el mensaje de agradecimiento y el carrito vacío tras Continue Shopping.

Cada pantalla tiene su clase en screens/ y sus localizadores en locators/: login, shipping, payment, review y confirmation. data/checkout-data.ts contiene exclusivamente datos de demo. Las variables opcionales MOBILE_USERNAME y MOBILE_PASSWORD permiten cambiar la cuenta; MOBILE_SHIPPING_CENTS define la tarifa esperada (599 centavos en esta release). El precio de los productos se obtiene durante la prueba.

Se guardan capturas de dirección, pago, revisión y confirmación en evidence/checkout/, además de la captura, XML y resultado final del caso. Las imágenes de pago muestran solo datos ficticios; no introduzcas tarjetas reales.
