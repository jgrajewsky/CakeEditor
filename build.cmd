robocopy src resources /s>nul
del resources\*.hx /q
robocopy assets resources /s>nul
haxe build.hxml
call yarn dist
rmdir /s /q resources