@echo off
echo =========================================
echo T100 Platform - Complete System Startup
echo =========================================
echo.
echo This will start ALL essential services with correct ports
echo.

REM Navigate to root directory
cd /d "%~dp0"

echo =========================================
echo Installing Dependencies
echo =========================================
echo.

REM Install root dependencies if needed
if not exist node_modules (
    echo Installing root dependencies...
    call npm install --legacy-peer-deps
) else (
    echo Root dependencies already installed
)

REM Install frontend dependencies
echo.
echo Checking Frontend dependencies...
cd apps\frontend
if not exist node_modules (
    echo Installing Frontend dependencies...
    call npm install --legacy-peer-deps
) else (
    echo Frontend dependencies already installed
)
cd ..\..

REM Install service dependencies
echo.
echo =========================================
echo Starting Services (According to Port.md)
echo =========================================
echo.

REM Start Checklists Service (Port 3004)
echo Starting Checklists Service (Port 3004)...
cd apps\services\checklists-service
if not exist node_modules (
    call npm install --legacy-peer-deps
)
start "Checklists Service - Port 3004" cmd /k "npm start"
cd ..\..\..
timeout /t 2 >nul

REM Start Documents Service (Port 3006)
echo Starting Documents Service (Port 3006)...
cd apps\services\documents-service
if not exist node_modules (
    call npm install --legacy-peer-deps
)
start "Documents Service - Port 3006" cmd /k "npm start"
cd ..\..\..
timeout /t 2 >nul

REM Start Tasks Service (Port 3008)
echo Starting Tasks Service (Port 3008)...
cd apps\services\tasks-service
if not exist node_modules (
    call npm install --legacy-peer-deps
)
start "Tasks Service - Port 3008" cmd /k "npm start"
cd ..\..\..
timeout /t 2 >nul

REM Start Email Service (Port 3011)
echo Starting Email Service (Port 3011)...
cd apps\services\email-service
if not exist node_modules (
    call npm install --legacy-peer-deps
)
start "Email Service - Port 3011" cmd /k "npm start"
cd ..\..\..
timeout /t 2 >nul

REM Start Sys Admin Service (Port 3012)
echo Starting Sys Admin Service (Port 3012)...
cd apps\services\sys-admin-service
if not exist node_modules (
    call npm install --legacy-peer-deps
)
start "Sys Admin Service - Port 3012" cmd /k "npm start"
cd ..\..\..
timeout /t 2 >nul

REM Start Incident Manager (Port 3014)
echo Starting Incident Manager (Port 3014)...
cd apps\services\incident-manager
if not exist node_modules (
    call npm install --legacy-peer-deps
)
start "Incident Manager - Port 3014" cmd /k "npm start"
cd ..\..\..
timeout /t 2 >nul

REM Start Risk Assessments Service (Port 3015)
echo Starting Risk Assessments Service (Port 3015)...
cd apps\services\risk-assessments-service
if not exist node_modules (
    call npm install --legacy-peer-deps
)
start "Risk Assessments - Port 3015" cmd /k "npm start"
cd ..\..\..
timeout /t 2 >nul

REM Start Frontend (Port 3000) - Main UI
echo Starting Frontend (Port 3000)...
cd apps\frontend
start "Frontend - Port 3000" cmd /k "npm run dev"
cd ..\..

echo.
echo =========================================
echo T100 Platform Started Successfully!
echo =========================================
echo.
echo MAIN APPLICATION:
echo   http://localhost:3000
echo.
echo SERVICES RUNNING:
echo   - Frontend:          http://localhost:3000
echo   - Checklists:        http://localhost:3004/health
echo   - Documents:         http://localhost:3006/health
echo   - Tasks:             http://localhost:3008/health
echo   - Email:             http://localhost:3011/health
echo   - Sys Admin:         http://localhost:3012/health
echo   - Incident Manager:  http://localhost:3014/health
echo   - Risk Assessments:  http://localhost:3015/health
echo.
echo KEY FEATURES TO TEST:
echo   - Hazards:           http://localhost:3000/incidents/hazards
echo   - Risk Assessments:  http://localhost:3000/risk-assessments
echo   - Checklists:        http://localhost:3000/checklists
echo   - Documents:         http://localhost:3000/documents
echo   - Tasks:             http://localhost:3000/tasks
echo   - Admin Panel:       http://localhost:3000/admin
echo.
echo To stop all services, close all command windows
echo.
pause