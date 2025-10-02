@echo off
echo Seeding hazard test data...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

REM Check if SQL Server container is running
docker compose ps sql-server | findstr "running" >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting SQL Server container...
    docker compose up -d sql-server
    echo Waiting for SQL Server to be ready...
    timeout /t 30 /nobreak > nul
)

REM Wait for SQL Server to be ready
echo Checking SQL Server connectivity...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -Q "SELECT 1" > nul 2>&1
if %errorlevel% neq 0 (
    echo SQL Server is not ready. Please ensure Docker is running and try again.
    pause
    exit /b 1
)

REM Execute the seed data script
echo Executing seed data script...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\seed-hazard-test-data.sql

if %errorlevel% equ 0 (
    echo.
    echo Seed data inserted successfully!
    echo 20 test hazard records have been added to the database.
    echo.
    echo You can now run the application and see the hazards in the UI.
) else (
    echo.
    echo Failed to insert seed data. Please check the error messages above.
    exit /b 1
)

echo.
pause