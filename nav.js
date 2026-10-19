/* মোবাইলের নিচের মেনু (হোম, আপলোড, প্রোফাইল, থিম, ভাষা)। বড় স্ক্রিনে লুকানো থাকে। */
(function () {
  var p = location.pathname.split("/").pop() || "index.html";
  var items = [["index.html", "🏠", "হোম"], ["upload.html", "⬆️", "আপলোড"], ["profile.html", "👤", "প্রোফাইল"]];
  var n = document.createElement("nav");
  n.className = "bnav";
  n.setAttribute("aria-label", "মেনু");
  n.innerHTML = items.map(function (i) {
    return '<a href="' + i[0] + '"' + (p == i[0] ? ' class="on"' : "") + '><span class="ic">' + i[1] + "</span>" + i[2] + "</a>";
  }).join("") +
    '<button type="button" id="bnTheme"><span class="ic">🌓</span>থিম</button>' +
    '<button type="button" id="bnLang"><span class="ic">🌐</span>ভাষা</button>';
  document.body.appendChild(n);
  function click(id) { var e = document.getElementById(id); if (e) e.click(); }
  document.getElementById("bnTheme").onclick = function () { click("theme"); };
  document.getElementById("bnLang").onclick = function () { click("lang"); };
})();
