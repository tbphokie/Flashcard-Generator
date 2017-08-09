// dependency for inquirer npm package
var inquirer = require("inquirer");
var basicCards = require('./BasicCard.js');
var clozeCards = require('./ClozeCard.js');
var fs = require('fs');
let basic = require('./basicCards.json');
let cloze = require('./clozeCards.json');


//global variables
var cards = [];
var count = 0;
var curCount = 0;
var bBasic = true;
var startQuestions = [
    {
      type: 'list',
      name: 'cardType',
      message: 'Do you want basic or cloze flashcards?',
      choices: [
          "Basic",
          "Cloze"
      ]
    },
    {
        type: 'prompt',
        name: 'numQuestions',
        message: "How many questions do you want to answer (1 - 10)?",
        default: 10,
        validate: function(num){
            if( isNaN(num))
                return false;
            else {
                if(num < 0 || num > 10)
                    return false;
            }
            return true;
        }
    }
];

//Called to start game
function beginQuestions(){
    console.log("----Flashcards----");

    inquirer.prompt(startQuestions).then( function(answer) {
        //sets/resets count and curCount
        count = answer.numQuestions;
        curCount = 0;
        askQuestions(answer);
    });
}

//First creates the "cards", either basic or cloze and then calls showQuestion to actully
//display the questions
function askQuestions(answer){
    if(answer.cardType === 'Basic' && cards.length === 0) {
        bBasic = true;
        for(var i=0;i<basic.length;i++){
            cards.push(new basicCards(basic[i].front, basic[i].back));
        }
    }

    if(answer.cardType === 'Cloze' && cards.length === 0){
        bBasic = false;
        for(var i=0;i<cloze.length;i++){
            try{
                cards.push(new clozeCards(cloze[i].front, cloze[i].back));
            } catch (e) {
                console.log(e.message);
                cards.splice(-1, 1);

            }
        }
    }

    showQuestion();
}

//Displays a randomly picked question from the card stack
var showQuestion = function(){

    //Checks if need to stop asking questions, if so prompt for playing again, if not display a question
    if(curCount < count){
        //Math.floor(Math.random() * (max - min + 1)) + min;
        var index = Math.floor(Math.random() * ((cards.length - 1) - 0 + 1)) + 0;
        var msg = "";
        var ans = "";

        //Set the prompt text and correct answer variables here to be easier to check later
        if(bBasic === true){
            msg = (curCount+1) + ": " + cards[index].front+"\n";
            ans = cards[index].back;
        } else {
            msg = (curCount+1) + ": " + cards[index].partial +"\n";
            ans = cards[index].cloze;            
        }

        //Display flashcard and detect anwer, showing right or wrong 
        inquirer.prompt([
        {
            type: 'prompt',
            name: 'answer',
            message: msg
        }
        ]).then(function(response) {
            var resp = response.answer.trim();
            resp = resp.toLowerCase();
            if(resp ===ans.toLowerCase()){
                console.log("Correct");
            } else {
                console.log("Incorrect - The answer is: " + ans+"\n")
            }
            curCount++;
            showQuestion();
        });
    } else {
        //Prompt user if they want to continue
        inquirer.prompt([
        {
            type: 'list',
            name: 'continue',
            message: 'Do you want to continue playing?',
            choices: [
                "Yes",
                "No"
            ]
        }
        ]).then(function(response) {
            //if yes, clear current cards in case user wants to switch card type
            // and then call beginQuestions to start over
            if(response.continue === "Yes"){
                cards = [];
                beginQuestions();
            }
        });        
    }
};

beginQuestions();

