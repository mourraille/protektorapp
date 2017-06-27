/**
 * Created by Josue on 26/6/2017.
 */
/**
 * Created by josue on 26/06/17.
 */

function cargarNewssFeed() {
    var reportes = JSON.parse(localStorage.getItem('Reportes'));
    var html = "";
    for(var i = 0; i < reportes.length; i++){
        html += '<li>' +
            '<div class="post_entry">'+
            '   <div class="post_date">'+
            '       <span class="day">'+ reportes[i].Tipo +'</span>'+
            '       <span class="month">'+ reportes[i].Fecha +'</span>'+
            '   </div>'+
            '   <div class="post_title">'+
            '    <h2><a href="blog-single.html" data-transition="flip">'+ reportes[i].URLFoto +'</a></h2>'+
            '   </div>'+
            '</div>'+
            '</li>';
    }

    document.getElementById("newsfeed").innerHTML = html;
}
