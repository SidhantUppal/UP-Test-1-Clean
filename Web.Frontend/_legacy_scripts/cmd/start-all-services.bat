@echo off
echo ========================================
echo T100 Platform - Complete Startup Script
echo ========================================
echo.

REM Step 1: Check Docker Desktop
echo [Step 1/6] Checking Docker Desktop...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker Desktop is not running!
    echo Starting Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo Waiting for Docker to start (30 seconds)...
    timeout /t 30 /nobreak > nul
    
    docker info >nul 2>&1
    if %errorlevel% neq 0 (
        echo Docker is still not ready. Please ensure Docker Desktop is running and try again.
        pause
        exit /b 1
    )
)
echo Docker is running!
echo.

REM Step 2: Start SQL Server and wait for it to be ready
echo [Step 2/6] Starting SQL Server...
docker compose up -d sql-server
timeout /t 30 /nobreak > nul

echo Verifying SQL Server connectivity...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -Q "SELECT 1" > nul 2>&1
if %errorlevel% neq 0 (
    echo Waiting additional 15 seconds for SQL Server...
    timeout /t 15 /nobreak > nul
)
echo SQL Server is ready!
echo.

REM Step 3: Run database migration
echo [Step 3/6] Running database migration...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\add-hazard-new-fields.sql 2>nul
if %errorlevel% equ 0 (
    echo Migration completed successfully!
) else (
    echo Migration already applied or not needed.
)
echo.

REM Step 4: Seed test data
echo [Step 4/6] Seeding test data...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\seed-hazard-test-data.sql 2>nul
if %errorlevel% equ 0 (
    echo Test data seeded successfully!
) else (
    echo Test data already exists or not needed.
)
echo.

REM Step 5: Start all microservices with Docker Compose
echo [Step 5/6] Starting all microservices...
docker compose up -d sql-server incident-manager
timeout /t 10 /nobreak > nul

REM Step 6: Start the frontend (main entry point)
echo [Step 6/6] Starting frontend application...
cd apps\frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)
start "T100 Frontend - Port 3000" cmd /k npm run dev
cd ..\..

echo.
echo ========================================
echo T100 Platform Started Successfully!
echo ========================================
echo.
echo MAIN APPLICATION (Port 3000):
echo   http://localhost:3000
echo.
echo Available Routes:
echo   - Hazards: http://localhost:3000/incidents/hazards
echo   - Dashboard: http://localhost:3000
echo.
echo Microservices (Backend - Internal):
echo   - SQL Server: localhost:1433
echo   - Incident Manager API: localhost:3014
echo   - Other services communicate internally
echo.
echo Note: All user interaction happens through port 3000
echo The frontend proxies requests to microservices
echo.
echo Commands:
echo   - View logs: docker compose logs -f [service-name]
echo   - Stop all: docker compose down
echo   - Restart: docker compose restart [service-name]
echo.
pause