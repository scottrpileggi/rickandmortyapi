fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((characters) => renderCharacters(characters.results));

const cardsContainer = document.querySelector("#cards-container");

function renderCharacters(characters) {
  characters.forEach((character) => {
    const div = document.createElement("div");
    const imgContainer = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const species = document.createElement("h3");
    const like = document.createElement("button");

    div.classList = "card";
    imgContainer.classList = "img-container";
    image.classList = "card-img";
    like.classList = "empty";

    image.src = character.image;
    name.innerText = ` Name: ${character.name} `;
    species.innerText = ` Species: ${character.species} `;
    like.textContent = "like";

    div.appendChild(imgContainer);
    imgContainer.appendChild(image);
    div.appendChild(name);
    div.appendChild(species);
    div.appendChild(like);
    cardsContainer.appendChild(div);
  });
}
