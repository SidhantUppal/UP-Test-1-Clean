@echo off
echo Starting T100 Services...

REM Start Incident Manager Service
echo Starting Incident Manager Service on port 3014...
cd apps\services\incident-manager
start "Incident Manager Service" cmd /k npm start
cd ..\..\..

REM Wait a moment for service to start
timeout /t 2 /nobreak > nul

REM Start Checklists Service
echo Starting Checklists Service on port 3004...
cd apps\services\checklists-service
start "Checklists Service" cmd /k npm run dev
cd ..\..\..

REM Wait a moment for service to start
timeout /t 2 /nobreak > nul

REM Start Documents Service
echo Starting Documents Service on port 3005...
cd apps\services\documents-service
start "Documents Service" cmd /k npm start
cd ..\..\..

echo.
echo Services are starting...
echo.
echo Service URLs:
echo - Frontend: http://localhost:3000
echo - Checklists: http://localhost:3004
echo - Documents: http://localhost:3005
echo - Incident Manager: http://localhost:3014
echo.
echo Close the service windows to stop the services.
pause