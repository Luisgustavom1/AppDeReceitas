let cards = document.querySelectorAll('.cards')

function getMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => init(data))
}

function init(resultFromAPI){
    addCard(resultFromAPI)
}

function createCard(response){
    const html = `
        <div class="cards">
            <footer>
                <p id="titulo">${response.meals[0].strMeal}</p>
                <button id="verReceita">Ver receita</button>
            </footer>
        </div>
    `
    console.log('ta dando certo')
    return html
} 
function addCard(response){
    const section = document.querySelector('.sectionCards')
    const div = document.createElement('div')

    div.innerHTML = createCard(response)
    section.appendChild(div)

    createCard(response)
    addImage(response)
}

function addImage(response){
    console.log(response)

    let style = document.createElement('style')
    style.textContent = `
        .cards{
            background-image: url(${response.meals[0].strMealThumb})
        }
        `
        cards[0].appendChild(style)
}



document.querySelector('.addReceita').addEventListener('click', getMeal)
