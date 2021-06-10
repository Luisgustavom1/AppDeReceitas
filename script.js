let cards = document.querySelectorAll('.cards')

function getMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => init(data))
}


function init(resultFromAPI){
    CreateNewMealRandom.addCard(resultFromAPI)
    modalOverlayVerReceita.modalReceitaRandom(resultFromAPI)

    var testando = resultFromAPI.meals.map(function(obj){
        return Object.keys(obj).map(function(key){
            return obj[key]
        })
    })
    console.log(testando)
}

class CreateNewMeal {
    addCard(response){
        const section = document.querySelector('.sectionCards')
        const cards = document.querySelector('.cards1')

        cards.innerHTML = this.createCard(response)
        section.appendChild(cards)

        this.createCard(response)
        this.addImage(response)  
    }

    createCard(response){
            const html = `     
                    <footer>
                        <p id="titulo">${response.meals[0].strMeal}</p>
                        <button id="verReceita" onclick='modalOverlayVerReceita.openModalVerReceita()'>Ver receita</button>
                    </footer>
            `
            return html
    }

    
    addImage(response){    
        let style = document.createElement('style')
        style.textContent = `
            .cards1{
                background-image: url(${response.meals[0].strMealThumb})
            }
            `
            cards[0].appendChild(style)
    }
}

class SetarLocalStorage {
    get(){
        return JSON.parse(localStorage.getItem('Meals'))
    }
    set(meal){
        localStorage.setItem('Meals', JSON.stringify(meal))
    }
}

class ModalOverlayVerReceita {
    openModalVerReceita(){
        document.querySelector('.modal-overlay').classList.add('active')
    }

    modalReceitaRandom(response){
        document.querySelector('.headerOverlay').innerHTML = response.meals[0].strMeal

        const responseArr = response.meals.map(function(obj){
            return Object.keys(obj).map(function(key){
                return obj[key]
            })
        })

        for(var c = 9; c < 28; c++){
            if(responseArr[0][c] == ""){
                console.log('NAO FAZ NADAAAAAAAAAAAAAAAAAAAAAAA')
            }else{
                const ul = document.querySelector('.lista')
                const lis = document.createElement('li')

                lis.innerHTML = `${responseArr[0][c+20]}  ${responseArr[0][c]}`

                ul.appendChild(lis)
            }
        }

        document.querySelector('.modal-overlay img').setAttribute('src', responseArr[0][6])
        document.querySelector('.modal #modoDePreparo').innerHTML = responseArr[0][5]
    }
}

const CreateNewMealRandom = new CreateNewMeal()
const CreateLocalStorage = new SetarLocalStorage()
const modalOverlayVerReceita = new ModalOverlayVerReceita()

window.addEventListener('onload', getMeal())

document.querySelectorAll('#verReceita').forEach(function(verReceita){
    verReceita.addEventListener('click', (e) => console.log(e))
})
