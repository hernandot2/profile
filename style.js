$(document).ready(function() {
    // Escondendo o menu inicialmente
    $('.top-navigation-fixed').hide();
  
    $(window).scroll(function() {
      // Se a posição de rolagem for maior que 100 pixels, mostre o menu
      if ($(this).scrollTop() > 100) {
        $('.top-navigation-fixed').fadeIn();
      } else {
        $('.top-navigation-fixed').fadeOut();
      }
    });
  });
  