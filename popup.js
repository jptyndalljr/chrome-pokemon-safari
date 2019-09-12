const numPokemon = 151; // up to which pokemon id to go to

$(function() {
  console.log("Grab your Safari Balls, it's safari time!");
  let gameStarted = getGameState();
  if (gameStarted !== 'true') {
    startNewGame();
    gameStarted = true;
  }
  $.getJSON("pokedex.json", function(result) {
    var list = $(".pokemon-list");
    $.each(result, function(i, field) {
      if (i < numPokemon) { // up to which pokemon id to go to
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
      console.log(response.sprites.back_default);
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

function getGameState() {
  chrome.storage.sync.get("gameStarted", function(result) {
    return(result.gameStarted);
  });
}

function startNewGame() {
  chrome.storage.sync.set({ "gameStarted" : "true" });
  chrome.storage.sync.set({ "numFound" : 0 });
  for (let i = 0; i < numPokemon; i++) {
    let key = `${i}Found`;
    chrome.storage.sync.set({ key : "false" });
  }
}
