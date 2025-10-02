@echo off
echo ========================================
echo Stopping T100 Development Environment
echo ========================================
echo.

echo Stopping Docker containers...
docker compose down

echo.
echo All Docker services have been stopped.
echo.
echo Note: Frontend and any locally running services need to be
echo stopped manually by closing their terminal windows.
echo.
pause