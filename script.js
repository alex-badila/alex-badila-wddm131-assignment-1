// Get the URL for the fetch request
const url = new URL("https://dragonball-api.com/api/characters");

// Target important elements for display purposes
const form = document.querySelector(".characterForm"); 
const input = document.querySelector("#search");
const imgBox = document.querySelector(".imgBox");
const characterInfo = document.querySelector(".characterInfo");

// Search for the character inputted by the user and return the results
const searchCharacter = () => {
    url.search = new URLSearchParams({
        name: input.value
    });
    // Clear the page of the previous character, if applicable
    clearPage();
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // If the search returns no results, communicate that to the user
            if(data.length === 0) {
                const noResults = document.createElement("h4");
                noResults.textContent = "No results found.";
                characterInfo.appendChild(noResults);
            }
            // If not, display the character to the screen
            else {
                displayCharacter(data[0]);
            }            
        });
}

// Displays the character to the screen
const displayCharacter = characterData => {
    // Display the image
    const img = document.createElement("img");
    img.src = characterData.image;
    imgBox.appendChild(img);

    // Display the name
    const name = document.createElement("h3");
    name.textContent = characterData.name;
    characterInfo.appendChild(name);

    // Display the race
    const race = document.createElement("p");
    race.textContent = `Race: ${characterData.race}`;
    characterInfo.appendChild(race);

    // Display the gender
    const gender = document.createElement("p");
    gender.textContent = `Gender: ${characterData.gender}`;
    characterInfo.appendChild(gender);

    // Display the base ki
    const baseKi = document.createElement("p");
    baseKi.textContent = `Base Ki: ${characterData.ki}`;
    characterInfo.appendChild(baseKi);

    // Display the max ki
    const maxKi = document.createElement("p");
    maxKi.textContent = `Max Ki: ${characterData.maxKi}`;
    characterInfo.appendChild(maxKi);

    // Display the affiliation
    const affiliation = document.createElement("p");
    affiliation.textContent = `Affiliation: ${characterData.affiliation}`;
    characterInfo.appendChild(affiliation);
}

// Clear the page between submits
const clearPage = () => {
  characterInfo.innerHTML = "";
  imgBox.innerHTML = "";
  input.value = "";
}

// Listen for the submit and resolve it
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchCharacter();
});

