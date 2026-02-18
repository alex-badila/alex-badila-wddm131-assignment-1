// Declare the app that this application will live in
const app = {};

// Get the URL for the fetch request
app.url = new URL("https://dragonball-api.com/api/characters");

// Target important elements for display purposes
app.form = document.querySelector(".characterForm"); 
app.input = document.querySelector("#search");
app.imgBox = document.querySelector(".imgBox");
app.characterInfo = document.querySelector(".characterInfo");

// Search for the character inputted by the user and return the results
app.searchCharacter = async () => {
    app.url.search = new URLSearchParams({
        name: app.input.value
    });
    // Clear the page of the previous character, if applicable
    app.clearPage();

    app.response = await fetch(app.url);
    app.data = await app.response.json();

    // If the search returns no results, communicate that to the user
    if(app.data.length === 0) {
        const noResults = document.createElement("h4");
        noResults.textContent = "No results found.";
        app.characterInfo.appendChild(noResults);
    }
    // If not, display the character to the screen
    else {
        app.displayCharacter(app.data[0]);
    }  
}

// Displays the character to the screen
app.displayCharacter = characterData => {
    // Display the image
    const img = document.createElement("img");
    img.src = characterData.image;
    app.imgBox.appendChild(img);

    // Display the name
    const name = document.createElement("h3");
    name.textContent = characterData.name;
    app.characterInfo.appendChild(name);

    // Display the race
    const race = document.createElement("p");
    race.textContent = `Race: ${characterData.race}`;
    app.characterInfo.appendChild(race);

    // Display the gender
    const gender = document.createElement("p");
    gender.textContent = `Gender: ${characterData.gender}`;
    app.characterInfo.appendChild(gender);

    // Display the base ki
    const baseKi = document.createElement("p");
    baseKi.textContent = `Base Ki: ${characterData.ki}`;
    app.characterInfo.appendChild(baseKi);

    // Display the max ki
    const maxKi = document.createElement("p");
    maxKi.textContent = `Max Ki: ${characterData.maxKi}`;
    app.characterInfo.appendChild(maxKi);

    // Display the affiliation
    const affiliation = document.createElement("p");
    affiliation.textContent = `Affiliation: ${characterData.affiliation}`;
    app.characterInfo.appendChild(affiliation);
}

// Clear the page between submits
app.clearPage = () => {
  app.characterInfo.innerHTML = "";
  app.imgBox.innerHTML = "";
  app.input.value = "";
}

// Listen for the submit and resolve it
app.form.addEventListener("submit", (e) => {
  e.preventDefault();
  app.searchCharacter();
});

