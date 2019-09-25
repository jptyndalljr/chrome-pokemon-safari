chrome.runtime.onInstalled.addListener(function() {
  console.log("Ready to safari!");
  $.getJSON("pokedex-rarity.json", function(result) {
    var firstGen = [];
    $.each(result, function(i, field) {
      console.log(field.id + ": " + field.name.english + " ");
      if (i < 151) {
        firstGen.push(field.name.english);
        console.log(firstGen[i]);
      }
    });
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.events == "startEncounter") {
      let ballType = genRarity();
      sendResponse({ ballType: ballType, eventRunning: true });
    }
    else if (request.eventRunning == false) {
      sendResponse({ eventRunning: false });
    }
  }
);

// Rarities (Between 0 and 1)
// - Common    | Pokeball      | 50%    | 0.00000-0.50000 | returns pokeBall
// - Uncommon  | Great Ball    | 25%    | 0.50000-0.75000 | returns greatBall
// - Rare      | Ultra Ball    | 12.5%  | 0.75000-0.87500 | returns ultraBall
// - Epic      | Premier Ball  | 6.25%  | 0.87500-0.96875 | returns premierBall
// - Legendary | Master Ball   | 3.125% | 0.96875-1.00000 | returns masterBall
//
// Generates random rarity
const genRarity = () => {
  let rarity = {};
  let rand = Math.random();

  // Common
  if (rand > 0 && rand <= 0.5) {
    rarity = "pokeBall";
  }
  // Uncommon
  else if (rand > 0.5 && rand <= 0.75) {
    rarity = "greatBall"
  }
  // Rare
  else if (rand > 0.75 && rand <= 0.875) {
    rarity = "ultraBall";
  }
  // Epic
  else if (rand > 0.875 && rand <= 0.96875) {
    rarity = "premierBall";
  }
  // Legendary
  else if (rand > 0.96875 && rand <= 1) {
    rarity = "masterBall";
  }

  // return rarity
  return rarity;
}
