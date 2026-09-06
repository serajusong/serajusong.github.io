// SVG animation tracer — paste entire file into DevTools console ON THE ORIGINAL SITE.
// Survives refresh via localStorage: paste once, refresh, paste again to keep tracking.
// Commands: hwDump() = show table, hwClear() = reset storage.

(function () {
  var KEY = 'hwTraceV1';
  var store;
  try {
    store = JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch (e) { store = []; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {}
  }
  function log() {
    var a = ['[hw-trace]'].concat([].slice.call(arguments));
    console.log.apply(console, a);
  }

  // mark a reload boundary so runs can be told apart
  store.push({ ev: 'run', at: new Date().toISOString() });
  save();

  // heuristic: the handwriting svg = the svg with the most <path> children
  var svgs = Array.prototype.slice.call(document.querySelectorAll('svg'));
  if (!svgs.length) { log('FAIL: no svg on page'); return; }
  var scored = svgs.map(function (s, i) {
    return { i: i, el: s, n: s.querySelectorAll('path').length };
  }).sort(function (a, b) { return b.n - a.n; });
  var target = scored[0];
  log('tracking svg#' + target.i + ' with ' + target.n + ' paths' +
    (scored[1] ? (' (next best: svg#' + scored[1].i + ' with ' + scored[1].n + ')') : ''));
  var paths = Array.prototype.slice.call(target.el.querySelectorAll('path'));
  var t0 = performance.now();
  var seen = {};
  var mo = new MutationObserver(function (muts) {
    var now = performance.now() - t0;
    for (var k = 0; k < muts.length; k++) {
      var idx = paths.indexOf(muts[k].target);
      if (idx < 0 || seen[idx]) continue;
      seen[idx] = true;
      var row = { ev: 'start', path: idx, t: +now.toFixed(0) };
      try {
        var b = muts[k].target.getBBox();
        row.x = +b.x.toFixed(1);
        row.len = +muts[k].target.getTotalLength().toFixed(1);
      } catch (e) {}
      store.push(row);
      save();
      log('path ' + idx + ' animates at +' + row.t + 'ms' +
        (row.x != null ? (' x=' + row.x) : ''));
    }
  });
  paths.forEach(function (p) {
    mo.observe(p, { attributes: true, attributeFilter: ['style'] });
  });
  log('observer armed. Let it play (or refresh + paste again), then run hwDump().');

  window.hwDump = function () {
    var starts = store.filter(function (r) { return r.ev === 'start'; });
    log('total start events: ' + starts.length);
    console.table(starts.map(function (r, n) {
      return { order: n + 1, path: r.path, tMs: r.t, x: r.x, len: r.len };
    }));
    // per-run order summary (split by reload markers)
    var runs = [], cur = [];
    store.forEach(function (r) {
      if (r.ev === 'run') { if (cur.length) runs.push(cur); cur = []; }
      else cur.push(r.path);
    });
    if (cur.length) runs.push(cur);
    runs.forEach(function (r, n) { log('run ' + (n + 1) + ' order: [' + r.join(', ') + ']'); });
    return starts;
  };
  window.hwClear = function () {
    localStorage.removeItem(KEY);
    store = [];
    log('storage cleared. Refresh + paste again for a clean trace.');
  };
  return 'OK: tracking ' + paths.length + ' paths — run hwDump() after play';
})();
