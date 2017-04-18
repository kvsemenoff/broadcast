

$(document).ready(function(){
	$('.main-menu a[href^="#"]').click(function(){ 
      var $element = $('a[name=' + $(this).attr('href').substr(1) + ']');
      if($element.length == 1) { 
         $('html, body').animate({ scrollTop: $element.offset().top }, 500); 
      }     
      return false;
    });


	$(".menu-ico").click(function(){
        $('.main-menu').slideToggle(0);
        
    });
    $(".main-menu li a").click(function(){
        //$('.main-menu').slideToggle(0);
        
    });
    
	$('.js-phone').mask("+7(999)999-99-99?");

	$('a[data-name=modal]').click(function(e) {
		e.preventDefault();
		var id = $(this).attr('href');
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		$('#mask').fadeTo("slow",0.8); 
		var winH = $(window).height();
		var winW = $(window).width();
		posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement ||document.body.parentNode || document.body).scrollTop;
		$(id).css('top',  posTop+50);
		$(id).css('left', winW/2-$(id).width()/2);
		$(id).fadeIn(500); 
	});
	$('.window .dd-close').click(function (e) {
		e.preventDefault();
		$('#mask, .window').hide();
		$('.window').hide();
	}); 

	$('#mask, .an-exit__krest').click(function () {
		$('#mask').hide();
		$('.window').hide();
	}); 

	$(".form1").submit(function() { 
		var tel = $(this).find('input[name="phone"]');
		var empty = false;
		if (tel.val() == ""){
			empty = true;
		}
		if (empty == true){
			tel.addClass("error-input");
			tel.focus();
		}else{
			var form_data = $(this).serialize(); 
			$.ajax({
				type: "POST", 
				url: "/sendmessage.php", 
				data: form_data,
				success: function() {
					cleanTnanks(this);
				}
			});
		}
		return false;
	});

	function cleanTnanks(form){
		$('input[type="text"]').removeClass("error-input");
		$("input[type=text], textarea").val("");
		$('.window').hide();
		$('a[href=#thanks]').trigger('click');
	};


	var owl2 = $("#command__owl_carousel");
	owl2.owlCarousel({
		loop:true,
		nav:true, 
		autoplay:false,
		smartSpeed:1000,
		margin:0,
		mouseDrag:false,
		touchDrag: false,
        center:false,     //если нужны обрезаные края
        navText:['<span class="df-left"></span>','<span class="df-right"></span>'],
        responsive:{
        	0:{
        		items:1
        	},      
        	990:{
        		items:1
        	},      

        	1248:{
        		items:1
        	}
        }
	});


});



$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});

