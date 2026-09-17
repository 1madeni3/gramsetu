@echo off
title GramSetu - Bridging Villages to Markets
color 0A
echo ========================================================
echo    GramSetu - Rural Digital Marketplace
echo    Bridging Villages to Markets
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH!
    echo Please download and install Node.js (v18+) from https://nodejs.org
    pause
    exit /b 1
)

if not exist "client\dist\index.html" (
    echo [INFO] Production build not found. Compiling frontend...
    call npm run build
)

echo.
echo [INFO] Starting GramSetu Production Server on Windows...
echo [INFO] Open your browser to: http://localhost:5000
echo [INFO] Other phones/devices on your Wi-Fi can connect via your LAN IP!
echo [INFO] Press Ctrl+C to stop the server anytime.
echo.

node server/server.js
pause
