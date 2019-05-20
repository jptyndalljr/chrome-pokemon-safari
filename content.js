$(function() {
  // Build safari scene
  var safariScene = document.createElement('div');
  safariScene.classList.add('safari-scene');
  var grass = document.createElement('div');
  grass.classList.add('grass');
  // grass.classList.add('is-animated');
  safariScene.append(grass);
  var img = document.createElement('img');
  img.src = "https://ibin.co/4gzPObhRjgE0.png";
  grass.append(img);
  $('body').append(safariScene);

  // Build encounter scene
  var encounterScene = document.createElement('div');
  encounterScene.classList.add('encounter-scene');
  var encounterStage = document.createElement('div');
  encounterStage.classList.add('encounter-stage');
  encounterScene.append(encounterStage);
  var encounterTextbox = document.createElement('div');
  encounterTextbox.classList.add('encounter-textbox');
  encounterScene.append(encounterTextbox);
  var encounterText = document.createElement('p');
  encounterText.classList.add('encounter-text');
  encounterText.innerHTML = "[Test] has appeared!";
  encounterTextbox.append(encounterText);
  var textArrow = document.createElement('div');
  textArrow.classList.add('text-arrow');
  encounterTextbox.append(textArrow);
  $('body').append(encounterScene);

  setTimeout(function() {
    $(grass).click(function() {
      showEncounter();
    });
  }, 1000);
});

function startEncounter() {
  $('.grass').addClass('is-animated');
}

function showEncounter() {
  $('.encounter-scene').toggle();
}
