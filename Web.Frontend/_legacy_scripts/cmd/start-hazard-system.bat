@echo off
echo ========================================
echo T100 Hazard System Setup
echo ========================================
echo.

REM Step 1: Check Docker
echo [1/4] Checking Docker Desktop...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker Desktop is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)
echo Docker Desktop is running ✓
echo.

REM Step 2: Start SQL Server
echo [2/4] Starting SQL Server container...
docker compose up -d sql-server
if %errorlevel% neq 0 (
    echo ERROR: Failed to start SQL Server
    pause
    exit /b 1
)
echo Waiting for SQL Server to be ready (30 seconds)...
timeout /t 30 /nobreak > nul
echo SQL Server started ✓
echo.

REM Step 3: Run Migration
echo [3/4] Running database migration...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\add-hazard-new-fields.sql
if %errorlevel% neq 0 (
    echo WARNING: Migration may have already been applied or failed
) else (
    echo Migration completed ✓
)
echo.

REM Step 4: Seed Test Data
echo [4/4] Seeding test data...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\seed-hazard-test-data.sql
if %errorlevel% neq 0 (
    echo WARNING: Seed data may already exist or failed
) else (
    echo Test data seeded ✓
)
echo.

REM Step 5: Start Services
echo Starting services...
docker compose up -d sql-server incident-manager
if %errorlevel% neq 0 (
    echo ERROR: Failed to start services
    pause
    exit /b 1
)
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Services running:
echo - SQL Server: localhost:1433
echo - Incident Manager: http://localhost:3014
echo.
echo To view logs: docker compose logs -f incident-manager
echo To stop: docker compose down
echo.
pause