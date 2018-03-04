$(document).ready(function(){

	  $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.up_button').fadeIn();
        } else {
            $('.up_button').fadeOut();
        }
    });

    $('.up_button').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

  var owl = $(".carousel1");
 	owl.owlCarousel({
  		margin:0, 							<!-- kho img (px)-->
  		loop:true, 							<!-- slide chay theo vong -->
  		nav:true, 							<!-- Hien thi prev - next -->
  		navText:['<i class="owlprev"></i>','<i class="owlnext"></i>'], <!-- Thay the prev - next mac dinh cua owl 'prev','next' -->
  		autoplay:true, 						<!-- tu dong chay -->
  		autoplayTimeout:1500,
		autoplayHoverPause:true,
		autoplaySpeed: 1000,
		responsiveClass:true, 				<!-- responsive slider -->
	    responsive:{
	        0:{
	            items:1,									            									            
	        },
	        600:{
	            items:3,          
	        }
	    }
	});
  /*==================== OWL-2 ============================*/ 
      var owl = $(".carousel2");
      owl.owlCarousel({
          margin:0,               <!-- kho img (px)-->
          loop:true,              <!-- slide chay theo vong -->
          nav:true,               <!-- Hien thi prev - next -->
          navText:['<i class="owlprev2"></i>','<i class="owlnext2"></i>'], <!-- Thay the prev - next mac dinh cua owl 'prev','next' -->
          autoplay:true,            <!-- tu dong chay -->
          autoplayTimeout:1500,
        autoplayHoverPause:true,
        autoplaySpeed: 1000,
        responsiveClass:true,         <!-- responsive slider -->
          responsive:{
              0:{
                  items:1,                                                            
              },
              600:{
                  items:3,          
              },
             1000:{
                  items:4,          
              },
          }
      });
      /*==================== OWL-2 ============================*/ 
      var owl = $(".carousel3");
      owl.owlCarousel({
          margin:0,               <!-- kho img (px)-->
          loop:true,              <!-- slide chay theo vong -->
          nav:true,               <!-- Hien thi prev - next -->
          navText:['<i class="owlprev3"></i>','<i class="owlnext3"></i>'], <!-- Thay the prev - next mac dinh cua owl 'prev','next' -->
          autoplay:true,            <!-- tu dong chay -->
          autoplayTimeout:1500,
        autoplayHoverPause:true,
        autoplaySpeed: 1000,
        responsiveClass:true,         <!-- responsive slider -->
          responsive:{
              0:{
                  items:1,                                                            
              },
              600:{
                  items:3,          
              },
             1000:{
                  items:4,          
              },
          }
      });
});