'use strict';
import AccessFile from '../access_file.js';
import * as draw from './draw.js';
function clamp(value, min, max) {
	if(isNaN(value)) value = min;
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
	var retval = value + diff;
	if(diff > 0) {
		if(retval > target)
			retval = target;
	}
	else if(retval < target) {
			retval = target;
	}

	return retval;
}
var gradient_pulse = 0.5;
var gradient_pulse_target = 1.0;
var last_timestamp = 0
const frame_timestamp = 1000.0 / 60;
export function update_gradient_pulse(timestamp) {
	if(last_timestamp == 0)
		last_timestamp = timestamp;
	const time_diff = timestamp - last_timestamp;
	if(time_diff >= frame_timestamp)
	{
		last_timestamp = timestamp;
		gradient_pulse = CountToFloat(gradient_pulse, gradient_pulse_target, (frame_timestamp / time_diff) * 50);
		if(gradient_pulse + 0.1 >= 1.0)
			gradient_pulse_target = 0.0;
		if(gradient_pulse - 0.1 <= 0.0)
			gradient_pulse_target = 1.0;
	}
}
export  function Character(_name, _x, _y) {
	const php_file = "../access_file.php?";
	var character_object = {
		name: _name,
		face: draw.LoadImage("assets/xenosaga/" + _name.toLowerCase() + "_face.png"),
		x: _x,
		y: _y,
		hp: -1,
		hp_file: AccessFile('game=xenosaga&character=' + _name.toLowerCase() + '&stat=curr_hp'),
		max_hp: -1,
		max_hp_file: AccessFile('game=xenosaga&character=' + _name.toLowerCase() + '&stat=max_hp'),
		mp: -1,
		mp_file: AccessFile('game=xenosaga&character=' + _name.toLowerCase() + '&stat=curr_mp'),
		max_mp: -1,
		max_mp_file: AccessFile('game=xenosaga&character=' + _name.toLowerCase() + '&stat=max_mp'),
		slvl: -1,
		slvl_file: AccessFile('game=xenosaga&character=' + _name.toLowerCase() + '&stat=slvl'),
		draw : function(x, y) {
			const rectWidth = 143 - 15 + 60;
			const rectHeight = 27;
			const bgrectWidth = 196;
			const bgrectHeight = 166;
			const face_rect_width = 108;
			const face_rect_height = 166;
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

//			draw.linear_gradient_rect(x, y, face_rect_width + bgrectWidth, face_rect_height, 0,  "#00000046", "#ffffff46");
			this.face.draw(x, y);

			x = x + face_rect_width
			draw.text(this.name.toUpperCase(), "normal 44px FinalFantasy", "right", "black", "white", 4, x+300 - face_rect_width, y + 150)

			x = x - 11
			y = y + 15
			draw.rect(x + shadow, y + shadow, rectWidth, rectHeight, shear, "#000000d9");
			draw.linear_pulsing_gradient_rect(x, y, Math.ceil(rectWidth * hp_mult), rectHeight, shear, "#ff0100bd", "#ff9100ff", gradient_pulse);
			draw.text("HP", "normal 44px FinalFantasy", "left", "white", "black", 6, x + 6, y + 24)
			draw.text(this.hp, "bold italic 36px Georgia", "right", "white", "black", 4, x + 135 + 60, y + 20)

			y = y + rectHeight + shadow + shadow + 6
			draw.rect(x + shadow, y + shadow, rectWidth, rectHeight, shear, "#000000d9");
			draw.linear_pulsing_gradient_rect(x, y, Math.ceil(rectWidth * mp_mult), rectHeight, shear, "#23ff00bd", "#00ccffff", gradient_pulse);
			draw.text("EP", "normal 44px FinalFantasy", "left", "white", "black", 6, x + 6, y + 24)
			draw.text(this.mp, "bold italic 36px Georgia", "right", "white", "black", 4, x + 135 + 60, y + 20)

			y = y + rectHeight + shadow + shadow + 6 + 25
			draw.text(this.slvl, "bold italic 60px Georgia", "right", "white", "black", 4, x+120, y+20)
			draw.text("LVL", "normal 44px FinalFantasy", "left", "white", "black", 4, x + 6, y + 15)
		}
	}

	return character_object;
}
