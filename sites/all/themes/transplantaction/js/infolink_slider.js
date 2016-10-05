(function($) {
	var active = 0;
	var min = 0;
	var max = 0;
	var timer;

	$(function()
	{
		$(".view-information-links #prev").click(clickPrevious);
		$(".view-information-links #next").click(clickNext);
		$(".view-information-links .views-row").click(stop);

		max = rows().length;

        hideArrows();
		setTimeout(layout, 50);
		$(window).resize(layout);
	});

	function start()
	{
		timer = setInterval(timerNext, 2000);
	}

	function container()
	{
		return $(".view-information-links .view-content");
	}

	function rows()
	{
		return container().find(".views-row");
	}

	function layout()
	{
		var numRows = rows().length;
		var containerWidth = numRows * rowWidth();
		var width = 1/numRows*100
		container().width(containerWidth+"%");
		rows().width(width+"%");
	}

	function moveContainer()
	{
		var left = "-" + (active*rowWidth()) + "%";
		container().stop(false, false).animate({"left":left});
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
			return 2;
		}
		
		return 3;
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
		if (hasPrevious())
        {
			active--;
			moveContainer();
			hideArrows();
		}
	}

	function next()
	{
		if (hasNext())
        {
			active++;
			moveContainer();
			hideArrows();
		}
	}

	function clickPrevious()
	{
		previous();
		stop();
		return false;
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


	function timerNext()
	{
		next();
		layout();
	}


    function minIndex()
    {
        return 0;
    }
    function maxIndex()
    {
        return rows().length - rowsPerPage();
    }
    function hasPrevious()
    {
        if (active - 1 < minIndex())
            return false;
        return true;
    }
    function hasNext()
    {
        if (active + 1 > maxIndex())
            return false;
        return true;
    }
    function hideArrows()
    {
    	var $btnPrevious = $(".view-information-links #prev");
    	var $btnNext = $(".view-information-links #next");

        if (hasPrevious())
        {
            $btnPrevious.show();
        }
        else
        {
            $btnPrevious.hide();
        }

        if (hasNext())
        {
            $btnNext.show();
        }
        else
        {
            $btnNext.hide();
        }
    }

}(jQuery));
