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
    echo.
    echo Attempting to start frontend (will timeout after 10 seconds)...
    timeout /t 1 >nul
    
    REM Try to start and capture any errors
    start /B cmd /c "npm run dev 2>&1 | findstr /V \"Listening\" > frontend-error.log"
    timeout /t 10 >nul
    
    REM Kill the process
    taskkill /F /FI "WINDOWTITLE eq Frontend*" >nul 2>&1
    
    echo.
    echo Checking for errors...
    if exist frontend-error.log (
        type frontend-error.log | head -20
        del frontend-error.log
    )
) else (
    echo ERROR: node_modules not found! Run: npm install
)
cd ..\..
echo.

echo [TEST 4] Checking Incident Manager...
cd apps\services\incident-manager
if exist node_modules (
    echo node_modules exists
    dir package*.json 2>nul
) else (
    echo ERROR: node_modules not found!
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
    echo Frontend .env.local exists
) else (
    echo WARNING: Frontend .env.local not found (now created)
)
echo.

echo ==========================================
echo Diagnostic Summary:
echo ==========================================
echo.
echo 1. Check if any Node processes are running in Task Manager
echo 2. Close VS Code if it's open (can lock files)
echo 3. Try running: start-quick.bat
echo 4. If that fails, check the error messages above
echo.
echo Common fixes:
echo - Port in use: Kill Node processes in Task Manager
echo - Missing modules: Run 'npm install' in each service directory
echo - Permission errors: Run as Administrator
echo.
pause