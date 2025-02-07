const rickAndMortyURL = "https://rickandmortyapi.com/api/character";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results; // Extract the 'results' array from the response
  } catch (err) {
    console.log(err);
  }
}

async function fetchAndCall() {
  const data = await fetchData(rickAndMortyURL);
  return renderCharacters(data);
}

// // with promise chaining:

// function fetchData(url) {
//   return fetch(url)
//     .then((response) => response.json())
//     .then((data) => data.results)
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function fetchAndPrint() {
//   fetchData(rickAndMortyURL).then((data) => {
//     console.log("data: ", data);
//   });
// }

function renderCharacters(data) {
  const cardsContainer = document.querySelector("#cards-container");

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
  console.log("favs container: ", favs);
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
  // const mainCards = [...cardsContainer];
  // const favCards = [...favs];

  // const allItems = document.getElementsByClassName("card");

  const mainCards = main.childNodes;

  const favCards = favs.childNodes;

  const sortData = (dir, container) => {
    const array = Array.from(container.childNodes);

    array.sort((a, b) => {
      const textA = a.querySelector("h3").innerText.toUpperCase();
      const textB = b.querySelector("h3").innerText.toUpperCase();

      if (dir === "asc") {
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      } else {
        return textA > textB ? -1 : textA < textB ? 1 : 0;
      }
    });

    array.forEach((item) => {
      container.appendChild(item);
    });
  };

  // Iterate through the every item in sortBtn NodeList and apply the addEventListener click event to each item.
  [...sortBtn].forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button);
      const direction = button.dataset.sortdir;
      const targetContainer = button.dataset.target === "favs" ? favs : main;
      sortData(direction, targetContainer);
    });
  });
}
// Call fetchData to fetch and render the characters
fetchAndCall();
