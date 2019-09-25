const DEBUG_FLAG = 'CPS_DEBUG: ';

const ballImages = {
  pokeBall: 'https://cdn.bulbagarden.net/upload/9/93/Bag_Pok%C3%A9_Ball_Sprite.png',
  greatBall: 'https://cdn.bulbagarden.net/upload/c/ca/Bag_Great_Ball_Sprite.png',
  ultraBall: 'https://cdn.bulbagarden.net/upload/0/03/Bag_Ultra_Ball_Sprite.png',
  masterBall: 'https://cdn.bulbagarden.net/upload/6/6d/Bag_Master_Ball_Sprite.png',
  safariBall: 'https://cdn.bulbagarden.net/upload/e/eb/Bag_Safari_Ball_Sprite.png',
  premierBall: 'https://cdn.bulbagarden.net/upload/5/55/Bag_Premier_Ball_Sprite.png'
};

const bags = {
  mYellowTop: 'https://i.imgur.com/pGk0vga.png',
  mYellowBottom: 'https://i.imgur.com/cVjMz3v.png',
  mYellow: 'https://cdn.bulbagarden.net/upload/9/9c/RS_Key_items_pocket_M.png',
  mGreen: 'https://cdn.bulbagarden.net/upload/5/56/E_Key_items_pocket_M.png',
  mGold: 'https://cdn.bulbagarden.net/upload/3/36/FRLG_Key_items_pocket_M.png',
  fYellow: 'https://cdn.bulbagarden.net/upload/8/88/RS_Key_items_pocket_F.png',
  fGreen: 'https://cdn.bulbagarden.net/upload/8/88/RS_Key_items_pocket_F.png',
  fGold: 'https://cdn.bulbagarden.net/upload/1/1a/FRLG_Key_items_pocket_F.png'
}

let eventRunning = false;

$(function() {
  // Build safari scene
  let safariScene = document.createElement('div');
  safariScene.classList.add('safari-scene');

  // DEBUG button
  let button = document.createElement('button');
  button.classList.add('button');
  button.innerText = "Run Test";
  $(button).click(function() {
    console.log('testing spawn encounter button');
    if (!eventRunning) {
      spawnEncounter();
    }
  });
  $('body').append(button);

  // Build Pokeball
  let ball = document.createElement('div');
  ball.classList.add('ball');
  safariScene.append(ball);
  let ballImg = document.createElement('img');
  ballImg.classList.add('ball-image');
  ballImg.src = ballImages['pokeBall'];
  ball.append(ballImg);
  let star1 = document.createElement('img');
  star1.classList.add('star1');
  star1.src = 'https://ibin.co/4usxzn7xCVVP.png';
  ball.append(star1);
  let star2 = document.createElement('img');
  star2.classList.add('star2');
  star2.src = 'https://ibin.co/4usxzn7xCVVP.png';
  ball.append(star2);
  let star3 = document.createElement('img');
  star3.classList.add('star3');
  star3.src = 'https://ibin.co/4usxzn7xCVVP.png';
  ball.append(star3);

  $(ball).click(function() {
    startEncounter();
  });

  // Build Bag
  let bagTop = document.createElement('img');
  bagTop.src = bags['mYellowTop'];
  bagTop.classList.add('bagTop');
  safariScene.append(bagTop);

  let bagBottom = document.createElement('img');
  bagBottom.src = bags['mYellowBottom'];
  bagBottom.classList.add('bagBottom');
  safariScene.append(bagBottom);

  $('body').append(safariScene);

  // Build encounter scene
  let encounterScene = document.createElement('div');
  encounterScene.classList.add('encounter-scene');
  let encounterStage = document.createElement('div');
  encounterStage.classList.add('encounter-stage');
  encounterScene.append(encounterStage);
  let encounterTextbox = document.createElement('div');
  encounterTextbox.classList.add('encounter-textbox');
  encounterScene.append(encounterTextbox);
  let encounterText = document.createElement('p');
  encounterText.classList.add('encounter-text');
  encounterText.innerHTML = "[Test] has appeared!";
  encounterTextbox.append(encounterText);
  let textArrow = document.createElement('div');
  textArrow.classList.add('text-arrow');
  encounterTextbox.append(textArrow);

  // $('body').append(encounterScene);

  const spawnEncounter = () => {
    chrome.runtime.sendMessage({ events: "startEncounter"}, function(response) {
      console.log(response.ballType);
      setBallType(response.ballType);
      eventRunning = response.eventRunning;
      console.log(eventRunning);
    });
    safariScene.classList.add('is-active');
  }

  const setBallType = (ballType) => {
    if (ballType in ballImages) {
      ballImg.src = ballImages[ballType];
    }
  }

  setTimeout(function() {
    spawnEncounter();
  }, 5000);
});

const dlog = (msg) => {
  console.log(DEBUG_FLAG + msg);
}

const startEncounter = () => {
  $('.star1').addClass('is-animated');
  $('.star2').addClass('is-animated');
  $('.star3').addClass('is-animated');
  setTimeout(function() {
    $('.star1').removeClass('is-animated');
    $('.star2').removeClass('is-animated');
    $('.star3').removeClass('is-animated');
    setTimeout(function() {
      $('.bagTop').addClass('is-animated');
      $('.bagBottom').addClass('is-animated');
      $('.ball-image').addClass('is-animated');
      setTimeout(function() {
        $('.bagTop').removeClass('is-animated');
        $('.bagBottom').removeClass('is-animated');
        setTimeout(function() {
          $('.safari-scene').removeClass('is-active');
          $('.ball-image').removeClass('is-animated');
          chrome.runtime.sendMessage({ eventRunning: false }, function(response) {
            eventRunning = response.eventRunning;
            console.log(eventRunning);
          });
        }, 2000);
      }, 2000);
    }, 1500);
  }, 1500);
}

function testEncounter() {
  console.log(DEBUG_FLAG + 'Test toggling encounter scene.');
  $('.encounter-scene').toggle();
}

const buildGrass = () => {
  let grass = document.createElement('div');
  grass.classList.add('grass');
  safariScene.append(grass);
  let img = document.createElement('img');
  img.src = "https://ibin.co/4gzPObhRjgE0.png";
  grass.append(img);
}
