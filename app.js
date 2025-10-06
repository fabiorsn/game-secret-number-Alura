// VARIABLE - GLOBAL

let secretNumber;
let countUserTries;
let maxValueRange = 50;
let listRandomNumbers = [];
let messageChooseNumber = `Escolha um número entre 1 e ${maxValueRange}`;
// let messageChooseNumber = `Choose a number between 1 and ${maxValueRange}`;

newGame();

//  FUNCTIONS

function newGame() {
    secretNumber = selectNewRandomNumber();
    countUserTries = 0;
    editTitleBox('Jogo do Número Secreto!');
    editParagraphBox(messageChooseNumber);
    clearUserGuessTextBar();
    disabledButtomNovoJogo();
    enableButtomChutar();
    speakVoice(messageChooseNumber);
}

function selectNewRandomNumber() {
    let randomNumber = createRandomNumber();
    
    resetListRandomNumbers();
    return verifyRandomNumberInList(randomNumber);
}

function verifyRandomNumberInList(num) {
    if (listRandomNumbers.includes(num)) {
        return selectNewRandomNumber();
    } else {
        listRandomNumbers.push(num);
        return num;
    }
}

function resetListRandomNumbers() {
    if (listRandomNumbers.length == maxValueRange) {
        listRandomNumbers = [];
    }
}

function speakVoice(text) {
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate: 1});
    // responsiveVoice.speak(text, 'UK English Male', {rate: 1.1});
}

function createRandomNumber() {
    return parseInt(Math.random() * maxValueRange + 1);
}

function editTitleBox(titleMessage) {
    return document.querySelector('h1').innerHTML = titleMessage;
}

function editParagraphBox(paragraphMessage) {
    return document.querySelector('p').innerHTML = paragraphMessage;
}

function getUserGuessTextBar() {
    return document.querySelector('input');
}

function getUserGuessNumber() {
    return document.querySelector('input').value;
}

function clearUserGuessTextBar() {
    getUserGuessTextBar().value = '';
}

function enableButtomNovoJogo() {
    return document.getElementById('reiniciar').removeAttribute('disabled');
}

function disabledButtomNovoJogo() {
    return document.getElementById('reiniciar').setAttribute('disabled', true);
}

function enableButtomChutar() {
    return document.getElementById('chutar').removeAttribute('disabled');
}

function disabledButtomChutar() {
    return document.getElementById('chutar').setAttribute('disabled', true);
}

//  HTML BUTTOM

function bottomGuessClicked() {
    let userGuessNumber = getUserGuessNumber();
    countUserTries += 1;
    
    if (userGuessNumber == secretNumber) {
        let wordTentativa = countUserTries > 1 ? 'tentativas' : 'tentativa';
        let messageCongratulations = `Você descobriu o número secreto com ${countUserTries} ${wordTentativa}!`;
        
        editTitleBox('PARABÉNS!');
        speakVoice('PARABÉNS,' + messageCongratulations);
        editParagraphBox(messageCongratulations);
        
        disabledButtomChutar();
        enableButtomNovoJogo();
    } else {
        editTitleBox('TENTE OUTRA VEZ!');
        speakVoice('TENTE OUTRA VEZ!');
        // speakVoice('Try again!');
        clearUserGuessTextBar();
        if (userGuessNumber > secretNumber) {
            editParagraphBox('O número chutado é maior que o número secreto!');
        } else {
            editParagraphBox('O número chutado é menor que o número secreto!');
        }
    }
    
    // console.log(`número chutado: ${userGuessNumber}`);
    // console.log(`número secreto: ${secretNumber}`);
    // console.log(`Números sorteados: ${listRandomNumbers}`);
}