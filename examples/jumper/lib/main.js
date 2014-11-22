var game = new Game();

game.addObject(new Player());

game.addObject({
  color: 'green',
  pos: { x: 100, y: 100 },
  height: 100,
  width: 100,
  draw: function(canvas, ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }
});
