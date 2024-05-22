function buildPage({ numberOfQuestions, }) {
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
      myLevel.setAttribute('id', 'levelBox' + (indexOfNumberOfQuestion + 1));
      myLevelContainer.appendChild(myLevel);
    }
  }
  createNumberBoard(numberOfQuestions);

  const myFirstLevel = document.getElementById('levelBox1');
  myFirstLevel.setAttribute('class', 'nextLevelBox');
}

function getRandomNumber({ min, max, }) {
  const randomNumber = Math.floor(Math.random() * (max - min));
  return randomNumber;
}

//  hacer un array que me guarde todas las preguntas para que no se repitan
async function showQuestion(div1, div2, questionData) {
  const myQuestionBox = document.createElement('div');
  myQuestionBox.id = 'myQuestionBox';
  myQuestionBox.classList.add('myQuestionBox', 'shadow-inner');
  myQuestionBox.innerText = questionData.description;
  div1.appendChild(myQuestionBox);

  const answerOptions = Object.keys(questionData.answers);

  for (let i = 0; i < answerOptions.length; i++) {
    const optionKey = answerOptions[i];
    const myAnswer = document.createElement('div');
    myAnswer.setAttribute('id', optionKey);
    myAnswer.classList.add('myAnswerBox', 'shadow-inner');
    myAnswer.innerText = `${optionKey}) ${questionData.answers[optionKey]}`;

    div2.appendChild(myAnswer);
  }
}

function getIndexLevel(item) {
  const myLevels = item.children;
  for (let i = 0; i < myLevels.length; i++) {
    if (myLevels[i].classList.contains('nextLevelBox')) {
      const myCurrentLevel=parseInt(myLevels[i].innerText);
      return myCurrentLevel;
    }
  }
}

function giveLevel(item) {
  const numberLevel = getIndexLevel(item);

  switch (true) {
    case numberLevel <= 5:
      return 'easy';

    case numberLevel <= 10:
      return 'medium';

    case numberLevel <= 15:
      return 'hard';
  }
}

//  La función que pasa de nivel cambia de color y elimina a los hijos de question y de answer
async function nextLevel({ circle, questionIds,}) {
  const myQuestionContainer = document.getElementById('myQuestionContainer');
  const myAnswerContainer = document.getElementById('myAnswerContainer');
  const numberLevel = getIndexLevel(circle);

  myQuestionContainer.innerHTML = '';
  myAnswerContainer.innerHTML = '';

  const newLevel = document.getElementById(`levelBox${numberLevel + 1}`);
  const myLevels = document.getElementById('myLevelContainer').children;
  newLevel.setAttribute('class', 'nextLevelBox');

  for (let i = (numberLevel-1) ; i >= 0; i--) {
    myLevels[i].classList.add('class', 'guessedLevelBox');
    myLevels[i].classList.remove('nextLevelBox');
  }

  getQuestion({ questionIds, });
}

// Añadir lo  de que muestre la correcta y que no se puedan clicarmás una vez clicados los naranjas, y que no se puedan clicar ya mas, además que vuelva a enseñar las preguntas
async function toGuess({ item, questionData, circle, questionIds,}) {
  const correctAnswer = await questionData.correctAnswer;
  console.log(correctAnswer);
  const dadElement = item.parentElement;
  const myChildren = [...dadElement.children,];

  item.addEventListener('click', function (event) {
    for (let i = 0; i < myChildren.length; i++) {
      const child = myChildren[i];
      if (child.classList.contains('myGuessedBox') || child.classList.contains('myWrongBox')) {
        return;
      }
    }

    if (item.classList.contains('myAnswerBox')) {
      for (let i = 0; i < myChildren.length; i++) {
        const child = myChildren[i];
        if (child.classList.contains('myTryingrBox')) {
          child.classList.add('myAnswerBox');
          child.classList.remove('myTryingrBox');
        }
      }
      item.classList.add('myTryingrBox');
      item.classList.remove('myAnswerBox');

    } else if (item.classList.contains('myTryingrBox') && item.id === correctAnswer) {
      item.classList.add('myGuessedBox');
      item.classList.remove('myTryingrBox');
      setTimeout(() => nextLevel({ circle, questionIds,}), 3000);

    } else {
      item.classList.add('myWrongBox');
      item.classList.remove('myTryingrBox');

      const myCorrectBox = document.getElementById(correctAnswer);
      myCorrectBox.classList.add('myGuessedBox');
      myCorrectBox.classList.remove('myTryingrBox');

      const numberLevel= getIndexLevel(circle);
      const myLevelBox= document.getElementById(`levelBox${numberLevel}`);

      myLevelBox.classList.add('class', 'wrongLevelBox');
      myLevelBox.classList.remove('nextLevelBox');

      // al final es lo mismo pero menos lineas de la manera que dejo
      // const findIndexCallback = (child) => child.id === correctAnswer;
      // const indexOfCorrect = myChildren.findIndex(findIndexCallback);
      // myChildren[indexOfCorrect].classList.add('myGuessedBox');
      // myChildren[indexOfCorrect].classList.remove('myTryingrBox');
    }
  });
  return;
}


// async function name(params) {

// }

//  Aqui vamos mostrando todo
async function getQuestion({ questionIds, }) {
  console.log('questionIds', questionIds);
  const languages = ['html', 'css', 'javascript',];

  // Obtener un número aleatorio entre 0 y 2 para seleccionar un idioma aleatorio
  const randomIndexForLanguage = getRandomNumber({ min: 0, max: 3, });
  const category = languages[randomIndexForLanguage];

  const myLevelContainer = document.getElementById('myLevelContainer');
  const level = giveLevel(myLevelContainer);
  const url = `https://quiz-api-ofkh.onrender.com/questions/random?level=${level}&category=${category}`;
  const responseAsPromise = await fetch(url);
  const myInfo = await responseAsPromise.json();

  if (questionIds.includes(myInfo._id)) {
    console.log('se ha repetido una pregunta con el id: ', myInfo._id);
    getQuestion({ questionIds, });
  } else {
    questionIds.push(myInfo._id);
    const myQuestionContainer = document.getElementById('myQuestionContainer');
    const myAnswerContainer = document.getElementById('myAnswerContainer');
    await showQuestion(myQuestionContainer, myAnswerContainer, myInfo);

    const myAnswers = myAnswerContainer.children;

    for (let i = 0; i < myAnswers.length; i++) {
      toGuess({ item: myAnswers[i], questionData: myInfo, circle: myLevelContainer, questionIds,});
    }
  }
}

async function runPage() {
  buildPage({ numberOfQuestions: 15, });
  const questionIds = [];
  getQuestion({ questionIds, });

}

runPage();