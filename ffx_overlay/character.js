'use strict';
import AccessFile from './access_file.js';
import * as draw from './draw.js';
export default function Character(_name, _x, _y) {
	const php_file = "access_file.php?";
	var character_object = {
		name: _name,
		face: draw.LoadImage("assets/" + _name.toLowerCase() + "_face.png"),
		x: _x,
		y: _y,
		hp: -1,
		hp_file: AccessFile('character=' + _name.toLowerCase() + '&stat=curr_hp'),
		mp: -1,
		mp_file: AccessFile('character=' + _name.toLowerCase() + '&stat=curr_mp'),
		slvl: -1,
		slvl_file: AccessFile('character=' + _name.toLowerCase() + '&stat=slvl'),
		draw : function(x, y) {
			const rectWidth = 143 - 15;
			const rectHeight = 27;
			const bgrectWidth = 196;
			const bgrectHeight = 96;
			const face_rect_width = 96;
			const face_rect_height = 96;
			const shadow = 4
			const shear = -0.5
			character_object.hp = character_object.hp_file.read();
			character_object.mp = character_object.mp_file.read();
			character_object.slvl = character_object.slvl_file.read();

			//still not comfortable with JS syntax
			//test that the (this.)x and (this.)y work, not being _x and _y
			if(typeof x !== "undefined" && x !="")
				this.x = x;
			if(typeof y !== "undefined" && y !="")
				this.y = y;
			x = this.x;
			y = this.y;

			y = y + 3
			draw.radial_gradient_rect(x, y, face_rect_width, face_rect_height, 0, "#ffffff46", "#00000046");
			this.face.draw(x, y);
			draw.text(name.toUpperCase(), "normal 44px FinalFantasy", "black", "white", 1, x+10, y+52)

			x = x + face_rect_width
			draw.linear_gradient_rect(x, y, bgrectWidth, bgrectHeight, 0, "#00000046", "#ffffff46");

			x = x - 11
			y = y + 13 + 2
			draw.rect(x + shadow, y + shadow, rectWidth, rectHeight, shear, "#000000d9");
			draw.linear_gradient_rect(x, y, rectWidth, rectHeight, shear, "#ff0100bd", "#ff9100bd");
			draw.text("HP", "normal 44px FinalFantasy", "white", "black", 3, x + 6, y + 24)
			draw.text(this.hp, "bold italic 36px Georgia", "white", "black", 2, x + 75, y + 20)

			y = y + rectHeight + shadow + shadow+  6
			draw.rect(x + shadow, y + shadow, rectWidth, rectHeight, shear, "#000000d9");
			draw.linear_gradient_rect(x, y, rectWidth, rectHeight, shear, "#23ff00bd", "#00ccffbd");
			draw.text("MP", "normal 44px FinalFantasy", "white", "black", 3, x + 6, y + 24)
			draw.text(this.mp, "bold italic 36px Georgia", "white", "black", 2, x + 75, y + 20)

			x = x + 150
			y = y + 20
			draw.text(this.slvl, "bold italic 60px Georgia", "white", "black", 2, x, y)
			draw.text("SLV", "normal 24px FinalFantasy", "white", "black", 2, x - 8, y + 15)
		}
	}

	return character_object;
}
