		$(document).ready(function(){
        	var owl = $(".owl-carousel-1");
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
			        },
			       
			    }
			});
			/*==================== OWL-2 ============================*/ 
			var owl = $(".owl-carousel-2");
		 	owl.owlCarousel({
		  		margin:0, 							<!-- kho img (px)-->
		  		loop:true, 							<!-- slide chay theo vong -->
		  		nav:true, 							<!-- Hien thi prev - next -->
		  		navText:['<i class="owlprev2"></i>','<i class="owlnext2"></i>'], <!-- Thay the prev - next mac dinh cua owl 'prev','next' -->
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
			        },
			       1000:{
			            items:4,          
			        },
			    }
			});
			/*==================== OWL-2 ============================*/ 
			var owl = $(".owl-carousel-3");
		 	owl.owlCarousel({
		  		margin:0, 							<!-- kho img (px)-->
		  		loop:true, 							<!-- slide chay theo vong -->
		  		nav:true, 							<!-- Hien thi prev - next -->
		  		navText:['<i class="owlprev3"></i>','<i class="owlnext3"></i>'], <!-- Thay the prev - next mac dinh cua owl 'prev','next' -->
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
			        },
			       1000:{
			            items:4,          
			        },
			    }
			});
			/*==================== OWL-2 ============================*/ 
			var owl = $(".owl-carousel-4");
		 	owl.owlCarousel({
		  		margin:0, 							<!-- kho img (px)-->
		  		loop:true, 							<!-- slide chay theo vong -->
		  		nav:true, 							<!-- Hien thi prev - next -->
		  		navText:['<i class="owlprev4"></i>','<i class="owlnext4"></i>'], <!-- Thay the prev - next mac dinh cua owl 'prev','next' -->
		  		autoplay:true, 						<!-- tu dong chay -->
		  		autoplayTimeout:1500,
				autoplayHoverPause:true,
				autoplaySpeed: 1000,
				responsiveClass:true, 				<!-- responsive slider -->
			    responsive:{
			        300:{
			            items:1,									            									            
			        },
			       
			    }
			});
			 $('.but-prev').click(function() {
			 	$('.owlprev').click();
			 });
			 $('.but-next').click(function() {
			 	$('.owlnext').click();
			 });
			 /*=========== click 2==========*/ 
			 $('.but-prev2').click(function() {
			 	$('.owlprev2').click();
			 });
			 $('.but-next2').click(function() {
			 	$('.owlnext2').click();
			 });
			 /*=========== click 3==========*/ 
			 $('.but-prev3').click(function() {
			 	$('.owlprev3').click();
			 });
			 $('.but-next3').click(function() {
			 	$('.owlnext3').click();
			 });
			 /*=========== click 3==========*/ 
			 $('.but-prev4').click(function() {
			 	$('.owlprev4').click();
			 });
			 $('.but-next4').click(function() {
			 	$('.owlnext4').click();
			 });
			 if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
		});
