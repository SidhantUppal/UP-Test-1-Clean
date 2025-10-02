@echo off
echo Running hazard database migration...
echo.

REM Start Docker Compose if not already running
echo Starting Docker containers...
docker compose up -d sql-server
timeout /t 30 /nobreak > nul

REM Wait for SQL Server to be ready
echo Waiting for SQL Server to be ready...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -Q "SELECT 1" > nul 2>&1
if %errorlevel% neq 0 (
    echo SQL Server is not ready. Please ensure Docker is running and try again.
    exit /b 1
)

REM Execute the migration
echo Executing migration script...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\add-hazard-new-fields.sql

if %errorlevel% equ 0 (
    echo.
    echo Migration completed successfully!
    echo New hazard fields have been added to the database.
) else (
    echo.
    echo Migration failed! Please check the error messages above.
    exit /b 1
)

echo.
pause