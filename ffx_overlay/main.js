'use strict';
import AccessFile from './access_file.js';
import Character from './character.js';
import * as draw from './draw.js';

var background_image;
var tidus_character;
var yuna_character;
var auron_character;
var kimahri_character;
var wakka_character;
var lulu_character;
var rikku_character;
var gil_file;
var time_file;

var x_direction = 1;
var y_direction = 1;
function draw_bouncing_background(background, x_speed, y_speed) {
	var max_x = background.image.naturalWidth - draw.get_width();
	background.sx = background.sx + ((x_speed / draw.fps) * x_direction);
	if(background.sx < 0) {
		background.sx = 0;
		x_direction = -x_direction;
	}
	else if(background.sx > max_x) {
		background.sx = max_x;
		x_direction = -x_direction;
	}

	var max_y = background.image.naturalHeight - draw.get_height();
	background.sy = background.sy + ((y_speed / draw.fps) * y_direction);
	if(background.sy < 0) {
		background.sy = 0;
		y_direction = -y_direction;
	}
	else if(background.sy > max_y) {
		background.sy = max_y;
		y_direction = -y_direction;
	}

	background.draw(background.sx, background.sy, draw.get_width(), draw.get_height(), 0, 0, draw.get_width(), draw.get_height());
}

function draw_all() {
	draw_bouncing_background(background_image, 10, 8);

	draw.text("TIME PLAYED             GIL", "normal 40px FinalFantasy", "white", "black", 2, 12, 48);
	draw.rect(14, 51, 108, 2, 0, "#FFFFFF");
	draw.rect(185, 51, 26, 2, 0, "#FFFFFF");
	draw.text(time_file.read(), "bold italic 28px Georgia", "white", "black", 2, 12, 76);
	draw.text(gil_file.read(), "bold italic 28px Georgia", "white", "black", 2, 200, 76);

	tidus_character.draw();
	yuna_character.draw();
	auron_character.draw();
	kimahri_character.draw();
	wakka_character.draw();
	lulu_character.draw();
	rikku_character.draw();
}
function init(background_filename, w, h, fps) {
	draw.init(w, h, fps);

	background_image = draw.LoadImage(background_filename);

	gil_file = AccessFile("value=gil");
	time_file = AccessFile("value=time");

	var x = 3;
	var y = 123;
	var seperator = 117;
	tidus_character = Character("Tidus", x, y);
	y = y + seperator;
	yuna_character = Character("Yuna", x, y);
	y = y + seperator;
	auron_character = Character("Auron", x, y);
	y = y + seperator;
	kimahri_character = Character("Kimahri", x, y);
	y = y + seperator;
	wakka_character = Character("Wakka", x, y);
	y = y + seperator;
	lulu_character = Character("Lulu", x, y);
	y = y + seperator;
	rikku_character = Character("Rikku", x, y);

	setInterval(draw_all, Math.ceil(1000 / fps));
}
window.init = init;
