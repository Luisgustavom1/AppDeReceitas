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

function reload(){
    createNewMeal.addMeal()
}

class ModalOverlayVerReceita {
    openModalVerReceitaRandom(){
        document.querySelector('.modal-overlay.verReceita.random').classList.add('active')
    }

    modalReceitaRandom(response){
        document.querySelector('.headerOverlay').innerHTML = response.meals[0].strMeal

        const responseArr = response.meals.map(function(obj){
            return Object.keys(obj).map(function(key){
                return obj[key]
            })
        })

        for(var c = 9; c < 28; c++){
            if(responseArr[0][c] !== ""){
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

class CreateNewMeal {
    constructor() {
        this.id = 1;
        this.arrayReceita = [];
    }

    saveMeal(){
        let receita = this.getMeal();

        if(this.validationMeal(receita)){
            this.addMeal(receita)
            SetarLocalStorage.set(this.arrayReceita)
            this.openCloseModal()
            this.clearModal()
            this.addCard()
        }

        console.log(this.arrayReceita)
        console.log(SetarLocalStorage.get().map(function(obj){
            return Object.keys(obj).map(function(key){
                return obj[key]
            })
        }).length)
    }

    getMeal(){
        let receita = {};

        receita.id = this.id;
        receita.title = document.querySelector('#title').value;
        receita.ingredientes = document.querySelector('#ingredientes').value;
        receita.preparo = document.querySelector('#preparo').value;

        return receita
    }

    validationMeal(receita){
        if(receita.title == '' || receita.ingredientes == '' || receita.preparo == ''){
            alert('Preencha todos os dados!!')
            return false
        }
        return true
    }

    addMeal(receita){  
        this.arrayReceita.push(receita)
        this.id++
    }
    
    clearModal(){
        document.getElementById('title').value = '';
        document.getElementById('ingredientes').value = '';
        document.getElementById('preparo').value = '';
    }

    openCloseModal(){
        document.querySelector('.modal-overlay.addReceita').classList.toggle('active')
    }

    addCard(){
        let todas = SetarLocalStorage.get().map(function(obj){
            return Object.keys(obj).map(function(key){
                return obj[key]
            })
        })
        console.log(todas.length)
        const section = document.querySelector('.sectionCards')
        const div = document.createElement('div')
        div.innerHTML = ''

        for(var c = 0; c < todas.length; c++){
            const html = `
                <div class="cards">
                    <footer>
                        <p id="titulo">${todas[c][1]}</p>
                        <button class="verReceita card" onclick='createNewMeal.openCloseModalVerReceita(${todas[c][0]})'>Ver receita</button>
                    </footer>
                </div>
                `
                div.innerHTML = html
                section.appendChild(div)
        }
    }

    openCloseModalVerReceita(){
        document.querySelector('.modal-overlay.verReceita.card').classList.toggle('active')
    }
}

const SetarLocalStorage = {
    get(){
        return JSON.parse(localStorage.getItem('Meals')) || []
    },
    set(meal){
        localStorage.setItem('Meals', JSON.stringify(meal))
    }
}

var createNewMeal = new CreateNewMeal()
const modalOverlayVerReceita = new ModalOverlayVerReceita()

window.addEventListener('onload', getMeal(), createNewMeal.addCard())


document.querySelector('#trocar').addEventListener('click', function(){
    getMeal()
    document.location.reload(true)
})

document.querySelector('#sair').addEventListener('click', modalOverlayVerReceita.closeModalRandom)

document.querySelector('.verReceita.card1').addEventListener('click', modalOverlayVerReceita.openModalVerReceitaRandom)

document.querySelector('.addReceita').addEventListener('click', createNewMeal.openCloseModal)
document.querySelector('#cancelar').addEventListener('click', createNewMeal.openCloseModal)






