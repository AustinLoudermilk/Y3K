function Sprite(sheet, posX, posY, size) {
    this.sheet = sheet;
    this.x = posX;
    this.y = posY;
    this.size = size;

    this.update = function() {};

    this.posss = 0;
    this.draw = function(ctx, x, y) {
        ctx.drawImage(this.sheet, this.x * this.size, this.y * this.size, this.size, this.size, x, y, this.size, this.size);
    };
}