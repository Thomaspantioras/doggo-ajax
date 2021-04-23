const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const BREEDS_LIST = "https://dog.ceo/api/breeds/list/all";

const doggos = document.querySelector(".doggos");
const breedSelector = document.querySelector(".breed-selector");
let dogBreed;

const showSpinner = () => {
  let imageBoxes = document.querySelectorAll(".image-box");
  imageBoxes.forEach((box) => {
    box.className = "image-box hidden";
  });
  document.getElementById("loading-icon").style.display = "flex";
  setTimeout(() => {
    document.getElementById("loading-icon").style.display = "none";
    imageBoxes.forEach((box) => {
      box.className = "image-box";
    });
  }, 1000);
};

/* ideally this is called when the response is received. */
// const hideSpinner = () => {
//   document.getElementById("loading-icon").style.display = "none";
// };

const selectBreed = () => {
  const promise = fetch(BREEDS_LIST);

  promise
    .then((response) => {
      const processingResponse = response.json();
      return processingResponse;
    })
    .then((processedResponse) => {
      const breeds = Object.keys(processedResponse.message);

      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.className = "breed-name";
        option.value = breed;
        option.text = breed;

        breedSelector.add(option);
      });
    });
};

let count = 0;
const addNewDog = () => {
  let breedName = breedSelector.options[breedSelector.selectedIndex].text;
  let breed_url = `https://dog.ceo/api/breed/${breedName}/images/random`;

  showSpinner();

  const promise = breedName === "All" ? fetch(DOG_URL) : fetch(breed_url);
  promise
    .then((response) => {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then((processedResponse) => {
      const div = document.createElement("div");
      div.className = "image-box";
      div.style.order = count--;
      const img = document.createElement("img");
      img.className = "image";
      img.src = processedResponse.message;
      img.alt = "Cute dog";
      div.appendChild(img);
      doggos.appendChild(div);

      // hideSpinner();
    })
    .catch((err) => console.error(err));
};

document
  .querySelector(".breed-selector")
  .addEventListener("click", selectBreed);

document.querySelector(".add-dog-btn").addEventListener("click", addNewDog);
