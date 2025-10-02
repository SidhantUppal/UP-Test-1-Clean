@echo off
REM Portal V7 - Local Development Environment Setup (Windows)
REM This batch file runs the Node.js setup script

echo.
echo ============================================================
echo           Portal V7 - Local Environment Setup
echo                   Windows Auto-Configuration
echo ============================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js v22+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in PATH
    echo Please ensure npm is installed with Node.js
    pause
    exit /b 1
)

REM Run the setup script
echo Starting setup script...
echo.
node setup-local.js

pause