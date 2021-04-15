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


function displayShortCard(data) {
    const template = document.querySelector('#tpl')

    data.forEach(({ flag, alpha3Code, name, population, region, capital }) => {
        const clone = template.cloneNode(true).content
        let descriptionDiv = clone.querySelector('.card')
        descriptionDiv.innerHTML = `
        <img class="card-img-top link" src="${flag}" alt="${name} flag">
        <p id="ISO" class="ISO" hidden>${alpha3Code}</p>
        <div class="card-body">
            <h2 class="">${name}</h2>
            <p><span>Population: </span>${population}</p>
            <p><span>Region: </span>${region}</p>
            <p><span>Capital: </span>${capital}</p>
        </div>`

        clone.querySelector('#ISO').innerHTML = alpha3Code

        target.appendChild(clone)
    })
}

function getDetail() {
    const country = document.getElementsByClassName('link')

    for (let i = 0; i < country.length; i++) {
        country[i].addEventListener('click', function () {
            const ISO = this.nextElementSibling.innerHTML

            const detail = new Country()

            detail.getCountry(ISO).then(() => {
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

function darkMode() {
    const modeButton = document.getElementById('mode')
    const moonIcon = document.getElementById('moon')
    const body = document.getElementById('body')
    const cards = Array.from(document.getElementsByClassName('card'))

    modeButton.addEventListener('click', function () {
        modeButton.classList.toggle('dark-button')
        moonIcon.classList.toggle('far')
        moonIcon.classList.toggle('fas')
        body.classList.toggle('dark')
        cards.forEach((card) => {
            card.classList.toggle('card-dark')
        });

    })
}

api.then((data) => {
    displayShortCard(data)
    getDetail()
    darkMode()
})