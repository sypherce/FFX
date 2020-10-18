'use strict';

const fps_val = 20;
const back_symbol = "_\n";
var away_message = back_symbol;

var away_message_file;

function AccessFile(_filename) {
	const php_file = "access_file.php?";
	var file_object = {
		filename: _filename,
		contents: "",
		last_access: (new Date),
		read : function(_filename) {
			var this_access = (new Date);
			if(this_access - file_object.last_access >= 1000 / 2) {
				file_object.last_access = this_access;
				if(typeof _filename !== "undefined" && _filename !="")
					this.filename = _filename;
				if(!this.filename.startsWith(php_file))
					this.filename = php_file + this.filename;
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (this.readyState == 4) {
						if(this.status == 200) {
							file_object.contents = this.responseText;
							console.log(file_object.contents);
						}
						if(this.status == 404) {
							file_object.contents = "404: File not found";
						}
					}
				}
				request.open("GET", this.filename, true);
				request.send();
			}
			return this.contents;
		}
	}
	return file_object;
}

function init(_canvas, _tempCanvas, _width, _height) {

	away_message_file = AccessFile("filename=away_message.txt");

	setInterval(update, 1000 / fps_val);
}
window.init = init;

function update() {
	var contents = away_message_file.read();
	if(contents != away_message)
	{
		document.getElementById("away_text").style.visibility = "visible";
		document.getElementById("away_text").innerHTML = contents;
	}
	if(contents == back_symbol)
		document.getElementById("away_text").style.visibility = "hidden";
}
