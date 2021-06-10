let cards = document.querySelectorAll('.cards')

function getMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => init(data))
}


function init(resultFromAPI){
    modalOverlayVerReceita.addCard(resultFromAPI)
    modalOverlayVerReceita.modalReceitaRandom(resultFromAPI)

    console.log(resultFromAPI)
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

    closeModalRandom(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }

    addCard(response){
        document.querySelector('#titulo').innerHTML = response.meals[0].strMeal
        this.addImage(response)
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

const createNewMeal = {
        nome: document.querySelector('#title').value,
        ingredientes: document.querySelector('textarea#ingredientes').value,
        preparo: document.querySelector('textarea#preparo').value,  
    getForm(){
        return{
            nome: createNewMeal.nome.value,
            ingredientes: createNewMeal.ingredientes.value,
            preparo: createNewMeal.preparo.value
        }
    },

    createCard(){
        const nome = createNewMeal.getForm() 
        const html = ` 
            <div class='cards'>    
                <footer>    
                    <p id="titulo">${nome.value}</p>
                    <button id="verReceita" onclick='modalOverlayVerReceita.openModalVerReceita()'>Ver receita</button>
                </footer>
            </div>
            `
        return {
            html,
            nome
        }
    },

    addCard(){
        const section = document.querySelector('.sectionCards')
        const div = document.createElement('div')

        div.innerHTML = createNewMeal.createCard()
        section.appendChild(div)
    },

    openCloseModal(){
        document.querySelector('.modal-overlay.addReceita').classList.toggle('active')
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

const CreateLocalStorage = new SetarLocalStorage()
const modalOverlayVerReceita = new ModalOverlayVerReceita()

window.addEventListener('onload', getMeal())

document.querySelector('#trocar').addEventListener('click', function(){
    getMeal()
    document.location.reload(true)
})

document.querySelector('#sair').addEventListener('click', modalOverlayVerReceita.closeModalRandom)

document.querySelector('.verReceita.card1').addEventListener('click', modalOverlayVerReceita.openModalVerReceita)

document.querySelector('.addReceita').addEventListener('click', createNewMeal.openCloseModal)
document.querySelector('#cancelar').addEventListener('click', createNewMeal.openCloseModal)

document.querySelector('#adicionar').addEventListener('click', createNewMeal.addCard)


