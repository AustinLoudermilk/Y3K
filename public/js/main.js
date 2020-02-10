//"use strict";

let game;
let cvs = new Array();
let ctx = new Array();

let gSet = {
	FPS: 30,

	loops : 0,
	skipTicks : 1000 / 30,
	maxFrameSkip : 10,
	nextTick : (new Date).getTime(),

	frames: 0
};

//**//

function Game(width, height) {
	this.width = width;
	this.height = height;

	this.cvs = cvs;
	this.ctx = ctx;

	this.entities = [];
	this.objects = [];

	this.maps = [];
	this.currentMap = null;

	this.sheets = [];
	this.sprites = [];
	this.emitters = [];

	this.score = 0;

	this.three = { };
	this.scenes = { }; 

	this.STATE = {
		running: false,
	};
};

Game.prototype.loadRes = function(canvas, ctx) {
	// -- LOAD RES

	this.threeInit();
	this.init();
};

Game.prototype.threeInit = function() {
	// -- CREATE RENDERER

	this.three.renderer = new THREE.WebGLRenderer ({ context: this.ctx[1] });

	// --

	// -- CREATE SCENES

	this.scenes["MENU"] = { };
	this.scenes["MENU"].settings = {fov: 45, aspect: 2, near: 0.1, far: 5};
	this.scenes["MENU"].scene = new Scene("MENU", this.cvs[1], this.scenes["MENU"].settings);

	this.scenes["MENU"].scene.init = function() {
		const sceneInfo = makeScene(document.querySelector('#pyramid'));
		const radius = .8;
		const widthSegments = 4;
		const heightSegments = 2;
		const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
		const material = new THREE.MeshPhongMaterial({
			color: 'blue',
			flatShading: true,
		});
		const mesh = new THREE.Mesh(geometry, material);
		sceneInfo.scene.add(mesh);
		sceneInfo.mesh = mesh;
		return sceneInfo;
	};
		
	let keys = Object.keys(this.scenes);
	for(i in keys) this.scenes[keys[i]].init;

	// --
};

Game.prototype.init = function() {
	window.addEventListener("keydown", Key.onKeydown, true);
	window.addEventListener("keyup", Key.onKeyup, true);

	whitePart = {random: true, colors:["#c2a8e0"], size: 4, square: true, life: 500, glowcol:"#fff", gradius:100};
	this.particles = [whitePart];
		
	this.emitters.push(new Emitter(this.ctx[0], new Vector(this.width / 2, this.height / 2), this.particles, 50, "#912", 1000));

	console.log("test");

	/* START GAME */
	this.start();
};

Game.prototype.onClick = function(event) {
	//if(this.emitters[0].running) this.emitters[0].stop();
	//else this.emitters[0].start();
};

Game.prototype.update = function() {
	this.update2d();
	this.update3d();
};

Game.prototype.update2d = function() {
	for(let i = 0; i < this.emitters.length; i++)
		this.emitters[i].update();
};

Game.prototype.update3d = function() {
	//canvas logic
};

Game.prototype.draw = function(ctx) {
	this.ctx[0].clearRect(0, 0, this.ctx[0].canvas.width, this.ctx[0].canvas.height);
	this.draw2d(ctx[0]);

	//this.ctx[1].clearRect(0, 0, this.ctx[1].canvas.width, this.ctx[1].canvas.height);
	this.draw3d(ctx[1]);
};

Game.prototype.draw2d = function(ctx) {
	for(let i = 0; i < this.emitters.length; i++)
		this.emitters[i].draw(this.ctx[0]);
};

Game.prototype.draw3d = function(ctx) {
	//draw here
	this.three.renderer.render(this.three.scene, this.three.camera);
};

Game.prototype.start = function() {
	log("started");

	this.emitters[0].start();

	this._main = setInterval(function () {
		gSet.loops = 0;
		
		while ((new Date).getTime() > gSet.nextTick && gSet.loops < gSet.maxFrameSkip) {
			game.update();
			gSet.nextTick += gSet.skipTicks;
			gSet.loops++;
		}
		
		gSet.frames++;
		game.draw(game.ctx[1]);
	}, 1000 / gSet.FPS);
}

//**//
 
window.onload = function() {
	cvs.push(this.document.getElementById("d2"), this.document.getElementById("d3"));

	ctx.push(cvs[0].getContext("2d"), cvs[1].getContext("webgl"));

	if(cvs.length > 0) {
		let width = window.innerWidth;
		let height = window.innerHeight;

		for(i in cvs) {
			let devicePixelRatio = window.devicePixelRatio || 1,
			backingStoreRatio = ctx[i].webkitBackingStorePixelRatio ||
								ctx[i].mozBackingStorePixelRatio ||
								ctx[i].msBackingStorePixelRatio ||
								ctx[i].oBackingStorePixelRatio ||
								ctx[i].backingStorePixelRatio || 1,

			ratio = (devicePixelRatio / backingStoreRatio);

			if(devicePixelRatio !== backingStoreRatio) {
				cvs[i].width = width * ratio;
				cvs[i].height = height * ratio;

				if(ctx[i].scale) ctx[i].scale(ratio, ratio);
			}

			cvs[i].style.width = width + 'px';
			cvs[i].style.height = height + 'px';

			ctx[i].mozImageSmoothingEnabled = false;
			ctx[i].webkitImageSmoothingEnabled = false;
			ctx[i].msImageSmoothingEnabled = false;
			ctx[i].imageSmoothingEnabled = false;
		}

		game = new Game(width, height);
		game.loadRes(this.cvs, this.ctx);

	} else {
		console.log("err: loading canvas");
	}
};