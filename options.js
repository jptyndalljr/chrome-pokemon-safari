$(function() {
  console.log("working!");
  let encounterDelay = "off";
  $("#encounterTimer").on('change', function() {
    const delay = $(this).val();
    chrome.storage.sync.set({'encounterDelay': delay}, function() {
      console.log(`Set delay to ${delay}`);
    });
  });
  $('#clearSync').on('click', function() {
    chrome.storage.sync.clear();
  });
  $('#setStarted').on('click', function() {
    let val = "true";
    chrome.storage.sync.set({ "gameStarted" : val }, function() {
      console.log("Current game state set to true");
    })
  });
  $('#resetStarted').on('click', function() {
    chrome.storage.sync.set({ "gameStarted" : "undefined" }, function() {
      console.log("Current game state set to undefined");
    })
  });
  $('#getStarted').on('click', function() {
    chrome.storage.sync.get("gameStarted", function(result) {
      console.log(`Current game state is ${result.gameStarted}`);
    });
  });
  $('#clearFound').on('click', function() {
    chrome.storage.sync.set({ "numFound" : 0 }, function() {
      console.log("Set found to 0");
    });
  });
  $('#setFound').on('click', function() {
    chrome.storage.sync.set({ "numFound": 151 }, function() {
      console.log("Set found to 151");
    })
  });
  $('#getFound').on('click', function() {
    chrome.storage.sync.get("numFound", function(result) {
      console.log(`Current num found is ${result.numFound}`);
    })
  });
  $('#showFound').on('click', function() {
    for (var i = 0; i < 151; i++) {
      let key = `${i}Found`;
      chrome.storage.sync.get(key, function(result) {
        console.log(`Is ${i} found: ${result.key}`);
      })
    }
  });
});
