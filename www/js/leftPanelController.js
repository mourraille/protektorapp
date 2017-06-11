/**
 * Created by mauriciomourraille on 6/10/17.
 */
window.onload = function () {
    var name = localStorage.getItem('name');
    var photo = localStorage.getItem('photo');

    $('#username').text(name);
    $('#profilephoto').attr('src', photo);
}