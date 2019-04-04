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
      const div = document.createElement("div");
      div.className = "image";
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute dog";
      div.appendChild(img);
      doggos.appendChild(div);
    });
};

document.querySelector(".add-dog").addEventListener("click", addNewDog);
