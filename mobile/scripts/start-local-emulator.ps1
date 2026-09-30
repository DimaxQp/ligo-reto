param([string]$Avd = 'qa_api30', [int]$Port = 5556)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'use-local-android.ps1')
$emulatorPath = Join-Path $env:ANDROID_HOME 'emulator/emulator.exe'
$adbPath = Join-Path $env:ANDROID_HOME 'platform-tools/adb.exe'
$available = & $emulatorPath -list-avds
if ($Avd -notin $available) { throw "No existe el AVD $Avd. Créalo con Android Studio o avdmanager." }
$env:ANDROID_UDID = "emulator-$Port"
$devices = & $adbPath devices
if (!($devices -match "^$($env:ANDROID_UDID)\s+device")) {
  $logDirectory = Join-Path (Split-Path $PSScriptRoot -Parent) 'evidence'
  New-Item -ItemType Directory -Force $logDirectory | Out-Null
  Start-Process -FilePath $emulatorPath -WindowStyle Hidden -ArgumentList @('-avd', $Avd, '-port', $Port, '-no-window', '-no-audio', '-no-snapshot', '-no-boot-anim', '-gpu', 'swiftshader_indirect', '-memory', '2048') -RedirectStandardOutput (Join-Path $logDirectory 'emulator.log') -RedirectStandardError (Join-Path $logDirectory 'emulator-error.log') | Out-Null
}
$deadline = (Get-Date).AddMinutes(3)
do {
  $boot = & $adbPath -s $env:ANDROID_UDID shell getprop sys.boot_completed 2>$null
  if ($boot -match '^1') { break }
  Start-Sleep -Seconds 2
} while ((Get-Date) -lt $deadline)
if ($boot -notmatch '^1') { throw 'Android no completó el arranque. Revisa evidence/emulator-error.log.' }
& $adbPath -s $env:ANDROID_UDID shell settings put global window_animation_scale 0
& $adbPath -s $env:ANDROID_UDID shell settings put global transition_animation_scale 0
& $adbPath -s $env:ANDROID_UDID shell settings put global animator_duration_scale 0
Write-Host "Android disponible en $env:ANDROID_UDID. Ejecuta npm run mobile:test desde la raíz."
