/* The Porter House — interactions */
(function () {
  "use strict";

  /* ---- Header shadow on scroll ---- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var setMenu = function (open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.hidden = !open;
  };
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  mobileNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // small stagger for grouped items
          var delay = (el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0);
          setTimeout(function () { el.classList.add("in"); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    // stagger siblings within a group
    var groupSelectors = [".pillar", ".card", ".program"];
    groupSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        el.dataset.delay = String(i * 90);
      });
    });

    revealEls.forEach(function (el) { io.observe(el); });

    // Safety net: never let content stay invisible. Reveal anything already
    // scrolled past, and force-reveal any stragglers after a short grace period.
    var failsafe = function () {
      revealEls.forEach(function (el) {
        if (!el.classList.contains("in")) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.98) el.classList.add("in");
        }
      });
    };
    window.addEventListener("load", failsafe);
    setTimeout(function () { revealEls.forEach(function (el) { el.classList.add("in"); }); }, 2600);
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact form (front-end validation + friendly confirmation) ---- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.classList.remove("success");

      if (!form.checkValidity()) {
        note.textContent = "Please complete the required fields so we can reach you.";
        var firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var name = (form.querySelector("#name").value || "").trim().split(" ")[0];
      note.classList.add("success");
      note.textContent = "Thank you" + (name ? ", " + name : "") +
        " — your request has been received. Our team will reach out at your preferred time.";
      form.reset();
    });
  }
})();
