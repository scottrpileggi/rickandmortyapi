const characterArray = [];

const api = fetch("https://rickandmortyapi.com/api/character");

const cardsContainer = document.querySelector("#cards-container");

function renderCharacters(characters) {
  characters.forEach((character, index) => {
    // create elements
    const div = document.createElement("div");
    const imgContainer = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const species = document.createElement("h3");
    const like = document.createElement("button");

    // assign classNames
    div.id = `card-${index + 1}`;
    div.classList = "card";
    imgContainer.classList = "img-container";
    image.classList = "card-img";
    like.classList = "empty";

    // provide text and imageSrc
    image.src = character.image;
    name.innerText = ` Name: ${character.name} `;
    species.innerText = ` Species: ${character.species} `;
    like.textContent = "FAV";

    // Build Card
    div.appendChild(imgContainer);
    imgContainer.appendChild(image);
    div.appendChild(name);
    div.appendChild(species);
    div.appendChild(like);
    cardsContainer.appendChild(div);
  });
}

// use API data to build and display cards
api
  .then((data) => data.json())
  .then((data) => data.results)
  .then((characters) => renderCharacters(characters))
  .catch((err) => console.log(err));

// This returns undefined in the console. It seems like I'm accessing the data to build the cards too soon. I can't figure out how to store the data into an array/object to use at a later time either.
// in other words, as of now, the cards are inaccessible for any kind of DOM manipulation.
const cards = document.getElementsByClassName("card");

/* window.addEventListener("load", function () {
  // Code to run when the page is fully loaded

  console.log("readystate: ", document.readyState);

}); */

console.log(cardsContainer[0]);

/**
 * SORTING NODES WITHIN A CONTAINER
 * Please, make sure to read the following files in the exercises-info folder before you start
 * * 01 SelectNodes.md
 */

/**
 * @task
 * Select all elements that have class of "item" as a NodeList.
 * Store them in the allItems variable
 * Example: const allItems = <Your code>;
 */

const cardContainer = document.getElementById("cards-container");

// /**
//  * @task
//  * Select the main container by the id of "main"
//  * Store it in the main constant
//  * Example: const main = <Your code>
//  * */

// // Your code goes here
// const main = document.getElementById("main");
// /**
//  * @task
//  * Select the favorites container by id of "favs"
//  * Store it in the favs constant
//  * Example: const favs = <Your code>;
//  */
// const favs = document.getElementById("favs");
// // Your code goes here

// /**
//  * @task
//  * Create the updateCollections(id, direction) function that follows the list of requirements:
//  * Takes an argument of the item id (number)
//  * Take an argument of direction as a string value of 'toMain' or 'toFavs'
//  * Moves the element from the current parent to the new parent (from main to favs or vice versa)
//  * Changes the icon of the element: fa-heart-circle-plus for main, fa-heart-crack for favs items.
//  */

// // Your code goes here
// const updateCollections = (id, direction) => {
//   if (direction === "toFavs") {
//     document.getElementById(id).children[0].className = "fas fa-heart-broken";
//     return favs.appendChild(document.getElementById(id));
//   } else {
//     document.getElementById(id).children[0].className =
//       "fa-solid fa-heart-circle-plus";
//     return main.appendChild(document.getElementById(id));
//   }
// };

// // updateCollections("1", "toFavs");
// /**
//  * @task
//  * Iterate through the every item in allItems NodeList and apply the
//  * addEventListener click event to each item.
//  * The item click must execute/call the following:
//  * * Get the current item's parent id ('main' or 'favs')
//  * * Get the current item id (a number value)
//  * * Set the direction constant to be equal to 'toFavs' or 'toMain', based off the current location
//  * * The direction means the collection to move the item into, when the item is clicked
//  * * If the correct item's location is the parent of id 'main' -> the direction is 'toFavs'
//  * * If the correct item's location is the parent of id 'favs' -> the direction is 'toMain'
//  * * Make the updateCollections function call, assign the item Id and the direction defined above
//  */

// // Your code goes here...
// // [...allItems].forEach((item) => {
// //   item.addEventListener("click", () => {
// //     const parentId = item.parentElement.id;
// //     const itemId = item.id;

// //     const direction = () => {
// //       return parentId === "main" ? "toFavs" : "toMain";
// //     };
// //     updateCollections(itemId, direction());
// //   });
// // });
