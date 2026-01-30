const form = document.getElementById("dynamicForm");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const success = document.getElementById("success");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  success.classList.add("hidden");

  if (!validateForm()) return;

  progressContainer.classList.remove("hidden");
  progress.style.width = "0%";

  let percent = 0;

  const interval = setInterval(() => {
    percent += 10;
    progress.style.width = percent + "%";

    if (percent >= 100) {
      clearInterval(interval);
      saveData();
      progressContainer.classList.add("hidden");
      success.classList.remove("hidden");
      form.reset();
    }
  }, 200);
});

function validateForm() {
  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const age = document.getElementById("age");

  valid &= check(name, name.value.trim().length >= 3, "Mínimo 3 caracteres");
  valid &= check(email, email.value.includes("@"), "Email inválido");
  valid &= check(age, age.value >= 18, "Debes ser mayor de edad");

  return !!valid;
}

function check(input, condition, message) {
  const error = input.nextElementSibling;
  if (!condition) {
    error.textContent = message;
    return false;
  }
  error.textContent = "";
  return true;
}

function saveData() {
  const record = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    date: new Date().toLocaleString()
  };

  const records = JSON.parse(localStorage.getItem("records")) || [];
  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));
}
