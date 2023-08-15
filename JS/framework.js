$(function() {
    //Home Slide
    let header = $('header .contain')
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
            header.css('position', 'fixed')
        } else {
            header.css('position', 'relative')
        }
    })


    //Home Tools
    let tools = $('header .contain .tools .tool')
    tools.each(function() {
        $(this).on('mouseenter', function() {
            if ($(this).children('.plus').children('i').hasClass('fa-plus')) {
                $(this).children('.plus').children('i').removeClass('fa-plus').addClass('fa-minus')
            }
        })
        $(this).on('mouseleave', function() {
            if ($(this).children('.plus').children('i').hasClass('fa-minus')) {
                $(this).children('.plus').children('i').addClass('fa-plus').removeClass('fa-minus')
            }
        })
        $(this).on('click', function() {
            $(this).children('.pop-up').toggle(0)
        })
    })


    //List Slide
    $('header .contain .icon i').on('click', function() {
        $('header .contain .tools').toggleClass('dis')
        if ($(this).hasClass('fa-bars')) {
            $(this).removeClass('fa-bars')
            $(this).addClass('fa-xmark')
        } else {
            $(this).addClass('fa-bars')
            $(this).removeClass('fa-xmark')
        }
    })


    //Icon of Slide of Main Section
    let contains = $('.main-section .contains')
    $(".main-section .left").on('click', function() {
        contains.children('.contain').each(function() {
            $(this).removeClass('slide')
        })
        contains.children('.contain').each(function() {
            $(this).addClass('slide')
        })
        var currentImg = $('.main-section .contains .active')
        var prevImg = currentImg.prev()
        if (prevImg.length) {
            currentImg.removeClass('active')
            prevImg.addClass('active')
        } else {
            currentImg.removeClass('active')
            $('.main-section .contains .contain').eq(-1).addClass('active')
        }
        $('.main-section .contains .contain').each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('hide')
            } else if (!$(this).hasClass('hide')) {
                $(this).addClass('hide')
            }
        })
    })
    $(".main-section .right").on('click', function() {
        contains.children('.contain').each(function() {
            $(this).removeClass('slide')
        })
        contains.children('.contain').each(function() {
            $(this).addClass('slide')
        })
        var currentImg = $('.main-section .contains .active')
        var nextImg = currentImg.next()
        if (nextImg.length) {
            currentImg.removeClass('active')
            nextImg.addClass('active')
        } else {
            currentImg.removeClass('active')
            $('.main-section .contains .contain').eq(0).addClass('active')
        }
        $('.main-section .contains .contain').each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('hide')
            } else if (!$(this).hasClass('hide')) {
                $(this).addClass('hide')
            }
        })
    })


    //Number Counter
    let nums = $('.counter .contain .box .num');
    let section = $('.counter .contain');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= section.offset().top - 500) {
            nums.each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-num');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    })


    //Video Handle
    $('.video .contain .play .icon').on('click', function() {
        $('.video .contain .watch').removeClass('hide')
        $('.video .contain .watch video').get(0).play()
    })
    $('.video .contain .watch .overlay').on('click', function() {
        $('.video .contain .watch').addClass('hide')
        $('.video .contain .watch video').get(0).pause()
    })


    //Slides Handle
    let boxes = $('.gallery .contain .boxes .box')
    let slides = $('.gallery .contain .slides .slide')
    slides.each(function() {
        let slide = $(this)
        slide.on('click', function() {
            slides.each(function() {
                $(this).removeClass('active')
            })
            boxes.each(function() {
                $(this).addClass('hide')
            })
            slide.addClass('active')
            boxes.each(function() {
                if (slide.hasClass('all')) {
                    boxes.each(function() {
                        $(this).removeClass('hide')
                    })
                } else if (slide.hasClass($(this).data('slide'))) {
                    $(this).removeClass('hide')
                }
            })
        })
    })


    //Gallery Slider
    let pluses = $('.gallery .contain .boxes .box .pop-up .icon')
    let sliderImgs = $('.gallery .contain .slider-imgs')
    pluses.each(function() {
        $(this).on('click', function() {
            sliderImgs.removeClass('hide')
        })
    })


    //Current Year
    let year = new Date().getFullYear()
    $('#year').text(year)


    //Testimonial (Owl-carousel) Plugin
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 2,
                nav: true,
                loop: false
            }
        }
    })


    //Gallery Popup Slider
    let imgs = $('.slider-imgs .content .imgs .pics picture img')
    let plusIcons = $('.gallery .contain .boxes .box .pop-up .icon')

    function activeHandle() {
        imgs.each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('hide')
            } else if (!$(this).hasClass('hide')) {
                $(this).addClass('hide')
            }
        })
    }

    function countOfImgs() {
        let countNum = $('.slider-imgs .content .imgs .pics .count span.start')
        for (let i = 0; i < imgs.length; i++) {
            if (imgs.eq(i).hasClass('active')) {
                countNum.text(i + 1)
            }
        }
    }

    function closeAndOpen() {
        $('body').toggleClass('over-hide-body')
        $('.slider-imgs').toggleClass('hide')
    }

    plusIcons.each(function() {
        $(this).on('click', function() {
            let curActive = $('.slider-imgs .content .imgs .pics picture img.active')
            curActive.removeClass('active')
            imgs.eq(plusIcons.index(this)).addClass('active')
            activeHandle()
            countOfImgs()
            closeAndOpen()
        })
    })

    $('.slider-imgs .content .right').on('click', function() {
        let curImg = $('.slider-imgs .content .imgs .pics picture img.active')
        let nextImg = curImg.next()
        curImg.removeClass('active')
        if (nextImg.length) {
            nextImg.addClass('active')
            activeHandle()
        } else {
            imgs.eq(0).addClass('active')
            activeHandle()
        }
        countOfImgs()
    })

    $('.slider-imgs .content .left').on('click', function() {
        let curImg = $('.slider-imgs .content .imgs .pics picture img.active')
        let prevImg = curImg.prev()
        curImg.removeClass('active')
        if (prevImg.length) {
            prevImg.addClass('active')
            activeHandle()
        } else {
            imgs.eq(-1).addClass('active')
            activeHandle()
        }
        countOfImgs()
    })

    $('.slider-imgs .content .imgs .pics .icon').on('click', function() {
        closeAndOpen()
    })

    $('.slider-imgs .overlay').on('click', function() {
        closeAndOpen()
    })


    //Form Of Contact
    $('.form .contain form .btn button').on('click', function(e) {
        let fill = false
        $('.form .contain form input').each(function() {
            if ($(this).val().length) {
                fill = true
            } else {
                fill = false
                return;
            }
        })
        if (fill) {
            e.preventDefault()
            $('.form .contain form > span').removeClass('hide')
        }
    })


    //Slide Of Swip UP
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $('main .swip').fadeIn()
        } else {
            $('main .swip').fadeOut()
        }
    })
})