(function () {
  "use strict";

  var container = document.getElementById("scroll-container");
  var sections = Array.prototype.slice.call(document.querySelectorAll("#scroll-container > section"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("[data-dot]"));

  if (!container || sections.length === 0 || dots.length === 0) return;

  var dotByTarget = {};
  dots.forEach(function (dot) {
    dotByTarget[dot.getAttribute("data-target")] = dot;
  });

  function setActive(id) {
    dots.forEach(function (dot) {
      var isActive = dot.getAttribute("data-target") === "#" + id;
      var dotMark = dot.querySelector(".dot");
      if (isActive) {
        dot.setAttribute("aria-current", "true");
        dotMark.classList.add("bg-gray-200", "w-2.5", "h-2.5", "scale-125");
        dotMark.classList.remove("bg-gray-400/80", "w-1.5", "h-1.5", "scale-100");
      } else {
        dot.removeAttribute("aria-current");
        dotMark.classList.remove("bg-gray-200", "w-2.5", "h-2.5", "scale-125");
        dotMark.classList.add("bg-gray-400/80", "w-1.5", "h-1.5", "scale-100");
      }
    });
  }

  // Track which section is currently in view and keep the dot nav in sync.
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActive(entry.target.id);
        }
      });
    },
    { root: container, threshold: [0.5] }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // Clicking a dot smooth-scrolls to its section.
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var targetId = dot.getAttribute("data-target");
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Set initial state.
  setActive(sections[0].id);
})();
