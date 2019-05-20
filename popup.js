$(function() {
  console.log("Ready to authenticate!");
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAlT2nuMB1NuPC6p1pPSfZ3AgKcdCT2ZzM",
    authDomain: "pokemon-web-safari.firebaseapp.com",
    databaseURL: "https://pokemon-web-safari.firebaseio.com",
    projectId: "pokemon-web-safari",
    storageBucket: "pokemon-web-safari.appspot.com",
    messagingSenderId: "179641627493",
    appId: "1:179641627493:web:0dc991c6ee006b39"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize firestore
  var db = firebase.firestore();

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        alert("welcome!");
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
  });

  console.log("Ready to safari!");
  $.getJSON("pokedex.json", function(result) {
    var list = $(".pokemon-list");
    $.each(result, function(i, field) {
      if (i < 151) { // up to which pokemon id to go to
        var pokemon = document.createElement('div');
        pokemon.classList.add("pokemon-list-item");
        pokemon.setAttribute('pid', i+1);
        var name = document.createElement('p');
        name.innerText = field.id + " " + field.name.english;
        pokemon.append(name);
        var pokeball = document.createElement('div');
        pokeball.classList.add("pokeball");
        pokeball.classList.add("not-found");
        pokemon.append(pokeball);
        list.append(pokemon);
      }
    });
  });
  console.log("test");
  var P = new Pokedex.Pokedex();
  P.getPokemonByName('eevee')
    .then(function(response) {
      console.log(response.sprites.front_default);
    });
  setTimeout(function() {
    $('.pokemon-list-item').mouseover(function() {
      var pid = this.getAttribute("pid");
      P.getPokemonByName(pid)
        .then(function(response) {
          $('.pokemon-sprite').attr("src", response.sprites.front_default);
        });
    });
  }, 1000);
});
