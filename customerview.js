var art = require("ascii-art");

// art.Figlet.fontPath = 'Fonts';

art.font('Bamazon', 'Doom', function(rendered){
  console.log(rendered);
});