/* ====== NAV shrink on scroll ====== */
(function () {
  const nav = document.getElementById("site-nav");
  let last = 0;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > 40) nav.classList.add("shrink");
      else nav.classList.remove("shrink");
      last = y;
    },
    { passive: true }
  );
})();

/* ====== IntersectionObserver for reveal animations ====== */
(function () {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // attach to elements with class 'reveal', 'reveal-fade', 'zoom-in'
  document.querySelectorAll(".reveal, .reveal-fade, .zoom-in").forEach((el) => {
    obs.observe(el);
  });
})();

/* ====== Subtle parallax effect for hero image (mousemove) ====== */
(function () {
  const card = document.querySelector(".card-visual");
  if (!card) return;
  document.querySelector(".hero").addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    card.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${
      -dy * 4
    }deg) translateZ(6px)`;
  });
  document.querySelector(".hero").addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
})();

/* ====== Countdown that renews every 10 days ====== */
(function () {
  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMins = document.getElementById("cd-mins");
  const elSecs = document.getElementById("cd-secs");

  function getNextReset() {
    const now = Date.now();
    const tenDays = 10 * 24 * 60 * 60 * 1000;
    return Math.ceil(now / tenDays) * tenDays;
  }

  function tick() {
    const target = getNextReset();
    const diff = target - Date.now();

    if (diff <= 0) {
      // will auto reset on next tick
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMins.textContent = "00";
      elSecs.textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(d).padStart(2, "0");
    elHours.textContent = String(h).padStart(2, "0");
    elMins.textContent = String(m).padStart(2, "0");
    elSecs.textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
})();

/* ====== set current year ====== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ====== optional: smooth small scroll offset for anchor links (accounting nav height) ====== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById("site-nav").offsetHeight;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();
