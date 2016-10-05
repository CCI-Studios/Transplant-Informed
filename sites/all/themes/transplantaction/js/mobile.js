(function($){

	$(function(){

	
		$('.scroll-top').click(function(){
			$('html, body').stop().animate({'scrollTop':600},400);
		});
		

		$('#block-menu-menu-second-menu ul.menu li:not(.expanded)').click(function(){
			if($(window).width()<767)
			{
				$('#block-menu-menu-second-menu .content > ul.menu li.expanded ul.menu').slideUp();
			}
								
		})

		$('li.expanded > a').click(function(){

			if($(window).width()<767)
			{
				$('#block-menu-menu-second-menu .content > ul.menu li.expanded.active ul.menu').slideToggle();
			}
		});
		
	
		
	});

})(jQuery);