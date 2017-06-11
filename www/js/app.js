
var flag = true // este flag es para brincarse el login con facebook y pasar directo al app!!!!!!!!!!!!!!!!!!!!

document.addEventListener('deviceready',function() {
   if (flag) {

       var lock = new Auth0Lock(
           // All these properties are set in auth0-variables.js
           AUTH0_CLIENT_ID,
           AUTH0_DOMAIN
       );

       var userProfile;

       $('.btn-login').click(function(e) {
           e.preventDefault();
           lock.show(function(err, profile, token) {
               if (err) {
                   // Error callback
                   console.log("There was an error");
                   alert("There was an error logging in");
               } else {
                   // Success calback

                   // Save the JWT token.
                   localStorage.setItem('userToken', token);

                   // Save the profile
                   userProfile = profile;

                   localStorage.setItem('name', profile.name);
                   localStorage.setItem('photo', profile.picture);
                   localStorage.setItem('email', profile.email);

                   $('.login-box').hide();
                   $('.logged-in-box').show();
                   $('.nickname').text(profile.nickname);
                   $('.nickname').text(profile.name);
                   $('.avatar').attr('src', profile.picture);
                   $('.token').text(token);
                   $('#logo').hide();
                   window.location.replace('home.html');
               }
           });
       });
   } else {
       window.location.replace('home.html');
       localStorage.setItem('name', 'Pedro Chaves Morera');
       localStorage.setItem('photo', 'http://www.fotothing.com/photos/b5f/b5fc279a8011f7991dd0b39df81e77e0.jpg');
       localStorage.setItem('email', 'pedrochaves@soykul.com');
   }

}, false);
