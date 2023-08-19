function scroller(){
      gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#body"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#body" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#body", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#body").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

scroller();


function navicon(){
  var icon = document.getElementById("nav-icon")
  var navbar = document.getElementById("navbar")
  let a = screen.width
  let flag = 0
  if(a <= 500){
    icon.innerHTML= ' <ion-icon name="menu-outline"></ion-icon> ';
    
    icon.addEventListener('click',()=>{
      if(flag == 0){
        icon.innerHTML= ' <ion-icon name="close-outline"></ion-icon>';
        navbar.style.transform = "translateY(0vh)";
        flag = 1;
      }else{
        icon.innerHTML= ' <ion-icon name="menu-outline"></ion-icon> ';
        navbar.style.transform = "translateY(-100vh)";
        flag = 0;
      }
    })
  }

}
navicon();

function gsapAnimations(){

  let tl = gsap.timeline();

  tl.from("#navbar",{
    opacity: 0,
    duration: 1,
    y: -50,
    stagger: .3
  })
  tl.from(".page-1l h1, .page-1l p",{
    opacity: 0,
    duration: 1,
    x: -100,
    stagger: .3
  })
  
}
gsapAnimations();
