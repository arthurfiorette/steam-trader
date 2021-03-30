@ECHO off
TITLE Steam Trader
CLS

:MENU
ECHO.
ECHO Steam Trader
ECHO.
ECHO Trade items smartly with multiple automated steam accounts at the same time!
ECHO.
ECHO.
ECHO Choose an option:
ECHO.
ECHO 0 - Exit the terminal
ECHO.
ECHO 1 - Build for Docker   -   (docker-compose)
ECHO 2 - Build for NodeJS   -   (npm)
ECHO.
ECHO 3 - Start with Docker  -   (docker-compose)
ECHO 4 - Start with NodeJS  -   (npm)
ECHO.
SET /P T="Type the number and hit ENTER: "
ECHO.
IF %T%==0 GOTO EXIT
IF %T%==1 GOTO DOCKER-BUILD
IF %T%==2 GOTO NODE-BUILD
IF %T%==3 GOTO DOCKER-START
IF %T%==4 GOTO NODE-START
GOTO MENU

:NODE-BUILD
ECHO Installing dependencies
ECHO Building app...
START "" /w /d app CMD /c "npm install && npm run build"
ECHO Built app.
ECHO Building web...
START "" /w /d web CMD /c "npm install && npm run build && npm run build:server"
ECHO Built web.
GOTO END

:NODE-START
ECHO Starting...
ECHO.
START "" /b /d app CMD /c "npm start"
START "" /b /d web CMD /c "npm start"
GOTO END

:DOCKER-BUILD
ECHO Building docker images
START "" /w CMD /c "docker-compose build"
ECHO Built images.
GOTO END

:DOCKER-START
ECHO Starting...
ECHO.
START "" /b CMD /c "docker-compose up -d"
GOTO END

:END
FOR /l %%x in (1, 1, 50) do ECHO.
ECHO Press any key to return to the menu
PAUSE < NUL
GOTO MENU

:EXIT