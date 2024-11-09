function catGenerator() {
    //--------------CAT GENERATOR LEFT BOX
    generateBreed()

    //--------------RANDOM CAT FACT RIGHT BOX
    generateFacts()
}

function changed(){
    let changedName = document.getElementById("buttonName");
    changedName.disabled = false;
}

function generateBreed(){
    const breedurl = "https://api.thecatapi.com/v1/breeds";
    let cat_Description = document.getElementById("catDescription");
    let cat_Breed = document.getElementById("catBreed");
    let cat_Temperament = document.getElementById("catTemperament");
    let inputName = document.getElementById("personName");
    let inputValue = inputName.value;
    let congratsNametxt = document.getElementById("congratsName");

//fetch breedurl goes first because I want to know which random breed i will get so the imgs can be also generated accordingly.
    fetch(breedurl).then(function (response) {
        return response.json()
    }).then(function (breed_information) {
        random_breed = Math.floor(Math.random() * 67); //It delivers a random number between 0-66. (67 breeds available)
        // console.log(random_breed);
        // console.log(breed_information);
        congratsNametxt.innerHTML = "<p>" + "Congrats " + inputValue + " you are:" + "</br>";
        cat_Breed.innerHTML = breed_information[random_breed].name;
        // console.log(catName);
        cat_Description.innerHTML = breed_information[random_breed].description;
        // console.log(catDescription)
        cat_Temperament.innerHTML = "<b>Temperament: </b>" + breed_information[random_breed].temperament;
        
        const catimgurl = "https://api.thecatapi.com/v1/images/search?";
        parameter = new URLSearchParams({has_breeds: 1, breed_ids: breed_information[random_breed].id})
        
        return fetch(catimgurl+parameter) //this fecth returns a promise, and i have a chain of promises (example: in the then's).
        .then(function (response1) {
            return response1.json()
        }).then(function (cat_img) {
            let photo_Cat = document.getElementById("photoCat");
            console.log(cat_img);
            photo_Cat.src = cat_img[0].url //it goes to the img's src and substitutes to the cat_img generated in the array's position in url.
        })
    })
}

function generateFacts(){
    const catfactsurl = 'https://catfact.ninja/facts';
    fetch(catfactsurl)
        .then(function (response2) {
            return response2.json()
        }).then(function (cat_Facts) {
            let catFacts = document.getElementById("catFactText");
            // console.log(cat_Facts);
            let previousindex = 11
            catFacts.innerHTML = '' //This will erase the output of html and allow to not accumulate more than 2 cat facts.
            for (let x = 0; x < 2; x++) {
                random_fact = Math.floor(Math.random() * 10); //this array only had 10 facts, so im going to pick a random nr between 0-9. This will be my new index
                if (random_fact == previousindex) {
                    random_fact = Math.floor(Math.random() * previousindex); //i cannot change the name "random_fact" because it's the name of my index. the previousindex will limit will be conditioned by the number that was previously generated.
                }
                catFacts.innerHTML += "<p>" + cat_Facts.data[random_fact].fact + "</p>"; //+= means it goes to the innerHTML and adds what goes next. the facts (index 'random_fact') are inside my array 'date' that are in the object 'cat_Facts'.
                // console.log(random_fact);
                // console.log(cat_Facts.data[random_fact].fact);
                previousindex = random_fact;
            };
        })
}