

$( document ).delegate("#report", "pagecreate", function() {

    startSocial();
    var address = localStorage.getItem('newAddress');
    var photo = localStorage.getItem('photo');

    $('.address').text(address);
    $('.authorPhoto').attr('src', photo);
    initMapreport();
});


function placeIncident() {
    var email = localStorage.getItem('email');
    var lat =   localStorage.getItem('newLat');
    var lon =   localStorage.getItem('newLong');
    var type =  $('#incidenttype').val();
    var description =  $('#comment').val();
    var address = localStorage.getItem('newAddress');
    lat = lat.replace('.',',');
    lon = lon.replace('.',',');



        var WSurl= 'http://apiprotektor.azurewebsites.net/api/Reporte/GuardarReporte/'+address+'/'+description+'/'+type+'/'+email+'/'+lon+'/'+lat;
    alert(WSurl);

        var req = $.ajax({
            url: WSurl,
            timeout: 20000,
            success: function(datos) {
                alert( "Your report has been placed. Thanks!" );
                $(":mobile-pagecontainer").pagecontainer("change","map.html", {role:""});
            },
            error: function (x, t, m) {
                alert(x + t + m);
            }
        });
}



function initMapreport() {
    var pinColor = "454545";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    var lat = localStorage.getItem('newLat');
    var lon = localStorage.getItem('newLong');

    var myLatlng = new google.maps.LatLng(lat,lon);

    var myOptions = {
        zoom: 17,
        streetViewControl: false,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#7c93a3"},{"lightness":"-10"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#a0a4a5"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#62838e"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#dde3e3"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#3f4a51"},{"weight":"0.30"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#bbcacf"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":"0"},{"color":"#bbcacf"},{"weight":"0.50"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#a9b4b8"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"saturation":"-7"},{"lightness":"3"},{"gamma":"1.80"},{"weight":"0.01"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a3c7df"}]}]
    }
    var map = new google.maps.Map(document.getElementById("map-canvas-report"), myOptions);

    google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(new google.maps.LatLng(lat,lon));
    });

    var geocoder = new google.maps.Geocoder();
    var marker;

    // window.infowindow = new google.maps.InfoWindow({
    // 	content: ''
    // });
    marker = new google.maps.Marker({
        position: myLatlng ,
        map: map,
        animation: google.maps.Animation.BOUNCE,
        icon: pinImage,
        shadow: pinShadow,
    });

    marker.setMap(map);
    map.setCenter(new google.maps.LatLng(lat,lon));
}

/**
 * Created by mauriciomourraille on 6/12/17.
 */
