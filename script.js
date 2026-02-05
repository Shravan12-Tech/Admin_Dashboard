/* ======================
   SWITCH LOGIN / REGISTER
====================== */
function showRegister() {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
}

function showLogin() {
  registerBox.style.display = "none";
  loginBox.style.display = "block";
}

/* ======================
   REGISTER
====================== */
function register() {
  const user = regUser.value.trim();
  const pass = regPass.value.trim();

  if (!user || !pass) {
    registerError.textContent = "All fields required";
    registerError.style.color = "tomato";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === user)) {
    registerError.textContent = "User already exists";
    registerError.style.color = "tomato";
    return;
  }

  users.push({ username: user, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  registerError.textContent = "Registered successfully ✔";
  registerError.style.color = "lightgreen";

  setTimeout(showLogin, 1200);
}

/* ======================
   LOGIN
====================== */
function login() {
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const valid = users.find(
    u => u.username === user && u.password === pass
  );

  if (valid) {
    localStorage.setItem("auth", user);
    window.location.href = "./dashboard.html";
  } else {
    loginError.textContent = "Invalid credentials";
    loginError.style.color = "tomato";
  }
}

/* ======================
   AUTH GUARD
====================== */
if (location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("auth")) {
    window.location.href = "./login.html";
  }
}

/* ======================
   LOGOUT
====================== */
function logout() {
  localStorage.removeItem("auth");
  window.location.href = "./login.html";
}

/* ======================
   SIDEBAR
====================== */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth < 768) {
    sidebar.style.display =
      sidebar.style.display === "block" ? "none" : "block";
  }
}

/* ======================
   THEME
====================== */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* ======================
   LINE CHART
====================== */
const revenue = [12000, 14500, 16000, 18500, 21000, 24300];

if (document.getElementById("lineChart")) {
  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun"],
      datasets: [{
        label: "Revenue ($)",
        data: revenue,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.3)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      }
    }
  });
}
