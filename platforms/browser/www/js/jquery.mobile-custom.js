var name = localStorage.getItem('name');
var photo = localStorage.getItem('photo');
var email = localStorage.getItem('email');


$(document).on('swipeleft swiperight', function (e) {
		if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
			if ( e.type === "swipeleft" ) {
				$.mobile.activePage.find( "#right-panel" ).panel( "open" );	
			} else if ( e.type === "swiperight" ) {
				$.mobile.activePage.find( "#left-panel" ).panel( "open" );
			}
		} 
});

$(document).on("pageshow", function () {  			   

	$( ".nav-toggle" ).click(function() {
	   $.mobile.activePage.find( "#left-panel" ).panel( "open" );
	});

    $(document).on("panelopen", "#left-panel", function ( e ) { 
        $(".nav-toggle").addClass("navtoggleon");
    });

    $(document).on("panelclose", "#left-panel", function ( e ) {
        $(".nav-toggle").removeClass("navtoggleon");
    });
	 
});

	
$( document ).delegate("#photos", "pagecreate", function() {
  $(".swipebox").swipebox();
});

$( document ).delegate("#blog", "pagecreate", function() {
		$(".posts li").hide();	
		size_li = $(".posts li").size();
		x=4;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+2 <= size_li) ? x+2 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
			$("html, body").animate({ scrollTop: $(document).height() }, 1000);
		});
});

$.widget( "ui.tabs", $.ui.tabs, {

_createWidget: function( options, element ) {
    var page, delayedCreate,
        that = this;

    if ( $.mobile.page ) {
        page = $( element )
            .parents( ":jqmData(role='page'),:mobile-page" )
            .first();

        if ( page.length > 0 && !page.hasClass( "ui-page-active" ) ) {
            delayedCreate = this._super;
            page.one( "pagebeforeshow", function() {
                delayedCreate.call( that, options, element );
            });
        }
    } else {
        return this._super();
    }
}

});


$( document ).delegate("#contact", "pagecreate", function() {
  		$("#ContactForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
		}
		});
});

function startSocial() {
	$('.username').text(name);
	$('.profilephoto').attr('src', photo);
}

$( document ).delegate("#homepage", "pagecreate", function() {
	startSocial();

});

$( document ).delegate("#map", "pagecreate", function() {
	startSocial();
	initMap();


});

$( document ).delegate("#report", "pagecreate", function() {
	startSocial();
	$('.author').text(name);
	$('.authorPhoto').attr('src',photo);
});


function initMap() {
	var myLatlng = new google.maps.LatLng(10.08776931560168,-84.4699501991272);
	var myOptions = {
		zoom: 16,
		center: myLatlng,
		styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#7c93a3"},{"lightness":"-10"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#a0a4a5"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#62838e"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#dde3e3"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#3f4a51"},{"weight":"0.30"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#bbcacf"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":"0"},{"color":"#bbcacf"},{"weight":"0.50"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#a9b4b8"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"saturation":"-7"},{"lightness":"3"},{"gamma":"1.80"},{"weight":"0.01"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a3c7df"}]}]
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	var geocoder = new google.maps.Geocoder();
    var marker;
	window.infowindow = new google.maps.InfoWindow({
		content: name
	});

	google.maps.event.addListener(map, 'click', function(event) {
		geocoder.geocode({
			'latLng': event.latLng
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {

					alert(results[0].formatted_address);
					var latitude = event.latLng.lat();
					var longitude = event.latLng.lng();

				marker = new google.maps.Marker({
						position: event.latLng,
						map: map,
						animation: google.maps.Animation.DROP,
					});
					alert(latitude);
					alert(longitude);
					google.maps.event.addListener(marker, 'mousedown', function(){
						window.infowindow.open(marker.get('map'), marker);
					});
				}
			}
		});
	});




	google.maps.event.addListenerOnce(map, 'idle', function() {
		google.maps.event.trigger(map, 'resize');
	});
}