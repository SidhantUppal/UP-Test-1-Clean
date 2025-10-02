param(
    # No parameters needed - always processes all StaticData SQL files
)

$ErrorActionPreference = 'Stop'

Write-Host "=== Static Data Endpoints Generator (from StaticData SQL files) ===" -ForegroundColor Cyan
Write-Host ""

# WARNING and confirmation prompt
Write-Host ""
Write-Host "!!! IMPORTANT WARNING !!!" -ForegroundColor Yellow -BackgroundColor Black
Write-Host ""
Write-Host "This operation will REGENERATE StaticData endpoints!" -ForegroundColor Yellow
Write-Host "Generated endpoints will be REPLACED, but the base controller structure will be PRESERVED!" -ForegroundColor Yellow
Write-Host ""
Write-Host "The following will happen:" -ForegroundColor Cyan
Write-Host "- StaticDataController endpoints will be regenerated from SQL files" -ForegroundColor Cyan
Write-Host "- BSSStaticData query methods will be regenerated" -ForegroundColor Cyan
Write-Host "- Base controller structure (constructors, health endpoint) will be PRESERVED" -ForegroundColor Green
Write-Host "- Static Data region in BSSStaticData will be PRESERVED" -ForegroundColor Green
Write-Host ""
Write-Host "PRESERVED: Base controller structure, constructors, disposal, Static Data region boundaries" -ForegroundColor Green
Write-Host "REPLACED: All generated endpoint methods and query methods" -ForegroundColor Yellow
Write-Host ""

do {
    $response = Read-Host "Do you want to continue and REGENERATE StaticData endpoints? (Y/N)"
    $response = $response.Trim().ToUpper()
} while ($response -ne 'Y' -and $response -ne 'N' -and $response -ne 'YES' -and $response -ne 'NO')

if ($response -eq 'N' -or $response -eq 'NO') {
    Write-Host ""
    Write-Host "[CANCELLED] Operation cancelled by user. No files were modified." -ForegroundColor Green
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 0
}

Write-Host ""
Write-Host "[CONFIRMED] Proceeding with StaticData endpoint regeneration..." -ForegroundColor Yellow
Write-Host ""

try {
    # Define paths
    $staticDataSqlDir = "../Data.V7Database/StaticData"
    $controllerPath = "../Api.StaticData/Controllers/StaticDataController.cs"
    $bssStaticDataPath = "../Bus.StaticData/BSSStaticData.cs"

    # Verify paths exist
    if (-not (Test-Path $staticDataSqlDir)) {
        throw "StaticData SQL directory not found at: $staticDataSqlDir"
    }

    if (-not (Test-Path $controllerPath)) {
        throw "StaticDataController not found at: $controllerPath"
    }

    if (-not (Test-Path $bssStaticDataPath)) {
        throw "BSSStaticData not found at: $bssStaticDataPath"
    }

    Write-Host "[+] StaticData SQL directory: $staticDataSqlDir" -ForegroundColor Green
    Write-Host "[+] StaticDataController: $controllerPath" -ForegroundColor Green
    Write-Host "[+] BSSStaticData: $bssStaticDataPath" -ForegroundColor Green
    Write-Host ""

    # Get all StaticData SQL files
    Write-Host "[*] Scanning StaticData SQL files..." -ForegroundColor Yellow
    $sqlFiles = Get-ChildItem $staticDataSqlDir -Filter "*.StaticData.sql" -ErrorAction SilentlyContinue
    $sqlFileCount = @($sqlFiles).Count

    if ($sqlFileCount -eq 0) {
        throw "No StaticData SQL files found in $staticDataSqlDir"
    }

    Write-Host "[+] Found $sqlFileCount StaticData SQL files" -ForegroundColor Cyan
    Write-Host ""

    # Function to convert table name to various formats
    function Get-NamingConventions($tableName) {
        # Remove .StaticData.sql extension
        $cleanName = $tableName -replace '\.StaticData\.sql$', ''

        # Handle special pluralization cases
        $pluralName = ""
        if ($cleanName -eq "ApiKey") {
            $pluralName = "ApiKeys"  # ApiKey -> ApiKeys (not ApiKeies)
        } elseif ($cleanName -match "y$" -and $cleanName -notmatch "[aeiou]y$") {
            $pluralName = $cleanName -replace "y$", "ies"  # Company -> Companies, but not Monkey -> Monkeies
        } else {
            $pluralName = $cleanName + "s"  # Default pluralization
        }

        # Convert to different naming conventions
        $result = @{
            TableName = $cleanName
            PluralName = $pluralName
            EndpointName = ($pluralName -creplace '([A-Z])', '-$1').ToLower().TrimStart('-')  # kebab-case
            MethodName = "Get" + $pluralName  # GetTaskTypes, GetApiKeys
            VariableName = $pluralName.Substring(0,1).ToLower() + $pluralName.Substring(1)  # taskTypes, apiKeys
            ViewModelName = $cleanName + "ViewModel"  # TaskTypeViewModel
        }

        return $result
    }

    # Function to extract properties from EF model and ViewModel files
    function Get-ModelProperties($tableName) {
        $efModelPath = "Models/$tableName.cs"
        $viewModelPath = "../Data.ViewModels/${tableName}ViewModel.cs"

        $efProperties = @()
        $vmProperties = @()
        $orderByProperty = "Title" # default
        $hasUserAreaID = $false
        $hasMasterUserAreaID = $false

        # Try to find EF model file
        if (Test-Path $efModelPath) {
            $efContent = Get-Content $efModelPath -Raw -ErrorAction SilentlyContinue
            if ($efContent) {
                # Extract properties from EF model
                $propertyMatches = [regex]::Matches($efContent, 'public (?:virtual )?(\w+(?:\?)?) (\w+) { get; set; }')
                foreach ($match in $propertyMatches) {
                    $propertyType = $match.Groups[1].Value
                    $propertyName = $match.Groups[2].Value

                    # Skip navigation properties (virtual properties)
                    if ($efContent -match "public virtual.*$propertyName") {
                        continue
                    }

                    $efProperties += @{
                        Name = $propertyName
                        Type = $propertyType
                    }

                    # Check for UserAreaID properties
                    if ($propertyName -eq "UserAreaID") {
                        $hasUserAreaID = $true
                    }
                    if ($propertyName -eq "MasterUserAreaID") {
                        $hasMasterUserAreaID = $true
                    }
                }
            }
        }

        # Always try to read ViewModel to get the actual properties we need to map
        if (Test-Path $viewModelPath) {
            $vmContent = Get-Content $viewModelPath -Raw -ErrorAction SilentlyContinue
            if ($vmContent) {
                # Find the "// Additional Properties" section and exclude everything after it
                $additionalPropsIndex = $vmContent.IndexOf("// Additional Properties")
                $contentToProcess = if ($additionalPropsIndex -ge 0) {
                    $vmContent.Substring(0, $additionalPropsIndex)
                } else {
                    $vmContent
                }

                # Extract properties from ViewModel (only before Additional Properties section)
                $propertyMatches = [regex]::Matches($contentToProcess, 'public (\w+(?:\?)?) (\w+) { get; set; }')
                foreach ($match in $propertyMatches) {
                    $propertyType = $match.Groups[1].Value
                    $propertyName = $match.Groups[2].Value

                    $vmProperties += @{
                        Name = $propertyName
                        Type = $propertyType
                    }

                    # Set order by property (prefer Title, Name, Description)
                    if ($propertyName -in @("Title", "Name", "Description") -and $orderByProperty -eq "Title") {
                        $orderByProperty = $propertyName
                    }
                }

                # If ViewModel has UserAreaID or MasterUserAreaID, check those too (only in the main section)
                if ($contentToProcess -match "UserAreaID") {
                    $hasUserAreaID = $true
                }
                if ($contentToProcess -match "MasterUserAreaID") {
                    $hasMasterUserAreaID = $true
                }
            }
        }

        # Use ViewModel properties if available, otherwise fall back to EF properties
        $properties = if ($vmProperties.Count -gt 0) { $vmProperties } else { $efProperties }

        return @{
            Properties = $properties
            OrderByProperty = $orderByProperty
            HasUserAreaID = $hasUserAreaID
            HasMasterUserAreaID = $hasMasterUserAreaID
        }
    }

    # Generate controller endpoints
    Write-Host "[*] Generating controller endpoints..." -ForegroundColor Yellow
    $controllerEndpoints = @()
    $bssQueryMethods = @()

    foreach ($sqlFile in $sqlFiles) {
        $naming = Get-NamingConventions $sqlFile.Name
        $modelInfo = Get-ModelProperties $naming.TableName

        # Generate controller endpoint
        $controllerEndpoint = @"
        [HttpGet("$($naming.EndpointName)")]
        public async Task<IActionResult> $($naming.MethodName)()
        {
            try
            {
                using var staticData = new BSSStaticData();

                var $($naming.VariableName) = await staticData.$($naming.MethodName)Async(UserSession.MasterUserAreaID);
                return Ok(new { data = $($naming.VariableName) });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving $($naming.VariableName.ToLower())");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
"@

        $controllerEndpoints += $controllerEndpoint

        # Generate property mappings for Select clause
        $propertyMappings = @()

        # Determine WHERE clause based on actual property existence and nullability
        $whereClause = "t => true"  # Default to no filter
        if ($naming.TableName -eq "User") {
            # User entity uses MasterUserAreaID instead of UserAreaID
            # Check if MasterUserAreaID is nullable
            $masterUserAreaIDProperty = $modelInfo.Properties | Where-Object { $_.Name -eq "MasterUserAreaID" } | Select-Object -First 1
            if ($masterUserAreaIDProperty -and $masterUserAreaIDProperty.Type -match '\?$') {
                # Nullable: include records with matching UserAreaID or NULL values
                $whereClause = "t => t.MasterUserAreaID == userAreaId || !t.MasterUserAreaID.HasValue"
            } else {
                # Non-nullable: assume 0 represents "global" records
                $whereClause = "t => t.MasterUserAreaID == userAreaId || t.MasterUserAreaID == 0"
            }
        } elseif ($modelInfo.HasUserAreaID) {
            # Check if UserAreaID is nullable
            $userAreaIDProperty = $modelInfo.Properties | Where-Object { $_.Name -eq "UserAreaID" } | Select-Object -First 1
            if ($userAreaIDProperty -and $userAreaIDProperty.Type -match '\?$') {
                # Nullable: include records with matching UserAreaID or NULL values
                $whereClause = "t => t.UserAreaID == userAreaId || !t.UserAreaID.HasValue"
            } else {
                # Non-nullable: assume 0 represents "global" records
                $whereClause = "t => t.UserAreaID == userAreaId || t.UserAreaID == 0"
            }
        }

        # Determine ORDER BY clause based on actual property existence
        $orderByProperty = $modelInfo.OrderByProperty
        $hasOrderByProperty = $false
        foreach ($prop in $modelInfo.Properties) {
            if ($prop.Name -eq $orderByProperty) {
                $hasOrderByProperty = $true
                break
            }
        }

        # Fallback if the preferred order property doesn't exist
        if (-not $hasOrderByProperty) {
            foreach ($fallbackProp in @("Title", "Name", "Description", "Reference")) {
                foreach ($prop in $modelInfo.Properties) {
                    if ($prop.Name -eq $fallbackProp) {
                        $orderByProperty = $fallbackProp
                        $hasOrderByProperty = $true
                        break
                    }
                }
                if ($hasOrderByProperty) { break }
            }
        }

        # If still no suitable order property, use the first property or ID field
        if (-not $hasOrderByProperty -and $modelInfo.Properties.Count -gt 0) {
            $idProperty = $modelInfo.Properties | Where-Object { $_.Name -like "*ID" } | Select-Object -First 1
            if ($idProperty) {
                $orderByProperty = $idProperty.Name
            } else {
                $orderByProperty = $modelInfo.Properties[0].Name
            }
        }

        $orderByClause = "t => t.$orderByProperty"

        # Handle special DbSet naming issues
        $dbSetName = $naming.PluralName
        if ($naming.TableName -eq "ApiKey") {
            $dbSetName = "ApiKeys"  # Fix ApiKey -> ApiKeys (not ApiKeies)
        }

        if ($modelInfo.Properties.Count -gt 0) {
            foreach ($prop in $modelInfo.Properties) {
                $propertyMappings += "                        $($prop.Name) = t.$($prop.Name),"
            }
        } else {
            # Fallback to common properties if we can't extract them
            $propertyMappings = @(
                "                        $($naming.TableName)ID = t.$($naming.TableName)ID,",
                "                        UserAreaID = t.UserAreaID,",
                "                        Title = t.Title,",
                "                        IsSystemGenerated = t.IsSystemGenerated,",
                "                        IsUserAbleToCreate = t.IsUserAbleToCreate,",
                "                        IsLive = t.IsLive,",
                "                        CreatedByUserID = t.CreatedByUserID,",
                "                        CreatedDate = t.CreatedDate,",
                "                        ModifiedByUserID = t.ModifiedByUserID,",
                "                        ModifiedDate = t.ModifiedDate,",
                "                        ArchivedByUserID = t.ArchivedByUserID,",
                "                        ArchivedDate = t.ArchivedDate,"
            )
        }

        # Remove trailing comma from last property
        if ($propertyMappings.Count -gt 0) {
            $propertyMappings[-1] = $propertyMappings[-1] -replace ',$', ''
        }

        $propertyMappingsString = $propertyMappings -join "`r`n"

        # Generate BSS query method with dynamic properties
        $bssQueryMethod = @"
        public async Task<List<$($naming.ViewModelName)>> $($naming.MethodName)Async(int userAreaId)
        {
            try
            {
                var $($naming.VariableName) = await _dbContext.$dbSetName
                    .Where($whereClause)
                    .OrderBy($orderByClause)
                    .Select(t => new $($naming.ViewModelName)
                    {
$propertyMappingsString
                    })
                    .ToListAsync();

                return $($naming.VariableName);
            }
            catch (Exception ex)
            {
                throw new Exception(`$"Error retrieving $($naming.VariableName.ToLower()) for user area {userAreaId}: {ex.Message}", ex);
            }
        }
"@

        $bssQueryMethods += $bssQueryMethod

        Write-Host "[*] Generated endpoint for $($naming.TableName) ($($modelInfo.Properties.Count) properties)" -ForegroundColor Gray
    }

    Write-Host "[+] Generated $($controllerEndpoints.Count) controller endpoints" -ForegroundColor Green
    Write-Host "[+] Generated $($bssQueryMethods.Count) BSS query methods" -ForegroundColor Green
    Write-Host ""

    # Update StaticDataController
    Write-Host "[*] Updating StaticDataController..." -ForegroundColor Yellow
    $controllerContent = Get-Content $controllerPath -Raw

    # Find the health endpoint and preserve everything up to it
    $healthEndpointPattern = '(\[HttpGet\("health"\)\]\s*public IActionResult Health\(\)\s*\{\s*return Ok\([^}]+\}\s*)'
    $healthMatch = [regex]::Match($controllerContent, $healthEndpointPattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

    if (-not $healthMatch.Success) {
        throw "Could not find health endpoint in StaticDataController"
    }

    # Extract everything before and including the health endpoint
    $beforeHealthIndex = $healthMatch.Index + $healthMatch.Length
    $beforeHealthContent = $controllerContent.Substring(0, $beforeHealthIndex)

    # Find the final closing brace
    $finalBraceIndex = $controllerContent.LastIndexOf('}')
    if ($finalBraceIndex -eq -1) {
        throw "Could not find final closing brace in StaticDataController"
    }

    # Build new controller content
    $newControllerContent = $beforeHealthContent + "`r`n`r`n"
    $newControllerContent += ($controllerEndpoints -join "`r`n`r`n")
    $newControllerContent += "`r`n`r`n    }`r`n}"

    # Write updated controller
    $newControllerContent | Out-File -FilePath $controllerPath -Encoding UTF8
    Write-Host "[+] StaticDataController updated" -ForegroundColor Green

    # Update BSSStaticData
    Write-Host "[*] Updating BSSStaticData..." -ForegroundColor Yellow
    $bssContent = Get-Content $bssStaticDataPath -Raw

    # Find the Static Data region
    $staticDataRegionPattern = '(#region Static Data\s*)(.*?)(#endregion)'
    $regionMatch = [regex]::Match($bssContent, $staticDataRegionPattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

    if ($regionMatch.Success) {
        # Replace content within the Static Data region
        $beforeRegion = $bssContent.Substring(0, $regionMatch.Index)
        $afterRegion = $bssContent.Substring($regionMatch.Index + $regionMatch.Length)

        $newRegionContent = "#region Static Data`r`n`r`n"
        $newRegionContent += ($bssQueryMethods -join "`r`n`r`n")
        $newRegionContent += "`r`n`r`n        #endregion"

        $newBssContent = $beforeRegion + $newRegionContent + $afterRegion
    } else {
        # If no Static Data region exists, find the disposal region and insert before it
        $disposalRegionPattern = '(#region Disposal)'
        $disposalMatch = [regex]::Match($bssContent, $disposalRegionPattern)

        if ($disposalMatch.Success) {
            $beforeDisposal = $bssContent.Substring(0, $disposalMatch.Index)
            $afterDisposal = $bssContent.Substring($disposalMatch.Index)

            $newStaticDataRegion = "        #region Static Data`r`n`r`n"
            $newStaticDataRegion += ($bssQueryMethods -join "`r`n`r`n")
            $newStaticDataRegion += "`r`n`r`n        #endregion`r`n`r`n        "

            $newBssContent = $beforeDisposal + $newStaticDataRegion + $afterDisposal
        } else {
            throw "Could not find suitable location to insert Static Data region in BSSStaticData"
        }
    }

    # Write updated BSS content
    $newBssContent | Out-File -FilePath $bssStaticDataPath -Encoding UTF8
    Write-Host "[+] BSSStaticData updated" -ForegroundColor Green
    Write-Host ""

    # Build projects to verify
    Write-Host "[*] Building Api.StaticData project..." -ForegroundColor Yellow
    $buildResult = dotnet build "../Api.StaticData/Api.StaticData.csproj" --nologo --verbosity quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[WARNING] Api.StaticData project build failed. Running with detailed output:" -ForegroundColor Yellow
        dotnet build "../Api.StaticData/Api.StaticData.csproj" --verbosity normal
        Write-Host "[*] You may need to manually fix compilation errors" -ForegroundColor Yellow
    } else {
        Write-Host "[+] Api.StaticData project built successfully" -ForegroundColor Green
    }

    Write-Host "[*] Building Bus.StaticData project..." -ForegroundColor Yellow
    $buildResult = dotnet build "../Bus.StaticData/Bus.StaticData.csproj" --nologo --verbosity quiet
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[WARNING] Bus.StaticData project build failed. Running with detailed output:" -ForegroundColor Yellow
        dotnet build "../Bus.StaticData/Bus.StaticData.csproj" --verbosity normal
        Write-Host "[*] You may need to manually fix compilation errors" -ForegroundColor Yellow
    } else {
        Write-Host "[+] Bus.StaticData project built successfully" -ForegroundColor Green
    }

    Write-Host ""
    Write-Host "[SUCCESS] StaticData endpoint generation completed!" -ForegroundColor Green
    Write-Host "[+] Generated endpoints: $($controllerEndpoints.Count)" -ForegroundColor Cyan
    Write-Host "[+] Generated query methods: $($bssQueryMethods.Count)" -ForegroundColor Cyan
    Write-Host "[+] Controller: $controllerPath" -ForegroundColor Gray
    Write-Host "[+] Business logic: $bssStaticDataPath" -ForegroundColor Gray
}
catch {
    Write-Host ""
    Write-Host "[ERROR] $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "Press Enter to continue"