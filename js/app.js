/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

;(function () {
  /**
   * Define Global Variables
   *
   */

  const nav = document.querySelector("#navbar__list")
  const sectionNodes = document.querySelectorAll("section")
  const sectionHeaders = document.querySelectorAll("section h2")
  let timerId = null

  const sectionData = Array.from(sectionNodes).map((s, idx) => ({
    id: s.id,
    associatedMenuId: `menu${idx + 1}`,
  }))

  /**
   * End Global Variables
   * Start Helper Functions
   *
   */

  function debounce(cb, time) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      cb()
    }, time)
  }

  function scrollSection(id) {
    const section = document.querySelector(`#${id}`)
    if (!section) return
    section.scrollIntoView({ behavior: "smooth" })
  }

  function getIdFromLabel(label) {
    return label.split(" ").join("").toLowerCase()
  }

  function createNavFromSections(sections) {
    const frag = document.createDocumentFragment()
    sections.forEach((h2, idx) => {
      const li = document.createElement("li")
      li.textContent = h2.textContent
      li.classList.add("menu__link")
      li.id = `menu${idx + 1}`
      li.onclick = function () {
        return scrollSection(getIdFromLabel(li.textContent))
      }
      frag.appendChild(li)
    })
    nav.appendChild(frag)
  }

  function setSectionStyleOnScroll() {
    sectionData.forEach(item => {
      const section = document.querySelector(`#${item.id}`)
      const sectionInnerContainer = section.querySelector(".landing__container")
      const rect = sectionInnerContainer.getBoundingClientRect()
      const menu = document.querySelector(`#${item.associatedMenuId}`)
      // check if the section is in viewport
      if (
        rect.top > 60 &&
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.bottom < window.innerHeight
      ) {
        section.classList.add("section-active")
        menu.classList.add("menu-active")
      } else {
        section.classList.remove("section-active")
        menu.classList.remove("menu-active")
      }
    })
  }

  /**
   * End Helper Functions
   * Begin Main Functions
   *
   */

  // build the nav
  createNavFromSections(sectionHeaders)
  // Add class 'active' to section when near top of viewport

  // Scroll to anchor ID using scrollTO event

  /**
   * End Main Functions
   * Begin Events
   *
   */

  // Build menu

  // Scroll to section on link click

  // Set sections as active

  document.body.onscroll = () => debounce(setSectionStyleOnScroll, 100)
})()
