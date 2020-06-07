
//Popular estados
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( (res) => {return res.json()} )
    .then(states => {
        for(state of states){
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()
//Colocar as cidades habilitadas
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a cidade </option>" //Limpar as cidades antes de popular
    citySelect.disabled = true // Desabilita a escolha da cidade enquanto o loop for executa

    fetch(url)
    .then( (res) => {return res.json()} )
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false //Ativa o campo de seleção de cidade
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de coleta

//Pegar todos li's (itens de coleta)
const itemsToCollect = document.querySelectorAll(".items-grid li")
for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]") 

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //Add or remove class selected of itemLi
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    //Verificar se existem itens selecionados, se sim pegar esses itens
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //Compara se o item é o mesmo do id, será true ou false
        return itemFound
    })
    //Se já estiver selecionado, tirar da seleção
    if(alreadySelected != -1){
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId //Verifica se o item é diferente do id, será true ou false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
         //Se não estiver selecionado, adicionar à seleção
         selectedItems.push(itemId)
    }

    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}