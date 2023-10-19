window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
  };
})();

$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;

  $(window).resize(function() {
      canvas.width = window.innerWidth;
  });
});


$(document).ready(function () {
  $('#canvas').mousedown(function () {
      settings.velocity_x += 2;

  }).mouseup(function () {
      settings.velocity_x -= 2;

  });
  star = function () {
      this.offset = 0;
      this.x = 0,
      this.y = 0,
      this.params = {
          velocity_x: -1,
          velocity_y: 1,
          opacicty: 1,
          lifetime: 3,
          x_offset: 0,
          y_offset: 0,
          radius: 0,
          decay: 0,
          growth: 0,
          amplitude: 100,
          phaseshift: 360,
          freq: 0.05,
          color: '255,255,255'
      };
  };


  star.prototype.init = function () {
      //Randomize
      this.params.phaseshift = (Math.random() * 0.01);
      this.params.amplitude = Math.ceil(Math.random() * settings.amplitudeSeed);
      this.params.freq = (Math.random() * settings.freqSeed);
      this.params.x_offset = Math.ceil(Math.random() * 1000);
      this.params.y_offset = settings.y_center + Math.ceil(Math.random() * settings.y_offsetSeed);
      this.params.lifetime = Math.ceil(Math.random() * 3);
      this.params.velocity_x = -(Math.random() * settings.velocity_xSeed)
      this.params.velocity_y = (Math.random() * settings.velocity_ySeed)
      this.params.radius = (Math.random() * settings.maxradius);
      this.params.opacity = Math.round(Math.random() * settings.opacSeed, 2) / 100;
      if (settings.decay) {
          this.params.decay = Math.round(Math.random() * 1.5) * Math.random() * 0.01;
      }
      if (settings.growth) {
          this.params.growth = Math.round(Math.random() * 1.2) * Math.random() * 0.01;
      }

      if (settings.irregColors) {
          switch (Math.ceil(Math.random() * settings.colorPct)) {
              case 1:
                  this.params.color = '255,0,0';
                  break;
              case 2:
                  this.params.color = '0,255,255';
                  break;
              case 3:
                  this.params.color = '0,255,200';
                  break;
              case 4:
                  this.params.color = '255,0,255';
                  break;
              default:
                  this.params.color = '255,255,255';
                  break;
          }
      }
      this.x = this.params.x_offset;
  }

  star.prototype.draw = function (ctx, new_x) {
      this.offset = (this.offset + 1);
      var t = (this.params.x_offset + this.offset);

      if (this.params.opacity > settings.opacMax) {
          this.params.decay *= -1;
          this.params.lifetime--;
      } else if (this.params.opacity <= settings.opacMin) {
          this.params.lifetime--;
          this.params.decay *= -1;
          this.params.opacity = 0;
      }
      if (this.params.radius > settings.maxradius) {
          this.params.growth *= -1;

      } else if (this.params.radius <= 0.2) {
          this.params.growth *= -1;
          this.params.radius = 0.2;
      }
      this.params.radius += 2 * (this.params.growth);

      this.params.opacity += 2 * (this.params.decay);

      this.y = this.params.y_offset + (this.params.amplitude / 4 * Math.sin((2 + t * settings.velocity_y * 0.03) * this.params.freq)) * this.params.velocity_y * settings.scale_y
      this.x += (1 * this.params.velocity_x * settings.velocity_x);
      ctx.beginPath();
      ctx.fillStyle = "rgba(" + this.params.color + "," + Math.round(this.params.opacity * 100) / 100 + ")";
      ctx.arc(this.x, this.y, this.params.radius, 0, Math.PI * 2, false);
      ctx.fill();
  }


  settings = {
      velocity_x: 1,
      scale_y: 1,
      y_center: 250,
      y_offsetSeed: 0,
      velocity_y: 1,
      particles: 1100,
      maxradius: 7,
      irregColors: true,
      decay: true,
      growth: true,
      freqSeed: 1.4,
      amplitudeSeed: 200,
      velocity_xSeed: 3,
      velocity_ySeed: 3,
      opacMax: 0.601,
      opacMin: 0.01,
      opacSeed: 90,
      colorPct: 10


  };

  var stars = [];
  init = function () {
      for (i = 0; i < settings.particles; i++) {
          stars[i] = new star();
          stars[i].init();
      }
  };

  // var gui = new dat.GUI();
  // gui.add(settings, 'velocity_x', -10.1, 10.1);
  // gui.add(settings, 'velocity_y', 0.0, 10.111);
  // gui.add(settings, 'scale_y', -10.1, 10.1);
  // gui.add(settings, 'y_offsetSeed', 0, 500).onChange(function (value) {
  //     init();
  // })
  // gui.add(settings, 'y_center', 0, 500).onChange(function (value) {
  //     init();
  // })
  // gui.add(settings, 'maxradius', 0.2, 100.1).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'decay').onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'colorPct', 4, 100).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'growth').onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'irregColors').onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'particles', 1, 9000).onChange(function (value) {
  //     init();
  // })
  // gui.add(settings, 'freqSeed', 0.1, 30.1).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'amplitudeSeed', 1, 500).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'velocity_xSeed', 1, 10).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'velocity_ySeed', 1, 10).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'opacMax', 0.01, 1.00).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'opacMin', 0.01, 1.00).onChange(function (value) {
  //     init();
  // });
  // gui.add(settings, 'opacSeed', 1, 100).onChange(function (value) {
  //     init();
  // });

  // gui.open();

  var deg2rad = function (angle) {
      return angle * .017453292519943295; // (angle / 180) * Math.PI;
  }

  var colorfreq = function (i) {
      var frequency = .3;
      i = i % 32;
      var red = Math.ceil(Math.sin(frequency * i + 0) * 127 + 128);
      var green = Math.ceil(Math.sin(frequency * i + 2) * 127 + 128);
      var blue = Math.ceil(Math.sin(frequency * i + 4) * 127 + 128);
      return "rgba(" + red + "," + green + "," + blue + "," + settings.alpha + ")";
  }

  init();
  var ctx = document.getElementById("canvas").getContext('2d');
  var offset = 0;
  (function animloop() {
      requestAnimFrame(animloop);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, 1000, 1000);
      for (i = 0; i < settings.particles; i++) {
          stars[i].draw(ctx);
          ctx.beginPath();
          ctx.fill();
          if (stars[i].x > 998 || (stars[i].params.lifetime < 0 && stars[i].params.opacity <= 0) || (stars[i].y < (0 - settings.maxradius)) || (stars[i].x < (0 - settings.maxradius)) || (stars[i].y > (500 + settings.maxradius))) {
              stars[i] = new star();
              stars[i].init();
              stars[i].params.x_offset = (-1) * offset;
              stars[i].x -= Math.random() * 200;
              stars[i].params.opacity = 0;
          }
      }
  })();
});