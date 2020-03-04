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
    ]
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
    ]
}
var q3 = {
    question: "What is the capital of Thailand?",
    correctAnswer: "Bangkok",
    answers: [
        "Bangkok",
        "Phenom Phen",
        "Beijing",
        "Hanoi"
    ]
}
var q4 = {
    question: "What is the capital of Syria?",
    correctAnswer: "Damascus",
    answers: [
        "Baghdad",
        "Kabul",
        "Amman",
        "Damascus"
    ]
}
var questions=[q1,q2,q3,q4]
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
    questions=[q1,q2,q3,q4]
    
    
    
    
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
        setTimeout(restartCount,2000)
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
    if (currentQuestion.correctAnswer==answer) {
      correctNum++
      $('.display-4').text("That is correct!!!")
      $(this).css("background-color","green")  
      
      if (questionsNum>=4) {
         
        setTimeout(endGame,2000);
      } else {
          setTimeout(restartCount,2000)
      }
    } else {
        $(this).css("background-color","red") 
        $('.display-4').text("That is incorrect, the correct answer is:  " + currentQuestion.correctAnswer)
        
        if (questionsNum>=4) {
            setTimeout(endGame,2000);
        } else {
            setTimeout(restartCount,2000)
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


