class Country {
    constructor(flag, alpha3Code, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders) {
        this.flag = flag
        this.alpha3Code = alpha3Code
        this.name = name
        this.nativeName = nativeName
        this.population = population
        this.region = region
        this.subregion = subregion
        this.capital = capital
        this.topLevelDomain = topLevelDomain
        this.currencies = currencies
        this.languages = languages
        this.borders = borders
    }

    getCountry(ISO) {
        return fetch(`https://restcountries.eu/rest/v2/alpha/${ISO}`)
            .then((response) => response.json())
            .then((data) => {
                this.flag = data.flag
                this.alpha3Code = data.alpha3Code
                this.name = data.name
                this.nativeName = data.nativeName
                this.population = data.population
                this.region = data.region
                this.subregion = data.subregion
                this.capital = data.capital
                this.topLevelDomain = data.topLevelDomain
                this.currencies = data.currencies
                this.languages = data.languages
                this.borders = data.borders
                return data
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        let container = document.createElement('div')

        container.innerHTML = `
        <div class="back"><a href="">Back</a></div>
        <div class="flag"><img class="flag-image" src="${this.flag}" alt="flag"></div>
    <div class="description">
        <h1 class="name">${this.name}</h1>
        <div class="info-1">
            <ul>
                <li><span>Native Name: </span>${this.nativeName}</li>
                <li><span>Population: </span>${this.population}</li>
                <li><span>Region: </span>${this.region}</li>
                <li><span>Sub Region: </span>${this.subregion}</li>
                <li><span>Capital: </span>${this.capital}</li>
            </ul>
        </div>
        <div class="info-2">
            <ul>
                <li><span>Top Level Domain: </span>${this.topLevelDomain}</li>
                <li><span>Currencies: </span>${this.currencies.map(currency => currency.name).join(', ')}</li>
                <li><span>Languages: </span>${this.languages.map(language => language.name).join(', ')}</li>
            </ul>
        </div>
        <div id="border">${this.borders}</div>
    </div>`
        return container;
    }
}

export { Country }
