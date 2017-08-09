// Constructor function for creating CastMember objects
var ClozeCard = function(text, cloze) {

    //First Validate
    if(text.indexOf(cloze) == -1){
        throw new Error("Could not create cloze card for " + text + ".\n");
    }
    this.fullText = text;
    this.partial = text.replace(cloze, "...");
    this.cloze = cloze;
};


// Exporting our BasicCard constructor. We will require it in movie.js
module.exports = ClozeCard;

/*var testCard = new ClozeCard("This doesn't work", "oops");

console.log(testCard.cloze);
console.log(testCard.partial);
console.log(testCard.fullText);
*/