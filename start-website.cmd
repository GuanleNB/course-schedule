@echo off
set "NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%NODE%" (
  echo Cannot find the local website runtime.
  pause
  exit /b 1
)
start "Course Schedule Website" /min "%NODE%" "%~dp0preview-server.js"
timeout /t 1 /nobreak >nul
start "" http://127.0.0.1:5173/
