cd C:\apps\stream\html\overlay\memory_reader\
start "" steam://rungameid/9428450441735176192
start "" main.ahk

:loop
lua main.lua
SLEEP 10
goto loop
