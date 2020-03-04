window.onload = function() {
   this.initializeGame();
}
var q1 = {
    question: "What is the capital of Peru?",
    correctAnswer: "Lima",
    answers: [
        "Quito",
        "Montevideo",
        "Buenos Aires",
        "Lima",
        "Rio De Janiero"
    ],
    fact: "Peru is home to Machu Pichu"
}
var q2 = {
    question: "What is the capital of the United Kingdom?",
    correctAnswer: "London",
    answers: [
        "Manchester",
        "Dublin",
        "London",
        "Timbuktu",
        "Paris",
        "Berlin"
    ],
    fact: "The Prime Minster of the United Kingdom is Boris Johnson"

}
var q3 = {
    question: "What is the capital of Thailand?",
    correctAnswer: "Bangkok",
    answers: [
        "Bangkok",
        "Phenom Phen",
        "Beijing",
        "Hanoi"
    ],
    fact: "The Hangover 2 takes place in Thailand"

}
var q4 = {
    question: "What is the capital of Jordan?",
    correctAnswer: "Amman",
    answers: [
        "Baghdad",
        "Kabul",
        "Amman",
        "Damascus"
    ],
    fact: "The King of Jordan is Abdullah II"
}
var q5 = {
    question: "What is the capital of Costa Rica?",
    correctAnswer: "San Jose",
    answers: [
        "Bogota",
        "Caracas",
        "Parimarboro",
        "Managua",
        "Havana",
        "San Jose"
    ],
    fact: "Costa Rica hosts more than 5% of the world’s biodiversity even though its landmass only takes up .03% of the planets surface."
}
var q6 = {
    question: "What is the capital of Mongolia?",
    correctAnswer: "Ulan Bator",
    answers: [
        "Ulan Bator",
        "Islamabad",
        "Kiev",
        "Asana",
        "Tokyo"
    ],
    fact: "The great Genghis Khan is Mongolia’s founding father"
}
var q7 = {
    question: "What is the capital of Kenya?",
    correctAnswer: "Nairobi",
    answers: [
        "Nairobi",
        "Pretoria",
        "Addis Abbaba",
        "Cairo",
        "Dakar",
        "Tripoli"
    ],
    fact: "Kenya shares Lake Victoria, the world's second largest fresh water lake, with Tanzania and Uganda."
}
var q8 = {
    question: "What is the capital of the Czech Republic?",
    correctAnswer: "Prague",
    answers: [
        "Ljubljana",
        "Sofia",
        "Bucharest",
        "Budapest",
        "Zagreb",
        "Prague"
        
    ],
    fact: "The currency of the Czech Republic is the Koruna."
}
var q9 = {
    question: "What is the capital of Tanzania?",
    correctAnswer: "Dodoma",
    answers: [
        "Dodoma",
        "Asmara",
        "Mogadishu",
        "Juba",
        "Gaborone",
        
    ],
    fact: "Tanzania is home to Mt. Kilimanjaro"
}
var q10 = {
    question: "What is the capital of the Indonesia?",
    correctAnswer: "Jakarta",
    answers: [
        "Jakarta",
        "Manila",
        "Kuala Lumpur",
        "Tokyo",
      
        
    ],
    fact: "Indonesia has the second longest coastline in the world (over 54,000km), after Canada (CIA World Factbook)."
}


var questions=[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10]
var intervalId;
var time = 15;
var questionsNum= 0;
var correctNum = 0;
var questionArray = []


function initializeGame () {
    
    $("#questions").empty()
    $(".display-4").empty()
    $(".lead").empty()
    $(".btn-block").removeAttr("data-answer")
    $(".btn-block").off("click",checkAnswer)
    $(".display-4").text("World Capitals Quiz")
    questionsNum = 0;
    correctNum = 0;
    currentQuestion = "";
    questions=[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10]
    
    
    
    
    var startButton =$('<button>')
    startButton.addClass("btn btn-primary btn-lg start")
    
    startButton.text("Start Game")
    $("#questions").append(startButton)
    $(".start").on("click",startGame)


}

function startGame() {
    $("#questions").empty();
    restartCount();
    
 }
function restartCount() {
    $(".display-4").empty();
    $("#questions").empty();
    
    displayQuestion();
    $(".btn-block").on("click",checkAnswer)
    questionsNum++;
    intervalId = 0;
    $(".lead").text(":15")
    time = 15;
    intervalId = setInterval(count,1000);
    

}
function count() {
    time--
    var seconds = time;
    if(time <= 0) {
        seconds = ":00"
    
        clearInterval(intervalId)
        $('.lead').text("Time's up")
        $('.display-4').text("The correct answer is:  " + currentQuestion.correctAnswer)
        if (questionsNum>=10) {
            setTimeout(endGame,2000)
        } else {
        setTimeout(restartCount,2000)
        }
    } else if (time <10) {
        seconds = ":0" + seconds
        
    } else {
        seconds = ":" + seconds
    }
    $(".lead").text(seconds);
}
function displayQuestion() {
    $("#answers").empty()
    index = Math.floor(Math.random()*questions.length)
    currentQuestion = questions[index]
    questions.splice(index,1)
    var answersLength = currentQuestion.answers.length
    var sAns = shuffleAnswers(answersLength);
    console.log(sAns)
    
    $('.display-4').text(currentQuestion.question)
    for (var i=0;i<answersLength;i++) {
        var answerButton = $('<button>')
        answerButton.addClass("btn btn-primary btn-lg btn-block")
        answerButton.attr("data-answer",currentQuestion.answers[sAns[i]])
        answerButton.text(currentQuestion.answers[sAns[i]])
        $("#answers").append(answerButton)
    }
    
}
function checkAnswer() {  
    clearInterval(intervalId)
    var answer = $(this).attr("data-answer")
    // $(".btn-block").removeAttr("data-answer")
    $(".btn-block").off("click",checkAnswer)
    $("#questions").text(currentQuestion.fact)
    if (currentQuestion.correctAnswer==answer) {
      correctNum++
      $('.display-4').text("That is correct!!!")
      $(this).css("background-color","green")  
      
      if (questionsNum>=10) {
         
        setTimeout(endGame,2000);
      } else {
          setTimeout(restartCount,3000)
      }
    } else {
        $(this).css("background-color","red") 
        $('.display-4').text("That is incorrect, the correct answer is:  " + currentQuestion.correctAnswer)
        
        if (questionsNum>=10) {
            setTimeout(endGame,2000);
        } else {
            setTimeout(restartCount,3000)
        }
    }

}
function endGame() {
    $('.display-4').text("Game Over!  You scored " + correctNum +"/" + questionsNum)
    $('.lead').text("Press any key to continue")
    $('#questions').empty();
    $("#answers").empty()
    
    document.onkeyup = function () {
      initializeGame();  
    }
}

function shuffleAnswers(length) {
    var array = []
    for (var i=0;i<length;i++) {
        array.push(i)
    }
    for (var i=length-1;i>0;i--) {
        var pos = Math.floor(Math.random()*(i+1));
        var temp = array[i];
        array[i]=array[pos];
        array[pos] = temp;

    }
    return array
}


