const items = [{
        title: "Ваза Sasuke",
        description: "Высота 25 см.",
        tags: ["вазы", "new"],
        price: 5920,
        img: "img/1.jpg",
        rating: 4.6,
    },
    {
        title: "Ваза из керамики и ротанга Kuro",
        description: "Высота 41 см.",
        tags: ["вазы", "new"],
        price: 8890,
        img: "img/2.jpg",
        rating: 3.9,
    },
    {
        title: "Ваза из керамики Cocco",
        description: "Высота 18 см.",
        tags: ["вазы"],
        price: 5640,
        img: "img/3.jpg",
        rating: 4.5,
    },
    {
        title: "Ваза из толстого стекла Esmeralde",
        description: "Высота 28 см.",
        tags: ["вазы"],
        price: 5230,
        img: "img/4.jpg",
        rating: 4.9,
    },
    {
        title: "Кашпо из терракоты Lesego",
        description: "Высота 13 см.",
        tags: ["кашпо", "new"],
        price: 4580,
        img: "img/5.jpg",
        rating: 3.3,
    },
    {
        title: "Кашпо Plantae",
        description: "Высота 54 см.",
        tags: ["кашпо"],
        price: 6200,
        img: "img/6.jpg",
        rating: 3.2,
    },
    {
        title: "Кашпо из цементного раствора Ollam",
        description: "Высота 29 см., диаметр 35 см.",
        tags: ["кашпо"],
        price: 6800,
        img: "img/7.jpg",
        rating: 5.0,
    },
    {
        title: "Кашпо на стойке из металла и латуни Inaya",
        description: "Высота 42 см.",
        tags: ["кашпо", "new"],
        price: 8420,
        img: "img/8.jpg",
        rating: 3.4,
    },
    {
        title: "Комплект из трех керамических ваз Hedna",
        description: "Вытота 10/11/14 см.",
        tags: ["вазы", "new"],
        price: 10370,
        img: "img/9.jpg",
        rating: 2.4,
    },
    {
        title: "Кашпо на ножке TOPIM",
        description: "Высота 57 см.",
        tags: ["кашпо"],
        price: 8630,
        img: "img/10.jpg",
        rating: 3.9,
    },
    {
        title: "Кашпо WAX",
        description: "Высота 21 см.",
        tags: ["кашпо", "new"],
        price: 4240,
        img: "img/11.jpg",
        rating: 4.4,
    },
    {
        title: "Ваза из стекла и металла Planta",
        description: "Высота 19 см.",
        tags: ["вазы"],
        price: 3800,
        img: "img/12.jpg",
        rating: 4.1,
    },
];

const shopItemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareShopCards(arr) {
    arr.forEach(function(item) {
        const itemCard = itemTemplate.content.cloneNode(true);
        const imgCard = itemCard.querySelector('img');
        const titleCard = itemCard.querySelector('h1');
        const descriptionCard = itemCard.querySelector('p');
        const priceCard = itemCard.querySelector('.price');

        const tagsCard = itemCard.querySelector('.tags');
        item.tags.forEach(function(tag) {
            const oneTag = document.createElement('span');
            oneTag.classList.add('tag');
            oneTag.textContent = tag;
            tagsCard.append(oneTag);
        });

        const ratingCard = itemCard.querySelector(".rating");
        for (let i = 0; i < item.rating; i++) {
            const star = document.createElement("i");
            star.classList.add("far", "fa-star");
            ratingCard.append(star);
        }

        imgCard.src = item.img;
        titleCard.textContent = item.title;
        descriptionCard.textContent = item.description;
        priceCard.textContent = `${item.price}P`;

        nothingFound.textContent = "";
        shopItemsContainer.append(itemCard);
    })

};

let currentState = [...items];

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

prepareShopCards(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector("#sort");
sortControl.classList.add("sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                shopItemsContainer.innerHTML = "";
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                shopItemsContainer.innerHTML = "";
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                shopItemsContainer.innerHTML = "";
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                shopItemsContainer.innerHTML = "";
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    prepareShopCards(currentState);
});

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    shopItemsContainer.innerHTML = "";
    prepareShopCards(currentState);

    sortControl.selectedIndex = 0;
    if (!currentState.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const logo = document.querySelector('.logo');
logo.addEventListener('click', function() {
    location.reload();
});