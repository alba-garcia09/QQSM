
// async function noRepeatQuestions({questionData, oneArray,}) {
//   const myNewId = await questionData._id;
//   console.log('el id: ', myNewId);

//   function someCallback(item, oneArray) {
//     return item === myNewId;
//   }
//   console.log('myarray en la funcion: ', oneArray);
//   const ifRepeats = myArray.some(someCallback);

//   if (!ifRepeats) {
//     oneArray.push(myNewId);
//     console.log('se ha ejecutado la de comprobar id');
//     console.log('así va el array: ', oneArray);
//   } else {
//     console.log('La pregunta ya ha sido hecha anteriormente.');
//     const myQuestionContainer = document.getElementById('myQuestionContainer');
//     const myAnswerContainer = document.getElementById('myAnswerContainer');

//     myQuestionContainer.innerHTML = '';
//     myAnswerContainer.innerHTML = '';
//     getQuestion(myArray);
//   }
// }


//  Aqui vamos mostrando todo
async function getQuestion(myArray) {
  const languages = ['html', 'css', 'javascript',];

  // Obtener un número aleatorio entre 0 y 2 para seleccionar un idioma aleatorio
  const randomIndexForLanguage = getRandomNumber({min:0, max:3,});
  const category = languages[randomIndexForLanguage];

  const myLevelContainer = document.getElementById('myLevelContainer');
  const level = giveLevel(myLevelContainer);
  const url = `https://quiz-api-ofkh.onrender.com/questions/random?level=${level}&category=${category}`;
  const responseAsPromise = await fetch(url);
  const myInfo = await responseAsPromise.json();

  noRepeatQuestions({questionData: myInfo, oneArray: myArray,});

  const myQuestionContainer = document.getElementById('myQuestionContainer');
  const myAnswerContainer = document.getElementById('myAnswerContainer');
  await showQuestion(myQuestionContainer, myAnswerContainer, myInfo);

  const myAnswers = myAnswerContainer.children;

  for (let i = 0; i < myAnswers.length; i++) {
    toGuess(myAnswers[i], myInfo, myLevelContainer);
  }
}

async function runPage() {
  // const myArrayOfDoneQuestions=[];
  buildPage({numberOfQuestions:15,});
  getQuestion();
}

runPage();