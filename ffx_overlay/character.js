'use strict';
import AccessFile from './access_file.js';
import * as draw from './draw.js';
function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}
function CountTo(value, target, steps) {
	var diff = (target - value) / steps;
	var retval;
	if(diff > 0)
	{
		retval = value + Math.ceil(diff);
		if(retval > target)
			retval = target;
	}
	else
	{
		retval = value + Math.floor(diff);
		if(retval < target)
			retval = target;
	}

	return retval;
}
function CountToFloat(value, target, steps) {
	var diff = (target - value) / steps;
	var retval;
	if(diff > 0)
	{
		retval = value + diff;
		if(retval > target)
			retval = target;
	}
	else
	{
		retval = value + diff;
		if(retval < target)
			retval = target;
	}

	return retval;
}
var gradient_pulse = 0.5;
var gradient_pulse_target = 1.0;
export function update_gradient_pulse() {
	gradient_pulse = CountToFloat(gradient_pulse, gradient_pulse_target, 50);
	if(gradient_pulse + 0.1 >= 1.0)
		gradient_pulse_target = 0.0;
	if(gradient_pulse - 0.1 <= 0.0)
		gradient_pulse_target = 1.0;
}
export  function Character(_name, _x, _y) {
	const php_file = "access_file.php?";
	var character_object = {
		name: _name,
		face: draw.LoadImage("assets/" + _name.toLowerCase() + "_face.png"),
		x: _x,
		y: _y,
		hp: -1,
		hp_file: AccessFile('character=' + _name.toLowerCase() + '&stat=curr_hp'),
		max_hp: -1,
		max_hp_file: AccessFile('character=' + _name.toLowerCase() + '&stat=max_hp'),
		mp: -1,
		mp_file: AccessFile('character=' + _name.toLowerCase() + '&stat=curr_mp'),
		max_mp: -1,
		max_mp_file: AccessFile('character=' + _name.toLowerCase() + '&stat=max_mp'),
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
			const steps = 15;
			this.hp = CountTo(this.hp, this.hp_file.read(), steps);
			this.mp = CountTo(this.mp, this.mp_file.read(), steps);
			this.max_hp = this.max_hp_file.read();
			this.max_mp = this.max_mp_file.read();
			this.slvl = CountTo(this.slvl, this.slvl_file.read(), steps);
			var hp_mult = clamp(this.hp / this.max_hp, 0, 1);
			var mp_mult = clamp(this.mp / this.max_mp, 0, 1);

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
			draw.linear_pulsing_gradient_rect(x, y, Math.ceil(rectWidth * hp_mult), rectHeight, shear, "#ff0100bd", "#ff9100bd", gradient_pulse);
			draw.text("HP", "normal 44px FinalFantasy", "white", "black", 3, x + 6, y + 24)
			draw.text(this.hp, "bold italic 36px Georgia", "white", "black", 2, x + 75, y + 20)

			y = y + rectHeight + shadow + shadow+  6
			draw.rect(x + shadow, y + shadow, rectWidth, rectHeight, shear, "#000000d9");
			draw.linear_pulsing_gradient_rect(x, y, Math.ceil(rectWidth * mp_mult), rectHeight, shear, "#23ff00bd", "#00ccffbd", gradient_pulse);
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
