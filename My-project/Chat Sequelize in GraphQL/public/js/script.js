const socket = io()
const $navUsers = document.getElementById("countUsers")
const $chatWindow = document.getElementById("chat")
const $addRoom = document.getElementById("addRoom")
const $allRooms = document.getElementById("allRooms")
let $rooms = document.getElementsByClassName("rooms")
const $navNameRoom = document.getElementById("whatChat")
const $exit = document.getElementById("testqq")
$exit.hidden = true



const arrRooms = []
let lastElement
let currentElement
let deleteNameRoom = ""

const $form = document.forms.formUserData
const name = $form.elements.userName
const message = $form.elements.userMessage
const file = $form.elements.userFile


// отрисовать все комнаты и переписку из начальной комнаты
all()

async function all () {

  try {
    const result = await run("713dbhqpo666")
  
    const arrShowTables = result.data.allRoom
    const arrHistoryMessages = result.data.getRoom
    const strTransferredRoom = result.data.urlAdress
  
    // Отрисовка всех комнат
    arrShowTables.forEach(elem => {
      domRenderingRooms(elem)
    })
    
    // Подсветка комнат
    if (!strTransferredRoom) roomAllocation(0)
    else {
      for (let i = 0; i < arrShowTables.length; i++) {
        if (strTransferredRoom === $rooms[i].textContent) {
          roomAllocation(i)
        }
      }
    }
    
    // Отрисовка сообщений текущей первой комнаты    
    arrHistoryMessages.forEach(elem => {
      domRenderingMessages(elem)
    })
    $chatWindow.scrollBy(0, chat.scrollHeight)
    
  
    changeUrl(lastElement.textContent, `?nameRoom=${lastElement.textContent}`)
    document.title = lastElement.textContent

  } catch (err) { 
    changeUrl("Error", "/rooms")
    location.reload()
  }
}

async function run (currentRoom, allRoomFalse = true, urlAdressFalse = true) {

  const query = `query test(
    $nameRoom: String!
    $allRoom: Boolean!
    $urlAdress: Boolean!
    ) {
    getRoom(nameRoom: $nameRoom) {
      id
      user
      message
      createdAt
    },
    allRoom @include (if: $allRoom)
    urlAdress @include (if: $urlAdress)
  }`

  try {
    const res = await fetch('/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { 
            nameRoom: currentRoom, 
            allRoom: allRoomFalse, 
            urlAdress: urlAdressFalse}
        })
      })
      
    return res.json()
  } catch (err) { 
    console.log(`Ошибка запроса: ${err}`) 
  }
}


function domRenderingRooms (room) {
  const $p = document.createElement("p")
  $p.className = "rooms"
  $p.textContent = room
  arrRooms.push($p)
  $allRooms.append($p)
}

function roomAllocation (numb) {
  $rooms[numb].style.backgroundColor = "darkcyan"
  $rooms[numb].flagTable = true
  lastElement = $rooms[numb]
  currentElement = $rooms[numb].textContent
  $navNameRoom.textContent = `| ${currentElement}`
}


let testDate = ""

function domRenderingMessages (data, scrollTrue = false) {
  const date = new Date(data.createdAt)


  // Валидация даты
  let hours = date.getHours()
  let minutes = date.getMinutes()

  if (hours < 10) hours = `0${hours}`
  if (minutes < 10) minutes = `0${minutes}`

  const currentTime = `${hours}:${minutes}`
  let finallyDate = date.toLocaleString('en', {       
    month: 'long'       
  });
  

  // Отображение самой даты
  finallyDate = `${date.getDate()} ${finallyDate} ${date.getFullYear()}`

  if (testDate != finallyDate) {

    const $p = document.createElement("p")
    const $span = document.createElement("span")
    const $br = document.createElement("br")
    $p.id = "historyDate"
    $span.id = "dateColor"
    $span.textContent = finallyDate

    $p.append($span)
    $chatWindow.append($p)
    $chatWindow.append($br)
  }
  testDate = finallyDate


  // Отображение самих сообщений
  const $div = document.createElement("div")
  let $p = document.createElement("p")
  const $br = document.createElement("br")
  $p.textContent = `${data.user}: ${data.message} `
  $div.append($p)

  $p = document.createElement("p")
  $p.textContent = currentTime
  $p.id = "dataTime"
  $div.append($p)

  $chatWindow.append($div)
  $chatWindow.append($br)

  if (scrollTrue) $chatWindow.scrollBy(0, chat.scrollHeight)
}


// изменение адреса url
function changeUrl (title, url) {
  if (typeof (history.pushState) != undefined) {

      const obj = { Title: title, Url: url }
      history.pushState(obj, obj.Title, obj.Url)
      return 
  }
  return console.log("Не поддерживается")
}

// // если есть новое сообщение, проверить, из этой ли оно комнаты
socket.on("lastMessage", function (data) {
  if (currentElement === data[1]) return domRenderingMessages(data[0], true)
})


// кол-во пользователей онлайн
socket.on("numberOfUsers", function (count) {
  $navUsers.innerHTML = `${count} online |`
})


// если добавили новую комнату - отрисовать
socket.on("newRoom", function (talbeName) {
  domRenderingRooms(talbeName)
})


// если удалили комнату 
socket.on("deleteLastRoom", async function (nameRoom) {

  $rooms[$rooms.length - 1].remove()
  $exit.hidden = true

  
  const result = await run(arrRooms[0].textContent, false, false)
  
  roomAllocation(0)
  
  result.data.getRoom.forEach(elem => {
    domRenderingMessages(elem)
  })

  changeUrl(lastElement.textContent, `?nameRoom=${arrRooms[0].textContent}`)
  document.title = arrRooms[0].textContent
  $navNameRoom.textContent = `| ${arrRooms[0].textContent}`
})


$form[3].addEventListener("click", function (event) {
  event.preventDefault()

  if (name.value != "" && message.value != "") {
      console.log(file.value)
      socket.emit("addMessage", {name: name.value, message: message.value}, currentElement)
      return message.value = ""
  }
})

document.body.addEventListener("change", function (event) {
  const et = event.target

  if (et === file) {

    const arraysBuffers = []

    for (let key of et.files) {
      // console.log(key)

      let fileReader = new FileReader()

      fileReader.readAsArrayBuffer(key)
  
      fileReader.onload = function () {
        arraysBuffers.push(fileReader.result)
      }
    }
  }
})


document.body.addEventListener("click", async function (event) {
  const et = event.target
  
  
  // если тыкнул на комнату из массива
  if (et.classList.contains("rooms")) {     
    event.preventDefault()

      // Если та же самая комната - выход
      if (et.flagTable) return lastElement = et


      lastElement.style.backgroundColor = ""
      lastElement.flagTable = false
      et.flagTable = true
      et.style.backgroundColor = "darkcyan"
      lastElement = et
      currentElement = et.textContent
      $navNameRoom.textContent = `| ${et.textContent}`
      $chatWindow.innerHTML = ""


      const result = await run(et.textContent, false, false)

      result.data.getRoom.forEach(elem => {
          domRenderingMessages(elem)
      })
      $chatWindow.scrollBy(0, chat.scrollHeight)

      changeUrl(et.textContent, `?nameRoom=${et.textContent}`)
      document.title = et.textContent
  }

  // Если нажал "удалить" - послать на серв
  if (et.id === "testqq") {
    socket.emit("deleteRoom", deleteNameRoom)
  }
})


$addRoom.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    const et = event.target

    if (et.value === "") return et.placeholder = "Пустая строка"  
    if (et.value.length < 3 || et.value.length > 32) {
      et.value = ""
      return et.placeholder = "От 3-х до 32-х символов"
    }

    const regexp = /[/.,\|"'`=@#]/gi
    const regexpArr = et.value.match(regexp)
    if (regexpArr) {
      et.value = ""
      return et.placeholder = `Запрещены: /.,\|"'=@#`
    }

    for (let key of arrRooms) {
      if (et.value === key.textContent) {
        et.value = ""
        return et.placeholder = "Такая комната существует"
      }
    }

    // Отправить на серв данные о новой комнате с указанным именем
    socket.emit("addRoom", et.value)
    et.value = ""
    et.placeholder = "Название и Enter"
  }
})

document.body.addEventListener("mouseover", function (event) {
  const et = event.target
  
  if (et.classList.contains("rooms")) { 
    event.preventDefault()
    $exit.hidden = false
    $exit.style.top = `${et.offsetTop}px`
    $exit.style.left = `${((et.offsetLeft + et.offsetWidth) - $exit.offsetWidth)}px`
    
    deleteNameRoom = et.textContent

    if (et.style.backgroundColor === "darkcyan") return
    et.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
  }
})

document.body.addEventListener("mouseout", function (event) {
  const et = event.target
  
  if (et.classList.contains("rooms")) {
    event.preventDefault()
    
    if (et.style.backgroundColor === "darkcyan") return deleteNameRoom = et.textContent
    $exit.hidden = true
    et.style.backgroundColor = ""
  }
})