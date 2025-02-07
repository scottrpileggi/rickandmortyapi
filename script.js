const cardsContainer = document.querySelector("#cards-container");

async function fetchData(callBack) {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    const characters = data.results; // Extract the 'results' array from the response
    callBack(characters); // Pass the data to the render function
  } catch (err) {
    console.log(err);
  }
}

function renderCharacters(data) {
  data.forEach((character, index) => {
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
    name.innerText = character.name;
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

  // add/remove from favs functions:
  const allItems = document.getElementsByClassName("card");
  console.log(allItems);

  const main = document.getElementById("cards-container");
  console.log("main container: ", main);

  const favs = document.getElementById("favs");
  console.log("favs container: ", favs);

  const updateCollections = (id, direction) => {
    if (direction === "toFavs") {
      // document.getElementById(id).children[0].className = "fas fa-heart-broken";
      return favs.appendChild(document.getElementById(id));
    } else {
      // document.getElementById(id).children[0].className =
      //   "fa-solid fa-heart-circle-plus";
      return main.appendChild(document.getElementById(id));
    }
  };

  [...allItems].forEach((item) => {
    item.addEventListener("click", () => {
      const parentId = item.parentElement.id;
      const itemId = item.id;

      const direction = () => {
        return parentId === "cards-container" ? "toFavs" : "toMain";
      };
      updateCollections(itemId, direction());
    });
  });
  // sort items functions:
  /**
   * SORTING NODES WITHIN A CONTAINER
   * Please, make sure to read the following files in the exercises-info folder before you start
   * * "02 SortingNode.md"
   */

  /**
   * @task
   * Select all elements that have class of "item" as a NodeList.
   * Store them in the allItems variable
   * Example: const allItems = <Your code>;
   */
  // Your code goes here...

  /**
   * @task
   * Select all sort buttons by class of "sortBtn" as a NodeList.
   * Store them in the sortBtn variable
   * Example: const sortBtn = <Your code>;
   */

  // Your code goes here...
  const sortBtn = document.getElementsByClassName("sortBtn");
  /**
   * @task
   * Create a sortData function that follows the list of requirements:
   * * Takes an argument of the direction to sort as a string of 'asc' or 'desc'
   * * Defines a container variable to get the node by id of 'main'
   * * Uses the allItems variable as a source for the array of items to sort
   * * Sorts the items by id and appends them back to the main container in the sorted order.
   * Example: sortData('desc') => <reversed order of items in the main container>
   * Example: sortData('asc') => <a-z order of items in the main container>
   */

  // Your code goes here...

  const sortData = (direction) => {
    const array = Array.from(allItems);

    array.sort((a, b) => {
      const textA = a.querySelector("h3").innerText.toUpperCase();
      const textB = b.querySelector("h3").innerText.toUpperCase();

      if (direction === "asc") {
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      } else {
        return textA > textB ? -1 : textA < textB ? 1 : 0;
      }
    });

    array.forEach((item) => {
      cardsContainer.appendChild(item);
    });
  };

  // Iterate through the every item in sortBtn NodeList and apply the addEventListener click event to each item.
  [...sortBtn].forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.sortdir;
      sortData(direction);
    });
  });
}
// Call fetchData to fetch and render the characters
fetchData(renderCharacters);
