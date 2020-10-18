'use strict';
export default function AccessFile(_filename) {
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
						}
						if(this.status == 404) {
							file_object.contents = "404: File not found";
						}
					}
				}
				request.open("GET", this.filename + "&time=" + Date.now(), true);
				request.send();
			}
			return this.contents;
		}
	}
	return file_object;
}
