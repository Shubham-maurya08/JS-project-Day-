"use strict";


//*Elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
///////////////////////////////////////
//* Modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

///////////////////////////////////////
//* Button scrolling
btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y) ", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport ",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // smooth scrolling

  // window.scrollTo(s1coords.left, s1coords.top);

  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});
///////////////////////////////////////////////
//*Page navigation

// document.querySelector(".nav__link").forEach(function(el){
//   el.addEventListener("click", function(e){
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: "smooth"});
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains("nav__link")) {
    console.log(e.target);
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////////////
//* Tabbed component
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log("operations__content");

  //Remove active classes
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  tabsContent.forEach((tabContent) => {
    tabContent.classList.remove("operations__content--active")
  });

  //Activated tab
  clicked.classList.add("operations__tab--active");

  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active")

});

///////////////////////////////////////////////////
// * Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    // console.log(siblings);
    // console.log(logo);

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////////
//Sticky Navigation

// const initialCoords = section1.getBoundingClientRect();// its tell us all info about element like how much scroll, height, width etc.

// window.addEventListener("scroll", function(e){
//   if(this.window.scrollY > initialCoords.top){
//     nav.classList.add("sticky");
//   }else{
//     nav.classList.remove("sticky");
//   }
//   });

// window.addEventListener("scroll", function(e){
//   console.log(this.window.scrollY);
// })

// const obsCallback = function () {};

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// };
// ____________________________________

const header = document.querySelector("header");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//////////////////////////////////////////////
// Reveal sections
const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry.target);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//////////////////////////////////////////////
// Lazy Loading

const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTarget.forEach((img) => imgObserver.observe(img));

////////////////////////////////////////////////
//Types of Events  and Event handler
// const h1 = document.querySelector("h1");

// const alertH1 = () =>{
//     alert("AddEventListener! You are reading heading");
//     // h1.removeEventListener("mouseenter", alertH1)
// }

// h1.removeEventListener("mouseenter", alertH1);
// setTimeout(() => {
//     h1.addEventListener("MouseEnter", alertH1);
// }, 5000);

// h1.onmouseenter = function (){
//     alert("onmouseenter")
// }

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/*
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
// console.log(allSections);

document.getElementById("section--2");
const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// console.log(document.getElementsByClassName("btn"));

//* Creating and inserting elements

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `Cookies help us deliver the best experience on our website. By using our website, you agree to the use of cookies. <button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message);
header.append(message);
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();
});

// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "104%";

// console.log(message.style.height);
// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// console.log(message.style.width);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "blue");

// Attributes
const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// console.log(logo.test);
// console.log(logo.getAttribute("test"));
logo.setAttribute("owner", "Rahul");

logo.classList.add("hello", "bye");
logo.classList.remove("bye");
logo.classList.toggle("open");
logo.classList.contains("open");
*/

//* DOM Traversing

// const h1 = document.querySelector("h1");

// //
// console.log(h1.querySelectorAll("highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

//Going Upward: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--color-secondary)";

// h1.closest(".h1").style.background = "var(--gradient-primary)";
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);



// * Events Propagation
// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// }

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
//   console.log(this == e.currentTarget);

//   //stop propagation
//   //e.stopPropagation();s
// },
//   true
// );

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("UL", e.target, e.currentTarget);
//   console.log(this == e.currentTarget);
// },
//   true
// );

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
//   console.log(this == e.currentTarget);
// },
//   true
// );