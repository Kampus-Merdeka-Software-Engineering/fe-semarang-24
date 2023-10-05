const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const header = accordion.querySelector(".accordion-header");
  const content = accordion.querySelector(".accordion-content");

  header.addEventListener("click", () => {
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      accordions.forEach((item) => {
        item.querySelector(".accordion-content").style.display = "none";
      });
      content.style.display = "block";
    }
  });
});

const navBar = () => {
  var navBar = document.querySelector(".nav-links");
  if (navBar.style.display === "block") {
    navBar.style.display = "none";
  } else {
    navBar.style.display = "block";
  }
};
