# PowerShell Script to Fix Database Connection for Incident API
# Run this script as Administrator for best results

Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "      Incident API Database Connection Diagnostic & Fix Tool      " -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host ""

# Function to test SQL connection
function Test-SqlConnection {
    param([string]$ConnectionString)

    try {
        $connection = New-Object System.Data.SqlClient.SqlConnection
        $connection.ConnectionString = $ConnectionString
        $connection.Open()
        Write-Host "✓ Connection successful!" -ForegroundColor Green
        $connection.Close()
        return $true
    }
    catch {
        Write-Host "✗ Connection failed: $_" -ForegroundColor Red
        return $false
    }
}

# Function to find SQL Server instances
function Find-SqlInstances {
    Write-Host "Searching for SQL Server instances..." -ForegroundColor Yellow

    $instances = @()

    # Check for default instance
    $defaultService = Get-Service -Name "MSSQLSERVER" -ErrorAction SilentlyContinue
    if ($defaultService) {
        $instances += @{Name = "(local)"; Service = $defaultService}
        $instances += @{Name = "localhost"; Service = $defaultService}
        $instances += @{Name = $env:COMPUTERNAME; Service = $defaultService}
    }

    # Check for named instances
    $namedServices = Get-Service -Name "MSSQL`$*" -ErrorAction SilentlyContinue
    foreach ($service in $namedServices) {
        $instanceName = $service.Name.Replace("MSSQL`$", "")
        $instances += @{Name = ".\$instanceName"; Service = $service}
        $instances += @{Name = "localhost\$instanceName"; Service = $service}
        $instances += @{Name = "$env:COMPUTERNAME\$instanceName"; Service = $service}
    }

    # Check for SQL Express
    $expressService = Get-Service -Name "MSSQL`$SQLEXPRESS" -ErrorAction SilentlyContinue
    if ($expressService) {
        if ($instances.Name -notcontains ".\SQLEXPRESS") {
            $instances += @{Name = ".\SQLEXPRESS"; Service = $expressService}
            $instances += @{Name = "localhost\SQLEXPRESS"; Service = $expressService}
        }
    }

    # Check for LocalDB
    $localDbPath = "${env:ProgramFiles}\Microsoft SQL Server\*\Tools\Binn\SqlLocalDB.exe"
    if (Test-Path $localDbPath) {
        $localDbExe = Get-Item $localDbPath | Select-Object -First 1
        if ($localDbExe) {
            $localDbInfo = & $localDbExe.FullName info 2>$null
            if ($localDbInfo) {
                $instances += @{Name = "(localdb)\MSSQLLocalDB"; Service = $null}
            }
        }
    }

    return $instances
}

# Main script
Write-Host "Step 1: Detecting SQL Server Instances" -ForegroundColor White
Write-Host "----------------------------------------" -ForegroundColor Gray
$sqlInstances = Find-SqlInstances

if ($sqlInstances.Count -eq 0) {
    Write-Host "✗ No SQL Server instances found!" -ForegroundColor Red
    Write-Host "Please ensure SQL Server is installed and running." -ForegroundColor Yellow
    exit 1
}

Write-Host "Found $($sqlInstances.Count) SQL Server instance(s):" -ForegroundColor Green
foreach ($instance in $sqlInstances) {
    $status = if ($instance.Service) { $instance.Service.Status } else { "LocalDB" }
    $statusColor = if ($status -eq "Running") { "Green" } else { "Yellow" }
    Write-Host "  • $($instance.Name) - Status: $status" -ForegroundColor $statusColor
}

Write-Host ""
Write-Host "Step 2: Testing Database Connections" -ForegroundColor White
Write-Host "-------------------------------------" -ForegroundColor Gray

$workingConnections = @()
$databaseName = "Portal-V7"

foreach ($instance in $sqlInstances) {
    if ($instance.Service -and $instance.Service.Status -ne "Running") {
        Write-Host "Skipping $($instance.Name) - Service not running" -ForegroundColor Yellow
        continue
    }

    Write-Host "Testing connection to: $($instance.Name)" -ForegroundColor Cyan

    # Try Integrated Security first
    $connectionString = "Data Source=$($instance.Name);Initial Catalog=$databaseName;Integrated Security=True;Trust Server Certificate=True;Multiple Active Result Sets=True;Connect Timeout=5"

    if (Test-SqlConnection -ConnectionString $connectionString) {
        $workingConnections += @{
            Instance = $instance.Name
            ConnectionString = $connectionString
        }
    }
}

Write-Host ""
Write-Host "Step 3: Updating Configuration Files" -ForegroundColor White
Write-Host "------------------------------------" -ForegroundColor Gray

if ($workingConnections.Count -eq 0) {
    Write-Host "✗ No working connections found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "1. Database 'Portal-V7' may not exist" -ForegroundColor Yellow
    Write-Host "2. SQL Server may not be configured for Windows Authentication" -ForegroundColor Yellow
    Write-Host "3. Firewall may be blocking SQL Server" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Creating a connection string with placeholder for manual configuration:" -ForegroundColor Cyan

    if ($sqlInstances.Count -gt 0) {
        $selectedInstance = $sqlInstances[0].Name
        $connectionString = "Data Source=$selectedInstance;Initial Catalog=$databaseName;Integrated Security=True;Trust Server Certificate=True;Multiple Active Result Sets=True"
        Write-Host "Suggested connection string: $connectionString" -ForegroundColor Green
    }
}
else {
    Write-Host "✓ Found $($workingConnections.Count) working connection(s)" -ForegroundColor Green

    # Select the first working connection
    $selectedConnection = $workingConnections[0]
    Write-Host "Using connection to: $($selectedConnection.Instance)" -ForegroundColor Cyan
    $connectionString = $selectedConnection.ConnectionString
}

# Update appsettings files
$appsettingsFiles = @(
    ".\appsettings.json",
    ".\appsettings.Development.json"
)

foreach ($file in $appsettingsFiles) {
    if (Test-Path $file) {
        Write-Host "Updating $file..." -ForegroundColor Yellow

        try {
            $json = Get-Content $file -Raw | ConvertFrom-Json

            if (-not $json.ConnectionStrings) {
                $json | Add-Member -Type NoteProperty -Name "ConnectionStrings" -Value @{} -Force
            }

            $json.ConnectionStrings.DefaultConnection = $connectionString

            $json | ConvertTo-Json -Depth 10 | Set-Content $file -Encoding UTF8
            Write-Host "✓ Updated $file successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Failed to update $file: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "✗ File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Step 4: Verification" -ForegroundColor White
Write-Host "-------------------" -ForegroundColor Gray

# Try to create the database if it doesn't exist
Write-Host "Checking if database exists..." -ForegroundColor Yellow

try {
    $masterConnection = New-Object System.Data.SqlClient.SqlConnection
    $masterConnection.ConnectionString = $connectionString.Replace("Initial Catalog=$databaseName", "Initial Catalog=master")
    $masterConnection.Open()

    $checkDbCommand = $masterConnection.CreateCommand()
    $checkDbCommand.CommandText = "SELECT DB_ID('$databaseName')"
    $dbId = $checkDbCommand.ExecuteScalar()

    if ($null -eq $dbId) {
        Write-Host "Database '$databaseName' does not exist." -ForegroundColor Yellow
        Write-Host "Would you like to create it? (Y/N): " -ForegroundColor Cyan -NoNewline
        $response = Read-Host

        if ($response -eq 'Y' -or $response -eq 'y') {
            $createDbCommand = $masterConnection.CreateCommand()
            $createDbCommand.CommandText = "CREATE DATABASE [$databaseName]"
            $createDbCommand.ExecuteNonQuery()
            Write-Host "✓ Database created successfully!" -ForegroundColor Green
        }
    }
    else {
        Write-Host "✓ Database '$databaseName' exists" -ForegroundColor Green
    }

    $masterConnection.Close()
}
catch {
    Write-Host "Unable to check/create database: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "                      Configuration Complete                      " -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Run 'dotnet build' to rebuild the project" -ForegroundColor Yellow
Write-Host "2. Run 'dotnet run' to start the API" -ForegroundColor Yellow
Write-Host "3. Test the health endpoint: http://localhost:5074/api/incident/health" -ForegroundColor Yellow
Write-Host ""
Write-Host "If you still experience issues:" -ForegroundColor White
Write-Host "• Ensure Entity Framework migrations have been applied" -ForegroundColor Gray
Write-Host "• Check that required tables exist in the database" -ForegroundColor Gray
Write-Host "• Review the application logs for detailed error messages" -ForegroundColor Gray