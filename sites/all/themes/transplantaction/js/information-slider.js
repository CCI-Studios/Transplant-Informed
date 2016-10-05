(function($) {
	var active = 0;
	var min = 0;
	var max = 0;
	var timer;
	var paused = false;

	$(function()
	{	
 
		$('#block-menu-menu-second-menu > .content > ul.menu > li > a').click(clickThumbnail);

		$('#block-menu-menu-second-menu li.expanded ul.menu a').click(scrolling);
	  	$(".view-information-body .views-field-title span").each(function (index)
	    {  
	      var val=$(this).text().replace(/\W+/g,'');
	      $(this).attr("id",val);        
	    });
		
		$( window ).load(function() 
		{
			var rowHeight=$('.view-information-body .views-row.active').height();
     		 $('.view-information-body').css('height',rowHeight);
	  	});

		max = rows().length;

		var $first = rows().eq(0).clone();

		container().append($first);

		setTimeout(layout, 10);
		$(window).resize(layout);

		if (window.location.href.indexOf("num") > -1)
		{	
			var par=getUrlParameter('num');
			console.log(par);
			gotoIndex(par);
			container().stop(true, true);
		}
		else
		{	
			addActive();
			//start();
		}
	

	$(window).resize(function(){
		var top=$(this).scrollTop();
		if($(window).width() < 767)
		{
			$('#block-menu-menu-second-menu').removeClass('menu-fixed');
			$('#block-menu-menu-second-menu').addClass('menu-fixed-mobile');
			
		}
		
	});
	$('<div class="scroll-top">Scroll Top</div>').insertBefore('#content');
	$('.scroll-top').fadeOut();
	

	});
	
	function second_menu()
	{
		var top=$(this).scrollTop();
		var t=top-$('#block-menu-menu-second-menu').offset().top;
		if($('#block-menu-menu-second-menu').offset().top < top && $(window).width() > 767)
		{
			$('#block-menu-menu-second-menu').addClass('menu-fixed');
		}
		else if($('#block-menu-menu-second-menu').offset().top < top && $(window).width() < 767)
		{
			$('#block-menu-menu-second-menu').addClass('menu-fixed-mobile');
			$('.scroll-top').fadeIn();

		}
		else if($('#content,#block-views-information-body-block').offset().top > top && $(window).width() < 767)
		{
			$('#block-menu-menu-second-menu').removeClass('menu-fixed-mobile');
			$('.scroll-top').fadeOut();
		}
		else if($('#content,#block-views-information-body-block').offset().top > top && $(window).width() > 767)
		{
			$('#block-menu-menu-second-menu').removeClass('menu-fixed');
		}
	}
	$(window).scroll(function(){

		second_menu();
		
	});

	
	function getUrlParameter(sParam)
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	}          

	function addActive()
	{
		$("#block-menu-menu-second-menu .content > ul.menu > li:first-child").addClass("active");
		$(".view-information-body .views-row-first").addClass("active");
	}

	function start()
	{	

		timer = setInterval(timerNext, 7000);

	}

	function container()
	{	 
		   	return $(".view-information-body > .view-content");
	}
	function rows()
	{
		return container().find(" > .views-row");
	}

	function indicators()
	{
		return $("#block-menu-menu-second-menu .content > ul.menu > li ");
	}

	function indicators_body()
	{
		return $(".view-information-body .views-row ");
	}

	function page_height()
	{	

	
		var rowHeight=$('.view-information-body .views-row.active').height();
		$('.view-information-body').css('height',rowHeight+40);
		//console.log(rowHeight)

		if($('.views-row-9,.views-row-1').hasClass('active'))
		{	
		$('.view-information-body').css('height',rowHeight);
		}

	}

	function layout()
	{	
		
		var numRows = rows().length;
		var containerWidth = numRows * rowWidth();
		var width = 1/numRows*100
		container().width(containerWidth+"%");
		rows().width(width+"%");
		page_height();
	}

	function moveContainer()
	{	
		
		var left = "-" + (active*rowWidth()) + "%";
		container().stop(false, false).animate({"left":left},1500);
		 

		  console.log(container().offset().top);
		setActiveIndicator(active);
		page_height();

	}
	function jumpToEnd()
	{
		var active = rows().length-rowsPerPage();
		var left = "-" + (active*rowWidth()) + "%";
		container().css({"left":left});
	}
	function jumpToBeginning()
	{
		var active = min;
		var left = "-" + (active*rowWidth()) + "%";
		container().css({"left":left});
	}
	function rowWidth()
	{
		return 100/rowsPerPage();
	}
	function rowsPerPage()
	{
		if (isMobile())
		{
			return 1;
		}
		else if (isTablet())
		{
			return 1;
		}
		
		return 1;
	}
	function isMobile()
	{
		return $(window).width() < 540;
	}
	function isTablet()
	{
		return $(window).width() < 1220;
	}

	function previous()
	{
		active--;
		if (active < min)
		{
			jumpToEnd();
			active = max-1;
		}
		moveContainer();
	}

	function next()
	{
		active++;
		if (active > max)
		{
			jumpToBeginning();
			active = min+1;
		}
		moveContainer();
	}

	function gotoIndex(i)
	{	
		active = i;

		moveContainer();
	}

	function clickPrevious()
	{
		previous();
		stop();
		return false;
	}


  	function scrolling(e)
  	{		
	  	e.preventDefault();
	  	console.log('anchor clicked');
     		var target = this.hash;
		var i = $(this).parents('li.expanded').index();
		setActiveIndicator(i);
		gotoIndex(i);
		stop();
	      
	      if($(window).width() < 767)
	      {
	      	  var $target = $(target);
		      $('html, body').stop().animate({
		        'scrollTop': $target.offset().top 
	      	}, 150); 
	      }
	      else
	      {
	      	 var $target = $(target);
		      $('html, body').stop().animate({
		        'scrollTop': $target.offset().top - 200
	      	}, 150); 
	      }
	     
	      
  	}
	function clickThumbnail(e)
	{	

		e.preventDefault();
		var i = $(this).parent().index();


	  if($(window).width()<767)
	  {
	  	var target = this.hash;	 
	  	var $target = $(target);
	  	console.log($target);
	  	
  	 	$('html, body').stop().animate({
        'scrollTop': 550
  		}, 150); 

	  }
	  else
	  {
	  	 $('html, body').stop().animate({
	        'scrollTop': 610
      	}, 150); 
	  }
		if($(window).width() < 400)
		{
		
			if (window.location.href.indexOf("fr") > -1)
			{
				//window.location="/fr/?rows&num="+i+'#block-views-information-body-block';
			}
			else
			{
				//window.location="/?rows&num="+i+'#block-views-information-body-block';
			}
		}

	
		if($('body').hasClass('not-front'))
		{
			if (window.location.href.indexOf("fr") > -1)
			{
				window.location="/fr/?rows&num="+i;
			}
			else
			{
				window.location="/?rows&num="+i;
			}
		}
		setActiveIndicator(i);
		gotoIndex(i);
		stop();
	}
	function clickNext()
	{
		next();
		stop();
		return false;
	}

	function stop()
	{
		clearInterval(timer);
	}
	function pause()
	{
		paused = true;
	}
	function unpause()
	{
		paused = false;
	}

	function timerNext()
	{	
		if (!paused)
		{	

			next();
		}
		layout();
	}

	function setActiveIndicator(i)
	{
		if (i >= max)
		{
			i = 0;
		}
		indicators().removeClass("active").eq(i).addClass("active");
		indicators_body().removeClass("active").eq(i).addClass("active");
		
	}


}(jQuery));