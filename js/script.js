const envelope =
  document.querySelector(".envelope");

const weddingExperience =
  document.querySelector(".wedding-experience");

const physicalCopyBtn =
  document.querySelector(".physical-copy-btn");

const addressFormContainer =
  document.querySelector(".address-form-container");

const addressForm =
  document.querySelector(".address-form");

const successMessage =
  document.querySelector(".success-message");

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxppOIxh3T2MHIzS89Ny1l9SqYKEmOU2Zs_LXK6xGJhujz6b6Cfn8ZGw55gdlbraXg_/exec";


let hasOpened = false;


/* ========================================
   OPEN ENVELOPE
======================================== */

envelope.addEventListener(
  "click",
  () => {

    if (hasOpened) {
      return;
    }

    hasOpened = true;

    envelope.classList.add("open");

    weddingExperience.classList.add(
      "opened"
    );


    /*
      Confetti starts after the card
      begins sliding upward.
    */

    setTimeout(
      () => {

        launchConfetti();

      },
      650
    );

  }
);


/* ========================================
   CONFETTI
======================================== */

function launchConfetti() {

  const colors = [

    "#7a1f1f",

    "#d6a21f",

    "#8fa37a",

    "#c89b6d",

    "#fff4dc"

  ];


  for (
    let i = 0;
    i < 70;
    i++
  ) {

    const confetti =
      document.createElement(
        "span"
      );


    confetti.classList.add(
      "confetti"
    );


    confetti.style.left =
      Math.random() *
      100 +
      "vw";


    confetti.style.backgroundColor =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];


    confetti.style.animationDuration =
      2 +
      Math.random() *
      2 +
      "s";


    confetti.style.animationDelay =
      Math.random() *
      0.4 +
      "s";


    document.body.appendChild(
      confetti
    );


    setTimeout(
      () => {

        confetti.remove();

      },
      4500
    );

  }

}


/* ========================================
   OPEN ADDRESS FORM
======================================== */

physicalCopyBtn.addEventListener(
  "click",
  () => {

    addressFormContainer.classList.add(
      "show"
    );

    physicalCopyBtn.style.display =
      "none";

  }
);


/* ========================================
   FORM SUBMISSION
======================================== */

addressForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton =
    document.querySelector(".submit-address-btn");

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  const formData = new URLSearchParams();

  formData.append("name", addressForm.name.value);
  formData.append("street", addressForm.street.value);
  formData.append("apartment", addressForm.apartment.value);
  formData.append("city", addressForm.city.value);
  formData.append("state", addressForm.state.value);
  formData.append("zip", addressForm.zip.value);

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    addressForm.style.display = "none";

    successMessage.classList.add("show");

  } catch (error) {
    console.error(error);

    alert("Something went wrong. Please try again.");

    submitButton.disabled = false;
    submitButton.textContent = "Submit Address";
  }
});