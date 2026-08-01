@echo off
cd /d "%~dp0"
echo.
echo  Fenovera dev server
echo  http://127.0.0.1:8765/
echo.
echo  Press Ctrl+C to stop.
echo.
python3 -m http.server 8765 --bind 127.0.0.1
pause
