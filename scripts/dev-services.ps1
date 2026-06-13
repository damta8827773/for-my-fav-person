# Starts all four polyglot backend services in separate windows (Windows dev helper).
# Usage:  pnpm services:win
$root = Split-Path -Parent $PSScriptRoot

Write-Host "Building Java gallery-api..." -ForegroundColor Cyan
Push-Location "$root\services\gallery-api"
javac Gallery.java
Pop-Location

$services = @(
    @{ Name = "love-api (Go)";       Dir = "$root\services\love-api";       Cmd = "go run ." },
    @{ Name = "content-api (Python)"; Dir = "$root\services\content-api";     Cmd = "python main.py" },
    @{ Name = "guestbook-api (PHP)";  Dir = "$root\services\guestbook-api";   Cmd = "php -S 0.0.0.0:8083 index.php" },
    @{ Name = "gallery-api (Java)";   Dir = "$root\services\gallery-api";     Cmd = "java Gallery" }
)

foreach ($s in $services) {
    Write-Host "Starting $($s.Name)..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$($s.Dir)'; $($s.Cmd)"
}

Write-Host "`nAll services launched. Now run:  pnpm dev" -ForegroundColor Yellow
