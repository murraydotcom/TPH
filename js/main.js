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
    var groupSelectors = [".pillar", ".ledger-row", ".involve-card"];
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

  /* ---- Elevation rail: scroll progress + active station ---- */
  var railProgress = document.getElementById("railProgress");
  var stations = Array.prototype.slice.call(document.querySelectorAll(".rail-station"));

  if (railProgress) {
    var docEl = document.documentElement;
    var updateProgress = function () {
      var max = docEl.scrollHeight - docEl.clientHeight;
      var frac = max > 0 ? docEl.scrollTop / max : 0;
      railProgress.style.height = Math.max(0, Math.min(1, frac)) * 100 + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  if (stations.length && "IntersectionObserver" in window) {
    var setActive = function (id) {
      stations.forEach(function (s) {
        var on = s.getAttribute("href") === "#" + id;
        s.classList.toggle("active", on);
        if (on) s.setAttribute("aria-current", "true");
        else s.removeAttribute("aria-current");
      });
    };
    var secObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    stations.forEach(function (s) {
      var el = document.getElementById(s.getAttribute("href").slice(1));
      if (el) secObserver.observe(el);
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Count-up stats ---- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  if (counters.length) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var runCount = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduce) { el.textContent = target + suffix; return; }
      var dur = 1150, start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { co.observe(c); });
    } else {
      counters.forEach(runCount);
    }
  }

  /* ---- Dynamic touches (pointer-capable, motion-friendly devices only) ---- */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (fine && motionOK) {
    // Hero art parallax — the badge floats and the gold burst drifts for depth
    var hero = document.querySelector(".hero");
    var badge = document.querySelector(".hero-badge");
    var burst = document.querySelector(".hero-burst");
    if (hero && badge) {
      var tx = 0, ty = 0, cx = 0, cy = 0;
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
      });
      hero.addEventListener("mouseleave", function () { tx = 0; ty = 0; });
      (function frame() {
        cx += (tx - cx) * 0.07;
        cy += (ty - cy) * 0.07;
        badge.style.transform = "translate3d(" + (cx * 16) + "px," + (cy * 12) + "px,0)";
        if (burst) burst.style.transform = "translate3d(" + (cx * -22) + "px," + (cy * -16) + "px,0)";
        requestAnimationFrame(frame);
      })();
    }

    // Magnetic call-to-action buttons
    document.querySelectorAll(".btn:not(.btn-block)").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var my = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = "translate(" + (mx * 5) + "px," + (my * 4) + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

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
