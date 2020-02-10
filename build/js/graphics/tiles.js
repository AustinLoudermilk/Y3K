function Tile(id, sprite) {
    this.id = id;
    this.sprite = sprite;

    this.pos = new Vector(0, 0);

    this.update = function() {
        this.sprite.update();
    };
    
    this.draw = function(ctx, x, y) {
        this.pos.x = x;
        this.pos.y = y;
        this.sprite.draw(ctx, this.pos.x, this.pos.y);
    };
}