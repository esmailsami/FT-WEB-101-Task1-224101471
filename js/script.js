// ---------- Find the elements ----------
const body = document.body;
const themeButton = document.getElementById("theme-toggle");
const topButton = document.getElementById("back-to-top");
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const greeting = document.getElementById("greeting");
const message = document.getElementById("form-message");

// ---------- Dark / light button ----------
// The button text follows the current page.
function updateThemeButton() {
  if (body.classList.contains("dark")) {
    themeButton.textContent = "Light mode";
  } else {
    themeButton.textContent = "Dark mode";
  }
}

// Remember the last choice. It saves a word, not a colour.
try {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
  }
} catch (error) {
  // Storage is blocked. The page still works.
}
updateThemeButton();

themeButton.addEventListener("click", function () {
  body.classList.toggle("dark");
  updateThemeButton();

  try {
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
  } catch (error) {
    // Ignore: saving is only a bonus.
  }
});

// ---------- Hello, with the name the visitor types ----------
nameInput.addEventListener("input", function () {
  const typed = nameInput.value.trim();
  if (typed === "") {
    greeting.textContent = "";
  } else {
    greeting.textContent = "Hello, " + typed + "!";
  }
});

// ---------- Form: an empty or wrong email is rejected ----------
function showMessage(text, type) {
  message.textContent = text;
  message.className = type; // "error" or "success": CSS paints it
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stay on the page

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const emailLooksRight = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  if (nameValue === "") {
    showMessage("Please type your name.", "error");
    nameInput.focus();
    return;
  }

  if (emailValue === "") {
    showMessage("Please type your email.", "error");
    emailInput.focus();
    return;
  }

  if (!emailLooksRight) {
    showMessage("This email does not look right. Example: name@mail.com", "error");
    emailInput.focus();
    return;
  }

  showMessage("Thank you, " + nameValue + ". Your details were received.", "success");
  form.reset();
  greeting.textContent = "";
});

// ---------- Back to top ----------
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topButton.classList.add("show");
  } else {
    topButton.classList.remove("show");
  }
});

topButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
