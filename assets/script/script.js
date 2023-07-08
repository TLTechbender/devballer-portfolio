'use strict'


const toggle = document.querySelector('.mode-switch');
const sliders = document.querySelectorAll("[data-slider]");
const body = document.querySelector('body');
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const sliderControl = document.querySelector('.slider-control');


const bottomMenu = document.getElementById('bottomMenu');
const cancelBtn = document.getElementById('cancelBtn');
const menuBtn = document.getElementById('menuBtn');
const arrowUp = document.querySelector('.toTop');
const hiddenElementsOne = document.querySelectorAll('.hidden-one');
const hiddenElementsTwo = document.querySelectorAll('.hidden-two');
/*===================Logic for the slider==================*/

const sliderInit = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));

  const totalSliderItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {

    currentSlidePos++;

    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;

    if (currentSlidePos >= totalSliderItems) sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.removeAttribute("disabled");

  }

  sliderNextBtn.addEventListener("click", slideNext);
 

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {

    currentSlidePos--;

    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;

    if (currentSlidePos <= 0) sliderPrevBtn.setAttribute("disabled", "");
    sliderNextBtn.removeAttribute("disabled");

  }

  sliderPrevBtn.addEventListener("click", slidePrev);


  const dontHaveExtraItem = totalSliderItems <= 0;
  if (dontHaveExtraItem) sliderNextBtn.setAttribute("disabled", "");

  sliderPrevBtn.setAttribute("disabled", "");
  

}

for (let i = 0, len = sliders.length; i < len; i++) { sliderInit(sliders[i]); }


/*=============Logic for the dark and light mode==============*/


let getMode = localStorage.getItem('mode');

if(getMode && getMode === 'dark'){
    body.classList.add('dark');
    toggle.classList.toggle('fa-moon');
    toggle.classList.toggle('fa-sun');

}

toggle.addEventListener('click', ()=>{
    body.classList.toggle('dark');
    toggle.classList.toggle('fa-moon');
    toggle.classList.toggle('fa-sun');

    if(!body.classList.contains('dark')){
        return localStorage.setItem('mode', 'light');
    }
    return localStorage.setItem('mode', 'dark');
});


/*=======Logic for the header to stick on scroll*==========*/

window.addEventListener('scroll', ()=>{
  header.classList.toggle('fixed-item', window.scrollY >45);
    arrowUp.classList.toggle( 'visible' , window.scrollY > 350);
  

});


cancelBtn.addEventListener("click", ()=>{
  bottomMenu.classList.remove('show-menu');
});

menuBtn.addEventListener("click", ()=>{
  bottomMenu.classList.add('show-menu');
});


/*=============== Animation Handler===========*/

const observerOne = new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
  if(entry.isIntersecting){
    entry.target.classList.add('show-one');
  } else{entry.classList.remove('show-one');}
});
});


const observerTwo = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show-two');
    } else{entry.classList.remove('show-two');}
  });
  });

hiddenElementsOne.forEach((el)=>observerOne.observe(el));
hiddenElementsTwo.forEach((el)=>observerTwo.observe(el));