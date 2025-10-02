@echo off
echo =========================================
echo T100 Platform - Quick Start (No Install)
echo =========================================
echo.
echo Starting services WITHOUT installing dependencies
echo Make sure you've run npm install first!
echo.

REM Navigate to root directory
cd /d "%~dp0"

REM Start core services in order of importance
echo Starting Frontend (Port 3000)...
start "Frontend - Port 3000" cmd /k "cd apps\frontend && npm run dev"
timeout /t 3 >nul

echo Starting Incident Manager (Port 3014)...
start "Incident Manager - Port 3014" cmd /k "cd apps\services\incident-manager && npm start"
timeout /t 2 >nul

echo Starting Risk Assessments (Port 3015)...
start "Risk Assessments - Port 3015" cmd /k "cd apps\services\risk-assessments-service && npm start"
timeout /t 2 >nul

echo Starting Tasks Service (Port 3008)...
start "Tasks - Port 3008" cmd /k "cd apps\services\tasks-service && npm start"
timeout /t 2 >nul

echo Starting Checklists Service (Port 3004)...
start "Checklists - Port 3004" cmd /k "cd apps\services\checklists-service && npm start"
timeout /t 2 >nul

echo Starting Documents Service (Port 3006)...
start "Documents - Port 3006" cmd /k "cd apps\services\documents-service && npm start"
timeout /t 2 >nul

echo Starting Sys Admin Service (Port 3012)...
start "Sys Admin - Port 3012" cmd /k "cd apps\services\sys-admin-service && npm start"
timeout /t 2 >nul

echo Starting Email Service (Port 3011)...
start "Email - Port 3011" cmd /k "cd apps\services\email-service && npm start"

echo.
echo =========================================
echo All Services Started!
echo =========================================
echo.
echo Main Application: http://localhost:3000
echo.
echo Test these features:
echo - Hazards: http://localhost:3000/incidents/hazards
echo - Risk Assessments: http://localhost:3000/risk-assessments
echo - Checklists: http://localhost:3000/checklists
echo - Documents: http://localhost:3000/documents
echo.
pause