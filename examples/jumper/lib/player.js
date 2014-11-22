var Player = function() {
  var spritePath = 'img/rock.png';
  var ready = false;

  this.sprite = new SpriteSheet(spritePath, {
    cellSize: {
      height: 64,
      width: 64
    }
  });

  this.sprite.addAnim('idle', 0.2, [30,31,32,33,34], true);
  this.sprite.addAnim('move', 0.05, [3,4,5,6,7,8,9,10], true);
  this.sprite.addAnim('jump', 1, [21]);

  this.speed = 250;
  this.jumpHeight = 500;

  this.update = function(delta, input) {
    this.sprite.currentAnimation = 'idle';
    var vel = { x: 0, y: 0 };
    if(input.keys.up || vel.y != 0) {
      vel.y -= this.jumpHeight * delta;
      this.sprite.currentAnimation = 'jump';
    }

    if(input.keys.left) {
      vel.x -= this.speed * delta;
      this.sprite.currentAnimation = 'move';
      this.sprite.flip.x = true;
    }

    if(input.keys.right) {
      vel.x += this.speed * delta;
      this.sprite.currentAnimation = 'move';
      this.sprite.flip.x = false;
    }

    this.pos = this.collisionMediator.mediateCollision(this, vel, delta);
    this.sprite.update(delta);
  };

  this.draw = function(canvas, ctx) {
    this.sprite.draw(ctx, this.pos);
  };

  // finish loading the player
  this.pos = { x: 0, y: 0 };
};
