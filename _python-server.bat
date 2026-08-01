@echo off
cd /d "%~dp0"
echo Fenovera dev server — http://127.0.0.1:8765/
echo.

where py >nul 2>&1
if %ERRORLEVEL%==0 (
    echo Starting with py launcher...
    py -m http.server 8765
    goto done
)

where python >nul 2>&1
if %ERRORLEVEL%==0 (
    echo Starting with python...
    python -m http.server 8765
    goto done
)

where python3 >nul 2>&1
if %ERRORLEVEL%==0 (
    echo Starting with python3...
    python3 -m http.server 8765
    goto done
)

echo ERROR: Python not found. Install Python 3 from https://python.org/
echo.
:done
pause
