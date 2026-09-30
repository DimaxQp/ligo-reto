param([switch]$Smoke)
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$localJdk = Get-ChildItem (Join-Path $root '.tools') -Directory -Filter 'jdk-*' -ErrorAction SilentlyContinue | Select-Object -First 1
if ($localJdk) {
  $env:JAVA_HOME = $localJdk.FullName
  $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
}
$maven = Join-Path $root '.tools/apache-maven-3.9.11/bin/mvn.cmd'
if (!(Test-Path -LiteralPath $maven)) { $maven = 'mvn.cmd' }
$arguments = @('-B', '-ntp', '-f', (Join-Path $root 'pom.xml'), 'test')
if ($Smoke) { $arguments += '-Dkarate.tags=@smoke' }
& $maven @arguments
exit $LASTEXITCODE

