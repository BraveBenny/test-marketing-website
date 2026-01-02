(function () {
  const navMount = document.getElementById("navigationbar");
  if (!navMount) return;

  const currentRaw = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const current = currentRaw === "home.html" ? "index.html" : currentRaw;

  const navItems = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "service.html", label: "Services" },
    { href: "googleads.html", label: "Google Ads" },
    { href: "meta-ads.html", label: "Meta Ads" },
    { href: "contact.html", label: "Contact", isContact: true }
  ];

  const navHTML = `
    <div class="nav-container container">
      <a class="logo" href="index.html">BenPro</a>

      <button class="menu-toggle" aria-label="Open Menu" aria-expanded="false">☰</button>

      <nav>
        <ul class="nav-links">
          ${navItems
            .map((item) => {
              const isActive = current === item.href.toLowerCase();
              const liClass = item.isContact ? "contactbutton" : "";
              const aClass = isActive ? "active" : "";
              return `<li class="${liClass}"><a class="${aClass}" href="${item.href}">${item.label}</a></li>`;
            })
            .join("")}
        </ul>
      </nav>
    </div>
  `;

  navMount.innerHTML = navHTML;

  const toggleBtn = navMount.querySelector(".menu-toggle");
  const nav = navMount.querySelector("nav");
  const navLinks = navMount.querySelector(".nav-links");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      if (navLinks) navLinks.classList.toggle("active", isOpen);
    });

    navMount.querySelectorAll(".nav-links a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("active");
        if (navLinks) navLinks.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
// ========================================
// Smooth scrolling for same-page links
// (used on Home for #services, etc.)
// ========================================
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector(".header");
      const offset = header ? header.offsetHeight + 10 : 90;

      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    });
  });
})();
