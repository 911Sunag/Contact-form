const form = document.getElementById("formsmbt");

const firstName = document.querySelector(".fname input");
const lastName = document.querySelector(".lname input");
const email = document.querySelector(".email input");
const message = document.getElementById("message");
const radioOptions = document.querySelectorAll(".radio input");
const radioBoxes = document.querySelectorAll(".radio1, .radio2");
const consentBox = document.querySelector(".okay input");
const consentTick = document.querySelector(".okay span");

const successPopup = document.querySelector(".success");

const firstNameError = document.querySelector(".fname small");
const lastNameError = document.querySelector(".lname small");
const emailRequiredError = document.querySelector(".email #error-msg");
const emailInvalidError = document.querySelector(".email #error-msg1");
const radioError = document.querySelector(".rdo-grp small");
const messageError = document.querySelector(".msg small");
const consentError = document.querySelector(".consent small");

function validateEmail(mail) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}

radioBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    
    radioOptions[index].checked = true;

    
    radioBoxes.forEach((b) => {
      b.classList.remove("active");
      b.querySelector("span").style.display = "none";
    });

    
    box.classList.add("active");
    box.querySelector("span").style.display = "block";

    
    radioError.style.display = "none";
  });
});

consentBox.addEventListener("change", () => {
  consentTick.style.display = consentBox.checked ? "block" : "none";
  if (consentBox.checked) consentError.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

 
  if (firstName.value.trim() === "") {
    firstNameError.style.display = "block";
    valid = false;
  } else firstNameError.style.display = "none";

  
  if (lastName.value.trim() === "") {
    lastNameError.style.display = "block";
    valid = false;
  } else lastNameError.style.display = "none";

  
  if (email.value.trim() === "") {
    emailRequiredError.style.display = "block";
    emailInvalidError.style.display = "none";
    valid = false;
  } else if (!validateEmail(email.value.trim())) {
    emailRequiredError.style.display = "none";
    emailInvalidError.style.display = "block";
    valid = false;
  } else {
    emailRequiredError.style.display = "none";
    emailInvalidError.style.display = "none";
  }

  
  let chosen = false;
  radioOptions.forEach((r) => {
    if (r.checked) chosen = true;
  });

  if (!chosen) {
    radioError.style.display = "block";
    valid = false;
  }

  
  if (message.value.trim() === "") {
    messageError.style.display = "block";
    valid = false;
  } else messageError.style.display = "none";

  
  if (!consentBox.checked) {
    consentError.style.display = "block";
    valid = false;
  }

 
  if (valid) {
    showSuccessPopup();
    form.reset();

    radioBoxes.forEach((box) => {
      box.classList.remove("active");
      box.querySelector("span").style.display = "none";
    });

    consentTick.style.display = "none";
  }
});

function showSuccessPopup() {
  successPopup.style.display = "block";
  successPopup.style.opacity = "1";

  setTimeout(() => {
    successPopup.style.opacity = "0";
    setTimeout(() => (successPopup.style.display = "none"), 400);
  }, 3000);
}
