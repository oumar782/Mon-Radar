@echo off
title Mon Radar — npm run dev
chcp 65001 > nul
cd /d "%~dp0"
cls

echo ========================================================
echo        📡 MON RADAR — ASSISTANT IA POUR COMMERÇANTS
echo ========================================================
echo.

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ATTENTION] Node.js / npm n'est pas détecté dans votre PATH.
    echo.
    echo Aucun problème ! Ouverture directe de l'interface complète
    echo dans votre navigateur par défaut...
    echo.
    start "" "%~dp0index.html"
    pause
    exit /b
)

if not exist "node_modules\" (
    echo [1/2] Installation initiale des dépendances avec npm install...
    echo       (Patientez quelques secondes)...
    call npm install
)

echo [2/2] Lancement du serveur Vite sur http://localhost:5173/...
echo       (Le navigateur va s'ouvrir automatiquement dès que le serveur est prêt)
echo.
call npm run dev

pause
