'use strict';

const fps_val = 20;
let color_set = 0;

const main_canvas = document.querySelector("canvas");
const main_context = main_canvas.getContext("2d");

main_canvas.width = document.body.clientWidth;
main_canvas.height = document.body.clientHeight;

let centerX = main_canvas.width / 2;
let centerY = main_canvas.height / 2;
let radius =  Math.floor(main_canvas.width / 6.5);
let steps =  Math.floor(main_canvas.width / 7);
let interval = 360 / steps;
let pointsUp = [];
let pointsDown = [];
let pCircle = 2 * Math.PI * radius;
const angleExtra = 90;

// Create points
for (let angle = 0; angle < 360; angle += interval) {
	const distUp = 1.1;
	const distDown = 0.9;

	pointsUp.push({
		angle: angle + angleExtra,
		x:
			centerX +
			radius * Math.cos(((-angle + angleExtra) * Math.PI) / 180) * distUp,
		y:
			centerY +
			radius * Math.sin(((-angle + angleExtra) * Math.PI) / 180) * distUp,
		dist: distUp
	});

	pointsDown.push({
		angle: angle + angleExtra + 5,
		x:
			centerX +
			radius * Math.cos(((-angle + angleExtra + 5) * Math.PI) / 180) * distDown,
		y:
			centerY +
			radius * Math.sin(((-angle + angleExtra + 5) * Math.PI) / 180) * distDown,
		dist: distDown
	});
}

// -------------
// Audio stuff
// -------------

// make a Web Audio Context
const context = new AudioContext();
const splitter = context.createChannelSplitter();

const analyserL = context.createAnalyser();
analyserL.fftSize = 8192;

const analyserR = context.createAnalyser();
analyserR.fftSize = 8192;

splitter.connect(analyserL, 0, 0);
splitter.connect(analyserR, 1, 0);

// Make a buffer to receive the audio data
const bufferLengthL = analyserL.frequencyBinCount;
const audioDataArrayL = new Uint8Array(bufferLengthL);

const bufferLengthR = analyserR.frequencyBinCount;
const audioDataArrayR = new Uint8Array(bufferLengthR);

// Make a audio node
var audio;

function loadAudio(_game) {
	audio = document.getElementById("myAudio");
	audio.loop = true;
	audio.autoplay = true;
	audio.crossOrigin = "anonymous";

	// call `handleCanplay` when it music can be played
	audio.addEventListener("canplay", handleCanplay);
	audio.src = "assets/" + _game + ".mp3";
	audio.load();
}

function handleCanplay() {
	// connect the audio element to the analyser node and the analyser node
	// to the main Web Audio context
	const source = context.createMediaElementSource(audio);
	source.connect(splitter);
	splitter.connect(context.destination);
}

document.body.addEventListener("touchend", function (ev) {
	context.resume();
});

// -------------
// main_canvas stuff
// -------------
function Rand(max) {
	return Math.floor(Math.random() * max);
}

function create_radial_gradient(x0, y0, x1, y1, r1, r2, c0, c1, c2, c3) {
	let grd = main_context.createRadialGradient(x0, y0, r1, x1, y1, r2);
	grd.addColorStop(0, c0);
	grd.addColorStop(0.8, c1);
	grd.addColorStop(0.9, c2);
	grd.addColorStop(1, c3);
	return grd;
}

function drawLine(points) {
	let origin = points[0];

	main_context.beginPath();
	//"rgba(" + Rand(255) + "," + Rand(255) + "," + Rand(255) + ",0.5)";
	main_context.strokeStyle = "rgba(255,255,255,0.5)";
	main_context.lineJoin = "round";
	main_context.moveTo(origin.x, origin.y);

	for (let i = 0; i < points.length; i++) {
		main_context.lineTo(points[i].x, points[i].y);
	}

	main_context.lineTo(origin.x, origin.y);

	let color_a = "rgba(27,61,86,0.5)";
	let color_b = "rgba(95,147,184,0.5)";
	let color_c = "rgba(255,255,255,0.0)";
	let color_d = "rgba(0,0,0,0.0)";
	switch(color_set) {
		case 1: {
			console.log(color_set);
			color_a = "rgba(255,0,0,0.5)";
			color_b = "rgba(255,128,0,0.5)";
			color_c = "rgba(255,255,255,0.0)";
			color_d = "rgba(0,0,0,0.0)";
			break;
		}
	}
	main_context.fillStyle = create_radial_gradient(centerX, centerY, centerX, centerY, main_canvas.width / 4.8, main_canvas.height / 3.8,
		color_a, color_b, color_c, color_d,)
	main_context.fill();   // fill the shape

	main_context.stroke();
}

function connectPoints(pointsA, pointsB) {
	for (let i = 0; i < pointsA.length; i++) {
		main_context.beginPath();
		main_context.strokeStyle = "rgba(255,255,255,0.5)";
		main_context.moveTo(pointsA[i].x, pointsA[i].y);
		main_context.lineTo(pointsB[i].x, pointsB[i].y);
		main_context.stroke();
	}
}

function update(dt) {
	let audioIndex, audioValue;

	// get the current audio data
	analyserL.getByteFrequencyData(audioDataArrayL);
	analyserR.getByteFrequencyData(audioDataArrayR);

	for (let i = 0; i < pointsUp.length; i++) {
		audioIndex =
			Math.ceil(pointsUp[i].angle * (bufferLengthL / (pCircle * 2))) | 0;
		// get the audio data and make it go from 0 to 1
		audioValue = audioDataArrayL[audioIndex] / 255;

		pointsUp[i].dist = 1.1 + audioValue * 0.8;
		pointsUp[i].x =
			centerX +
			radius *
				Math.cos((-pointsUp[i].angle * Math.PI) / 180) *
				pointsUp[i].dist;
		pointsUp[i].y =
			centerY +
			radius *
				Math.sin((-pointsUp[i].angle * Math.PI) / 180) *
				pointsUp[i].dist;

		audioIndex =
			Math.ceil(pointsDown[i].angle * (bufferLengthR / (pCircle * 2))) | 0;
		// get the audio data and make it go from 0 to 1
		audioValue = audioDataArrayR[audioIndex] / 255;

		pointsDown[i].dist = 0.9 + audioValue * 0.2;
		pointsDown[i].x =
			centerX +
			radius *
				Math.cos((-pointsDown[i].angle * Math.PI) / 180) *
				pointsDown[i].dist;
		pointsDown[i].y =
			centerY +
			radius *
				Math.sin((-pointsDown[i].angle * Math.PI) / 180) *
				pointsDown[i].dist;
	}
}

function draw(dt) {
	requestAnimationFrame(draw);

	update(dt);

	main_context.clearRect(0, 0, main_canvas.width, main_canvas.height);

	drawLine(pointsUp);
	drawLine(pointsDown);
	connectPoints(pointsUp, pointsDown);
}

function init(_game, _color_set) {
	color_set = _color_set;
	document.getElementsByTagName("BODY")[0].style.backgroundImage = "url('assets/" + _game + ".png')";
	loadAudio(_game);

	main_canvas.width = document.body.clientWidth;
	main_canvas.height = document.body.clientHeight;

	centerX = main_canvas.width / 2;
	centerY = main_canvas.height / 2;
	radius =  Math.floor(main_canvas.width / 6.5);
	steps =  Math.floor(main_canvas.width / 7);
	interval = 360 / steps;
	pCircle = 2 * Math.PI * radius;

	main_canvas.style.left = "0px";
	main_canvas.style.top = "0px";
	main_canvas.style.position = "absolute";

	draw();
}
window.init = init;
