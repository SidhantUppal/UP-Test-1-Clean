@echo off
echo Starting V7 Portal development services...

echo Starting incident service on port 3014...
start "Incident Service" cmd /k "cd apps\services\incident-manager && npm start"

timeout /t 3 /nobreak > nul

echo Starting frontend on port 3000...
start "Frontend" cmd /k "cd apps\frontend && npm run dev"

echo All services started!
echo Incident Service: http://localhost:3014
echo Frontend: http://localhost:3000
echo.
echo Close the terminal windows to stop services
pause