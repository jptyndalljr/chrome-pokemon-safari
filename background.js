chrome.runtime.onInstalled.addListener(function() {
  console.log("Ready to safari!");
  $.getJSON("pokedex.json", function(result) {
    var firstGen = [];
    $.each(result, function(i, field) {
      console.log(field.id + ": " + field.name.english + " ");
      if (i < 151) {
        firstGen.push(field.name.english);
        console.log(firstGen[i]);
      }
    });
  });
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log("The color is green.");
  // });
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});
