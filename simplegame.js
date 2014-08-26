(function(root) {
  var Help = {
    each: function(arr, fn) {
      for(var i = -1, l = arr.length; ++i < l;) {
        fn(arr[i]);
      }
    },
    extend: function(obj) {
      this.each(Array.prototype.slice.call(arguments, 1), function(src) {
        if(src) {
          for(var prop in src) {
            obj[prop] = src[prop];
          }
        }
      });
      return obj;
    },
    throwError: function(msg, name) {
      var error = new Error(msg);
      error.name = name || 'Error';
      throw error;
    }
  };

  var Game = function(options) {
    options = Help.extend({}, Game.defaults, options);
    var canvas = options.canvas || document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var _objects = options.objects || [];
    var lastFrameTime = Date.now();
    var currentFrame = 0;
    var ms_per_frame = 400;
    var frame_count = 3;

    // internal abstraction over request anim frame
    // because browser API design is apparently hard
    var requestAnimFrame = (function(callback) {
      return window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
          window.setTimeout(callback, 1000 / options.fps);
        };
    })();

    var update = this.update = function() {
      var delta = Date.now() - lastFrameTime;
      if(delta > ms_per_frame) {
        lastFrameTime = Date.now();
        currentFrame++;
        if(currentFrame === frame_count) {
          currentFrame = 0;
        }
      }

      Help.each(_objects, function(o){
        if(o.update) o.update(delta);
      });
    };

    var draw = this.draw = function() {
      ctx.fillStyle = options.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      _objects = _objects.sort(function(a,b) {
        return a.depth - b.depth;
      });

      Help.each(_objects, function(o) {
        if(o.draw) o.draw(canvas, ctx);
      });

      ctx.restore();
    };

    this.addObject = function(obj) {
      if(!obj.hasOwnProperty('draw') && obj.hasOwnProperty('update')) {
        Help.throwError('a game object needs a draw() or update()');
        return;
      }
      obj.depth = obj.depth || 1;
      _objects.push(obj);
    };

    this.getObject= function(fn) {
      for(var i = -1, l = _objects.length; ++i < l;) {
        if(fn(_objects[i])) {
          return _objects[i];
        }
      }
    };

    var loop = function() {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  };

  Help.extend(Game, {
    defaults: {
      fps: 60,
      bg: '#ffffff'
    }
  });

  root.Game = Game;
})(this);
