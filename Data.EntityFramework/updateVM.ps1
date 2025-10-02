param(
    # No parameters needed - always processes all models
)

$ErrorActionPreference = 'Stop'

Write-Host "=== ViewModel Generator (from Entity Framework Models) ===" -ForegroundColor Cyan
Write-Host ""

# WARNING and confirmation prompt
Write-Host ""
Write-Host "!!! IMPORTANT WARNING !!!" -ForegroundColor Yellow -BackgroundColor Black
Write-Host ""
Write-Host "This operation will REGENERATE all existing ViewModels!" -ForegroundColor Yellow
Write-Host "Generated properties will be REPLACED, but Additional Properties sections will be PRESERVED!" -ForegroundColor Yellow
Write-Host ""
Write-Host "The following will happen:" -ForegroundColor Cyan
Write-Host "- All existing *.cs files in Data.ViewModels directory will be regenerated" -ForegroundColor Cyan
Write-Host "- Entity Framework properties will be refreshed from current models" -ForegroundColor Cyan
Write-Host "- '// Additional Properties' sections will be PRESERVED from existing ViewModels" -ForegroundColor Green
Write-Host "- New ViewModels will get empty '// Additional Properties' sections" -ForegroundColor Green
Write-Host "- Navigation properties and EF attributes will be removed" -ForegroundColor Cyan
Write-Host ""
Write-Host "PRESERVED: Any properties you added under '// Additional Properties' sections" -ForegroundColor Green
Write-Host "REPLACED: All Entity Framework generated properties and structure" -ForegroundColor Yellow
Write-Host ""

do {
    $response = Read-Host "Do you want to continue and REGENERATE ViewModels (preserving Additional Properties)? (Y/N)"
    $response = $response.Trim().ToUpper()
} while ($response -ne 'Y' -and $response -ne 'N' -and $response -ne 'YES' -and $response -ne 'NO')

if ($response -eq 'N' -or $response -eq 'NO') {
    Write-Host ""
    Write-Host "[CANCELLED] Operation cancelled by user. No ViewModels were modified." -ForegroundColor Green
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 0
}

Write-Host ""
Write-Host "[CONFIRMED] Proceeding with ViewModel regeneration..." -ForegroundColor Yellow
Write-Host ""

try {
    # Verify we're in the right directory
    $efProjectFile = "Data.EntityFramework.csproj"
    $modelsDir = "Models"
    
    if (-not (Test-Path $efProjectFile)) {
        throw "Entity Framework project file not found. Please run from Data.EntityFramework directory."
    }
    
    if (-not (Test-Path $modelsDir)) {
        throw "Models directory not found. Please run updateEF.ps1 first to generate entity models."
    }

    Write-Host "[+] Entity Framework project: $efProjectFile" -ForegroundColor Green
    Write-Host "[+] Models directory: $modelsDir" -ForegroundColor Green
    Write-Host ""

    # Find ViewModels project
    $viewModelsProjectPath = "../Data.ViewModels/Data.ViewModels.csproj"
    if (-not (Test-Path $viewModelsProjectPath)) {
        throw "ViewModels project not found at: $viewModelsProjectPath"
    }
    
    $viewModelsDir = "../Data.ViewModels"
    Write-Host "[+] ViewModels project: $viewModelsProjectPath" -ForegroundColor Green
    Write-Host "[+] ViewModels directory: $viewModelsDir" -ForegroundColor Green
    Write-Host ""

    # Get current directory for paths
    $rootPath = (Get-Location).Path

    # Get existing ViewModels for in-place editing
    Write-Host "[*] Scanning existing ViewModels for in-place editing..." -ForegroundColor Yellow
    $existingViewModels = Get-ChildItem $viewModelsDir -Filter "*.cs" -Recurse -ErrorAction SilentlyContinue
    $existingViewModelMap = @{}
    
    if ($existingViewModels.Count -gt 0) {
        foreach ($existingFile in $existingViewModels) {
            try {
                $content = Get-Content $existingFile.FullName -Raw -ErrorAction Stop
                
                # Extract class name from existing ViewModel
                $classNameMatch = [regex]::Match($content, 'public class (\w+)ViewModel')
                if ($classNameMatch.Success) {
                    $className = $classNameMatch.Groups[1].Value
                    $baseClassName = $className -replace 'ViewModel$', ''
                    $existingViewModelMap[$baseClassName] = $existingFile.FullName
                    Write-Host "[+] Found existing ViewModel for $baseClassName" -ForegroundColor Gray
                }
            }
            catch {
                Write-Host "[WARNING] Could not read existing ViewModel $($existingFile.Name): $_" -ForegroundColor Yellow
            }
        }
        Write-Host "[+] Found $($existingViewModelMap.Count) existing ViewModels for potential update" -ForegroundColor Cyan
    } else {
        Write-Host "[+] No existing ViewModel files found - will create new ones" -ForegroundColor Green
    }

    # Build ViewModels project to ensure it's clean
    Write-Host "[*] Building clean ViewModels project..." -ForegroundColor Yellow
    $buildResult = dotnet build $viewModelsProjectPath --nologo --verbosity quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Clean ViewModels project build failed. Running with detailed output:" -ForegroundColor Red
        dotnet build $viewModelsProjectPath --verbosity normal
        throw "ViewModels project build failed"
    }
    Write-Host "[+] Clean ViewModels project built successfully" -ForegroundColor Green
    Write-Host ""

    # Get all entity model files
    Write-Host "[*] Scanning Entity Framework models..." -ForegroundColor Yellow
    $modelFiles = Get-ChildItem $modelsDir -Filter "*.cs" -Recurse -ErrorAction SilentlyContinue
    $modelCount = @($modelFiles).Count
    
    if ($modelCount -eq 0) {
        throw "No entity model files found in $modelsDir. Run updateEF.ps1 first."
    }
    
    Write-Host "[+] Found $modelCount entity model files" -ForegroundColor Cyan
    Write-Host ""

    # Process ViewModels (update existing or create new)
    Write-Host "[*] Processing ViewModels..." -ForegroundColor Yellow
    $updatedCount = 0
    $createdCount = 0
    $skippedCount = 0
    $skippedFiles = @()  # Array to collect skip details
    
    foreach ($modelFile in $modelFiles) {
        try {
            # Read the entity model file
            $content = Get-Content $modelFile.FullName -Raw -ErrorAction Stop
            
            # Skip if it's a DbContext file
            if ($content -match "DbContext|OnModelCreating") {
                $skipReason = "$($modelFile.Name) - DbContext file (contains DbContext or OnModelCreating)"
                Write-Host "[SKIP] $skipReason" -ForegroundColor Yellow
                $skippedFiles += $skipReason
                $skippedCount++
                continue
            }
            
            # Extract class name
            $classNameMatch = [regex]::Match($content, 'public partial class (\w+)')
            if (-not $classNameMatch.Success) {
                $skipReason = "$($modelFile.Name) - No public partial class found"
                Write-Host "[SKIP] $skipReason" -ForegroundColor Yellow
                $skippedFiles += $skipReason
                $skippedCount++
                continue
            }
            
            $className = $classNameMatch.Groups[1].Value
            $viewModelName = "${className}ViewModel"
            
            # Check if we have an existing ViewModel to update
            $isUpdating = $existingViewModelMap.ContainsKey($className)
            $existingAdditionalPropertiesSection = ""
            
            if ($isUpdating) {
                # Read existing ViewModel and extract Additional Properties section
                $existingViewModelPath = $existingViewModelMap[$className]
                $existingContent = Get-Content $existingViewModelPath -Raw -ErrorAction Stop
                
                # Find "// Additional Properties" section and everything after it until the final closing brace
                $additionalPropsMatch = [regex]::Match($existingContent, '(?s)(    // Additional Properties.*?)(\r?\n\})', [System.Text.RegularExpressions.RegexOptions]::Singleline)
                if ($additionalPropsMatch.Success) {
                    $existingAdditionalPropertiesSection = $additionalPropsMatch.Groups[1].Value
                    Write-Host "[*] Found existing Additional Properties section for $className" -ForegroundColor Gray
                } else {
                    Write-Host "[*] No Additional Properties section found in existing $className" -ForegroundColor Gray
                }
            }
            
            # Clean approach: Remove ALL using statements first, then add clean ones
            $lines = $content -split "`r?`n"
            $nonUsingLines = @()
            $inUsingSection = $true
            
            foreach ($line in $lines) {
                if ($line -match '^\s*using\s+' -and $inUsingSection) {
                    # Skip using statements
                    continue
                }
                elseif ($line.Trim() -eq '' -and $inUsingSection) {
                    # Skip empty lines in using section
                    continue
                }
                else {
                    $inUsingSection = $false
                    $nonUsingLines += $line
                }
            }
            
            $cleanContent = $nonUsingLines -join "`r`n"
            
            # Replace namespace
            $cleanContent = $cleanContent -replace 'namespace Data\.EntityFramework\.Models[^;]*;', 'namespace Data.ViewModels;'
            
            # Replace class name
            $cleanContent = $cleanContent -replace "public partial class $className", "public class $viewModelName"
            
            # Remove Entity Framework attributes (including multi-line ones)
            # Handle multi-line Index attributes that span multiple lines
            $cleanContent = $cleanContent -replace '\[Index\([^]]*?\]\]', ''
            $cleanContent = $cleanContent -replace '\[Index\([^]]*?\)\]', ''
            
            # Remove other EF attributes (keep basic DataAnnotations) 
            $cleanContent = $cleanContent -replace '\[Table\([^\]]*\)\]\r?\n', ''
            $cleanContent = $cleanContent -replace '\[ForeignKey\([^\]]*\)\]\r?\n', ''
            $cleanContent = $cleanContent -replace '\[InverseProperty\([^\]]*\)\]\r?\n', ''
            $cleanContent = $cleanContent -replace '\[Column\([^\]]*\)\]\r?\n', ''
            $cleanContent = $cleanContent -replace '\[Unicode\([^\]]*\)\]\r?\n', ''
            $cleanContent = $cleanContent -replace '\[Keyless\]\r?\n', ''
            
            # More comprehensive Index attribute removal (corrected single-line approach)
            $lines = $cleanContent -split "`r?`n"
            $filteredLines = @()
            
            foreach ($line in $lines) {
                # Check if this line contains a complete Index attribute (single-line)
                if ($line -match '^\s*\[Index\(.*\]\s*$') {
                    # Skip this complete Index attribute line
                    continue
                }
                
                # Keep all other lines
                $filteredLines += $line
            }
            
            $cleanContent = $filteredLines -join "`r`n"
            
            # Remove navigation properties completely (more comprehensive approach)
            $lines = $cleanContent -split "`r?`n"
            $filteredLines = @()
            $skipNextLines = $false
            
            for ($i = 0; $i -lt $lines.Length; $i++) {
                $line = $lines[$i]
                $trimmedLine = $line.Trim()
                
                # Skip empty lines but preserve them
                if ([string]::IsNullOrWhiteSpace($trimmedLine)) {
                    $filteredLines += $line
                    continue
                }
                
                # Skip navigation property indicators
                if ($trimmedLine -match '^\[ForeignKey|^\[InverseProperty') {
                    $skipNextLines = $true
                    continue
                }
                
                # Skip virtual properties (navigation properties)
                if ($trimmedLine -match 'public virtual.*\{.*get;.*set;.*\}' -or
                    $trimmedLine -match 'public virtual.*ICollection<' -or
                    $trimmedLine -match 'public virtual.*DbSet<' -or
                    ($trimmedLine -match 'public virtual' -and $skipNextLines)) {
                    $skipNextLines = $false
                    continue
                }
                
                # Skip multi-line virtual properties
                if ($trimmedLine -match 'public virtual' -and -not ($trimmedLine -match '\{.*get;.*set;.*\}')) {
                    # This is the start of a multi-line virtual property, skip until we find the closing brace
                    while ($i -lt $lines.Length -and -not ($lines[$i].Trim() -match '\}')) {
                        $i++
                    }
                    continue
                }
                
                # Fix indentation for regular properties (ensure consistent 4-space indentation)
                if ($trimmedLine -match '^public\s+(?!virtual).*\{.*get;.*set;.*\}') {
                    $line = "    $trimmedLine"
                }
                
                # Reset skip flag if we encounter a non-virtual property
                if ($trimmedLine -match 'public (?!virtual)' -and -not $trimmedLine.Contains('[')) {
                    $skipNextLines = $false
                }
                
                $filteredLines += $line
            }
            
            $cleanContent = $filteredLines -join "`r`n"
            
            # Add Additional Properties section
            $lastBraceIndex = $cleanContent.LastIndexOf('}')
            if ($lastBraceIndex -gt 0) {
                $beforeClosingBrace = $cleanContent.Substring(0, $lastBraceIndex).TrimEnd()
                $closingBrace = $cleanContent.Substring($lastBraceIndex)
                
                # Use existing Additional Properties if available, otherwise create default
                $additionalPropsText = ""
                if ($existingAdditionalPropertiesSection -ne "") {
                    # Use preserved Additional Properties section exactly as it was
                    $additionalPropsText = "`r`n`r`n" + $existingAdditionalPropertiesSection + "`r`n"
                } else {
                    # Generate default Additional Properties section with UserName properties for UserID properties
                    $userIdPattern = '(Created|Archived|Modified)ByUserID'
                    $matches = [regex]::Matches($cleanContent, $userIdPattern)
                    $defaultProperties = @()
                    
                    foreach ($match in $matches) {
                        $prefix = $match.Groups[1].Value
                        $userNameProperty = "public string? ${prefix}ByUserName { get; set; }"
                        $defaultProperties += "    $userNameProperty"
                    }
                    
                    if ($defaultProperties.Count -gt 0) {
                        $additionalPropsText = "`r`n`r`n    // Additional Properties`r`n" + ($defaultProperties -join "`r`n") + "`r`n"
                    } else {
                        $additionalPropsText = "`r`n`r`n    // Additional Properties`r`n"
                    }
                }
                
                $cleanContent = $beforeClosingBrace + $additionalPropsText + $closingBrace
            }
            
            # Clean up extra whitespace and validate structure
            $cleanContent = $cleanContent -replace '\r?\n\s*\r?\n\s*\r?\n', "`r`n`r`n"
            $cleanContent = $cleanContent.Trim()
            
            # Validate that we have a proper class structure
            if (-not ($cleanContent -match 'public class \w+ViewModel') -or -not ($cleanContent -match '\}$')) {
                $skipReason = "$($modelFile.Name) - Malformed class structure (missing class declaration or closing brace)"
                Write-Host "[SKIP] $skipReason" -ForegroundColor Yellow
                $skippedFiles += $skipReason
                $skippedCount++
                continue
            }
            
            # Build final content with clean using statements
            $finalContent = @"
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

$cleanContent
"@
            
            # Write or update ViewModel file
            $viewModelFileName = "$viewModelName.cs"
            $viewModelFilePath = Join-Path $viewModelsDir $viewModelFileName
            
            $finalContent | Out-File -FilePath $viewModelFilePath -Encoding UTF8
            
            if ($isUpdating) {
                $updatedCount++
                Write-Host "[*] Updated $className ViewModel" -ForegroundColor Green
            } else {
                $createdCount++
                Write-Host "[*] Created $className ViewModel" -ForegroundColor Cyan
            }
            
            if (($updatedCount + $createdCount) % 50 -eq 0) {
                Write-Host "[*] Processed $($updatedCount + $createdCount) ViewModels..." -ForegroundColor Gray
            }
        }
        catch {
            $skipReason = "$($modelFile.Name) - Exception occurred: $_"
            Write-Host "[SKIP] $skipReason" -ForegroundColor Red
            $skippedFiles += $skipReason
            $skippedCount++
        }
    }
    
    Write-Host ""
    Write-Host "[+] Updated $updatedCount existing ViewModel files" -ForegroundColor Green
    Write-Host "[+] Created $createdCount new ViewModel files" -ForegroundColor Cyan
    if ($skippedCount -gt 0) {
        Write-Host "[+] Skipped $skippedCount files - detailed reasons:" -ForegroundColor Yellow
        foreach ($skipDetail in $skippedFiles) {
            Write-Host "    - $skipDetail" -ForegroundColor Gray
        }
    }
    Write-Host ""
    
    # Build ViewModels project to verify
    Write-Host "[*] Building ViewModels project with generated files..." -ForegroundColor Yellow
    $buildResult = dotnet build $viewModelsProjectPath --nologo --verbosity quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[WARNING] ViewModels project build failed. Running with detailed output:" -ForegroundColor Yellow
        dotnet build $viewModelsProjectPath --verbosity normal
        Write-Host "[*] You may need to manually fix compilation errors in the generated ViewModels" -ForegroundColor Yellow
    } else {
        Write-Host "[+] ViewModels project built successfully" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "[SUCCESS] ViewModel processing completed!" -ForegroundColor Green
    Write-Host "[+] Output directory: $viewModelsDir" -ForegroundColor Gray
}
catch {
    Write-Host ""
    Write-Host "[ERROR] $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "Press Enter to continue"