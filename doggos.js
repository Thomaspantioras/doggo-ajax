const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

const addNewDog = () => {
  const promise = fetch(DOG_URL);
  promise
    .then(response => {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(processedResponse => {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute dog";
      doggos.appendChild(img);
    });
};

document.querySelector(".add-dog").addEventListener("click", addNewDog);
