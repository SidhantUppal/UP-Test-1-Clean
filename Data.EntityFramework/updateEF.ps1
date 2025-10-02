param(
    # No parameters needed - always uses AllSchemas mode
)

$ErrorActionPreference = 'Stop'

Write-Host "=== Entity Framework Model Update (from appsettings.json) ===" -ForegroundColor Cyan
Write-Host ""

try {
    # Verify we're in the right directory
    $projFile = "Data.EntityFramework.csproj"
    $configFile = "appsettings.json"
    
    if (-not (Test-Path $projFile)) {
        throw "Project file not found. Please run from Data.EntityFramework directory."
    }
    
    if (-not (Test-Path $configFile)) {
        throw "Config file not found. Please ensure appsettings.json exists."
    }

    Write-Host "[+] Project: $projFile" -ForegroundColor Green
    Write-Host "[+] Config: $configFile" -ForegroundColor Green
    Write-Host ""

    # Read connection string from appsettings.json
    Write-Host "[*] Reading connection string from appsettings.json..." -ForegroundColor Yellow
    $config = Get-Content $configFile -Raw | ConvertFrom-Json
    $connectionString = $config.ConnectionStrings.DefaultConnection
    
    if (-not $connectionString) {
        throw "DefaultConnection not found in appsettings.json"
    }
    
    Write-Host "[+] Connection string loaded successfully" -ForegroundColor Green
    
    # Extract database name for display
    if ($connectionString -match "Database=([^;]+)") {
        $dbName = $matches[1]
        Write-Host "[+] Database: $dbName" -ForegroundColor Cyan
    }
    Write-Host ""

    # Get current directory for paths
    $rootPath = (Get-Location).Path
    $contextDir = $rootPath

    # Self-cleaning FIRST: Remove existing Models directory
    Write-Host "[*] Self-cleaning: Removing existing Models directory..." -ForegroundColor Yellow
    $modelsDir = Join-Path $rootPath "Models"
    if (Test-Path $modelsDir) {
        Remove-Item $modelsDir -Recurse -Force
        Write-Host "[+] Models directory cleaned" -ForegroundColor Green
    } else {
        Write-Host "[+] No existing Models directory found" -ForegroundColor Green
    }

    # Self-cleaning: Reset V7DBContext to minimal state (with conditional OnConfiguring for BusBase compatibility)
    Write-Host "[*] Self-cleaning: Resetting V7DBContext..." -ForegroundColor Yellow
    $minimalContext = @'
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Bus.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework;

public partial class V7DBContext : DbContext, IDbContext
{
    public V7DBContext()
    {
    }

    public V7DBContext(DbContextOptions<V7DBContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Use BusBase configuration when no DI options are provided
            var connectionString = Bus.Core.BusBase<V7DBContext>.GetConnectionString();
            optionsBuilder.UseSqlServer(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    // IDbContext implementation
    object IDbContext.Set(Type entityType)
    {
        var method = typeof(DbContext).GetMethod(nameof(Set), new Type[0])?.MakeGenericMethod(entityType);
        return method?.Invoke(this, null) ?? throw new InvalidOperationException($"Set method returned null for type {entityType.Name}");
    }

    // Partial method for validation - implemented in ContextExtension.cs
    public partial void ValidateEntitiesBeforeSave();

    // Override SaveChanges to include validation
    public override int SaveChanges()
    {
        ValidateEntitiesBeforeSave();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ValidateEntitiesBeforeSave();
        return base.SaveChangesAsync(cancellationToken);
    }
}
'@
    
    $minimalContext | Out-File -FilePath "V7DBContext.cs" -Encoding UTF8
    Write-Host "[+] V7DBContext reset to minimal state" -ForegroundColor Green
    Write-Host ""

    # Ensure dotnet-ef is available
    if (-not (Get-Command dotnet-ef -ErrorAction SilentlyContinue)) {
        Write-Host "[*] Installing dotnet-ef CLI tool..." -ForegroundColor Yellow
        dotnet tool install --global dotnet-ef | Out-Null
        Write-Host "[+] dotnet-ef installed" -ForegroundColor Green
    }

    # Build project AFTER cleaning
    Write-Host "[*] Building clean project..." -ForegroundColor Yellow
    $buildResult = dotnet build $projFile --nologo --verbosity quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Clean project build failed. Running with detailed output:" -ForegroundColor Red
        dotnet build $projFile --verbosity normal
        throw "Project build failed even after cleaning"
    }
    Write-Host "[+] Clean project built successfully" -ForegroundColor Green
    Write-Host ""

    # Always use AllSchemas mode
    Write-Host "[*] Scaffolding ALL schemas at once..." -ForegroundColor Cyan
    
    $allSchemaDir = Join-Path $rootPath "Models"
    New-Item -ItemType Directory -Force -Path $allSchemaDir | Out-Null
    
    $startTime = Get-Date
    
    $args = @(
        'ef', 'dbcontext', 'scaffold', $connectionString, 'Microsoft.EntityFrameworkCore.SqlServer',
        '--output-dir', $allSchemaDir,
        '--context-dir', $contextDir,
        '--context', 'V7DBContext',
        '--use-database-names',
        '--data-annotations',
        '--no-onconfiguring',
        '--force',
        '--no-build',
        '--verbose'
    )
    
    dotnet @args
    
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    
    if ($LASTEXITCODE -eq 0) {
        $entityFiles = Get-ChildItem $allSchemaDir -Filter "*.cs" -Recurse -ErrorAction SilentlyContinue
        $entityCount = @($entityFiles).Count
        Write-Host ""
        Write-Host "[SUCCESS] ALL SCHEMAS completed in $($duration.ToString('F1'))s" -ForegroundColor Green
        Write-Host "[+] Total entities generated: $entityCount" -ForegroundColor Cyan
        Write-Host "[+] Context: V7DBContext.cs" -ForegroundColor Cyan
        Write-Host "[+] Output: $allSchemaDir" -ForegroundColor Gray
        
        # Post-scaffolding: Restore IDbContext implementation
        Write-Host ""
        Write-Host "[*] Post-processing: Restoring IDbContext implementation..." -ForegroundColor Yellow
        
        # Read the scaffolded V7DBContext.cs
        $contextContent = Get-Content "V7DBContext.cs" -Raw
        
        # Add required using statements if missing
        if (-not $contextContent.Contains("using Bus.Core.Interfaces;")) {
            $contextContent = $contextContent -replace "using Microsoft.EntityFrameworkCore;", "using Bus.Core.Interfaces;`r`nusing Microsoft.EntityFrameworkCore;"
        }
        if (-not $contextContent.Contains("using System.Threading;")) {
            $contextContent = $contextContent -replace "using System;", "using System;`r`nusing System.Threading;`r`nusing System.Threading.Tasks;"
        }
        
        # Update class declaration to implement IDbContext
        $contextContent = $contextContent -replace "public partial class V7DBContext : DbContext", "public partial class V7DBContext : DbContext, IDbContext"
        
        # Ensure parameterless constructor is present for BusBase compatibility
        if (-not $contextContent.Contains("public V7DBContext()")) {
            # Find the parameterized constructor and insert parameterless constructor before it
            $parameterlessConstructor = @'
    public V7DBContext()
    {
    }

'@
            
            if ($contextContent -match "(    public V7DBContext\(DbContextOptions<V7DBContext> options\))") {
                $contextContent = $contextContent -replace "(    public V7DBContext\(DbContextOptions<V7DBContext> options\))", "$parameterlessConstructor    `$1"
            }
        }
        
        # Ensure OnConfiguring method is present for BusBase compatibility
        if (-not $contextContent.Contains("protected override void OnConfiguring")) {
            # Find the location after the last constructor and insert OnConfiguring
            $onConfiguringMethod = @'
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Use BusBase configuration when no DI options are provided
            var connectionString = Bus.Core.BusBase<V7DBContext>.GetConnectionString();
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
'@
            
            # Insert after the last constructor (before OnModelCreating if it exists)
            if ($contextContent -match "(?s)(.*?)(protected override void OnModelCreating)") {
                $contextContent = $contextContent -replace "(protected override void OnModelCreating)", "$onConfiguringMethod`r`n`r`n    `$1"
            } else {
                # If no OnModelCreating, insert before the final closing brace
                $lastBraceIndex = $contextContent.LastIndexOf("}")
                if ($lastBraceIndex -gt 0) {
                    $contextContent = $contextContent.Substring(0, $lastBraceIndex) + $onConfiguringMethod + "`r`n}"
                }
            }
        }
        
        # Add IDbContext implementation and SaveChanges overrides before the final closing brace
        $interfaceImplementation = @'

    // IDbContext implementation
    object IDbContext.Set(Type entityType)
    {
        var method = typeof(DbContext).GetMethod(nameof(Set), new Type[0])?.MakeGenericMethod(entityType);
        return method?.Invoke(this, null) ?? throw new InvalidOperationException($"Set method returned null for type {entityType.Name}");
    }

    // Partial method for validation - implemented in ContextExtension.cs
    public partial void ValidateEntitiesBeforeSave();

    // Override SaveChanges to include validation
    public override int SaveChanges()
    {
        ValidateEntitiesBeforeSave();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ValidateEntitiesBeforeSave();
        return base.SaveChangesAsync(cancellationToken);
    }
'@
        
        # Insert the interface implementation before the final closing brace
        $lastBraceIndex = $contextContent.LastIndexOf("}")
        if ($lastBraceIndex -gt 0) {
            $contextContent = $contextContent.Substring(0, $lastBraceIndex) + $interfaceImplementation + "`r`n}"
        }
        
        # Write the updated content back to the file
        $contextContent | Out-File -FilePath "V7DBContext.cs" -Encoding UTF8 -NoNewline

        Write-Host "[+] IDbContext implementation restored" -ForegroundColor Green
    } else {
        throw "All schemas scaffolding failed"
    }
    
    Write-Host ""
    Write-Host "[SUCCESS] Entity Framework models updated successfully!" -ForegroundColor Green
    Write-Host "Connection string was read from: $configFile" -ForegroundColor Gray
}
catch {
    Write-Host ""
    Write-Host "[ERROR] $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "Press Enter to continue"