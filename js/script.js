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

const submitButton =
  document.querySelector(".submit-address-btn");

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxppOIxh3T2MHIzS89Ny1l9SqYKEmOU2Zs_LXK6xGJhujz6b6Cfn8ZGw55gdlbraXg_/exec";


let hasOpened = false;


/* ========================================
   OPEN ENVELOPE
======================================== */

envelope.addEventListener("click", () => {

  if (hasOpened) {
    return;
  }

  hasOpened = true;

  envelope.classList.add("open");

  weddingExperience.classList.add("opened");

  /*
    Confetti begins shortly after
    the invitation starts rising.
  */

  setTimeout(() => {
    launchConfetti();
  }, 650);

});


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

  for (let i = 0; i < 70; i++) {

    const confetti =
      document.createElement("span");

    confetti.classList.add("confetti");

    confetti.style.left =
      Math.random() * 100 + "vw";

    confetti.style.backgroundColor =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    confetti.style.animationDuration =
      2 + Math.random() * 2 + "s";

    confetti.style.animationDelay =
      Math.random() * 0.4 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4500);

  }

}


/* ========================================
   OPEN ADDRESS FORM
======================================== */

physicalCopyBtn.addEventListener("click", () => {

  addressFormContainer.classList.add("show");

  physicalCopyBtn.style.display = "none";

  /*
    Give the opening animation a moment,
    then bring the form into view.
  */

  setTimeout(() => {

    addressFormContainer.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 350);

});


/* ========================================
   FORM SUBMISSION
======================================== */

addressForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    /*
      Prevent multiple submissions
      while Google Sheets is processing.
    */

    submitButton.disabled = true;

    submitButton.textContent =
      "Sending...";


    /* ====================================
       BUILD FORM DATA
    ==================================== */

    const formData =
      new URLSearchParams();

    formData.append(
      "name",
      addressForm.name.value.trim()
    );

    formData.append(
      "street",
      addressForm.street.value.trim()
    );

    formData.append(
      "apartment",
      addressForm.apartment.value.trim()
    );

    formData.append(
      "city",
      addressForm.city.value.trim()
    );

    formData.append(
      "state",
      addressForm.state.value.trim()
    );

    formData.append(
      "zip",
      addressForm.zip.value.trim()
    );


    /* ====================================
       SEND TO GOOGLE SHEETS
    ==================================== */

    try {

      await fetch(
        SCRIPT_URL,
        {
          method: "POST",
          mode: "no-cors",
          body: formData
        }
      );


      /* ==================================
         SUCCESS
      ================================== */

      addressForm.style.display =
        "none";

      successMessage.classList.add(
        "show"
      );

      /*
        Clear the form so the address
        isn't left sitting in the browser.
      */

      addressForm.reset();


      /*
        Smoothly move the confirmation
        into view.
      */

      setTimeout(() => {

        successMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }, 150);


    } catch (error) {


      /* ==================================
         ERROR
      ================================== */

      console.error(
        "Address submission error:",
        error
      );

      alert(
        "Something went wrong while sending your address. Please try again."
      );

      submitButton.disabled = false;

      submitButton.textContent =
        "Submit Address";

    }

  }
);