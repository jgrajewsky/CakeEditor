robocopy src resources /s>nul
del resources\*.hx /q
robocopy assets resources /s>nul
haxe build.hxml
call yarn start
rmdir /s /q resources