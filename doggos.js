const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const doggos = document.querySelector(".doggos");

const showSpinner = () => {
  document.getElementById("loading-icon").style.display = "flex";
  let imageBoxes = document.querySelectorAll(".image-box");
  imageBoxes.forEach(box => {
    box.className = "image-box hidden";
  });
  setTimeout(() => {
    document.getElementById("loading-icon").style.display = "none";
    imageBoxes.forEach(box => {
      box.className = "image-box";
    });
  }, 1000);
};

//ideally is called when the response is received
// const hideSpinner = () => {
//   document.getElementById("loading-icon").style.display = "none";
// };

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

document.querySelector(".add-dog").addEventListener("click", addNewDog);
