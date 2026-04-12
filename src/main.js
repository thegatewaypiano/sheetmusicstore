function searchTitles() {
    let input = document.getElementById("search-input").value.toLowerCase();
    let sheetElements = document.querySelectorAll(".sheet");
    let noResults = document.getElementById("no-results");

    let hasResults = false;

    for (const sheet of sheetElements) {
        let dataTitle = sheet.dataset.title.toLowerCase();

        if (dataTitle.includes(input)) {
            sheet.style.display = "flex";
            hasResults = true;
        } else {
            sheet.style.display = "none";
        }
    }

    noResults.style.display = hasResults ? "none" : "block";
}

const overlay = document.getElementById("sheet-overlay");
const popupImage = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupPrice = document.getElementById("popup-price");
const popupClose = document.getElementById("popup-close");
const sheets = document.querySelectorAll(".sheet");
const popupIframe = document.getElementById("popup-iframe");
const infoNav = document.getElementById("info");
const infoOverlay = document.getElementById("info-overlay");
const infoClose = document.getElementById("info-close");
const popupButton = document.getElementById("popup-buy");

for (const sheet of sheets) {
    sheet.addEventListener("click", () => {
        popupImage.src = sheet.dataset.image;
        popupTitle.textContent = sheet.dataset.title;
        popupDescription.textContent = sheet.dataset.description;
        popupPrice.textContent = sheet.dataset.price;
        popupIframe.src = sheet.dataset.video;
        popupButton.dataset.link = sheet.dataset.link || "";
        overlay.classList.add("active");
    });
}

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

function openSheetFromHash() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    for (const sheet of sheets) {
        const title = sheet.dataset.title;
        const slug = slugify(title);

        if (slug === hash) {
            popupImage.src = sheet.dataset.image;
            popupTitle.textContent = sheet.dataset.title;
            popupDescription.textContent = sheet.dataset.description;
            popupPrice.textContent = sheet.dataset.price;
            popupIframe.src = sheet.dataset.video;
            popupButton.dataset.link = sheet.dataset.link || "";
            overlay.classList.add("active");
            break;
        }
    }
}

popupClose.addEventListener("click", () => {
    popupIframe.src = "";
    overlay.classList.remove("active");
});

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        popupIframe.src = "";
        overlay.classList.remove("active");
    }
});

infoNav.addEventListener("click", () => {
    infoOverlay.classList.add("active");
});

infoClose.addEventListener("click", () => {
    infoOverlay.classList.remove("active");
});

infoOverlay.addEventListener("click", (event) => {
    if (event.target === infoOverlay) {
        infoOverlay.classList.remove("active");
    }
});

popupButton.addEventListener("click", () => {
    const link = popupButton.dataset.link;

    if (link) {
        window.location.href = link;
    }
});

window.addEventListener("load", openSheetFromHash);
window.addEventListener("hashchange", openSheetFromHash);
