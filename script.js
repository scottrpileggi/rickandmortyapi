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

  const favAliens = document.getElementById("alien-counter");
  const favHumans = document.getElementById("human-counter");

  let alienCounter = 0;
  let humanCounter = 0;
  favAliens.innerText = alienCounter;
  favHumans.innerText = humanCounter;
  console.log("humanCounter: ", humanCounter);
  console.log("alienCounter: ", alienCounter);

  // add/remove from favs functions:
  const allItems = document.getElementsByClassName("card");

  const main = document.getElementById("cards-container");

  const favs = document.getElementById("favs");

  const updateCollections = (id, direction) => {
    if (direction === "toFavs") {
      updateSpecies(id, direction);
      return favs.appendChild(document.getElementById(id));
    } else {
      updateSpecies(id, direction);
      return main.appendChild(document.getElementById(id));
    }
  };

  const updateSpecies = (id, direction) => {
    const species = document.getElementById(id).childNodes[2].innerText;
    console.log(species);
    if (direction === "toFavs") {
      if (species.includes("Human")) {
        humanCounter++;
        favHumans.innerText = humanCounter;
      } else {
        alienCounter++;
        favAliens.innerText = alienCounter;
      }
    } else {
      if (species.includes("Human")) {
        humanCounter--;
        favHumans.innerText = humanCounter;
      } else {
        alienCounter--;
        favAliens.innerText = alienCounter;
      }
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

  const sortBtn = document.getElementsByClassName("sortBtn");

  // variables to track 'Species' type in the favs section...

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
