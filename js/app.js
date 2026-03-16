// Mobile menu toggle function
function toggleMobileMenu() {
  const overlay = document.getElementById("mobileMenuOverlay");
  if (overlay) {
    if (overlay.classList.contains("hidden")) {
      overlay.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }
}

// Close mobile menu when clicking on links
document.querySelectorAll("#mobileMenuOverlay a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    toggleMobileMenu();
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Modal functionality
const modal = document.getElementById("measurementModal");
const openBtn = document.getElementById("openMeasurementBtn");
const closeBtn = document.getElementById("closeModalBtn");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  });
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Letter-by-letter animation
const headline = document.getElementById("heroHeadline");
if (headline) {
  const words = headline.innerText.split(" ");
  headline.innerHTML = "";
  words.forEach((word, idx) => {
    const span = document.createElement("span");
    span.className =
      "inline-block mr-2 " + (word === "distinction." ? "gold" : "");
    span.textContent = word;
    span.style.opacity = 0;
    span.style.transform = "translateY(20px)";
    headline.appendChild(span);
  });

  gsap.to("#heroHeadline span", {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power2.out",
    delay: 0.2,
  });
}

// Reveal sections on scroll
gsap.utils.toArray(".reveal-section").forEach((section) => {
  gsap.fromTo(
    section,
    { opacity: 0, rotationX: 5, y: 60, transformPerspective: 800 },
    {
      opacity: 1,
      rotationX: 0,
      y: 0,
      duration: 1.2,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    },
  );
});

// Magnetic buttons
const magnets = document.querySelectorAll(".magnetic-wrap");
magnets.forEach((wrap) => {
  const btn = wrap.querySelector("button, a");
  if (!btn) return;

  wrap.addEventListener("mousemove", (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.2, y: y * 0.1, duration: 0.3, ease: "power2.out" });
  });

  wrap.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
  });
});

// Form buttons (for PayStack and WhatsApp)
document.getElementById("paystackBtn")?.addEventListener("click", () => {
  alert("PayStack integration will go here");
});

document.getElementById("whatsappOrderBtn")?.addEventListener("click", () => {
  const name = document.getElementById("fullName")?.value || "Customer";
  const message = `New order from ${name}`;
  window.open(
    `https://wa.me/2349098865552?text=${encodeURIComponent(message)}`,
    "_blank",
  );
});
