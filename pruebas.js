// const myInput = document.getElementById("miInput");
// const myCapital = "Ciudad de México"; // Suponiendo que 'myCapital' contiene la respuesta correcta

// myInput.addEventListener("keypress", (event) => {
//   if (event.keyCode === 13) { // Verificar si la tecla presionada es 'Enter' (código de tecla 13)
//     const inputValue = myInput.value;
//     if (inputValue === myCapital) {
//       alert('¡Has ganado!');
//     } else {
//       alert('Sigue intentándolo');
//     }
//   }
// });

// function myKeyPressCallback(event) {
//   if (event.keyCode === 13) { // Verificar si la tecla presionada es 'Enter' (código de tecla 13)
//     const inputValue = myInput.value;
//     if (inputValue === myCapital) {
//       alert('¡Has ganado!');
//     } else {
//       alert('Sigue intentándolo');
//     }
//   }
// }
// myInput.addEventListener("keypress", myKeyPressCallback);


// async function guessFlag(countries, min, max) {
//   const myCurrentCountry = await getCountryByCapital(countries, min, max);

//   const myCapital = myCurrentCountry.capital;
//   const firstClue = myCurrentCountry.population;
//   const secondClue = myCurrentCountry.region;
//   const thirdClue = myCurrentCountry.languages;

//   const myInput = document.getElementById('myInput');

//   function myKeyPressCallback(event) {
//     if (event.key === 'Enter') {
//       const inputValue = myInput.value;
//       if (inputValue === myCapital) {
//         alert('¡Has ganado!');
//       } else {
//         alert('Sigue intentándolo');
//       }
//     }
//   }
//   myInput.addEventListener("keydown", myKeyPressCallback); // Using "keydown" instead of "keypress"
// }




//   const myInput = document.getElementById('myInner');

//   myInput.addEventListener("keypress", (event) => {
//     if (event.keyCode === 13) { // Verificar si la tecla presionada es 'Enter' (código de tecla 13)
//       const inputValue = myInput.value;
//       if (inputValue === myCapital) {
//         alert('¡Has ganado!');
//       } else {
//         alert('Sigue intentándolo');
//       }
//     }
//   });

// }

const idiomas = { eng: 'English', zho: 'Chinese', msa: 'Malay', tam: 'Tamil' };

// Obtener un array de las claves del objeto
const claves = Object.keys(idiomas);

// Iterar sobre el array de claves
claves.forEach(clave => {
  const valor = idiomas[clave];
  console.log(`${clave}: ${valor}`);
});