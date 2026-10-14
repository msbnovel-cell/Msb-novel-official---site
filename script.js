const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  const open = navbar.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "✕" : "☰";
});

navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Switch all translated text between English and Bangla.
let currentLanguage = "en";
const langToggle = document.getElementById("langToggle");

langToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "bn" : "en";
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-en][data-bn]").forEach(element => {
    element.textContent = element.dataset[currentLanguage];
  });
  langToggle.textContent = currentLanguage === "en" ? "বাংলা" : "English";
});

// Current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: prepares an email in the visitor's email application.
// For direct website delivery, connect a form service or backend.
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  if (![name, email, subject, message].every(Boolean)) {
    status.textContent = currentLanguage === "bn"
      ? "অনুগ্রহ করে সব ঘর পূরণ করুন।"
      : "Please complete every field.";
    return;
  }

  // TODO: Replace with your real email or connect a form service.
  const recipient = "YOUR_EMAIL@example.com";
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  status.textContent = currentLanguage === "bn"
    ? "আপনার ইমেইল অ্যাপ খুলবে। মেসেজ পাঠাতে সেখানে Send চাপুন।"
    : "Your email app will open. Press Send there to deliver the message.";
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
