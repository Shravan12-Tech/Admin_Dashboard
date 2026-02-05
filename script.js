/* =====================================================
   LOGIN / REGISTER TOGGLE
===================================================== */
function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

/* =====================================================
   REGISTER USER
===================================================== */
function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const error = document.getElementById("registerError");

  if (!user || !pass) {
    error.textContent = "All fields are required";
    error.style.color = "tomato";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === user)) {
    error.textContent = "User already exists";
    error.style.color = "tomato";
    return;
  }

  users.push({ username: user, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  error.textContent = "Registered successfully ✔";
  error.style.color = "lightgreen";

  setTimeout(showLogin, 1200);
}

/* =====================================================
   LOGIN USER
===================================================== */
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const error = document.getElementById("loginError");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    u => u.username === user && u.password === pass
  );

  if (validUser) {
    localStorage.setItem("auth", user);
    window.location.href = "./dashboard.html";
  } else {
    error.textContent = "Invalid username or password";
    error.style.color = "tomato";
  }
}

/* =====================================================
   AUTH PROTECTION (DASHBOARD)
===================================================== */
if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("auth")) {
    window.location.href = "./index.html";
  }
}

/* =====================================================
   LOGOUT
===================================================== */
function logout() {
  localStorage.removeItem("auth");
  window.location.href = "./index.html";
}

/* =====================================================
   SIDEBAR TOGGLE (MOBILE)
===================================================== */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");

  if (!sidebar) return;

  if (window.innerWidth < 768) {
    sidebar.style.display =
      sidebar.style.display === "block" ? "none" : "block";
  }
}

/* =====================================================
   THEME TOGGLE
===================================================== */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* =====================================================
   LINE CHART (REALISTIC DATA)
===================================================== */
const revenueData = [12000, 14500, 16000, 18500, 21000, 24300];

if (document.getElementById("lineChart")) {
  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue ($)",
          data: revenueData,
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56,189,248,0.3)",
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
