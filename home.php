<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Hangman</title>
</head>

<body>
    <div class="title"><b>Hangman Game</b></div>

    <div class="hidden" style="display: none;"><%= word %></div>


    <div class="WrongLetters">
        <span class="wrongLettersNumber">0</span>/5 Wrong Letters:
        <ul class="wrongLettersUl" style="display: inline;">

        </ul>
    </div>
    <ul class="word">

    </ul>

    <div class="alert">Letter already used</div>

    <div class="gameEnd-container end1" style="width:650px">
        <div class="gameOver">Game Over! The word was <span class="correctWord">CorWord</span></div>
        <div class="restart" style="background-color: rgb(247, 96, 96);color:white;" onclick="controller.init()"><i
                class="fa fa-refresh" aria-hidden="true"></i></div>
    </div>


    <div class="gameEnd-container end2">
        <div class="gameWon">Nice! You won the game</div>
        <div class="restart" onclick="controller.init()"><i class="fa fa-refresh" aria-hidden="true"></i>
        </div>
    </div>



    <script src="./main.js"></script>
</body>

</html>