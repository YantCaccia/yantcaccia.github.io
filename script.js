(function () {
  var root = document.documentElement;

  /* ---------- Theme: always follows the system setting ---------- */
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(isDark) {
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  applyTheme(media.matches);

  // Live-update when the OS switches between light and dark
  if (media.addEventListener) {
    media.addEventListener('change', function (e) { applyTheme(e.matches); });
  } else if (media.addListener) { // Safari < 14
    media.addListener(function (e) { applyTheme(e.matches); });
  }

  /* ---------- Custom tooltips ----------
     Any element with data-tip="text" (and optional data-tip-emoji) gets one.
     - Mouse/pen: shown on hover. Keyboard: shown on :focus-visible.
     - Touch: no hover, so tooltips only appear as tap feedback (e.g. "Copied!").
     - Positioned above the target, flips below if there's no room, and is
       clamped to the viewport with the arrow still pointing at the target. */
  var tip = document.getElementById('tip');
  var tipEmoji = tip.querySelector('.tip__emoji');
  var tipText = tip.querySelector('.tip__text');
  var live = document.getElementById('liveStatus');
  var EDGE = 8;   // min distance from viewport edge
  var GAP = 12;   // distance between target and tooltip
  var current = null;

  function setContent(emoji, text, tone) {
    tipEmoji.textContent = emoji || '';
    tipEmoji.style.display = emoji ? '' : 'none';
    tipText.textContent = text;
    tip.classList.toggle('tip--ok', tone === 'ok');
    tip.classList.toggle('tip--err', tone === 'err');
    // restart the emoji wiggle
    tipEmoji.classList.remove('is-wiggling');
    void tipEmoji.offsetWidth;
    tipEmoji.classList.add('is-wiggling');
  }

  function place(target) {
    var r = target.getBoundingClientRect();
    var vw = document.documentElement.clientWidth;
    var w = tip.offsetWidth;
    var h = tip.offsetHeight;

    var left = r.left + r.width / 2 - w / 2;
    left = Math.max(EDGE, Math.min(left, vw - w - EDGE));

    var side = 'top';
    var top = r.top - h - GAP;
    if (top < EDGE) { side = 'bottom'; top = r.bottom + GAP; }

    // arrow keeps pointing at the target's centre even when the box is clamped
    var ax = r.left + r.width / 2 - left;
    ax = Math.max(18, Math.min(ax, w - 18));

    tip.style.left = Math.round(left) + 'px';
    tip.style.top = Math.round(top) + 'px';
    tip.style.setProperty('--ax', Math.round(ax) + 'px');
    tip.dataset.place = side;
  }

  function show(target, override) {
    var wasVisible = tip.classList.contains('is-visible');
    override = override || {};
    setContent(
      override.emoji !== undefined ? override.emoji : target.dataset.tipEmoji,
      override.text !== undefined ? override.text : target.dataset.tip,
      override.tone
    );
    current = target;
    tip.setAttribute('aria-hidden', 'false');

    if (!wasVisible) {
      // appear in place (no slide from the corner), then animate in
      tip.classList.add('is-snapping');
      place(target);
      void tip.offsetWidth;
      tip.classList.add('is-visible');
      void tip.offsetWidth;
      tip.classList.remove('is-snapping');
    } else {
      place(target); // already open: glide to the new spot
    }
  }

  function hide() {
    current = null;
    tip.classList.remove('is-visible');
    tip.setAttribute('aria-hidden', 'true');
  }

  var tipTargets = document.querySelectorAll('[data-tip]');
  Array.prototype.forEach.call(tipTargets, function (el) {
    el.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'touch') return;
      show(el);
    });
    el.addEventListener('pointerleave', function () { if (current === el) hide(); });
    el.addEventListener('focus', function () {
      if (el.matches(':focus-visible')) show(el);
    });
    el.addEventListener('blur', function () { if (current === el) hide(); });
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  // Keep the tooltip glued to its target on scroll/resize (e.g. mobile address bar
  // collapsing, rotation); hide it only if the target leaves the screen.
  var rafId = 0;
  function reposition() {
    rafId = 0;
    if (!current) return;
    var r = current.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) { hide(); return; }
    tip.classList.add('is-snapping');   // follow instantly, no gliding
    place(current);
    void tip.offsetWidth;
    tip.classList.remove('is-snapping');
  }
  function scheduleReposition() {
    if (current && !rafId) rafId = requestAnimationFrame(reposition);
  }
  window.addEventListener('scroll', scheduleReposition, { passive: true });
  window.addEventListener('resize', scheduleReposition);

  /* ---------- Email: left part opens the client, icon copies ---------- */
  var mailLink = document.querySelector('.split__main');
  var copyBtn = document.getElementById('copyEmail');
  var email = copyBtn.dataset.email;
  var copyTimer;

  mailLink.addEventListener('click', hide);

  function fallbackCopy() {
    var ta = document.createElement('textarea');
    ta.value = email;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length); // iOS Safari needs an explicit range
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { }
    document.body.removeChild(ta);
    return ok;
  }

  // Resolves true/false, never rejects
  function copyEmail() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(email).then(
        function () { return true; },
        function () { return fallbackCopy(); }
      );
    }
    return Promise.resolve(fallbackCopy());
  }

  copyBtn.addEventListener('click', function () {
    copyEmail().then(function (ok) {
      copyBtn.classList.toggle('is-copied', ok);
      show(copyBtn, ok
        ? { emoji: '🎉', text: 'Copied! Paste it anywhere', tone: 'ok' }
        : { emoji: '😕', text: 'Couldn’t copy. Select it manually', tone: 'err' });
      live.textContent = ok ? 'Email address copied to clipboard' : 'Could not copy the email address';

      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () {
        copyBtn.classList.remove('is-copied');
        live.textContent = '';
        // back to the normal hint if still hovered/focused, otherwise tuck away
        if (current === copyBtn && (copyBtn.matches(':hover') || copyBtn.matches(':focus-visible'))) {
          show(copyBtn);
        } else if (current === copyBtn) {
          hide();
        }
      }, 2000);
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
