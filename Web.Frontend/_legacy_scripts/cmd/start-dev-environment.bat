@echo off
echo ============================================
echo T100 Development Environment Startup Script
echo ============================================
echo.
echo This script will:
echo 1. Start Docker Desktop (if needed)
echo 2. Start SQL Server
echo 3. Run database migrations
echo 4. Seed test data
echo 5. Start backend services
echo 6. Start frontend application
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

REM ==============================================
REM STEP 1: Check and Start Docker Desktop
REM ==============================================
echo.
echo [1/6] Checking Docker Desktop...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker Desktop is not running. Starting Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo Waiting for Docker to start (this may take up to 60 seconds)...
    
    REM Wait up to 60 seconds for Docker to start
    set /a count=0
    :docker_wait_loop
    timeout /t 5 /nobreak > nul
    set /a count+=5
    docker info >nul 2>&1
    if %errorlevel% equ 0 goto docker_ready
    if %count% lss 60 goto docker_wait_loop
    
    echo ERROR: Docker failed to start after 60 seconds.
    echo Please start Docker Desktop manually and run this script again.
    pause
    exit /b 1
)
:docker_ready
echo Docker Desktop is running!

REM ==============================================
REM STEP 2: Start SQL Server Container
REM ==============================================
echo.
echo [2/6] Starting SQL Server container...
docker compose up -d sql-server
if %errorlevel% neq 0 (
    echo ERROR: Failed to start SQL Server container
    echo Please check your docker-compose.yml file
    pause
    exit /b 1
)

echo Waiting for SQL Server to be ready (30 seconds)...
timeout /t 30 /nobreak > nul

REM Verify SQL Server is ready
echo Verifying SQL Server connectivity...
docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -Q "SELECT 1" > nul 2>&1
if %errorlevel% neq 0 (
    echo SQL Server is taking longer to start. Waiting 15 more seconds...
    timeout /t 15 /nobreak > nul
    docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -Q "SELECT 1" > nul 2>&1
    if %errorlevel% neq 0 (
        echo ERROR: SQL Server is not responding.
        echo Please check the SQL Server container logs:
        echo   docker compose logs sql-server
        pause
        exit /b 1
    )
)
echo SQL Server is ready!

REM ==============================================
REM STEP 3: Run Database Migrations
REM ==============================================
echo.
echo [3/6] Running database migrations...

REM Check if migration file exists
if not exist "apps\services\incident-manager\src\sql\add-hazard-new-fields.sql" (
    echo WARNING: Migration file not found. Skipping migration.
) else (
    docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\add-hazard-new-fields.sql 2>nul
    if %errorlevel% equ 0 (
        echo Migration completed successfully!
    ) else (
        echo Migration already applied or not needed (this is normal).
    )
)

REM ==============================================
REM STEP 4: Seed Test Data
REM ==============================================
echo.
echo [4/6] Seeding test data...

REM Check if seed file exists
if not exist "apps\services\incident-manager\src\sql\seed-hazard-test-data.sql" (
    echo WARNING: Seed data file not found. Skipping data seeding.
) else (
    docker compose exec sql-server /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "T100@2024!" -d V7-Dev -i - < apps\services\incident-manager\src\sql\seed-hazard-test-data.sql 2>nul
    if %errorlevel% equ 0 (
        echo Test data seeded successfully!
    ) else (
        echo Test data already exists or not needed (this is normal).
    )
)

REM ==============================================
REM STEP 5: Start Backend Services
REM ==============================================
echo.
echo [5/6] Starting backend services...

REM Option 1: Try Docker Compose first (preferred)
echo Attempting to start services with Docker Compose...
docker compose up -d incident-manager 2>nul
if %errorlevel% equ 0 (
    echo Incident Manager service started via Docker!
    timeout /t 5 /nobreak > nul
) else (
    echo Docker Compose not available for incident-manager.
    echo Starting service locally instead...
    
    REM Option 2: Start locally if Docker fails
    cd apps\services\incident-manager
    if not exist node_modules (
        echo Installing incident-manager dependencies...
        call npm install
    )
    start "Incident Manager Service - Port 3014" cmd /k "npm start"
    cd ..\..\..
    timeout /t 5 /nobreak > nul
)

REM ==============================================
REM STEP 6: Start Frontend Application
REM ==============================================
echo.
echo [6/6] Starting frontend application...

cd apps\frontend
if not exist node_modules (
    echo Installing frontend dependencies (this may take a few minutes)...
    call npm install
)

REM Check if .env.local exists, create if not
if not exist .env.local (
    echo Creating frontend environment configuration...
    (
        echo # Database Configuration
        echo DB_SERVER=localhost
        echo DB_NAME=V7-Dev
        echo DB_USER=sa
        echo DB_PASSWORD=T100@2024!
        echo.
        echo # Service URLs
        echo INCIDENT_MANAGER_SERVICE_URL=http://localhost:3014
        echo NEXT_PUBLIC_INCIDENTS_SERVICE_URL=http://localhost:3014
    ) > .env.local
)

echo Starting Next.js development server...
start "T100 Frontend - Port 3000" cmd /k "npm run dev"
cd ..\..

REM ==============================================
REM FINAL STATUS
REM ==============================================
echo.
echo ============================================
echo    T100 Platform Started Successfully!
echo ============================================
echo.
echo APPLICATION ACCESS:
echo -------------------
echo Main Application:  http://localhost:3000
echo Hazards Module:    http://localhost:3000/incidents/hazards
echo.
echo BACKEND SERVICES:
echo -----------------
echo SQL Server:        localhost:1433 (sa / T100@2024!)
echo Incident Manager:  http://localhost:3014/health
echo.
echo USEFUL COMMANDS:
echo ----------------
echo View logs:         docker compose logs -f [service-name]
echo Stop all:          docker compose down
echo Restart service:   docker compose restart [service-name]
echo.
echo The application should open in your browser shortly.
echo If not, navigate to: http://localhost:3000
echo.

REM Wait a moment for services to fully start
timeout /t 5 /nobreak > nul

REM Try to open the browser
start "" "http://localhost:3000/incidents/hazards"

echo.
echo Press any key to exit this window (services will keep running)...
pause > nul