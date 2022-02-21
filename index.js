let data = {
    'users': [
        {
            'name': "Roger",
            'passwordProtected': true,
            'password': 2711,
            'avatar': 'roger.jpeg'
        },
        {
            'name': "David",
            'passwordProtected': false,
            'avatar': 'david.png'
        },
        {
            'name': "Jane",
            'passwordProtected': true,
            'avatar': 'jane.jpg'
        },
    ]
}

let projectContainer = document.querySelector("#projectContainer")
let avatarContainer = document.querySelector("#avatars")
let passwordContainer = document.querySelector("#passwordContainer")
let catalogContainer = document.querySelector("#catalogContainer")
let editButton = document.querySelector("#editButton")
let cancelButton = document.querySelector("#cancelButton")
let topContainer = document.querySelector(".topContainer")
let whoText = document.querySelector("#whoText")
let pinText = document.querySelector("#pinText")
let divContainers = document.querySelector("#divContainers")
let inputPassword = document.querySelectorAll(".inputs")
let lastUserSelected = 0
let firstInput = document.querySelector("#input1")
let firstContainer = document.querySelector("#containerInput1")
let containers = document.querySelectorAll(".inputContainers")


function rewrite(users) {    
    avatarContainer.innerHTML = ""

   for (let i = 0; i < users.length; i++) {
        let div = document.createElement('div')
        let img = document.createElement('img')
        let nameDiv = document.createElement('div')
        let name = document.createTextNode(users[i].name)
        
        nameDiv.appendChild(name)
        img.src = users[i].avatar

        img.classList.add("avatarIcon")
        nameDiv.classList.add("avatarName")

        img.addEventListener('mouseover', () => {
            selected(img)
        })

        img.addEventListener('mouseout', () => {
            outSelected(img)
        })

        div.appendChild(img)
        div.appendChild(nameDiv)

        if (users[i].passwordProtected) {
            let lockpadDiv = document.createElement('div')
            let lockpadIcon = document.createElement('img')

            lockpadIcon.src = "lockpad.png"
            lockpadDiv.appendChild(lockpadIcon)
            lockpadDiv.classList.add("lockpadIcon")
            
            div.appendChild(lockpadDiv)
        }

        img.addEventListener('click', () => {
            next(i)
        })

       avatarContainer.appendChild(div)
   } 
}


function next(index) {
    if(data.users[index].passwordProtected){
        //cambio de container
        passwordContainer.classList.remove("hideContainer")
        editButton.classList.remove("visibleContainer")
        editButton.classList.add("hideContainer")
        cancelButton.classList.remove("hideContainer")
        whoText.classList.add("hideContainer")
        pinText.classList.remove("hideContainer")
        divContainers.classList.remove("hideContainer")

        let users = []
        lastUserSelected = index

        firstContainer.classList.add("selectedContainer")
        firstInput.focus() 

        users.push(data.users[index])
        rewrite(users)

    }else{
        catalogContainer.classList.remove("hideContainer")
        projectContainer.classList.add("hideContainer")
        topContainer.classList.add("hideContainer")
    }
}

function selected(image) {
    image.classList.add("borderSelected")
}

function outSelected(image) {
    image.classList.remove("borderSelected")
}

function cancelar() {
    projectContainer.classList.remove("hideContainer")

    passwordContainer.classList.remove("visibleContainer")
    passwordContainer.classList.add("hideContainer")

    cancelButton.classList.remove("visibleContainer")
    cancelButton.classList.add("hideContainer")

    editButton.classList.remove("hideContainer")

    whoText.classList.remove("hideContainer")

    pinText.classList.add("hideContainer")

    divContainers.classList.add("hideContainer")


    rewrite(data.users)
}

function inputNext(item) {
    let nextInput = document.querySelector("#input" + item)
    let nextContainer = document.querySelector("#containerInput" + item)
    nextContainer.classList.add("selectedContainer")

    control++ 

    nextInput.focus()
}

function validatePassword(password) {
    if (password == data.users[lastUserSelected].password) {
        catalogContainer.classList.remove("hideContainer")
        projectContainer.classList.add("hideContainer")
        topContainer.classList.add("hideContainer")
        divContainers.classList.add("hideContainer")
        pinText.classList.add("hideContainer")
    }else {
        let inputs = document.querySelectorAll(".inputs")

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ""
            containers[i].classList.add("wrongPassword")
        }
        firstInput.focus()
        control = 1
    }
}

let control = 1

rewrite(data.users)
cancelButton.addEventListener('click', cancelar)

for (let i = 1; i < 5; i++) {

    let input = document.querySelector("#input" + i)
    let container = document.querySelector("#containerInput" + i)

    input.addEventListener('keyup', () => {

        for (let j = 0; j < containers.length; j++) {
            containers[j].classList.remove("wrongPassword")
        }

        if (control < 4) {
            inputNext(i+1)
        }else{
            let inputsPasswords = document.querySelectorAll(".inputs")
            let password = ""

            for (let i = 0; i < 4; i++) {
                password = password + inputsPasswords[i].value
                
            }
            validatePassword(password)
        }

        container.classList.remove("selectedContainer")
    })

}


