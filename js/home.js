jQuery.noConflict();
(function($) {

	var equalize = function(){
		$('.sm-equal').each(function(index,ele){
			var highest = 0;
			$(ele).children('.col').each(function(){
				if($(this).height() > highest){
					highest = $(this).height();
				}
			});
			if ($(window).width() >= 768){
				$(ele).children('.col').height(highest);
			} else {
				$(ele).children('.col').height('auto');
			}
		});			
	}	
	
	$carousel = $('.sections-selector');

	if ($carousel.length){
		$carousel.slick({
			dots: true,
			infinite: true
		});
	}

	$stories = $('.considerations');
	if ($stories.length) {
		$stories.slick({
			dots: true,
			infinite: true
		});
	}

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		
		if($(e.target).attr("href") == "#keep-in-mind"){
			$('.considerations').slick("refresh");
		}
		if($(e.target).attr("href") == "#cost"){
			$('.sm-equal').each(function(index,ele){
				$(ele).children().css('height', 'auto');
			});
			equalize();
		}
	});

	// waypoints (activate menu in home page)
	$welcome = $('#welcome');

	if ($welcome.length){
		$welcome.waypoint({
			handler: function(direction){
				$('#navbar').toggleClass('active', direction === 'down');
				$('body').toggleClass('scrolled', true);
			},
			offset: '120px'
		})
	}

	$title = $('.title-wrapper');

	if ($title.length){
		$title.eq(0).waypoint({
			handler: function(direction){
				if(direction == "down"){
					$('.title-wrapper')
						.toggleClass('fixed', true)
						.next()
						.css('padding-top', $('.title-wrapper').eq(0).innerHeight())
				} else {
					$('.title-wrapper')
						.toggleClass('fixed', false)
						.next()
						.css('padding-top', 0)
				}
			},
			offset: $('header').eq(0).innerHeight()
		});
	}


	$(window).on('load resize', function(event){
		equalize();
	});


	if( $('body').is('.node-site-hcp') && typeof Storage !== "undefined") {
		var is_hcp = sessionStorage.getItem("is_hcp");
		if (!is_hcp || typeof is_hcp == "undefined") {
			bootbox.confirm({
				message: "<p>The information in this website is intended for U.S. healthcare professionals.</p>Are you a U.S. healthcare professional?</p>",
				buttons: {
					confirm: {
						label: 'Yes',
						className: 'btn-primary'
					},
					cancel: {
						label: 'No',
						className: 'btn-default'
					}
				},
				callback: function(result) {
					if (result === true) {
						sessionStorage.setItem("is_hcp", true);
					}
					else {
						window.open("/");
					}
				},
				className: 'hcp-alert'

			});				
		}
	}

	$('.home-block--get-support .embedded-entity a').toggleClass('baxter-external-link', true);

	// popup for external links
	$externalLinks = $('.external-link, .baxter-external-link');

	if ($externalLinks.length){
		$externalLinks.on('click', function(event){
			event.preventDefault();
			$ele = $(this);
			bootbox.confirm({
				message: "<p>You are currently being directed from the website of Baxter Corporation to an external website where information and linked advertisements may not comply with regulatory requirements.</p><p>This link to an external website is provided for information purposes only and is not intended as advice. Please discuss information from other websites with your healthcare professional. Baxter Corporation can take no responsibility for the web pages your encounter once you have this site.</p>",
				buttons: {
					confirm: {
						label: 'I have read, understand and agree to the above statements',
						className: 'btn-primary'
					},
					cancel: {
						label: 'I do not want to leave this site',
						className: 'btn-default'
					}
				},
				callback: function(result) {
					if (result === true) {
						window.open($ele.attr('href'), '_blank');
					}
				}

			});
		});
	}

	// toggle search form
	$searchToggle = $('a[title=Search]');

	if ($searchToggle.length){
		$searchToggle.on('click', function(event){
			event.preventDefault();

			$body = $('body');
			$formInput = $('input[name=keywords]');
			
			$body.toggleClass('open-search');
			if ( $body.hasClass('open-search') ){
				$formInput.focus();
			} else {
				$formInput.blur();
			}
		});
	}

	// listen to hashs in url
	$tabs = $('.nav-tabs a');
	if ( $tabs.length ){

		var hash = window.location.hash;

		if ( hash ) {
			$('ul.nav a[href="' + hash + '"]').tab('show');
			window.scrollTo(0,0);
		}

		$(window).on('hashchange', function(event){
			var newHash = window.location.hash;
			$('ul.nav a[href="' + newHash + '"]').tab('show');
		});

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
			window.scrollTo(0,0);
		})

		$tabs.click( function (event) {
			event.preventDefault();
			window.location.hash = this.hash;
		});		
	}

	$('#navbar-collapse').on('show.bs.collapse', function () {
 		$('body').toggleClass('open-menu', true);
	});

	$('#navbar-collapse').on('hidden.bs.collapse', function () {
 		$('body').toggleClass('open-menu', false);
	});

	$(".asset-link").each(function(index, element){
		$('<div>')
			.css('background-image', 'url(' + $(this).find('.data-layer img').eq(0).attr('src') + ')')
			.toggleClass('asset-image', true)
			.prependTo($(this).find('.action-layer'));
		
		if ( $(this).is(".pdf") ){
			$this = $(this);
			$(this).find('.data-link').each(function(index, ele){
				var text = $(ele).find('span').eq(0).on('click', function(){ 
					target = $(ele).find('.file-link a').attr('href'); 
					window.open(target, '_blank');
				});
				var button = $this.find('.action-layer p').eq(0).before(text);
			});
		}
		

		if ( $(this).is(".video") ){
			// $(this).find('[data-toggle="modal"]').on('click', function(){
			// 	var theModal = $(this).data( "target" ),
			// 	// videoSRC = $(this).attr( "data-video" ), 
			// 	// videoSRCauto = videoSRC+"?autoplay=1" ;
			// 	// $(theModal+' iframe').attr('src', videoSRCauto);
			// 	$(theModal+' button.close').click(function () {
			// 		$(theModal+' iframe').attr('src', videoSRC);
			// 	});  
			// });
		}
	});

	$(".btn-download").on('click', function(event){
		event.preventDefault();
		window.open($(this).find('a').eq(0).attr("href"), '_blank');
	});

	$('.navbar-brand').on('click', function(event){
		event.preventDefault();
		var target = $(this).attr('href');
		if( $('body').is('.node-site-hcp')) {
			target = "/hcp";
		}
		window.location.href = target;
	});

	if(window.location.hash) {
		var id = window.location.hash;
		var filterId = id.replace("#",'');

		if ( $(id).length ){
			$('html, body').animate({scrollTop: $(id).offset().top - $('header').eq(0).height() }, 'slow');
			var collapsible = $(id).find('.link-box-body');
			if ( collapsible.length ){
				collapsible.eq(0).collapse('show');
			}
		}

		if ( $("[data-filter="+filterId+"]").length ){
			setTimeout(function() {
				$("[data-filter="+filterId+"]").trigger('click');
			}, 500);
		} 
	};

	// $('.form').validate();


	$('.baxter-pdf-link').each(function(index, ele){
		var caption = $(ele).find('figcaption');
		if ( caption.length ){
			caption.hide();
			$(ele).find('a').text(caption.text());
		}
	});

	/* open submenu items on hover */
	$('#navbar-collapse ul.nav li.dropdown')
		.on('mouseenter',function() {
			if ($(window).width()>=1000) {
				$(this).find('.dropdown-menu').stop(true, true).show();
			}
			
		})
		.on('mouseleave', function() {
			if ($(window).width()>=1000) {
				$(this).find('.dropdown-menu').stop(true, true).hide();
			}
		});	

	/**
	 * filters in knowledge center
	 */
	var kc = function(){
	 	var $all = $(".elements .col");
	 	var $controls = $(".filters button");
	 	var pagination = {
	 		filter: "all",
	 		page: 1,
	 		perpage: 9
	 	};

	 	parseFilter = function(filter) {
	 		var selector;
	 		if (typeof filter == "undefined" || filter == "all") {
	 			selector = ".col";
	 		} else {
	 			selector = '.tag-'+filter;
	 		}
	 		return selector;
	 	}

	 	getFiltered = function(filter){
	 		var selector = parseFilter(filter);
	 		return $all.filter(selector);
	 	};

	 	getPages = function(){

	 		return Math.ceil( getFiltered(pagination.filter).length / pagination.perpage);
	 	};

	 	showPage = function() {
	 		$all.toggleClass('hidden', true);
	 		var first = (pagination.page - 1) * pagination.perpage;
	 		var last = Math.min( getFiltered(pagination.filter).length, first + pagination.perpage);
	 		var visible = getFiltered(pagination.filter).slice(first, last).toggleClass('hidden', false);
	 	};

	 	paginate = function() {
	 		var i;
	 		var $list = $("#pagination");
	 		var pages = getPages();
	 		$list.html(null);
	 		for (i=0; i<pages; i++) {
	 			page = i+1;
	 			$item = $('<li><a href="#">'+page+'</a></li>').toggleClass('active', i+1 == pagination.page);
	 			$list.append($item);
	 		}
	 	}

	 	draw = function(){
	 		showPage();
	 		paginate();
	 	}

	 	
	 	$controls.on('click', function(event){
	 		if ($(this).is(".active")) {
	 			return false;
	 		}
	 		$(this).toggleClass('active', true).siblings().toggleClass('active', false);
	 		window.location.hash = $(this).data("filter");
	 		pagination.filter = $(this).data("filter");
	 		pagination.page = 1;
	 		draw();
	 	});

	 	$('#pagination').on("click", "a", function(event){
	 		event.preventDefault();
	 		page = parseInt($(event.target).text());
	 		pagination.page = page;
	 		draw();
	 	});

	 	draw();	 		
	 	
	 };

	 if($('body').is('.node-id-31')){
	 	kc();
	 }






})( jQuery );

(function ($, Drupal) {
  Drupal.behaviors.customCKEditorConfig = {
    attach: function (context, settings) {
      if (typeof CKEDITOR !== "undefined") {
	      CKEDITOR.dtd.$removeEmpty['i'] = false;
	      CKEDITOR.dtd.$removeEmpty['span'] = false;
      }
    }
  }
})(jQuery, Drupal);

