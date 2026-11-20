@echo off
title Mon Radar — Assistant IA pour Commerçants
chcp 65001 > nul
cd /d "%~dp0"
cls

echo ========================================================
echo        📡 MON RADAR — ASSISTANT IA POUR COMMERÇANTS
echo                 "Vois venir avant les autres"
echo ========================================================
echo.

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [INFO] Node.js non détecté : ouverture directe de l'interface...
    start "" "%~dp0index.html"
    pause
    exit /b
)

if not exist "node_modules\" (
    echo [1/2] Installation des dépendances (npm install)...
    call npm install
)

echo [2/2] Lancement du serveur Vite sur http://localhost:5173/...
echo       (Votre navigateur s'ouvre automatiquement)
call npm run dev

pause
