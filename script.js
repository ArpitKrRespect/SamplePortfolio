document.addEventListener('DOMContentLoaded', () => {
    // Initialize LocomotiveScroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true,
        direction: 'vertical'
    });
  
    // GSAP Animation for page elements
    const tl = gsap.timeline();
    
    // Animation for the heading elements
    tl.fromTo('.boundingelem', 
        { y: '100%' }, 
        { y: '0%', duration: 1, ease: 'power4.out', stagger: 0.2 });
  
    // Mouse hover effect for small circle (minicirclehover)
    const minicircle = document.querySelector("#minicirclehover");
  
    // Get circle size for accurate positioning
    const circleSize = minicircle.offsetWidth / 2;
  
    document.addEventListener("mousemove", function (event) {
        gsap.to(minicircle, {
            duration: 0.2,
        });
    });
  
    // First page animation (navigation bar and hero footer animation)
    function firstPageAnim() {
      var tl = gsap.timeline();
  
      tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
      })
      .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
      })
      .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
      });
    }
    
    firstPageAnim(); // Trigger the first page animation
    
    // Circle hover follower and transformation effect
    function circleChaptaKaro() {
      var timeout;
      var xscale = 1;
      var yscale = 1;
      var xprev = 0;
      var yprev = 0;
  
      window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
  
        xprev = dets.clientX;
        yprev = dets.clientY;
  
        circleMouseFollower(xscale, yscale);
  
        timeout = setTimeout(function () {
          document.querySelector(
            "#minicirclehover"
          ).style.transform = `translate(${dets.clientX - circleSize}px, ${dets.clientY - circleSize}px) scale(1, 1)`;
        }, 100);
      });
    }
  
    function circleMouseFollower(xscale, yscale) {
      window.addEventListener("mousemove", function (dets) {
        document.querySelector(
          "#minicirclehover"
        ).style.transform = `translate(${dets.clientX - circleSize}px, ${dets.clientY - circleSize}px) scale(${xscale}, ${yscale})`;
      });
    }
  
    circleChaptaKaro(); // Initialize the custom mouse follower
    
    // Rotate and move effect on image hover
    document.querySelectorAll(".elem1").forEach(function (elem) {
      var rotate = 0;
      var diffrot = 0;
  
      elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3.easeOut,
          duration: 0.5,
        });
      });
  
      elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
  
        gsap.to(elem.querySelector("img"), {
          opacity: 1,
          ease: Power3.easeOut,
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
      });
    });
  
    // Updating Locomotive Scroll after GSAP animations
    scroll.update();
  });
  