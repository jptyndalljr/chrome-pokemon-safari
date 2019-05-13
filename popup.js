$(function() {
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
