var Player = function() {
  var spritePath = 'img/simple-player.png';
  var ready = false;

  this.sprite = new SpriteSheet(spritePath, {
    cellSize: {
      height: 24,
      width: 24
    }
  });

  this.sprite.addAnim('idle', 1, [0]);
  this.sprite.addAnim('move', 0.15, [0,1,2,3], true);

  this.speed = 25;

  this.update = function(delta, input) {
    this.sprite.currentAnimation = 'idle';
    if(input.keys.left) {
      this.pos.x -= this.speed * delta;
      this.sprite.currentAnimation = 'move';
      this.sprite.flip.x = true;
    }

    if(input.keys.right) {
      this.pos.x += this.speed * delta;
      this.sprite.currentAnimation = 'move';
      this.sprite.flip.x = false;
    }

    this.sprite.update(delta);
  };

  this.draw = function(canvas, ctx) {
    this.sprite.draw(ctx, this.pos);
  };

  // finish loading the player
  this.pos = { x: 0, y: 0 };
};
