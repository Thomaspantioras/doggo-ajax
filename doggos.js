const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const BREEDS_LIST = "https://dog.ceo/api/breeds/list/all";

const doggos = document.querySelector(".doggos");
const breedSelector = document.querySelector(".breed-selector");
let dogBreed;

const showSpinner = () => {
  document.getElementById("loading-icon").style.display = "flex";
  let imageBoxes = document.querySelectorAll(".image-box");
  imageBoxes.forEach(box => {
    box.className = "image-box hidden";
  });
  setTimeout(() => {
    document.getElementById("loading-icon").style.display = "none";
    // let count = 0;
    imageBoxes.forEach(box => {
      box.className = "image-box";
      // box.style.order = count--;
    });
  }, 1000);
};

//ideally is called when the response is received
// const hideSpinner = () => {
//   document.getElementById("loading-icon").style.display = "none";
// };

const selectBreed = () => {
  const promise = fetch(BREEDS_LIST);

  promise
    .then(response => {
      const processingResponse = response.json();
      return processingResponse;
    })
    .then(processedResponse => {
      const breeds = Object.keys(processedResponse.message);
      console.log(breeds);

      breeds.forEach(breed => {
        const option = document.createElement("option");
        console.log(option);
        option.className = "breed-name";
        option.value = breed;
        option.text = breed;
        // breedSelector.appendChild(option);
        breedSelector.add(option);
      });
    });
};
let count = 0;
const addNewDog = () => {
  showSpinner();

  const promise = fetch(DOG_URL);
  promise
    .then(response => {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(processedResponse => {
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
    .catch(err => console.error(err));
};

document
  .querySelector(".breed-selector")
  .addEventListener("click", selectBreed);

document.querySelector(".add-dog").addEventListener("click", addNewDog);
