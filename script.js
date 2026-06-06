/* Portfolio — interactions */

document.getElementById("year").textContent = new Date().getFullYear();

var header = document.getElementById("header");
var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
var sections = [];

navLinks.forEach(function (link) {
  var id = link.getAttribute("href").slice(1);
  var el = document.getElementById(id);
  if (el) sections.push({ id: id, el: el, link: link });
});

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 40);
  var y = window.scrollY + 120;
  var current = sections[0];
  sections.forEach(function (s) {
    if (s.el.offsetTop <= y) current = s;
  });
  navLinks.forEach(function (l) { l.classList.remove("active"); });
  if (current) current.link.classList.add("active");
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

var btn = document.querySelector(".menu-btn");
var menu = document.getElementById("nav-menu");
btn.addEventListener("click", function () {
  var open = menu.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  });
});

var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach(function (el) { obs.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add("visible"); });
}

var roles = ["web apps", "interfaces", "APIs", "experiences"];
var typed = document.getElementById("typed");
var ri = 0, ci = 0, deleting = false;
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeLoop() {
  if (!typed || reduceMotion) {
    if (typed) typed.textContent = roles[0];
    return;
  }
  var word = roles[ri];
  if (!deleting) {
    typed.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

var copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", function () {
  var email = copyBtn.getAttribute("data-email");
  navigator.clipboard.writeText(email).then(function () {
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    setTimeout(function () {
      copyBtn.textContent = "Copy";
      copyBtn.classList.remove("copied");
    }, 2000);
  });
});
