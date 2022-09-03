$(function(){
    $('.header__btn').on('click', function(){
        $('.rightside-menu').addClass('rightside-menu__block');
        $('.rightside-background').addClass('rightside-background__block');
    })
    $('.rightside-menu__icon-close').on('click', function(){
        $('.rightside-menu').removeClass('rightside-menu__block');
        $('.rightside-background').removeClass('rightside-background__block');
    })
    $('.top__slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,

        slidesToShow: 1,
        slidesToScroll: 1,

        autoplay: true,
        speed: 3000,
    });
    $('.bottom-slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,

        slidesToShow: 1,
        slidesToScroll: 1,

        autoplay: true,
        speed: 3000,
    });
    $('.blog-content__article-slider').slick({
        nextArrow: '<button class="blog-content__article-sliderRight"><img src="./images/right-arrow.svg" alt=""></button>',
        prevArrow: '<button class="blog-content__article-sliderLeft"><img src="./images/left-arrow.svg" alt=""></button>',
    });
    $('.header__btn-mobile').on('click', function(){
        $('.header').toggleClass('header--active');
        
    })
    $('.blog-icon').on('click', function(){
        console.log('g')
        $('.blog-sidebar').toggleClass('blog-sidebar--active');
        $('.blog-sidebar').toggleClass('blog-sidebar--mini');
        $('.blog-content').toggleClass('blog-content--active');
        $('.blog-content').toggleClass('blog-content--mini');
    })
    let mixer = mixitup('.gallary__body', {
        load: {
            filter: '.bedroom',
        },
        animation: {
            duration: 200,
        }
    });
})