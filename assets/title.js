(function () {
  var title = document.querySelector('.site-title');
  if (!title) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var layer = title.querySelector('.extras');
  var leftEcho = title.querySelector('.echo-left');
  var rightEcho = title.querySelector('.echo-right');
  if (!layer || !leftEcho || !rightEcho) return;

  var MAX = 5;
  var SPAWN_MS = 700;
  var SPEED_MIN = 70;
  var SPEED_MAX = 130;
  var GAP = 6;

  var extras = [];
  var spawnTimer = null;
  var rafId = null;
  var lastTime = 0;
  var active = false;
  var cachedBounds = null;

  function computeBounds() {
    var t = title.getBoundingClientRect();
    var l = leftEcho.getBoundingClientRect();
    var r = rightEcho.getBoundingClientRect();
    return {
      left: (l.right - t.left) + GAP,
      right: (r.left - t.left) - GAP
    };
  }

  function getBounds() {
    if (!cachedBounds) cachedBounds = computeBounds();
    return cachedBounds;
  }

  function invalidate() {
    cachedBounds = null;
  }

  function spawn() {
    if (extras.length >= MAX) return;
    var el = document.createElement('span');
    el.className = 'extra';
    el.textContent = 'Extra';
    layer.appendChild(el);

    var b = getBounds();
    var center = (b.left + b.right) / 2;
    var x = center + (Math.random() - 0.5) * 24;
    var speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    var vx = (Math.random() < 0.5 ? -1 : 1) * speed;
    var w = el.offsetWidth;

    el.style.transform = 'translate3d(' + (x - w / 2) + 'px, 0, 0)';
    extras.push({ el: el, x: x, vx: vx, w: w });
  }

  function step(now) {
    if (!active) return;
    var dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
    lastTime = now;
    var b = getBounds();
    var i, j, e;

    for (i = 0; i < extras.length; i++) {
      e = extras[i];
      e.x += e.vx * dt;
      var half = e.w / 2;
      if (e.x - half < b.left) { e.x = b.left + half; e.vx = Math.abs(e.vx); }
      if (e.x + half > b.right) { e.x = b.right - half; e.vx = -Math.abs(e.vx); }
    }

    for (i = 0; i < extras.length; i++) {
      for (j = i + 1; j < extras.length; j++) {
        var a = extras[i], c = extras[j];
        var minD = (a.w + c.w) / 2;
        var dx = c.x - a.x;
        var adx = dx < 0 ? -dx : dx;
        if (adx < minD) {
          var approaching = (dx > 0 && a.vx > c.vx) || (dx < 0 && a.vx < c.vx);
          if (approaching) {
            var tmp = a.vx; a.vx = c.vx; c.vx = tmp;
            var overlap = minD - adx;
            if (dx > 0) { a.x -= overlap / 2; c.x += overlap / 2; }
            else { a.x += overlap / 2; c.x -= overlap / 2; }
          }
        }
      }
    }

    for (i = 0; i < extras.length; i++) {
      e = extras[i];
      e.el.style.transform = 'translate3d(' + (e.x - e.w / 2) + 'px, 0, 0)';
    }

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (active) return;
    active = true;
    extras = [];
    layer.innerHTML = '';
    invalidate();
    spawn();
    spawnTimer = setInterval(spawn, SPAWN_MS);
    lastTime = 0;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    active = false;
    if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    extras = [];
    layer.innerHTML = '';
  }

  window.addEventListener('resize', invalidate);
  title.addEventListener('mouseenter', start);
  title.addEventListener('mouseleave', stop);
  title.addEventListener('focus', start);
  title.addEventListener('blur', stop);
})();
