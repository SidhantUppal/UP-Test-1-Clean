@echo off
echo ==========================================
echo T100 Platform - Service Diagnostic Tool
echo ==========================================
echo.
echo This will test each service individually to identify issues
echo.

cd /d "%~dp0"

echo [TEST 1] Checking Node.js version...
node --version
echo.

echo [TEST 2] Checking if ports are in use...
echo Checking port 3000 (Frontend)...
netstat -an | findstr :3000 | findstr LISTENING
if %errorlevel% equ 0 (
    echo WARNING: Port 3000 is already in use!
) else (
    echo Port 3000 is available
)
echo.

echo [TEST 3] Testing Frontend startup...
echo.
cd apps\frontend
echo Current directory: %CD%
echo.
echo Checking for node_modules...
if exist node_modules (
    echo node_modules exists
    dir node_modules | find "File(s)"
) else (
    echo ERROR: node_modules not found! Run: npm install
)
cd ..\..
echo.

echo [TEST 4] Checking Incident Manager...
cd apps\services\incident-manager
if exist node_modules (
    echo node_modules exists in incident-manager
    dir package*.json 2>nul
) else (
    echo ERROR: node_modules not found in incident-manager!
)
cd ..\..\..
echo.

echo [TEST 5] Checking environment variables...
echo.
if exist .env (
    echo Root .env file exists
    findstr "AZURE_CLIENT_ID" .env >nul
    if %errorlevel% equ 0 (
        echo Azure AD settings found in root .env
    ) else (
        echo WARNING: Azure AD settings not found in root .env
    )
) else (
    echo ERROR: Root .env file not found!
)
echo.

if exist apps\frontend\.env.local (
    echo Frontend .env.local exists - GOOD!
) else (
    echo WARNING: Frontend .env.local not found
)
echo.

echo [TEST 6] Quick Frontend Test...
cd apps\frontend
echo Starting frontend for 5 seconds to check for errors...
start /B cmd /c "npm run dev 2>&1" > frontend-test.txt
timeout /t 5 >nul
taskkill /F /IM node.exe >nul 2>&1
echo.
echo First 10 lines of output:
type frontend-test.txt 2>nul | more +1
del frontend-test.txt 2>nul
cd ..\..

echo.
echo ==========================================
echo Diagnostic Summary:
echo ==========================================
echo.
echo Next steps:
echo 1. If node_modules are missing, run: npm install --legacy-peer-deps
echo 2. Try running: start-quick.bat
echo 3. If ports are blocked, check Task Manager for Node processes
echo.
pause