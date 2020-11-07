'use strict';
import AccessFile from '../access_file.js';
import {Character, update_gradient_pulse} from './character_xenosaga.js';
import * as draw from './draw.js';

var background_image;
var tidus_character;
var yuna_character;
var auron_character;
var kimahri_character;
var wakka_character;
var lulu_character;
var gil_file;
var time_file;

var x_direction = 0.001;
var y_direction = 0.001;
var last_timestamp = null;
function draw_bouncing_background(background, x_speed, y_speed, timestamp) {
	if(!last_timestamp)
		last_timestamp = timestamp;
	const time_diff = timestamp - last_timestamp;
	last_timestamp = timestamp;

	x_speed = x_speed * time_diff * x_direction;
	y_speed = y_speed * time_diff * y_direction;

	var max_x = background.image.naturalWidth - draw.get_width();
	background.sx = background.sx + x_speed;
	if(background.sx < 0) {
		background.sx = 0;
		x_direction = -x_direction;
	}
	else if(background.sx > max_x) {
		background.sx = max_x;
		x_direction = -x_direction;
	}

	var max_y = background.image.naturalHeight - draw.get_height();
	background.sy = background.sy + y_speed;
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
var counter = 60;
function draw_all(timestamp) {
	if(counter >= 60 / draw.fps)
	{
		counter = 0;
		draw_bouncing_background(background_image, 10, 8, timestamp);

    let ___x = 12 + 1600;
    let ___y = 48 + 980;

		draw.text("TIME PLAYED             GIL", "normal 40px FinalFantasy", "left", "white", "black", 2, ___x, ___y);
		draw.rect(___x + 2, ___y + 3, 108, 2, 0, "white");
		draw.rect(___x + 173, ___y + 3, 26, 2, 0, "white");
		draw.text(time_file.read(), "bold italic 28px Georgia", "left", "white", "black", 2, ___x, ___y + 28);
		draw.text(gil_file.read(), "bold italic 28px Georgia", "left", "white", "black", 2, ___x + 171, ___y + 28);

		update_gradient_pulse(timestamp);
		tidus_character.draw();
		yuna_character.draw();
		auron_character.draw();
		kimahri_character.draw();
		wakka_character.draw();
		lulu_character.draw();
	}
	else{
		counter = counter + 1;
	}
	window.requestAnimationFrame(draw_all);
}
function init(background_filename, w, h, fps) {
	draw.init(w, h, fps);

	background_image = draw.LoadImage(background_filename);

	gil_file = AccessFile("game=xenosaga&value=gil");
	time_file = AccessFile("game=xenosaga&value=time");

	var x = 3;
	var y = 0;
	const seperator = 117 + 65;
	tidus_character = Character("Shion", x, y);
	y = y + seperator;
	yuna_character = Character("Kos-Mos", x, y);
	y = y + seperator;
	auron_character = Character("Ziggy", x, y);
	y = y + seperator;
	kimahri_character = Character("Momo", x, y);
	y = y + seperator;
	wakka_character = Character("Chaos", x, y);
	y = y + seperator;
	lulu_character = Character("JR", x, y);

	window.requestAnimationFrame(draw_all);
	//setInterval(draw_all, Math.ceil(1000 / fps));
}
window.init = init;
