# Dot-source: . ./mobile/scripts/use-local-android.ps1 (desde la raíz).
$repoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$portableSdk = Join-Path $repoRoot '.tools/android-sdk'
$portableJdk = Get-ChildItem (Join-Path $repoRoot 'api/.tools') -Directory -Filter 'jdk-*' -ErrorAction SilentlyContinue | Select-Object -First 1
if (Test-Path -LiteralPath $portableSdk) { $env:ANDROID_HOME = $portableSdk }
if ($portableJdk) { $env:JAVA_HOME = $portableJdk.FullName }
if (!$env:ANDROID_HOME -or !(Test-Path -LiteralPath $env:ANDROID_HOME)) { throw 'Configura ANDROID_HOME con tu Android SDK.' }
if (!$env:JAVA_HOME -or !(Test-Path -LiteralPath $env:JAVA_HOME)) { throw 'Configura JAVA_HOME con JDK 17.' }
$env:APPIUM_HOME = Join-Path $repoRoot 'mobile/.tools/appium'
$localAvds = Join-Path $repoRoot '.tools/avd'
if (Test-Path -LiteralPath $localAvds) { $env:ANDROID_AVD_HOME = $localAvds }
$env:PATH = "$env:JAVA_HOME/bin;$env:ANDROID_HOME/platform-tools;$env:ANDROID_HOME/emulator;$env:PATH"
Write-Host 'Android y Java configurados únicamente para esta terminal.'
