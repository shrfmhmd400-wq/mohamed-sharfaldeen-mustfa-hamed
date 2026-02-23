/* Mohamed Sharaf – main.js
   1. Dynamic year in footer
   2. Mobile menu toggle
   3. GPA Calculator with validation
   4. Contact form validation
*/

/* 1. FOOTER YEAR */
document.getElementById("year").textContent = new Date().getFullYear();

/* 2. MOBILE MENU TOGGLE */
var hamburger = document.getElementById("hamburger");
var navMenu   = document.getElementById("nav-menu");

hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("open");
});

// Close menu when a link is clicked
navMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
  });
});

/* 3. GPA CALCULATOR */

// Convert a percentage mark (0-100) to a GPA point (0.0 - 4.0)
function toGPA(mark) {
  if (mark >= 90) return 4.0;
  if (mark >= 80) return 3.7;
  if (mark >= 75) return 3.3;
  if (mark >= 70) return 3.0;
  if (mark >= 65) return 2.7;
  if (mark >= 60) return 2.3;
  if (mark >= 55) return 2.0;
  if (mark >= 50) return 1.7;
  if (mark >= 45) return 1.3;
  if (mark >= 40) return 1.0;
  return 0.0;
}

// Validate one input field. Returns the number or null if invalid.
function validateMark(inputId, errId) {
  var val = document.getElementById(inputId).value.trim();
  var err = document.getElementById(errId);
  err.textContent = "";

  if (val === "") {
    err.textContent = "This field is required.";
    return null;
  }
  var num = Number(val);
  if (isNaN(num) || num < 0 || num > 100) {
    err.textContent = "Enter a number between 0 and 100.";
    return null;
  }
  return num;
}

document.getElementById("calcBtn").addEventListener("click", function () {
  var m1 = validateMark("mark1", "err1");
  var m2 = validateMark("mark2", "err2");
  var m3 = validateMark("mark3", "err3");

  // Stop if any field is invalid
  if (m1 === null || m2 === null || m3 === null) return;

  // Calculate average GPA
  var avgGPA  = (toGPA(m1) + toGPA(m2) + toGPA(m3)) / 3;
  var gpaText = avgGPA.toFixed(2);

  // Determine classification
  var label, cssClass;
  if (avgGPA >= 3.5) { label = "First Class";   cssClass = "first"; }
  else if (avgGPA >= 2.5) { label = "Second Class"; cssClass = "second"; }
  else if (avgGPA >= 1.0) { label = "Pass";         cssClass = "pass"; }
  else                    { label = "Fail";          cssClass = "fail"; }

  // Build result using DOM manipulation
  var box = document.getElementById("calcResult");
  box.innerHTML = "";

  var gpaEl  = document.createElement("div");
  var bigNum = document.createElement("p");
  var sub    = document.createElement("p");
  var badge  = document.createElement("span");
  var note   = document.createElement("p");

  bigNum.className   = "gpa-big";
  bigNum.textContent = gpaText;

  sub.className   = "gpa-sub";
  sub.textContent = "GPA out of 4.0";

  badge.className   = "badge " + cssClass;
  badge.textContent = label;

  note.style.cssText    = "font-size:0.8rem;color:#888;margin-top:10px;";
  note.textContent      = "Avg mark: " + ((m1 + m2 + m3) / 3).toFixed(1) + "%";

  gpaEl.appendChild(bigNum);
  gpaEl.appendChild(sub);
  gpaEl.appendChild(badge);
  gpaEl.appendChild(note);
  box.appendChild(gpaEl);
  box.style.borderColor = "#f6ad55";
});

// Clear error on typing
["mark1","mark2","mark3"].forEach(function (id, i) {
  document.getElementById(id).addEventListener("input", function () {
    document.getElementById("err" + (i + 1)).textContent = "";
  });
});

/* 4. CONTACT FORM VALIDATION */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var name  = document.getElementById("cName").value.trim();
  var email = document.getElementById("cEmail").value.trim();
  var msg   = document.getElementById("cMsg").value.trim();

  // Clear previous errors and success
  ["errName","errEmail","errMsg","formSuccess"].forEach(function (id) {
    document.getElementById(id).textContent = "";
  });

  var ok = true;

  if (!name) {
    document.getElementById("errName").textContent = "Please enter your name.";
    ok = false;
  }
  if (!email) {
    document.getElementById("errEmail").textContent = "Please enter your email.";
    ok = false;
  } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    document.getElementById("errEmail").textContent = "Please enter a valid email.";
    ok = false;
  }
  if (!msg) {
    document.getElementById("errMsg").textContent = "Please write a message.";
    ok = false;
  } else if (msg.length < 10) {
    document.getElementById("errMsg").textContent = "Message must be at least 10 characters.";
    ok = false;
  }

  if (ok) {
    this.reset();
    document.getElementById("formSuccess").textContent =
      "Thank you, " + name + "! Your message was received.";
  }
});

// Clear errors on typing
[["cName","errName"],["cEmail","errEmail"],["cMsg","errMsg"]].forEach(function (pair) {
  document.getElementById(pair[0]).addEventListener("input", function () {
    document.getElementById(pair[1]).textContent = "";
  });
});
