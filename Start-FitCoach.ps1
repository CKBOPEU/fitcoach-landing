$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else { Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
if (!(Test-Path -LiteralPath $nodePath)) { throw 'Install Node.js 24+ or open a terminal with Node available.' }
$nextEntry = Join-Path $PSScriptRoot 'node_modules\next\dist\bin\next'
if (!(Test-Path -LiteralPath $nextEntry)) { throw 'Dependencies are missing. Run pnpm install --frozen-lockfile first.' }
$env:NEXT_TELEMETRY_DISABLED = '1'
if (!(Test-Path -LiteralPath (Join-Path $PSScriptRoot '.next\BUILD_ID'))) {
  & $nodePath $nextEntry build
  if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
}
Write-Host 'FitCoach: http://127.0.0.1:3100 (local only). Press Ctrl+C to stop.'
& $nodePath $nextEntry start --hostname 127.0.0.1 --port 3100
