'use strict';

// scroll
(function($){
  $('a[href^="#"]').on('click',function(){
    var speed = 500;
    var href = $(this).attr('href');
    var offset = 0;
    var offTop = 0;
    if ($(href).length){
      offTop = $(href).offset().top;
    }
    var position = offTop - offset;
    $('html, body').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
})(jQuery);

// pagetop
(function($){
  window.onload = function(){

/*
    $(window).on('scroll', function() {
      scrollHeight = $(document).height();
      scrollPosition = $(window).height() + $(window).scrollTop();
      if ( scrollHeight - scrollPosition  <= 400 ) {
        $('.pagetop').css({
          'position':'absolute',
          'bottom': '450px'
        });
      } else {
        $('.pagetop').css({
          'position':'fixed',
          'bottom': '50px'
        });
      }
    });
*/

    $('.pagetop a').click(function(){
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  };
})(jQuery);

// restrict-multibyte
(function($){
  $('.restrict_mb').change(function(){
    var str = $(this).val();
    str = str.replace( /[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
    $(this).val(str);
  }).change();
})(jQuery);

// スマホ以外のときに電話のリンクを外す
(function($){
  var ua = navigator.userAgent.toLowerCase();
  var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);

  if(!isMobile) {
    $('a[href^="tel:"]').on('click',function(e){
      e.preventDefault();
    });
  }
})(jQuery);

(function($){
  $(window).on('load resize',function(){
    var ww = $(window).width();

    if(ww<768){
      // スマホナビゲーション 固定表示
      $('.navbar-default').addClass('navbar-fixed-top');
    }else{
      $('.navbar-default').removeClass('navbar-fixed-top');
    }

  });
})(jQuery);

// spnav toggleClass
(function($){
  var state = false;
  var scrollpos;

  $('#nav-toggle').on('click',function(){
    if(state === false){
      scrollpos = $(window).scrollTop();
      $('body').addClass('bg-fixed').css({'top': -scrollpos});
      $('#gnav:not(:animated)').slideDown();
      state = true;
    }else{
      $('body').removeClass('bg-fixed').css({'top': 0});
      window.scrollTo(0, scrollpos);
      $('#gnav:not(:animated)').slideUp();
      state = false;
    }
  });
})(jQuery);

(function($){
  $(window).on('load scroll',function(){
    var ww = $(window).width();
    // PCナビゲーション 固定表示
    if((ww>=768)&&($(window).scrollTop() > 500)){
      $('.navbar-default').addClass('fixed');
      $('header').addClass('fix-head');
    } else {
      $('.navbar-default').removeClass('fixed');
      $('header').removeClass('fix-head');
    }

      // pagetop
    if((ww>=992)&&($(window).scrollTop() > 700)){
      $('.pagetop').fadeIn();
    } else {
      $('.pagetop').fadeOut();
    }
  });
})(jQuery);
