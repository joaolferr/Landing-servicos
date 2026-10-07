/* Animações com GSAP + ScrollTrigger.
   Se o GSAP não carregar ou o usuário preferir menos movimento,
   nada aqui roda e a página continua totalmente visível e funcional. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!window.gsap || !window.ScrollTrigger || reduce) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });

  /* ---------- 1. Entrada do hero (uma sequência única ao carregar) ---------- */
  gsap
    .timeline()
    .from("header", { y: -40, opacity: 0, duration: 0.6 })
    .fromTo(
      ".portrait img",
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power4.inOut",
        clearProps: "clipPath",
      },
      0.15,
    )
    .from(".hero h1", { y: 36, opacity: 0, duration: 0.8 }, 0.25)
    .from(".hero .sub", { y: 22, opacity: 0, duration: 0.6 }, "-=0.5")
    .from(".hero .btn", { y: 22, opacity: 0, duration: 0.5 }, "-=0.4")
    .from(".hero .micro", { opacity: 0, duration: 0.4 }, "-=0.2")
    .from(".portrait span", { x: 30, opacity: 0, duration: 0.5 }, "-=0.5")
    .from(
      ".facts li",
      { y: 14, opacity: 0, duration: 0.45, stagger: 0.08 },
      "-=0.3",
    );

  /* ---------- 2. Revelar ao rolar ---------- */
  function reveal(selector, y, stagger) {
    var els = gsap.utils.toArray(selector);
    if (!els.length) return;
    gsap.set(els, { opacity: 0, y: y || 28 });
    ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: stagger || 0.12,
          overwrite: true,
        });
      },
    });
  }

  reveal("section:not(.hero) h2", 24);
  reveal(".services .head p", 18);
  reveal(".pain li", 20, 0.1);
  reveal(".pain .turn", 20);
  reveal(".svc", 30, 0.15);
  reveal(".note", 16);
  reveal(".why .grid > div", 28, 0.12);
  reveal(".proj", 44, 0.18);
  reveal(".step", 24, 0.12);
  reveal("details", 16, 0.08);

  /* Prévias dos projetos: leve parallax ao rolar */
  gsap.utils.toArray(".proj .shot img").forEach(function (img) {
    gsap.fromTo(
      img,
      { yPercent: 4 },
      {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".proj"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  /* ---------- 3. CTA final ---------- */
  var box = document.querySelector(".final .box");
  var bubble = document.getElementById("bubble");
  var finalBtn = document.getElementById("finalBtn");

  if (box) {
    gsap.set(box, { opacity: 0, y: 48 });
    gsap.set(bubble, { opacity: 0, y: 14 });

    var pulse = gsap.to(finalBtn, {
      scale: 1.03,
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: box,
      start: "top 85%",
      once: true,
      onEnter: function () {
        gsap.to(box, { opacity: 1, y: 0, duration: 0.8 });
        gsap.to(bubble, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 });
      },
    });

    /* O botão "respira" só enquanto está na tela, e para ao passar o mouse */
    ScrollTrigger.create({
      trigger: box,
      start: "top 70%",
      end: "bottom top",
      onToggle: function (self) {
        self.isActive ? pulse.play() : pulse.pause();
      },
    });
    finalBtn.addEventListener("mouseenter", function () {
      pulse.pause();
      gsap.to(finalBtn, { scale: 1, duration: 0.2 });
    });
    finalBtn.addEventListener("mouseleave", function () {
      pulse.play();
    });

    /* Ao trocar a opção, o balão da mensagem "pula" para mostrar que mudou */
    document.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        gsap.fromTo(
          bubble,
          { scale: 0.94, opacity: 0.5, transformOrigin: "100% 100%" },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "back.out(2)",
            overwrite: true,
          },
        );
      });
    });
  }

  /* ---------- 4. Botão flutuante (celular) entra depois do hero e sai no CTA final ---------- */
  var float = document.querySelector(".float");
  if (float) {
    gsap.set(float, { y: 120, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom top",
      endTrigger: ".final",
      end: "top 70%",
      onToggle: function (self) {
        gsap.to(float, {
          y: self.isActive ? 0 : 120,
          autoAlpha: self.isActive ? 1 : 0,
          duration: 0.4,
          overwrite: true,
        });
      },
    });
  }
})();
