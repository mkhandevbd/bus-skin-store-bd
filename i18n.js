/* ভাষা বদলানোর ফাইল (বাংলা ↔ English)। এখানে কিছু বদলাতে হবে না।
   নতুন শব্দ যোগ করতে চাইলে নিচের E (পুরো শব্দ মিললে) বা S (লেখার অংশ মিললে) তালিকায় জোড়া যোগ করুন। */
(function () {
  var E = {
    "সব": "All", "আপলোড": "Upload", "লগআউট": "Logout", "লগইন": "Login", "নতুন": "New",
    "ডাউনলোড": "Download", "ডাউনলোড করুন": "Download", "জনপ্রিয়": "Popular",
    "বাস স্কিন": "Bus Skin", "বাস মড": "Bus Mod", "ম্যাপ মড": "Map Mod",
    "ভিউ": "Views", "সাইজ": "Size", "তারিখ": "Date", "বিবরণ": "Description", "ক্রেডিট": "Credit",
    "আপলোডার": "Uploader", "করুন।": ".", "সাজান": "Sort", "রেটিং": "Rating", "ভিডিও সহ": "With video", "বেশি ডাউনলোড": "Most downloads", "বেশি কমেন্ট": "Most comments", "বেশি ভিউ": "Most views", "সর্বোচ্চ রেটিং": "Top rated", "৩★ বা বেশি": "3★ or more", "৪★ বা বেশি": "4★ or more", "🔥 টপ": "🔥 Top", "রেটিং ও কমেন্ট": "Ratings & Comments", "কমেন্ট করুন": "Post comment", "প্রোফাইল": "Profile", "যোগ দিয়েছেন": "Joined", "হোম": "Home", "অজানা": "Unknown", "অন্য লিংক": "Other link",
    "নতুন যোগ হয়েছে": "Newly added", "ঠিক আছে": "OK", "বন্ধ করুন": "Close", "মুছুন": "Delete"
  };
  var S = [
    ["বাস স্কিন, বাস মড ডাউনলোড করুন", "Download bus skins & bus mods"],
    ["বাস সিমুলেটর ইন্দোনেশিয়া ও অন্য সিমুলেটর গেমের মড সরাসরি ডাউনলোড করুন।", "Download mods for Bus Simulator Indonesia and other simulator games directly."],
    ["এখনো কোনো মড যোগ হয়নি, শীঘ্রই আসছে।", "No mods yet, coming soon."],
    ["কিছু পাওয়া যায়নি। অন্য শব্দে খুঁজুন।", "Nothing found. Try another word."],
    ["মড, স্কিন বা ম্যাপ খুঁজুন", "Search mods, skins or maps"],
    ["গুগল দিয়ে লগইন", "Login with Google"],
    ["আপনার ব্যাজের জন্য বিজ্ঞাপন ছাড়াই ডাউনলোড ✨", "Ad-free download for your badge ✨"],
    ["ব্যাজ থাকলে বিজ্ঞাপন ছাড়াই ডাউনলোড করা যায়।", "Badge holders can download without ads."],
    ["ডাউনলোড লিংক শীঘ্রই যোগ হবে।", "Download link coming soon."],
    ["কোনো সোশ্যাল লিংক নেই", "No social links"],
    ["কোনো বিবরণ দেওয়া হয়নি।", "No description provided."],
    ["ডাউনলোড সার্ভার এখনো চালু হয়নি", "Download server is not ready yet"],
    ["মড পাওয়া যায়নি।", "Mod not found."],
    ["হোমে ফিরুন", "Back to home"],
    ["ডাউনলোড গাইড", "Download Guide"],
    ["⭐ সর্বোচ্চ রেটিং", "⭐ Top rated"],
    ["💬 সবচেয়ে বেশি কমেন্ট", "💬 Most commented"],
    ["👁 সবচেয়ে বেশি ভিউ", "👁 Most viewed"],
    ["রেটিং ও কমেন্ট করতে", "To rate and comment,"],
    ["আপনার রেটিং:", "Your rating:"],
    ["আপনার মতামত লিখুন...", "Write your comment..."],
    ["জন রেটিং দিয়েছেন", "people rated"],
    ["এখনো কেউ রেটিং দেননি", "No ratings yet"],
    ["এখনো কোনো কমেন্ট নেই। প্রথম কমেন্ট আপনি করুন!", "No comments yet. Be the first!"],
    ["নিজের মডে রেটিং দেওয়া যায় না।", "You can't rate your own mod."],
    ["মূল নির্মাতা:", "Original creator:"],
    ["শেয়ার করুন", "Share"],
    ["লিংক কপি হয়েছে", "Link copied"],
    ["লিংক কপি", "Copy link"],
    ["আরও মড", "More mods"],
    ["খুব সহজে", "super easy"],
    ["পরের ধাপে যান", "Next step"],
    ["অপেক্ষা করুন:", "Please wait:"],
    ["অপেক্ষা করুন...", "Please wait..."],
    ["প্রস্তুত ✅", "Ready ✅"],
    ["ডাউনলোড (ধাপ", "Download (step"],
    ["বিজ্ঞাপনের জায়গা", "Ad space"],
    ["ভিডিও বিজ্ঞাপনের জায়গা", "Video ad space"],
    ["ঐচ্ছিক: না দেখলেও ডাউনলোড করা যাবে।", "Optional: you can download even if you skip this."],
    ["ওয়েবসাইট দেখুন", "Visit website"],
    ["জনপ্রিয় ", "Popular "],
    ["ডাউনলোড করুন", "Download"],
    ["সেকেন্ড", "sec"],
    ["থিম", "Theme"],
    ["লগআউট", "Logout"],
    ["ডাউনলোড", "Downloads"],
    ["বাস স্কিন", "Bus Skin"],
    ["বাস মড", "Bus Mod"],
    ["ম্যাপ মড", "Map Mod"],
    [" মড", " Mods"]
  ];
  S.sort(function (a, b) { return b[0].length - a[0].length; });
  var lang = "bn";
  try { lang = localStorage.getItem("lang") || "bn"; } catch (e) {}
  var busy = false;

  function conv(t) {
    var k = t.trim();
    if (!k) return t;
    if (E[k] != null) return t.replace(k, E[k]);
    var o = t;
    for (var i = 0; i < S.length; i++) {
      if (o.indexOf(S[i][0]) > -1) o = o.split(S[i][0]).join(S[i][1]);
    }
    return o;
  }
  function text(n) {
    var p = n.parentNode;
    if (!p || /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/.test(p.nodeName)) return;
    if (lang == "en") {
      var src = (n._bn != null && n._v === n.nodeValue) ? n._bn : n.nodeValue;
      var out = conv(src);
      if (out !== n.nodeValue) { n._bn = src; busy = true; n.nodeValue = out; n._v = out; busy = false; }
    } else if (n._bn != null && n._v === n.nodeValue) {
      busy = true; n.nodeValue = n._bn; busy = false; n._bn = null;
    }
  }
  function attrs(el) {
    ["placeholder", "aria-label", "title"].forEach(function (a) {
      var v = el.getAttribute(a);
      if (v == null) return;
      var k = "data-bn-" + a;
      if (lang == "en") {
        var src = el.hasAttribute(k) ? el.getAttribute(k) : v, out = conv(src);
        if (out !== v) { el.setAttribute(k, src); el.setAttribute(a, out); }
      } else if (el.hasAttribute(k)) {
        el.setAttribute(a, el.getAttribute(k)); el.removeAttribute(k);
      }
    });
  }
  function walk(root) {
    if (root.nodeType == 3) { text(root); return; }
    if (root.nodeType != 1) return;
    attrs(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ALL, null), n;
    while ((n = w.nextNode())) { if (n.nodeType == 3) text(n); else if (n.nodeType == 1) attrs(n); }
  }
  function apply() {
    document.documentElement.lang = lang == "en" ? "en" : "bn";
    walk(document.body);
    var b = document.getElementById("lang");
    if (b) b.textContent = lang == "en" ? "বাংলা" : "EN";
  }
  function start() {
    var b = document.getElementById("lang");
    if (b) b.onclick = function () {
      lang = lang == "en" ? "bn" : "en";
      try { localStorage.setItem("lang", lang); } catch (e) {}
      apply();
    };
    apply();
    new MutationObserver(function (ms) {
      if (busy) return;
      ms.forEach(function (m) {
        if (m.type == "characterData") text(m.target);
        else m.addedNodes.forEach(walk);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState == "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
