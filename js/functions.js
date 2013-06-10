var APP = APP || {};

// anonymous function
(function(window, document){

	// ajax call to locations.json
	microAjax("json/people.json", function (contents) {
  		// get the data from json file and store it into APP.data
  		APP.data = JSON.parse(contents);

  		// only do when json is loaded
  		onDomReady( APP.controller.init );
	});

	APP.controller = {
		// Use regular expression for string matching (gi == global search, ignore case)
		isAndroid : (/android/gi).test(navigator.appVersion),
		isIDevice : (/iphone|ipad/gi).test(navigator.appVersion),

		init: function () {

			// Init page states			
			APP.states.init();

			// Hide addressbar on mobile/tablet
			APP.utils.hideAddressBar();
			
			Gator(window).on('orientationchange', function(e) {
			    APP.utils.hideAddressBar();
			});


			// some ugly css replacements
			$("ul.coloredlist li:nth-child(3n+1) a").css("background", "#70cfb3");
			$("ul.coloredlist li:nth-child(3n+2) a").css("background", "#70c3cf");
			$("ul.coloredlist li:nth-child(3n+3) a").css("background", "#e5c45f");
		}
	};

	APP.states = {
		init: function () {
			routie({
				'/profiel/?:name': APP.pages.getProfile,
    			'/?:name': APP.pages.getPage
			});
		}
	};


	// functions for the routing
	APP.pages = {
		getPage: function (id) {
			console.log(id);

			if( $("section#"+id).length == 0){
				id = "index";
			}

			$("section.show").removeClass("show");
			$("section#"+id).addClass("show");


		},
		getProfile: function(id){
			console.log(id);


		}
	};

	// some handy stuff
	APP.utils = {
		documentWidth: function(){
			return document.body.clientWidth;
		},

		documentHeight: function(){
			return document.body.clientHeight;
		},

		// Source: https://gist.github.com/mhammonds/1190492#file-hidemobileaddressbar-js
		hideAddressBar: function () {
			if(!window.location.hash) {
			    if(document.height < window.outerHeight) {
			          document.body.style.height = (window.outerHeight + 50) + 'px';
			    }
			 
			    setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
			}
		}
	};




})(window, document);