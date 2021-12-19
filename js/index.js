const filters = document.querySelectorAll("#filters-section select");
const noResults = document.querySelector("#no-results");
const results = document.querySelector("#section-results");
const sectionResults = document.querySelector("#results-container");
const buttonTop = document.getElementsByName('scroll-to-top')
const params = {};

buttonTop.forEach(button => button.addEventListener('click', () => window.scrollTo(0, 0)))

filters.forEach((element) =>
    element.addEventListener("change", function() {
        params[this.name] = this.value;

        if (params.sun && params.water && params.pets) {
            const queryString = new URLSearchParams(params).toString();
            fetch(
                    `https://front-br-challenges.web.app/api/v2/green-thumb?${queryString}`
                )
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        noResults.style.display = "none";
                        sectionResults.style.display = "flex";
                        results.classList.remove("hide")
                        console.log(sectionResults)
                        data.forEach((element) => {
                            let card = document.createElement("div");

                            if (element.staff_favorite) {
                                card.setAttribute("class", "staff-favorite plant-card");
                                let cardLabel = document.createElement("div");
                                cardLabel.setAttribute("class", "label");
                                cardLabel.innerHTML = "✨ <strong>Staff favorite</strong>"
                                card.appendChild(cardLabel);
                            } else {
                                card.setAttribute("class", "plant-card");
                            }

                            let cardImage = document.createElement("img");
                            cardImage.setAttribute("class", "card-image");
                            cardImage.setAttribute("src", element.url);
                            card.appendChild(cardImage);

                            let cardContent = document.createElement("div");
                            cardContent.setAttribute("class", "card-content");
                            card.appendChild(cardContent);

                            let cardTitle = document.createElement("h3");
                            cardTitle.setAttribute("class", "card-title");
                            cardTitle.textContent = element.name;
                            cardContent.appendChild(cardTitle);

                            let cardDetails = document.createElement("div");
                            cardDetails.setAttribute("class", "card-details");
                            cardContent.appendChild(cardDetails);

                            let cardPrice = document.createElement("div");
                            cardPrice.setAttribute("class", "card-price");
                            cardDetails.appendChild(cardPrice);

                            let cardPriceSpan = document.createElement("span");
                            cardPriceSpan.textContent = "$" + element.price;
                            cardPrice.appendChild(cardPriceSpan);

                            let cardIcons = document.createElement("div");
                            cardIcons.setAttribute("class", "card-icons");
                            cardDetails.appendChild(cardIcons);

                            let cardIconFirst = document.createElement("img");
                            const toxicLogo = require("../images/icons/toxic.svg");
                            const petLogo = require("../images/icons/pet.svg");
                            cardIconFirst.setAttribute(
                                "src",
                                element.toxicity ? toxicLogo : petLogo
                            );
                            cardIcons.appendChild(cardIconFirst);

                            let cardIconSecond = document.createElement("img");
                            const sunIconsMap = {
                                no: require("../images/icons/no-sun.svg"),
                                low: require("../images/icons/low-sun.svg"),
                                high: require("../images/icons/high-sun.svg"),
                            };
                            cardIconSecond.setAttribute("src", sunIconsMap[element.sun]);
                            cardIcons.appendChild(cardIconSecond);

                            let cardIconThird = document.createElement("img");
                            const waterIconsMap = {
                                rarely: require("../images/icons/1-drop.svg"),
                                regularly: require("../images/icons/2-drops.svg"),
                                daily: require("../images/icons/3-drops.svg")
                            };
                            cardIconThird.setAttribute("src", waterIconsMap[element.water]);
                            cardIcons.appendChild(cardIconThird);

                            sectionResults.appendChild(card);
                        });
                    }
                });
        }
    })
);