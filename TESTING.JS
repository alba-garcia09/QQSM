// ---------- Eventos ----------

// https://developer.mozilla.org/es/docs/Web/Events

const myButton = document.getElementById('myButtonId');
function buildPage(numberOfQuestions) {
  const root = document.getElementById('root');

  const myHeader = document.createElement('header');
  myHeader.id = 'myHeader';
  root.appendChild(myHeader);

  const button50 = document.createElement('div');
  button50.id = 'button50';
  button50.setAttribute('class', 'wildcardButon');
  myHeader.appendChild(button50);

  const buttonChange = document.createElement('div');
  buttonChange.id = 'buttonChange';
  buttonChange.setAttribute('class', 'wildcardButon');
  myHeader.appendChild(buttonChange);

  const buttonCall = document.createElement('div');
  buttonCall.id = 'buttonCall';
  buttonCall.setAttribute('class', 'wildcardButon');
  myHeader.appendChild(buttonCall);

  const myMain = document.createElement('main');
  myMain.id = 'myMain';
  root.appendChild(myMain);

  const myQuestionContainer = document.createElement('div');
  myQuestionContainer.id = 'myQuestionContainer';
  myMain.appendChild(myQuestionContainer);

  const myAnswerContainer = document.createElement('div');
  myAnswerContainer.id = 'myAnswerContainer';
  myMain.appendChild(myAnswerContainer);

  const myLevelContainer = document.createElement('div');
  myLevelContainer.id = 'myLevelContainer';
  myMain.appendChild(myLevelContainer);

  function createNumberBoard(numberOfQuestions) {
    const myLevelContainer = document.getElementById('myLevelContainer');

    for (let indexOfNumberOfQuestion = 0; indexOfNumberOfQuestion < numberOfQuestions; indexOfNumberOfQuestion++) {
      const myLevel = document.createElement('div');
      myLevel.setAttribute('class', 'levelBox');
      myLevel.innerText = indexOfNumberOfQuestion + 1;
      myLevel.setAttribute('id', 'levelBox' + indexOfNumberOfQuestion);
      myLevelContainer.appendChild(myLevel);
    }
  }
  createNumberBoard(numberOfQuestions);
}

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min));
  return randomNumber;
}

// function progress(min, max) {
//   const randomNumber = Math.floor(Math.random() * (max - min));
//   return randomNumber;
// }

async function showQuestion(div1, div2, questionData) {
  const myQuestionBox = document.createElement('div');
  myQuestionBox.id = 'myQuestionBox';
  myQuestionBox.classList.add('myQuestionBox', 'shadow-inner');
  myQuestionBox.innerText = questionData.description;
  div1.appendChild(myQuestionBox);

  const answerOptions = ['a', 'b', 'c', 'd',];
  // const answerOptions = questionData.answers[keys]
  // console.log(answerOptions);

  for (let indexOfAnswers = 0; indexOfAnswers < answerOptions.length; indexOfAnswers++) {
    const myAnswer = document.createElement('div');
    myAnswer.setAttribute('id', answerOptions[indexOfAnswers]);
    myAnswer.classList.add('myAnswerBox', 'shadow-inner');
    myAnswer.innerText = `${answerOptions[indexOfAnswers]}) ${questionData.answers[answerOptions[indexOfAnswers]]}`;

    div2.appendChild(myAnswer);
  }
}

async function testingAnswer(item) {
  item.addEventListener('click', function (event) {
    const dadElement = item.parentElement;
    console.log(dadElement);
    const myChildren = dadElement.children;

    for (let i = 0; i < myChildren.length; i++) {
      const child = myChildren[i];
      if (child.classList.contains('myTryingrBox')) {
        child.classList.add('myAnswerBox');
        child.classList.remove('myTryingrBox');
      }
    }
    item.classList.add('myTryingrBox');
  });
}

async function toGuess(item) {
  item.addEventListener('click', function (event) {
    const dadElement = item.parentElement;
    console.log(dadElement);
    const myChildren = dadElement.children;


  });
}

//Aqui vamos mostrando todo
async function getQuestion(language1, language2, language3, level1, level2, level3) {
  // Obtener un número aleatorio entre 0 y 2 para seleccionar un idioma aleatorio
  const randomIndexForLanguage = getRandomNumber(0, 3);
  const languages = [language1, language2, language3,];
  const category = languages[randomIndexForLanguage];

  const randomIndexForLevel = getRandomNumber(0, 3);
  const levels = [level1, level2, level3,];
  const level = levels[randomIndexForLevel];

  const url = `https://quiz-api-ofkh.onrender.com/questions/random?level=${level}&category=${category}`;
  const responseAsPromise = await fetch(url);
  const myInfo = await responseAsPromise.json();

  const myQuestionContainer = document.getElementById('myQuestionContainer');
  const myAnswerContainer = document.getElementById('myAnswerContainer');

  await showQuestion(myQuestionContainer, myAnswerContainer, myInfo);

  const myAnswers = myAnswerContainer.children;
  for (let i = 0; i < myAnswers.length; i++) {
    await testingAnswer(myAnswers[i]);
  }


}

async function runPage() {
  buildPage(15);
  await getQuestion('html', 'css', 'javascript', 'easy', 'medium', 'hard');
}

runPage();




// function createNumbers(totalNumbers) {
//   //Me crea el tablero
//   const myFooter = document.getElementById('myFooter');
//   for (let i = 0; i < totalNumbers; i++) {
//     const theNumbers = document.createElement('div');
//     theNumbers.setAttribute('id', 'theNumbers' + i);
//     theNumbers.setAttribute('class', 'theNumbers');
//     myFooter.appendChild(theNumbers);
//     theNumbers.innerText = i;


//     //Asocia cada numero del tablero al evento
//     theNumbers.addEventListener('click', function (event) {
//       const oneTriesElements = document.getElementsByClassName('oneTry');
//       const oneTriesElementsAsArray = [...oneTriesElements,];
//       const emptyLine = getEmptyLine(oneTriesElementsAsArray);
//       creatingNumber(emptyLine, i);
//     });
//   }
// }


// async function showQuestions() {

//     function createNumberBoard(numberOfQuestions) {
//     const mySecondContainer = document.getElementById('mySecondContainer');

//     for (let indexOfNumberOfQuestion = 0; indexOfNumberOfQuestion <= numberOfQuestions; indexOfNumberOfQuestion++) {
//       const myLevel = document.createElement('div');
//       myLevel.setAttribute('class', 'levelBox');
//       myLevel.innerText = indexOfNumberOfQuestion;
//       myLevel.setAttribute('id', 'levelBox' + indexOfNumberOfQuestion);
//       mySecondContainer.appendChild(myLevel);
//     }
//   }
//   createNumberBoard(numberOfQuestions);
// }