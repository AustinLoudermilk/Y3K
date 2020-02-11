//"use strict";

let game;
let cvs = new Array();
let ctx = new Array();

let j = 0;

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
		activeScene: "",
	};
};

Game.prototype.loadRes = function(canvas, ctx) {
	// -- LOAD RES

	this.threeInit(this.cvs[1], this.ctx[1]);
	this.init(this.cvs[0], this.ctx[0]);
};

Game.prototype.threeInit = function(cvs, ctx) {
	// -- CREATE RENDERER

	this.three.renderer = new THREE.WebGLRenderer ({ canvas: document.getElementById("d3") });

	// --

	// -- CREATE SCENES

	this.scenes["MENU"] = { };
	let set = {
		fov: 35, 
		aspect: this.width / this.height,
		near: 0.1,
		far: 1000
	};
	this.scenes["MENU"].scene = new Scene("MENU", ctx, set);

	this.scenes["MENU"].scene.loadMesh = function() {
		if(!this.scenes["MENU"].scene.objs) this.scenes["MENU"].scene.objs = new Array();

		//OBJS
		var geo = new THREE.PlaneGeometry( 10000, 10000, 100, 100 );
		var mat = new THREE.MeshLambertMaterial( {color: 0x000, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geo, mat );
		plane.rotation.x = -90 * Math.PI / 180;
		plane.position.y = -50;

		this.scenes["MENU"].scene.objs.push( plane );
		this.objects["plane"] = plane;

		var geo2 = new THREE.BoxGeometry( 20, 20, 20 );
		var mat2 = new THREE.MeshNormalMaterial ({
			color: 0xfcad03,
			transparent: true,
			opacity: 1,
		});
		var box = new THREE.Mesh( geo2, mat2 );
		box.position.x = -40;
		box.position.z = -200;

		this.scenes["MENU"].scene.objs.push( box );
		this.objects["box"] = box;

		//LIGHTS
		dirL = new Light("MENU1", "#fff", .8);

		this.scenes["MENU"].scene.lights.push( dirL );
		
	}.bind(this);

	let keys = Object.keys(this.scenes);
	for(i in keys) {
		let el = this.scenes[keys[i]];

		el.scene.init();
	};

	// --
};

Game.prototype.init = function(cvs, ctx) {
	window.addEventListener("keydown", Key.onKeydown, true);
	window.addEventListener("keyup", Key.onKeyup, true);

	whitePart = {random: true, colors:["#c2a8e0"], size: 4, square: true, life: 500, glowcol:"#fff", gradius:100};
	this.particles = [whitePart];
		
	this.emitters.push(new Emitter(ctx, new Vector(this.width / 2, this.height / 2), this.particles, 50, "#912", 1000));

	/* -- */

	this.STATE.activeScene = this.scenes["MENU"].scene;
	this.STATE.activeScene.loadMesh();

	for(let m in this.STATE.activeScene.objs)
		this.STATE.activeScene.scene.add( this.STATE.activeScene.objs[ m ] );

	for(let l in this.STATE.activeScene.lights)
		this.STATE.activeScene.scene.add( this.STATE.activeScene.lights[ l ] );

	console.log(this.STATE.activeScene);

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

	this.objects["box"].rotation.x += 0.01;
	this.objects["box"].rotation.y += 0.01;
};

Game.prototype.draw = function(ctx) {
	this.ctx[0].clearRect(0, 0, this.ctx[0].canvas.width, this.ctx[0].canvas.height);
	this.draw2d(ctx[0]);

	//this.ctx[1].clearRect(0, 0, this.ctx[1].canvas.width, this.ctx[1].canvas.height);
	this.draw3d(ctx[1]);
};

Game.prototype.draw2d = function(ctx) {
	for(let i = 0; i < this.emitters.length; i++)
		this.emitters[i].draw(ctx);
};

Game.prototype.draw3d = function(ctx) {
	//this.STATE.activeScene.camera.rotation.x += 0.01;
	//this.STATE.activeScene.camera.rotation.y += 0.01;

	{ //MENU90
		this.three.renderer.render(this.STATE.activeScene.scene, this.STATE.activeScene.camera);
	}
	
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
		game.draw(game.ctx);
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

		if(false) Sandbox(cvs, ctx);
		else {
			game = new Game(width, height);
			game.loadRes(cvs, ctx);
		}

	} else {
		console.log("err: loading canvas");
	}
};

function Sandbox(cvs, ctx) {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	
	//var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("d3") });
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry();
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	console.log(scene);
	console.log(renderer);

	var animate = function () {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	};

	animate();
}