const DataController = (function () {
    const words = ['test', 'english', 'hangman', 'game'];
    return {
        getRandomWord: function () {
            var word = document.querySelector('.hidden').textContent;
            return word;
        },
        checkIfIsLetter: function (letter) {
            if (
                (letter >= 'a' && letter <= 'z' && letter.length == 1) ||
                (letter >= 'A' && letter <= 'Z' && letter.length == 1)
            )
                return true;
            return false;
        },
        checkIfArrayEmpty: function (array) {
            for (var i = 0; i < array.length; i++)
                if (array[i] != '') return false;
            return true;
        },
    };
})();
const UIController = (function () {
    const wordDisplay = document.querySelector('.word');
    const wrongLetterDisplay = document.querySelector('.wrongLettersUl');
    var gameStatus, word, array, usedLettersArray, wrongLetters;

    return {
        splitWord: function (word) {
            var array = [];
            for (var i = 0; i < word.length; i++) {
                array.push(word[i]);
            }
            return array;
        },
        addSingleLine: function () {
            var node = document.createElement('LI');
            var textnode = document.createTextNode('_');
            node.appendChild(textnode);
            wordDisplay.appendChild(node);
        },
        addMultipleLines: function (count) {
            for (var i = 0; i < count; i++) this.addSingleLine();
        },
        checkIfLetterIsInWord: function (letter, array) {
            for (var i = 0; i < array.length; i++)
                if (array[i] == letter) return true;
            return false;
        },
        updateNthChild: function (n, updateValue) {
            document.querySelector(
                `.word li:nth-child(${n})`
            ).textContent = updateValue;
        },
        addWrongLetter: function (letter) {
            var node = document.createElement('LI');
            var textnode = document.createTextNode(letter);
            node.appendChild(textnode);
            wrongLetterDisplay.appendChild(node);
        },
        displayLetterError: function () {
            document.querySelector('.alert').style.bottom = '0px';
            setTimeout(() => {
                document.querySelector('.alert').style.bottom = '-50px';
            }, 2000);
        },
        updateWrongLettersNumber: function (value) {
            document.querySelector('.wrongLettersNumber').textContent = value;
        },
        removeWordLine: function () {
            wordDisplay.innerHTML = '';
        }
    };
})();

var controller = (function (DataController, UIController) {
    window.addEventListener('keydown', function (event) {
        if (gameStatus === 1) {
            var key = event.key.toUpperCase(); //key pressed
            //checking if key pressed id letter
            if (DataController.checkIfIsLetter(key)) {
                //checking if letter have been already used
                if (
                    !UIController.checkIfLetterIsInWord(key, usedLettersArray)
                ) {
                    usedLettersArray.push(key);
                    //checking if letter is in word
                    if (UIController.checkIfLetterIsInWord(key, array)) {
                        for (var i = 0; i < array.length; i++)
                            if (array[i] == key) {
                                UIController.updateNthChild(i + 1, key); //displaying letter on the UI
                                array[i] = '';
                                //checking if word is complete
                                if (DataController.checkIfArrayEmpty(array)) {
                                    gameStatus = 0;
                                    document.querySelector(
                                        '.end2'
                                    ).style.display = 'flex';
                                }
                            }
                    } else {
                        UIController.addWrongLetter(key);
                        wrongLetters++;
                        UIController.updateWrongLettersNumber(wrongLetters);
                        if (wrongLetters >= 5) {
                            gameStatus = 0;
                            document.querySelector('.end1').style.display =
                                'flex';
                            document.querySelector(
                                '.correctWord'
                            ).textContent = word;
                        }
                    }
                } else {
                    UIController.displayLetterError();
                }
            }
        }
    });

    return {
        init() {
            gameStatus = 1;
            UIController.removeWordLine();
            document.querySelector('.end1').style.display = 'none';
            document.querySelector('.end2').style.display = 'none';
            document.querySelector('.wrongLettersUl').innerHTML = '';
            word = DataController.getRandomWord().toUpperCase(); //Getting Random Word
            array = UIController.splitWord(word); //Putting word's letters in array
            usedLettersArray = [];
            wrongLetters = 0;
            UIController.updateWrongLettersNumber(wrongLetters);
            UIController.addMultipleLines(word.length); //adding lines instead of letters to the UI
            console.log(array); //displaying array for testing purpose
        },
    };
})(DataController, UIController);

controller.init(); //initializing the game for the first time

