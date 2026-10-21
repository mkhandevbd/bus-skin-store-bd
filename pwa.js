/* অ্যাপ ইনস্টল (PWA): সার্ভিস ওয়ার্কার চালু করে আর "অ্যাপ ইনস্টল করুন" বাটন দেখায়। এখানে কিছু বদলাতে হবে না। */
(function () {
  if ("serviceWorker" in navigator) {
    addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
  var standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (standalone) return;

  var st = document.createElement("style");
  st.textContent = [
    ".pwab{position:fixed;left:12px;right:12px;bottom:calc(76px + env(safe-area-inset-bottom));z-index:45;display:flex;align-items:center;gap:10px;max-width:460px;margin:0 auto;padding:10px 12px;background:var(--card);color:var(--text);border:1px solid var(--line);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.25);animation:pwain .45s both}",
    "@media(min-width:701px){.pwab{left:auto;right:16px;bottom:16px;margin:0}}",
    "@keyframes pwain{from{opacity:0;transform:translateY(16px)}}",
    ".pwab img{width:44px;height:44px;border-radius:11px;flex:0 0 auto}",
    ".pwab .pt{flex:1;min-width:0;line-height:1.3}.pwab .pt b{display:block;font-size:15px}.pwab .pt span{font-size:13px;color:var(--muted)}",
    ".pwab .pgo{position:relative;overflow:hidden;border:0;border-radius:10px;padding:9px 16px;background:var(--g);color:var(--gtext);font:inherit;font-weight:700;cursor:pointer}",
    ".pwab .pgo::after{content:\"\";position:absolute;inset:0;transform:translateX(-120%);background:linear-gradient(100deg,transparent,rgba(255,255,255,.5),transparent);animation:pwash 2.8s infinite}",
    "@keyframes pwash{to{transform:translateX(120%)}}",
    ".pwab .px{border:0;background:none;color:var(--muted);font-size:20px;cursor:pointer;padding:4px}",
    "@media(max-width:700px){#pwaBtn{display:none!important}}",
    "@media (prefers-reduced-motion:reduce){.pwab,.pwab .pgo::after{animation:none}}"
  ].join("\n");
  document.head.appendChild(st);

  var KEY = "bs_pwa_hide", dp = null;
  function snoozed() { try { return Date.now() < +localStorage.getItem(KEY); } catch (e) { return false; } }
  function snooze() { try { localStorage.setItem(KEY, String(Date.now() + 7 * 864e5)); } catch (e) {} }
  function close() { var b = document.getElementById("pwab"); if (b) b.remove(); }
  function banner(sub, withBtn) {
    if (document.getElementById("pwab") || snoozed()) return;
    var d = document.createElement("div");
    d.className = "pwab"; d.id = "pwab";
    d.innerHTML = '<img src="icon-192.png" alt=""><div class="pt"><b>অ্যাপ ইনস্টল করুন</b><span>' + sub + '</span></div>' +
      (withBtn ? '<button class="pgo" type="button">ইনস্টল</button>' : '') + '<button class="px" type="button" aria-label="বন্ধ করুন">✕</button>';
    document.body.appendChild(d);
    d.querySelector(".px").onclick = function () { snooze(); close(); };
    var g = d.querySelector(".pgo");
    if (g) g.onclick = install;
  }
  function install() {
    if (!dp) return;
    dp.prompt();
    dp.userChoice.then(function (c) { if (c && c.outcome != "accepted") snooze(); dp = null; close(); var b = document.getElementById("pwaBtn"); if (b) b.remove(); });
  }
  addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    dp = e;
    var bar = document.querySelector("header .bar");
    if (bar && !document.getElementById("pwaBtn")) {
      var b = document.createElement("button");
      b.className = "btn"; b.id = "pwaBtn"; b.type = "button"; b.textContent = "📲 অ্যাপ";
      b.onclick = install;
      var ref = document.getElementById("lang") || document.getElementById("theme");
      if (ref) bar.insertBefore(b, ref); else bar.appendChild(b);
    }
    setTimeout(function () { banner("হোম স্ক্রিন থেকে এক ট্যাপে খুলুন, আরও দ্রুত।", true); }, 4000);
  });
  addEventListener("appinstalled", function () { dp = null; close(); var b = document.getElementById("pwaBtn"); if (b) b.remove(); });

  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  if (ios) setTimeout(function () { banner("Safari-তে নিচের শেয়ার (⬆️) বাটন চেপে \"Add to Home Screen\" বাছুন।", false); }, 5000);
})();
