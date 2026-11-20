/* Globo pontilhado em canvas, sem dependências (substitui o globo do print 08). */
window.Globe = (function () {
  function color(name, alpha) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (document.querySelector('.dark')) v = getComputedStyle(document.querySelector('.dark')).getPropertyValue(name).trim() || v;
    return 'hsl(' + v + ' / ' + alpha + ')';
  }

  function mount(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var N = 1400, pts = [], gold = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = gold * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    var tilt = 0.35, rot = 0;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function frame() {
      if (!canvas.isConnected) return;
      var W = canvas.width, H = canvas.height, R = W * 0.44, cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      var g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      g.addColorStop(0, color('--card', 1));
      g.addColorStop(1, color('--muted', 1));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = color('--border', 1); ctx.lineWidth = 2; ctx.stroke();

      var cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
      var dot = color('--muted-foreground', 0.55);
      ctx.fillStyle = dot;
      for (var k = 0; k < pts.length; k++) {
        var p = pts[k];
        var x = p[0] * cr + p[2] * sr, z = -p[0] * sr + p[2] * cr, yy = p[1];
        var y2 = yy * ct - z * st, z2 = yy * st + z * ct;
        if (z2 < 0.05) continue;
        ctx.globalAlpha = 0.25 + z2 * 0.75;
        ctx.beginPath(); ctx.arc(cx + x * R, cy + y2 * R, 1.2 + z2 * 1.4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!still) { rot += 0.003; requestAnimationFrame(frame); }
    }
    frame();
  }

  return { mount: mount };
})();
