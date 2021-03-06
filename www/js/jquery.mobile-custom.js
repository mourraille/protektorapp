var name = localStorage.getItem('name');
var photo = localStorage.getItem('photo');
var email = localStorage.getItem('email');

window.onload = function() {

	var options = {
		enableHighAccuracy: true,
		maximumAge: 3600000
	}


	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	function onSuccess(position) {

		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		localStorage.setItem('lat', lat);
		localStorage.setItem('lon', lon);
	};

	function onError(error) {
alert('error on geolocation');
	}
}
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



function initMap() {

	var pinColor = "454545";
	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		new google.maps.Size(40, 37),
		new google.maps.Point(0, 0),
		new google.maps.Point(12, 35));

	var lat = localStorage.getItem('lat');
	var lon = localStorage.getItem('lon');
	var myLatlng = new google.maps.LatLng(lat,lon);

	var myOptions = {
		zoom: 16,
		streetViewControl: false,
		center: myLatlng,
		styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#7c93a3"},{"lightness":"-10"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#a0a4a5"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#62838e"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#dde3e3"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#3f4a51"},{"weight":"0.30"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#bbcacf"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":"0"},{"color":"#bbcacf"},{"weight":"0.50"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#a9b4b8"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"saturation":"-7"},{"lightness":"3"},{"gamma":"1.80"},{"weight":"0.01"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a3c7df"}]}]
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	var geocoder = new google.maps.Geocoder();
    var marker;

	var r = JSON.parse(localStorage.getItem('Reportes'));
	alert(r.length);

	for (var i = 0; i < r.length; i++) {
		var mylat = r[i].Latitud;
		var mylon = r[i].Longitud;
		mylat = mylat.replace(',','.');
		mylon = mylon.replace(',','.');
		lat = parseFloat(lat);
		lon = parseFloat(lon);

		var markerlatlon = new google.maps.LatLng(mylat,mylon);

		marker = new google.maps.Marker({
			position: markerlatlon,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: pinImage,
			shadow: pinShadow,
			clickable: true,
		});
		marker.info = new google.maps.InfoWindow({
			content: '<h1>'+r[i].Tipo+'</h1><br>'+'<h3>'+r[i].URLFoto+'</h3><br>'+r[i].Descripcion,
		});
		marker.setMap(map);
		google.maps.event.addListener(marker, 'click', function() {
			marker.info.open(map, marker);
		});
	}


	// window.infowindow = new google.maps.InfoWindow({
	// 	content: ''
	// });



	google.maps.event.addListener(map, 'click', function(event) {
		geocoder.geocode({
			'latLng': event.latLng
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {

					var address = results[0].formatted_address
					var latitude = event.latLng.lat();
					var longitude = event.latLng.lng();

					localStorage.setItem('newLat', latitude);
					localStorage.setItem('newLong', longitude);
					localStorage.setItem('newAddress', address);
					var r = confirm("Do you want to create a report @ \n" + address);
					if (r == true) {
						$(":mobile-pagecontainer").pagecontainer("change","report.html", {role:""});

					} else {
						$(":mobile-pagecontainer").pagecontainer("change","home.html", {role:""});
					}
					// google.maps.event.addListener(marker, 'mousedown', function(){
					// 	window.infowindow.open(marker.get('map'), marker);
					// });
				}
			}

		});
	});

	google.maps.event.addListenerOnce(map, 'idle', function() {
		google.maps.event.trigger(map, 'resize');
	});
}
