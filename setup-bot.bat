@echo off

call npm -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo NPM was not found. Please, install Node.js and NPM
echo http://nodejs.org
echo.

goto end

:init

echo.
echo Installation des paquets depuis package.json
call npm install >NUL 2>&1
if not "%ERRORLEVEL%" == "0" goto installError

echo.
echo Tout est installe
echo.
echo Si vous avez mit votre token puis creer votre bot ID
echo Vous pouvez demarrer votre bot
echo.
echo.
goto end

:run

npm start
goto end

:installError

echo.
echo Could not install dependencies
echo Essayez d installer manuellement via 'npm install'

goto end

:end

echo.
pause;
exit;
