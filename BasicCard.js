var fs = require('fs');

// Constructor function for creating CastMember objects
var BasicCard = function(front, back) {
  this.front = front;
  this.back = back;
};


/*var testCard = [];
testCard.push(new BasicCard("Who was the first president of the United States?", "George Washington"));
testCard.push(new BasicCard("What movement tried to end racial discrimination?", "Civil Rights movement"));
testCard.push(new BasicCard("If the president can no longer server, who becomes president?", "Vice President"));
testCard.push(new BasicCard("In what month do we vote for President?", "November"));
testCard.push(new BasicCard("What stops one branch of government from becoming too powerful?", "Checks and balances"));
testCard.push(new BasicCard("Who is the Chief Justice of the United States?", "John Roberts"));
testCard.push(new BasicCard("Who was the first President?", "George Washington"));
testCard.push(new BasicCard("What is the name of the current Vice President?", "Mike Pence"));
testCard.push(new BasicCard("Every how many years do we elec a U.S. Representative", "2"));
testCard.push(new BasicCard("Who vetoes bills", "The President"));
//save to file
var jsonString = JSON.stringify(testCard);
  fs.appendFile("basicCards.json", jsonString, 'utf-8');
*/
 /* var newBasicArray = [];
  var data = fs.readFile('./basicCards.json');
  console.log("data", data);
*/
/*let basic = require('./basicCards.json');
console.log("basic json", basic);
console.log(basic.length);
console.log(testCard.front);
console.log(testCard.back);
*/


// Exporting our BasicCard constructor
module.exports = BasicCard;

