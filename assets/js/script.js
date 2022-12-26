// Baner Zoom Img
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  $(".banner img").css({
    width: (100 + scroll / 5) + "%"
  })
});

// Banner Text ------------------------------------
const elts = {
  text1: document.querySelector(".text1"),
  text2: document.querySelector(".text2")
};

const texts = [
  "creative",
  "developer",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

animate();
// Banner Text--------------------------



// work img ------------------
const items = document.querySelectorAll('.project-lists .list')
items.forEach((el) => {
  const image = el.querySelector('img')

  el.addEventListener('mouseenter', (e) => {
    gsap.to(image, { autoAlpha: 1 })
  })

  el.addEventListener('mouseleave', (e) => {
    gsap.to(image, { autoAlpha: 0 })
  })

  el.addEventListener('mousemove', (e) => {
    gsap.set(image, { x: e.offsetX - 500 })
  })
})
// Work img ----------

// Till effect ---------
const section = document.querySelectorAll('.tilt');

let currentPos = window.pageYOffset;

const update = () => {
  const newPos = window.pageYOffset;
  const diff = newPos - currentPos;
  const speed = diff * 0.1;
  section.forEach(sec => {
    sec.style.transform = `skewY(${speed}deg)`;
  })

  currentPos = newPos;

  requestAnimationFrame(update);
}

update();
// Till effect ---------


// Dark & ligth Mode ------- 
const darkBtn = document.querySelector('.night');
const lightBtn = document.querySelector('.day');


const darkMode = () => document.body.classList.add('light-mode');
const lightMode = () => document.body.classList.remove('light-mode');

darkBtn.addEventListener("click", () => {
  lightMode();

  darkBtn.classList.add('active');
  lightBtn.classList.remove('active');
})

lightBtn.addEventListener("click", () => {
  darkMode();
  darkBtn.classList.remove('active');
  lightBtn.classList.add('active');
})
// Dark & ligth Mode -------

// Mobile Nav
const nav = document.querySelector('.navbar')
const ham = document.querySelector('.hamburger')

ham.addEventListener('click', () => {
  nav.classList.toggle('active')
  ham.classList.toggle('active')
})
// Mobile Nav ------


// Nav Active ------
const idArry = ['#about', "#work", "#service", "#contact"];
const navLinks = document.querySelectorAll(".nav-lists .list");

navLinks.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(idArry[i]).scrollIntoView();
  })
})
const option = { rootMargin: "-100px", threshold: 0.2 }


const activeFun = (sec, index) => {

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks[index].classList.add("active");
      } else {
        navLinks[index].classList.remove("active");
      }
    })
  }, option);

  observer.observe(sec);
}

section.forEach((sec, i) => {
  activeFun(sec, i);
})



// preloader  ------
const counter = () => {
  let count = setInterval(() => {
    var c = parseInt($('.counter').text());
    $('.counter').text((++c).toString());
    if (c == 100) {
      clearInterval(count);
      $('.counter').addClass('active');
      $('.preloader').addClass('active');
    }
  }, 60)
}
counter();