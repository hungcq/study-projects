$(document).ready(function(){
	$('.text2').css('display','none');
	$('.TA-basic').click(function(){
		$('.text2').hide();
		$('.text').show();
		$(this).addClass('active');
		$('.description').removeClass('active');
	});

	$('.description').click(function(){
		$('.text').hide();
		$('.text2').show();
		$(this).addClass('active');
		$('.TA-basic').removeClass('active');
	});
});