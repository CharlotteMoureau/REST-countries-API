import { Country } from './country.js';

const target = document.querySelector('#target')

async function fetchApi() {
    try {
        const response = await fetch('https://restcountries.eu/rest/v2/all')
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

let api = fetchApi()

function newCards(flag, alpha3Code, name, population, region, capital) {
    const template = document.querySelector('#tpl')
    const clone = template.cloneNode(true).content
    let descriptionDiv = clone.querySelector('.card')
    descriptionDiv.innerHTML = `
        <img class="card-img-top link" src="${flag}" alt="${name} flag">
        <p id="ISO" class="ISO" hidden>${alpha3Code}</p>
        <div class="card-body">
            <h2 class="name">${name}</h2>
            <p><span>Population: </span>${population}</p>
            <p><span>Region: </span>${region}</p>
            <p><span>Capital: </span>${capital}</p>
        </div>`

    clone.querySelector('#ISO').innerHTML = alpha3Code

    target.appendChild(clone)
    getDetail()
}

function displayShortCards(data) {
    data.forEach(({ flag, alpha3Code, name, population, region, capital }) => {
        newCards(flag, alpha3Code, name, population, region, capital)
    })
}

function getDetail() {
    const country = document.getElementsByClassName('link')
    const inputBar = document.getElementById('input-bar')

    for (let i = 0; i < country.length; i++) {
        country[i].addEventListener('click', function () {
            const ISO = this.nextElementSibling.innerHTML

            const detail = new Country()

            detail.getCountry(ISO).then(() => {
                inputBar.style.display = 'none'
                target.innerHTML = ''

                const detailCountry = detail.render()
                target.appendChild(detailCountry)

                getBorders(detail)
            })
        })
    }
}

function getBorders(detail) {
    const bordersTarget = document.getElementById('border')
    const borders = bordersTarget.textContent

    if (borders !== '') {
        const bordersArray = borders.split(',')
        bordersTarget.innerHTML = ''

        bordersArray.forEach((border) => {
            detail.getCountry(border).then((value) => {
                const name = value.name

                const buttons = document.createElement('button')
                buttons.className = 'borders-link'
                buttons.value = value.alpha3Code
                buttons.innerHTML = name
                bordersTarget.appendChild(buttons)

                buttons.addEventListener('click', function () {
                    const ISO = buttons.value

                    const detail = new Country()

                    detail.getCountry(ISO).then(() => {
                        target.innerHTML = ''

                        const detailCountry = detail.render()
                        target.appendChild(detailCountry)

                        getBorders(detail)
                    })
                })
            })
        })
    }
}

function darkMode() {
    const modeButton = document.getElementById('mode')
    const moonIcon = document.getElementById('moon')
    const body = document.getElementById('body')
    const input = document.getElementById('input')
    const select = document.getElementById('select')
    const cards = Array.from(document.getElementsByClassName('card'))

    modeButton.addEventListener('click', function () {
        modeButton.classList.toggle('dark-button')
        moonIcon.classList.toggle('far')
        moonIcon.classList.toggle('fas')
        body.classList.toggle('dark')
        input.classList.toggle('light')
        input.classList.toggle('dark-input')
        select.classList.toggle('select-dark')
        cards.forEach((card) => {
            card.classList.toggle('card-dark')
        })
    })
}

function filterContinents(data) {
    const select = document.getElementById('select')

    select.addEventListener('change', function () {
        target.innerHTML = ''
        const options = select.value

        data.forEach(({ flag, alpha3Code, name, population, region, capital }) => {
            switch (options) {
                case 'Africa':
                    if (region == 'Africa') {
                        newCards(flag, alpha3Code, name, population, region, capital)
                    }
                    break;

                case 'Americas':
                    if (region == 'Americas') {
                        newCards(flag, alpha3Code, name, population, region, capital)
                    }
                    break;

                case 'Asia':
                    if (region == 'Asia') {
                        newCards(flag, alpha3Code, name, population, region, capital)
                    }
                    break;

                case 'Europe':
                    if (region == 'Europe') {
                        newCards(flag, alpha3Code, name, population, region, capital)
                    }
                    break;
                case 'Oceania':

                    if (region == 'Oceania') {
                        newCards(flag, alpha3Code, name, population, region, capital)
                    }
                    break;

                case 'All':
                    newCards(flag, alpha3Code, name, population, region, capital)
                    break;

                case '0':
                    newCards(flag, alpha3Code, name, population, region, capital)
                    break;

                default:
                    break;
            }
        })

        const modeButton = document.getElementById('mode')
        const body = document.getElementById('body')
        const cards = Array.from(document.getElementsByClassName('card'))
        if (body.classList == 'dark') {
            cards.forEach((card) => {
                card.classList.toggle('card-dark')
            })
        } else {
            modeButton.addEventListener('click', function () {
                cards.forEach((card) => {
                    card.classList.toggle('card-dark')
                })
            })
        }
    })
}

function filterCountries(data) {
    const input = document.getElementById('input')

    input.addEventListener('keyup', () => {
        target.innerHTML = ''

        const filter = input.value.toUpperCase()
        data.forEach(({ flag, alpha3Code, name, population, region, capital }) => {
            const nameUpperCase = name.toUpperCase()
            if (nameUpperCase.includes(filter)) {
                newCards(flag, alpha3Code, name, population, region, capital)
            }
        })
    })

}

api.then((data) => {
    displayShortCards(data)
    filterContinents(data)
    filterCountries(data)
    darkMode()
})