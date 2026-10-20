/* দৈনিক ভিজিটর গোনার ফাইল (নাম-পরিচয় ছাড়া, শুধু এলোমেলো কোড)। এখানে কিছু বদলাতে হবে না। */
(function () {
  try {
    var ref = "";
    try { var r = document.referrer; if (r) { var h = new URL(r).hostname; if (h && h !== location.hostname) ref = h.replace(/^www\./, ""); } } catch (e) {}
    var vid = "";
    try {
      vid = localStorage.getItem("bs_vid");
      if (!vid) { vid = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (String(Math.random()).slice(2) + Date.now()); localStorage.setItem("bs_vid", vid); }
    } catch (e) { vid = String(Math.random()).slice(2) + Date.now(); }
    var path = location.pathname.split("/").pop() || "index.html";
    var mobile = matchMedia("(max-width:700px)").matches;
    function workerUrl(cb) {
      try { var c = sessionStorage.getItem("bs_w"); if (c) { cb(c); return; } } catch (e) {}
      if (typeof SUPABASE_URL == "undefined") return;
      fetch(SUPABASE_URL + "/rest/v1/site_settings?id=eq.1&select=worker_url", { headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY } })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var u = ((j && j[0] && j[0].worker_url) || "").replace(/\/+$/, "");
          if (u) { try { sessionStorage.setItem("bs_w", u); } catch (e) {} cb(u); }
        }).catch(function () {});
    }
    function token() {
      try {
        var k = Object.keys(localStorage).filter(function (x) { return /^sb-.*-auth-token$/.test(x); })[0];
        if (k) { var o = JSON.parse(localStorage.getItem(k)); return o && o.access_token; }
      } catch (e) {}
      return null;
    }
    setTimeout(function () {
      workerUrl(function (w) {
        var hd = { "content-type": "text/plain" }, t = token();
        if (t) hd.Authorization = "Bearer " + t;
        fetch(w + "/hit", { method: "POST", keepalive: true, headers: hd, body: JSON.stringify({ vid: vid, path: path, ref: ref, m: mobile }) }).catch(function () {});
      });
    }, 1500);
  } catch (e) {}
})();
