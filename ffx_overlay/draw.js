'use strict';
import AccessFile from './access_file.js';

export var main_canvas;
export var temp_canvas;
export var main_context;
export var temp_context;
export var fps;

export function LoadImage(_filename) {
	var image_object = {
		image: new Image(),
		filename: _filename,
		context: main_context,
		x: -1,
		y: -1,
		w: -1,
		h: -1,
		sx: -1,
		sy: -1,
		sw: -1,
		sh: -1,
		//draw : function(_x, _y, _w, _h) {
		draw : function(_sx, _sy, _sw, _sh, _dx, _dy, _dw, _dh) {
			if(typeof _dx == "undefined") {//_sx, _sy, _sw, _sh,
				this.x = _sx;
				this.y = _sy;
				this.w = this.image.naturalWidth;
				this.h = this.image.naturalHeight;
				if(typeof _sw !== "undefined") this.w = _sw;
				if(typeof _sh !== "undefined") this.h = _sh;
				this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
			}
			else{
				this.x = _dx;
				this.y = _dy;
				this.w = _dw;
				this.h = _dh;
				this.sx = _sx;
				this.sy = _sy;
				this.sw = _sw;
				this.sh = _sh;
				this.context.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
			}

		}
	};
	image_object.image.src = _filename;
	image_object.image.onload = function() {
		image_object.draw(image_object.x, image_object.y, image_object.w, image_object.h);
	};

	return image_object;
}

export function text(text, font, fill, stroke, stroke_width, x, y) {
	main_context.font = font;
	if(stroke_width > 0.0) {
		main_context.fillStyle = stroke;
		main_context.fillText(text, x + stroke_width, y + stroke_width);
		main_context.fillText(text, x - stroke_width, y - stroke_width);
		main_context.fillText(text, x - stroke_width, y);
		main_context.fillText(text, x, y - stroke_width);
		main_context.fillText(text, x + stroke_width, y);
		main_context.fillText(text, x, y + stroke_width);
	}
	main_context.fillStyle = fill;
	main_context.fillText(text, x, y);
}

function create_radial_gradient(x0, y0, x1, y1, c0, c1) {
	var grd = temp_context.createRadialGradient(x0, y0, 0, x1, y1, 100);
	grd.addColorStop(0, c0);
	grd.addColorStop(1, c1);
	return grd;
}
function create_linear_gradient(x0, y0, x1, y1, c0, c1) {
	var grd = temp_context.createLinearGradient(x0, y0, x1, y1);
	grd.addColorStop(0, c0);
	grd.addColorStop(1, c1);
	return grd;
}
export function rect(x, y, w, h, s, c) {
	temp_context.transform(1, 0, s, 1, 0, 0);//shear(s)
	temp_context.translate(27 * -s, 0);
	temp_context.translate(w / 2, h / 2);
	temp_context.fillStyle = c;
	temp_context.fillRect(-w / 2, -h / 2, w, h);
	main_context.drawImage(temp_canvas, x, y);

	temp_context.resetTransform();
	temp_context.clearRect(0, 0, temp_canvas.width, temp_canvas.height);
	main_context.resetTransform();
}
export function linear_gradient_rect(x, y, w, h, s, c0, c1) {
	rect(x, y, w, h, s, create_linear_gradient(-w / 2, -h / 2, w / 2, h / 2, c0, c1));
}
export function radial_gradient_rect(x, y, w, h, s, c0, c1) {
	rect(x, y, w, h, s, create_radial_gradient(0, 0, -w / 2, -h / 2, c0, c1));
}
export function get_width(){
	return main_canvas.width;
}
export function get_height(){
	return main_canvas.height;
}
export function init(w, h, _fps){
	fps = _fps;
	main_canvas = document.getElementById('myCanvas');
	main_canvas.width = w;
	main_canvas.height = h;
	main_context = main_canvas.getContext('2d');
	temp_canvas = document.getElementById('tempCanvas');
	temp_context = temp_canvas.getContext('2d');
}
