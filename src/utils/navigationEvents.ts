const toggleActive = (el: HTMLElement) => {
    el.dataset.isActive = String(!(el.dataset.isActive === "true"));
};

const toggleScroll = (el: HTMLElement) => {
    if (window.scrollY > el.getBoundingClientRect().height * 0.5) {
        el.dataset.isActive = "true";
    } else {
        el.dataset.isActive = "false";
    }
};

document.addEventListener("DOMContentLoaded", (event) => {
    const nav = document.querySelector("[data-nav-bar]") as HTMLElement;
    const toggle = document.querySelector(
        "[data-menu-toggle]",
    ) as HTMLButtonElement;
    const toggleIcons = document.querySelectorAll(
        "[data-icon]",
    ) as NodeListOf<HTMLElement>;
    const menu = document.querySelector("[data-menu]") as HTMLElement;

    // Click Listener
    toggle.addEventListener("click", function () {
        toggleActive(menu); // Toggle Menu
        this.ariaExpanded = String(!(this.ariaExpanded === "true")); // Toggle Aria
        toggleActive(this); // Toggle Active

        for (const icon of toggleIcons) {
            toggleActive(icon); // Toggle Icons
        }
    });

    toggleScroll(nav);

    // Scroll Listener
    document.addEventListener("scroll", () => {
        if (window.scrollY > nav.getBoundingClientRect().height * 0.5) {
            toggleScroll(nav);
        } else {
            toggleScroll(nav);
        }
    });
});