#Persistent
in_battle := false

main_loop:
check_battle := AccessFile("battle")
if(check_battle != in_battle) and (check_battle != "") {
		in_battle := check_battle
	if(!in_battle)
		ControlSend,,{F14},ahk_class Qt5QWindowIcon
	else
		ControlSend,,{F15},ahk_class Qt5QWindowIcon
}

SetTimer, main_loop, 100

AccessFile(value) {
	url := "http://192.168.1.20/FFX/access_file.php?value=" value
	hObject:=ComObjCreate("WinHttp.WinHttpRequest.5.1")
	hObject.Open("GET", url)
	hObject.Send()

	return hObject.ResponseText
}
