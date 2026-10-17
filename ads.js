/* বিজ্ঞাপন চালানোর ফাইল। এখানে কিছু বদলাতে হবে না।
   বিজ্ঞাপনের কোড বসান অ্যাডমিন প্যানেলের "বিজ্ঞাপন" ট্যাব থেকে (শুধু Owner)।
   Owner, Moderator, Premium, VIP ব্যাজওয়ালারা কোনো বিজ্ঞাপন দেখে না। */
var ADS = (function () {
  var FREE = ["owner", "moderator", "premium", "vip"],
    SZ = {
      top: { d: [728, 90], m: [320, 50] },
      mid: { d: [300, 250], m: [300, 250] },
      side: { d: [300, 250], m: [300, 250] },
      rel: { d: ["100%", 300], m: ["100%", 300] },
      bottom: { d: ["100%", 300], m: ["100%", 300] },
      gate1: { d: [300, 250], m: [300, 250] },
      gateVideo: { d: [480, 270], m: [320, 180] }
    },
    C = {
      preview: true, popunder: "", socialbar: "", top_d: "", top_m: "", mid: "", side: "", rel: "", bottom: "", gate1: "",
      gate2_mode: "video", gate2_code: "", visit_title: "", visit_text: "", visit_url: "", visit_btn: "ওয়েবসাইট দেখুন"
    },
    on = false, started = false, ready = false;

  var st = document.createElement("style");
  st.textContent = ".visitcard{text-align:center;max-width:480px;width:100%;padding:16px;border:1px solid var(--line);border-radius:12px;background:var(--card)}.visitcard b{display:block;font-size:18px}.visitcard p{margin:6px 0 10px;color:var(--muted)}.visitcard small{display:block;margin-top:8px;color:var(--muted)}.visitcard .btn{display:inline-block}";
  document.head.appendChild(st);

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function safe(u) { return /^https?:\/\//i.test(u || ""); }
  function mobile() { return matchMedia("(max-width:640px)").matches; }
  function runHTML(host, html) {
    var t = document.createElement("template");
    t.innerHTML = html;
    t.content.querySelectorAll("script").forEach(function (s) {
      var n = document.createElement("script");
      for (var i = 0; i < s.attributes.length; i++) n.setAttribute(s.attributes[i].name, s.attributes[i].value);
      n.text = s.text;
      s.replaceWith(n);
    });
    host.appendChild(t.content);
  }
  function load() {
    if (typeof db != "undefined" && db && db.from) {
      return db.from("ad_settings").select("config").eq("id", 1).maybeSingle()
        .then(function (r) { if (r && r.data && r.data.config) Object.assign(C, r.data.config); })
        .catch(function () {});
    }
    return Promise.resolve();
  }
  function visit() {
    return '<div class="visitcard"><b>' + esc(C.visit_title || "আমাদের সাথে থাকুন") + '</b>' +
      (C.visit_text ? '<p>' + esc(C.visit_text) + '</p>' : '') +
      '<a class="btn p" href="' + esc(C.visit_url) + '" target="_blank" rel="noopener noreferrer sponsored">' + esc(C.visit_btn || "ওয়েবসাইট দেখুন") + '</a>' +
      '<small>ঐচ্ছিক: না দেখলেও ডাউনলোড করা যাবে।</small></div>';
  }
  function one(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    var n = el.dataset.ad, sz = SZ[n];
    if (!sz || !on) { el.hidden = true; return; }
    var m = mobile(), s = m ? sz.m : sz.d, w = typeof s[0] == "number" ? s[0] + "px" : s[0], h = s[1];
    if (n == "gateVideo" && C.gate2_mode == "visit" && safe(C.visit_url)) { el.innerHTML = visit(); return; }
    var code = C[n == "top" ? (m ? "top_m" : "top_d") : n == "gateVideo" ? "gate2_code" : n];
    if (!code) {
      if (C.preview) el.innerHTML = '<div class="adph" style="width:' + w + ';max-width:100%;height:' + h + 'px">' + (n == "gateVideo" ? "ভিডিও বিজ্ঞাপনের জায়গা" : "বিজ্ঞাপনের জায়গা") + '</div>';
      else el.hidden = true;
      return;
    }
    var f = document.createElement("iframe");
    f.setAttribute("sandbox", "allow-scripts allow-popups allow-popups-to-escape-sandbox");
    f.setAttribute("scrolling", "no");
    f.setAttribute("loading", "lazy");
    f.title = "বিজ্ঞাপন";
    f.style.cssText = "border:0;max-width:100%;width:" + w + ";height:" + h + "px";
    f.srcdoc = '<!doctype html><html><body style="margin:0;display:flex;justify-content:center">' + code + '</body></html>';
    el.appendChild(f);
  }
  return {
    start: function (role) {
      if (started) return;
      started = true;
      on = FREE.indexOf(role) < 0;
      var self = this;
      load().then(function () {
        ready = true;
        if (on) {
          if (C.popunder) runHTML(document.body, C.popunder);
          if (C.socialbar) runHTML(document.body, C.socialbar);
        }
        self.fill(document);
      });
    },
    fill: function (root) {
      if (!ready) return;
      (root || document).querySelectorAll("[data-ad]").forEach(one);
    }
  };
})();
