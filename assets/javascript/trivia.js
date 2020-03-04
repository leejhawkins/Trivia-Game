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
        "Lima"
    ]
}
var q2 = {
    question: "What is the capital of the United Kingdom?",
    correctAnswer: "London",
    answers: [
        "Manchester",
        "Dublin",
        "London",
        "Timbuktu"
    ]
}
var questions=[q1,q2]
var intervalId;
var time = 15;
var questionsNum= 0;
var correctNum = 0;


function initializeGame () {
    $("#questions").empty()
    $(".display-4").empty()
    $(".lead").empty()
    $(".btn-block").removeAttr("data-answer")
    $(".btn-block").off("click",checkAnswer)
    console.log($('#button1').attr("data-answer"))
    questionsNum = 0;
    correctNum = 0;
    currentQuestion = "";

    
    var startButton =$('<button>')
    startButton.addClass("btn btn-primary btn-lg start")
    
    startButton.text("Start Game")
    $("#questions").append(startButton)
    $(".start").on("click",startGame)


}

function startGame() {
    $("#questions").empty();
    restartCount();
    $(".btn-block").on("click",checkAnswer)
    
 }
function restartCount() {
    $(".display-4").empty();
    displayQuestion();
    questionsNum++;
    console.log(questionsNum)
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
    currentQuestion = questions[Math.floor(Math.random()*questions.length)]
    $('#questions').text(currentQuestion.question)
    $("#button1").attr("data-answer",currentQuestion.answers[0])
    $("#button1").text(currentQuestion.answers[0])
    $("#button2").attr("data-answer",currentQuestion.answers[1])
    $("#button2").text(currentQuestion.answers[1])
    $("#button3").attr("data-answer",currentQuestion.answers[2])
    $("#button3").text(currentQuestion.answers[2])
    $("#button4").attr("data-answer",currentQuestion.answers[3])
    $("#button4").text(currentQuestion.answers[3])
}
function checkAnswer() {
    
    clearInterval(intervalId)
    var answer = $(this).attr("data-answer")
    if (currentQuestion.correctAnswer==answer) {
      correctNum++
      $('.display-4').text("That is correct!!!")  
      
      if (questionsNum>=5) {
         
        endGame();
      } else {
          setTimeout(restartCount,1000)
      }
    } else {
        $('.display-4').text("That is incorrect, the correct answer is:  " + currentQuestion.correctAnswer)
        
        if (questionsNum>=5) {
            endGame();
        } else {
            setTimeout(restartCount,1000)
        }
    }

}
function endGame() {
    $('.display-4').text("Game Over!  You scored " + correctNum +"/" + questionsNum)
    $('.lead').text("Press any key to continue")
    $('#questions').empty();
    $('.btn-block').text("Press Start")
    document.onkeyup = function () {
      initializeGame();  
    }
}