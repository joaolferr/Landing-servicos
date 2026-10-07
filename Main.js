(function () {
  var NUM = "5577991541249";
  var OPTS = [
    "um orçamento de uma landing page",
    "um orçamento de site com identidade visual",
    "um orçamento de site institucional",
    "tirar um projeto do papel, mas ainda não sei qual formato é melhor",
  ];
  var END =
    ". Pode me explicar como funciona e passar um valor? Meu negócio é ";
  function msg(i) {
    return "Olá, João! Vi seu site e quero " + OPTS[i] + END;
  }
  function link(m) {
    return "https://wa.me/" + NUM + "?text=" + encodeURIComponent(m);
  }
  function track(name) {
    // Ligue aqui seu Pixel/GA4. Ex.: gtag('event','whatsapp_click',{origem:name}); fbq('track','Contact');
    if (window.gtag) gtag("event", "whatsapp_click", { origem: name });
    if (window.fbq) fbq("track", "Contact");
  }

  var sel = 0;
  var bubble = document.getElementById("bubble");
  var finalBtn = document.getElementById("finalBtn");
  var chips = document.querySelectorAll(".chip");

  function render() {
    bubble.textContent = msg(sel);
    finalBtn.href = link(msg(sel));
    chips.forEach(function (c) {
      c.setAttribute("aria-pressed", String(+c.dataset.k === sel));
    });
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      sel = +c.dataset.k;
      render();
    });
  });
  render();

  // CTAs do topo/header/flutuante: abrem o WhatsApp com mensagem geral
  var generic =
    "Olá, João! Vi seu site e quero um orçamento para o meu negócio. Pode me explicar como funciona? Meu negócio é ";
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = link(generic);
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-evt]").forEach(function (a) {
    a.addEventListener("click", function () {
      track(a.dataset.evt);
    });
  });
  document.getElementById("ano").textContent = new Date().getFullYear();
})();
