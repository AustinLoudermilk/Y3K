//"use strict";

cc = 0;

function Particle(settings) {

    //
    // settings
    //
    // width, height, colors, pos, vel, acc, life, random, square, glowcol, gradius
    //

    this.size = 1;
    this.colors = ['#fff'];

    this.glowcol = this.colors[0];
    this.gradius = 0

    this.pos = new Vector(0, 0);
    this.vel = new Vector(0, 0);
    this.acc = random2d();

    this.life = (Math.floor(Math.random() * 100));
    this.dead = false;
    
    if(settings) {
        if(settings.random) {
            if(settings.size)  this.size = (Math.floor(Math.random() * settings.size));
            else                this.size = (Math.floor(Math.random() * 10));

            if(settings.colors) this.colors = settings.colors;
            else                this.colors = [randomColor()];

            if(settings.life)   this.life = (Math.floor(Math.random() * settings.life));

            if(settings.glowcol) if(this.colors == Array) this.glowcol = this.colors[0]; else this.glowcol = this.colors;
            if(settings.gradius) this.gradius = (Math.floor(Math.random() * this.height));
        } else {
            if(settings.size)  this.size = settings.size;
            
            if(settings.pos)    this.pos = settings.pos;
            if(settings.vel)    this.vel = settings.vel;
            if(settings.acc)    this.acc = settings.acc;

            if(settings.glowcol) this.glowcol = settings.glowcol;
            if(settings.gradius) this.gradius = settings.gradius;

            if(settings.life)   this.life = (Math.floor(Math.random() * settings.life));
        }
    }

    this.update = function() {
        if(this.life > 0) {
            this.life--;

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mul(0);
        } else this.dead = true;

        if(this.pos.x < 0 || this.pos.x > window.innerWidth ||
            this.pos.y < 0 || this.pos.y > window.innerHidth) this.dead = true;
    };

    this.draw = function(ctx) {
        if(this.colors == Array) this.color = this.colors[Math.floor(Math.random() * this.colors.length)]; else this.color = this.colors;

        //if(this.life > 0) dRect(ctx, this.pos.x, this.pos.y, this.width, this.height, this.color, true, 0, true);
        if(this.life > 0) {
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fillStyle = this.color;
            if(this.glowcol) {
                ctx.shadowBlur = this.gradius;
                ctx.shadowColor = this.glowcol;
            }
            ctx.fill();
        }
    };
}

function Emitter(ctx, pos, settings, timer, color, max, width, height) {
    this.ctx = ctx;

    this.pos = pos;
    this.settings = settings;
    this.emit = [];
    this.max = max;
    this.color = color;

    this.width = width || 10;
    this.height = height || 10;

    this.angle = 0;
    this.radius = 250; 
    this.speed = 10;
    this.cx = pos.x;
    this.cy = pos.y;

    this.timer = timer;
    this.running = false;
    this.int = null; 

    this.spawn = function() {
        if(this.emit.length < this.max) {
            tempPart = new Particle(this.settings[Math.floor(Math.random() * this.settings.length)]);
            tempPart.pos = new Vector(this.pos.x, this.pos.y);
            tempPart.vel = new Vector(0, 0);
            this.emit.push(tempPart);
        }
    };

    this.update = function() {
        this.angle += Math.acos(1 - Math.pow(this.speed / this.radius, 2) / 2);
        this.pos = new Vector(this.cx + this.radius * Math.cos(this.angle), this.cy + this.radius * Math.sin(this.angle));

        for(var i = 0; i < this.emit.length; i++) {
            if(this.emit[i].dead) this.emit.splice(i, 1);
            else this.emit[i].update();
        }
    };

    this.draw = function() {
        for(var i = 0; i < this.emit.length; i++)
            this.emit[i].draw(this.ctx);

        //BOX
        //dRect(this.ctx, this.pos.x, this.pos.y, this.width, this.height, this.color, true, 0, false, 2);
    };
};

Emitter.prototype.start = function() {
    this.running = true;
    
    if (this.int !== null) return;
    this.int = setInterval(function () {
        this.spawn();
    }.bind(this), this.timer);
}

Emitter.prototype.stop = function() {
    this.running = false;
    
    clearInterval(this.int);
    this.int = null;
}