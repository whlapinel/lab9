"use strict";
/*  json data is from https://api.sampleapis.com/ */

const icedCoffeeBtn = document.querySelector(".iced-coffee");
const hotCoffeeBtn = document.querySelector(".hot-coffee");

icedCoffeeBtn.addEventListener("click", getData);
hotCoffeeBtn.addEventListener("click", getData);

const urlMap = new Map();

urlMap.set('iced-coffee', 'https://api.sampleapis.com/coffee/iced')
urlMap.set('hot-coffee', 'https://api.sampleapis.com/coffee/hot')

console.log(urlMap.get('iced-coffee'));


async function getData(e) {
  try {
    const name = e.target.classList[0];
    console.log(e.target.classList);
    console.log(urlMap.get(name));
    const data = await fetch(urlMap.get(name));
    const json = await data.json();
    console.log(json);
    addDrinks(json);
  } catch (err) {
    console.log(err.message);
    console.log("ah crap.");
  }
}


function addDrinks(drinks) {
    const cardContainer = document.querySelector('.container');

    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    
    let drinksArray = [];

    drinks.forEach((drink) => {
        drinksArray = [...drinksArray, drink]
        console.log(drink);
        console.log(drinksArray);

        // create cards
        const drinkCard = document.createElement('article');
        console.log(drinkCard);
        drinkCard.classList.add('card');
        cardContainer.appendChild(drinkCard);

        // create card images
        const cardImg = document.createElement('img');
        drinkCard.appendChild(cardImg);
        cardImg.src = drink.image;
        cardImg.setAttribute('alt', drink.title);

        // create div element
        const drinkContent = document.createElement('div');
        drinkContent.classList.add('content');
        drinkCard.appendChild(drinkContent);

        // title h3
        const drinkTitle = document.createElement('h3');
        drinkTitle.textContent = drink.title;
        drinkContent.appendChild(drinkTitle);

        // description p
        const drinkDescription = document.createElement('p');
        drinkDescription.textContent = `Ingredients include: ${drink.description}`;
        drinkContent.appendChild(drinkDescription);

        // ingredients div
        const ingredients = document.createElement('div');
        ingredients.classList.add('ingredients');
        drinkContent.appendChild(ingredients);

        for (const ingredient of drink.ingredients) {
            console.log(ingredient);
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add('ingredient');
            ingredientDiv.textContent = ingredient;
            ingredients.appendChild(ingredientDiv);
        }
    });
}