function log(str) {
    for (var i = 0; i < arguments.length; i++) 
        console.log(arguments[i]);
}

Function.prototype.inherits = function(parent) {
    this.prototype = Object.create(parent.prototype);
};

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1-y2));
}

function vMap(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

function isCollide(a, b) {
    aX = a.pos.x;
    aY = a.pos.y;
    bX = (b.pos.x - (b.width / 2));
    bY = (b.pos.y - (b.height / 2));
    return !(
        ((aY + a.height) < (bY)) ||
        (aY > (bY + b.height)) ||
        ((aX + a.width) < bX) ||
        (aX > (bX + b.width))
    );
}

function getSize(obj) {
    var size = 0, key;
    for (key in obj) if (obj.hasOwnProperty(key)) size++;
    return size;
};

function random(min, max) {

    var rand = Math.random();
    if (typeof min === 'undefined') {
        return rand;
    } else if (typeof max === 'undefined') {
        if (min instanceof Array) {
            return min[Math.floor(rand * min.length)];
        } else {
            return rand * min;
        }
    } else {
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }

        return rand * (max-min) + min;
    }
};

function dRect(ctx, x, y, width, height, color, center, deg, fill, stroke) {
    if(color) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
    } else {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = color;
    }
    
    if(stroke) ctx.lineWidth = stroke;

    var pos = 0;
    if(center) pos = new Vector((x - (width / 2)), (y - (height / 2)));
    else pos = new Vector(x, y);

    x = pos.x;
    y = pos.y;

    var rad;
    if(deg > 0) {
        ctx.save();
        ctx.translate(x, y);

        rad = deg * Math.PI / 180;
        ctx.rotate(rad);

        x = width / 2 * (-1);
        y = height / 2 * (-1);
    }
    
    if(fill) ctx.fillRect(x, y, width, height);
    else {
        ctx.beginPath();
        ctx.rect(x, y, width, height); 
        ctx.stroke();
    }

    if(deg > 0) ctx.restore();
}

function createObject(arr) {
    var obj = {};
    var mod = obj;
    for (var i = 0, j = arr.length; i < j; i++) {
        if (i === (j - 1)) {
            mod.value = arr[i];
        } else {
            mod[arr[i]] = {};
            mod = mod[arr[i]];
        }
    }
    return obj;
}