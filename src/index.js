document.addEventListener('DOMContentLoaded', () => {
  getDogs()
})

const url = 'http://localhost:3000/dogs'
let currentDog = {}

function getDogs() {
  fetch(url)
  .then(res => res.json())
  .then(resData => {
    createTable(resData)
    initEditForm()
  })
}

function createTable(resData){

  getElement('#table-body').innerHTML = ""
  
  resData.forEach(dog => {
    const tableBody = getElement('#table-body')
    const tr = createElement('tr')
    const tdName = createElement('td')
    const tdBreed = createElement('td')
    const tdSex = createElement('td')
    const tdButton = createElement('td')
    const buttonEdit = createElement('button')

    console.log(dog.name)
    tdName.textContent = dog.name
    tdBreed.textContent = dog.breed
    tdSex.textContent = dog.sex
    buttonEdit.textContent = 'Edit Dog'

    tdButton.append(buttonEdit)
    tr.append(tdName, tdBreed, tdSex, tdButton)
    tableBody.append(tr)

    buttonEdit.addEventListener('click', () => {editDog(dog)})
  })
}

function editDog(dog){

  currentDog = dog
  // initEditForm()
  const inputName = document.getElementsByName('name')[0] //getElement('input[name="name"]') 
  const inputBreed = document.getElementsByName('breed')[0]
  const inputSex = document.getElementsByName('sex')[0]

  inputName.value = dog.name
  inputBreed.value = dog.breed
  inputSex.value = dog.sex
}

function initEditForm(){
  
  const editForm = getElement('#dog-form')
  editForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const updateData = {name: e.target[0].value, breed: e.target[1].value, sex: e.target[2].value}

    fetchUpdate(currentDog.id, updateData)
    .then(resDog => {
      console.log(resDog)
      getDogs()
    })
  })
}

function getElement(el){
  return document.querySelector(el)
}

function createElement(el){
  return document.createElement(el)
}

function fetchUpdate(id, updateData){
  return fetch(url + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData)
  })
  .then(res => res.json())
}