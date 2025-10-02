@echo off
echo =========================================
echo Starting Essential T100 Services
echo =========================================
echo.
echo This will start:
echo - Incident Manager (Port 3014) - For Hazards
echo - Risk Assessments (Port 3013) - For Fire/PAS79/Martyns Law
echo - Tasks Service (Port 3007) - For Task Management
echo - Frontend (Port 3000) - Main UI
echo.
echo Press any key to continue...
pause >nul

echo.
echo Starting Incident Manager Service (Hazards)...
start "Incident Manager - Port 3014" cmd /k "cd apps\services\incident-manager && echo Incident Manager Service (Port 3014) && npm start"

timeout /t 2 >nul

echo Starting Risk Assessments Service...
start "Risk Assessments - Port 3013" cmd /k "cd apps\services\risk-assessments-service && echo Risk Assessments Service (Port 3013) && npm start"

timeout /t 2 >nul

echo Starting Tasks Service...
start "Tasks - Port 3007" cmd /k "cd apps\services\tasks-service && echo Tasks Service (Port 3007) && npm start"

timeout /t 3 >nul

echo Starting Frontend...
start "Frontend - Port 3000" cmd /k "echo Frontend (Port 3000) && npm run dev"

echo.
echo =========================================
echo All essential services started!
echo =========================================
echo.
echo Frontend: http://localhost:3000
echo Hazards API: http://localhost:3014/api/hazards
echo Risk API: http://localhost:3013/api/risk-assessments
echo Tasks API: http://localhost:3007/api/tasks
echo.
echo To test recovered features:
echo - Fire Assessments: http://localhost:3000/risk-assessments/new
echo - Hazards: http://localhost:3000/incidents/hazards
echo - Hazard Reports: http://localhost:3000/incidents/hazards/reports
echo.
echo Press any key to exit this window...
pause >nul