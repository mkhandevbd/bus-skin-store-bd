/* সুন্দর ফাইল বাছাইয়ের বক্স: সাধারণ "Choose file" বাটনের বদলে নিজে থেকেই বসে যায়।
   চাপলে ফাইল বাছা যায়, আবার ফাইল টেনে এনে ছেড়েও দেওয়া যায়। এখানে কিছু বদলাতে হবে না। */
var FP = (function () {
  var s = document.createElement("style");
  s.textContent = [
    ".fpin{display:none!important}",
    ".drop{position:relative;overflow:hidden;display:grid;justify-items:center;gap:2px;text-align:center;padding:16px 12px;border:2px dashed var(--g);border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--g) 9%,var(--card)),var(--card));cursor:pointer;transition:transform .15s,box-shadow .2s,border-color .2s;font-weight:400}",
    ".drop:hover,.drop:focus-visible,.drop.over{transform:translateY(-2px);border-style:solid;box-shadow:0 0 0 4px color-mix(in srgb,var(--g) 20%,transparent),0 8px 22px rgba(0,0,0,.12)}",
    ".drop .di{font-size:30px;line-height:1.2;animation:fpbob 2.4s ease-in-out infinite}",
    "@keyframes fpbob{50%{transform:translateY(-5px)}}",
    ".drop b{font-size:15px;font-weight:700}",
    ".drop small{color:var(--muted);font-weight:400}",
    ".drop .dn{font-style:normal;color:#16a34a;font-weight:600;font-size:13px;overflow-wrap:anywhere}",
    ".drop::after{content:\"\";position:absolute;inset:0;transform:translateX(-120%);background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);animation:fpsh 3.6s infinite}",
    "@keyframes fpsh{to{transform:translateX(120%)}}",
    ".drop.has{border-color:#16a34a;border-style:solid;background:linear-gradient(135deg,rgba(22,163,74,.12),var(--card))}",
    ".drop.has .di{animation:none}",
    "@media (prefers-reduced-motion:reduce){.drop::after,.drop .di{animation:none}.drop:hover{transform:none}}"
  ].join("\n");
  document.head.appendChild(s);

  var MAP = {
    mf: ["মেইন ছবি বাছুন", "🖼️"], mp: ["প্রিভিউ ছবি বাছুন (একাধিক)", "🖼️"],
    mfile: ["মডের ফাইল বাছুন", "📦"], fl: ["মডের ফাইল বাছুন", "📦"],
    st_l: ["লোগো বাছুন", "🖼️"], st_i: ["ছবি বাছুন", "🖼️"],
    gf: ["গেমের ছবি বাছুন", "🖼️"], pa: ["প্রোফাইল ছবি বাছুন", "👤"]
  };
  function info(el) {
    if (MAP[el.id]) return MAP[el.id];
    if (el.classList.contains("cf")) return ["ক্যাটাগরির ছবি বাছুন", "🖼️"];
    var img = /image/.test(el.accept || "");
    return [img ? (el.multiple ? "ছবি বাছুন (একাধিক)" : "ছবি বাছুন") : "ফাইল বাছুন", img ? "🖼️" : "📁"];
  }
  function make(el) {
    if (!el || el.dataset.fp || !el.parentNode) return;
    el.dataset.fp = 1;
    var i = info(el), img = /image/.test(el.accept || "");
    var d = document.createElement("div");
    d.className = "drop";
    d.tabIndex = 0;
    d.setAttribute("role", "button");
    d.innerHTML = '<span class="di">' + i[1] + '</span><b>' + i[0] + '</b><small>এখানে চাপুন বা ' + (img ? "ছবি" : "ফাইল") + ' টেনে এনে ছাড়ুন</small><em class="dn"></em>';
    el.classList.add("fpin");
    el.parentNode.insertBefore(d, el);
    var inLabel = !!el.closest("label");
    d.addEventListener("click", function () { if (!inLabel) el.click(); });
    d.addEventListener("keydown", function (e) { if (e.key == "Enter" || e.key == " ") { e.preventDefault(); el.click(); } });
    ["dragenter", "dragover"].forEach(function (n) { d.addEventListener(n, function (e) { e.preventDefault(); d.classList.add("over"); }); });
    ["dragleave", "drop"].forEach(function (n) { d.addEventListener(n, function (e) { e.preventDefault(); d.classList.remove("over"); }); });
    d.addEventListener("drop", function (e) {
      var f = e.dataTransfer && e.dataTransfer.files;
      if (f && f.length) { try { el.files = f; } catch (x) {} el.dispatchEvent(new Event("change", { bubbles: true })); }
    });
    el.addEventListener("change", function () {
      var f = el.files, n = d.querySelector(".dn");
      if (f && f.length) {
        d.classList.add("has");
        n.textContent = "✔ " + (f.length > 1 ? f.length + "টি ফাইল বাছা হয়েছে" : f[0].name + " (" + (f[0].size / 1048576).toFixed(1) + " MB)");
      } else { d.classList.remove("has"); n.textContent = ""; }
    });
  }
  function scan(root) { (root || document).querySelectorAll("input[type=file]").forEach(make); }
  function init() {
    scan();
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType != 1) return;
          if (n.matches && n.matches("input[type=file]")) make(n); else if (n.querySelectorAll) scan(n);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState == "loading") document.addEventListener("DOMContentLoaded", init); else init();
  return { make: make, scan: scan };
})();
