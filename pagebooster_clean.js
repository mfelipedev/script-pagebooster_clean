(function() {

  // Preconnect para CDNs mais usadas
  var preconnects = [
    "https://static.parastorage.com",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://www.googletagmanager.com",
    "https://cdn.jsdelivr.net"
  ];
  preconnects.forEach(function(url) {
    var link = document.createElement("link");
    link.rel = "preconnect";
    link.href = url;
    link.crossOrigin = "true";
    document.head.appendChild(link);
  });

  // Lazyload em todas as imagens que não estão na tela inicial
  document.addEventListener("DOMContentLoaded", function() {
    var imgs = document.querySelectorAll("img:not([loading])");
    imgs.forEach(function(img) {
      img.setAttribute("loading", "lazy");
    });
  });

  // Preload de fontes importantes detectadas
  var fontLinks = document.querySelectorAll("link[href*='fonts.googleapis.com'], link[href*='fonts.gstatic.com']");
  fontLinks.forEach(function(l) {
    var preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "style";
    preload.href = l.href;
    document.head.appendChild(preload);
  });

  // Adiar scripts não críticos (analytics, pixels, etc.)
  window.addEventListener("load", function() {
    var nonCriticalScripts = [
      "googletagmanager",
      "facebook.net",
      "analytics",
      "hotjar",
      "clarity"
    ];
    var scripts = document.querySelectorAll("script[src]");
    scripts.forEach(function(scr) {
      if (nonCriticalScripts.some(function(k) { return scr.src.includes(k); })) {
        // Remove e reinsere com defer + pequeno delay
        var src = scr.src;
        scr.remove();
        setTimeout(function() {
          var s = document.createElement("script");
          s.src = src;
          s.defer = true;
          document.body.appendChild(s);
        }, 1500);
        console.log("pagebooster_clean.js carregado!");
      }
    });
  });
})();
