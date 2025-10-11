(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -10); // nabav bar scroll animation
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

})(jQuery);


// carousel starts

const initSlider = () =>{
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollBar = document.querySelector(".carousel-container .slider-scrollbar");
    const scrollbarThumb = sliderScrollBar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft


        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition))
            const scrollPostion = (boundedPosition / maxThumbPosition) * maxScrollLeft

            scrollbarThumb.style.left = `${boundedPosition}px`
            imageList.scrollLeft = scrollPostion;
        }

        const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    })


    //slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () =>{
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy ({left: scrollAmount, behavior:"smooth"})
        });
    });

    const handleSlideButtons = () =>{
       slideButtons[0].style.display = imageList.scrollLeft <= 0  ? "none" : "block"
       slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft  ? "none" : "block"
    }

    //moves the scrollbar according to the slide
    const uppdateScrollThumbPosition = () =>{
        const scrollPostion = imageList.scrollLeft;
        const thumbPosition = (scrollPostion / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollbarThumb.offsetWidth)
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }


    imageList.addEventListener("scroll", () => {
        handleSlideButtons()
        uppdateScrollThumbPosition()
    })
}

window.addEventListener("load", initSlider)

//carousel ends