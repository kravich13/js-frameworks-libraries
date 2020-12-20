// resAudio()

async function resAudio() {

    const response = await fetch("/", {
        method: "POST"
    })

    // 4) Получение и установка муз. файла
    const result = await response.blob()
    const headers = response.headers.get("AudioName")

    const $testSource = document.getElementById("test")
    const $audioName = document.getElementById("audioName")
    $audioName.textContent = headers
    $testSource.innerHTML = 
    `\n<source src=\"${URL.createObjectURL(result)}\" type=\"audio/mp3\">\n`
}

// async function reqFile (fileInfo) {
//     const response = await fetch("/", {method: "POST", body: fileInfo})
// }

// 5) Отправка файла и запись на сервер
const form = document.forms.formUserData
form[0].value = ""

form[1].addEventListener("click", async function (event) {
    event.preventDefault()

    if (!form[0].value) return


    
    const file = form[0].files[0]
    upload(file)

    // console.log(file)
    // console.log(file.name, file.lastModified, file.type)
    
    // const response = await fetch("/", {
    //     method: "POST", 
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         "File-Name": file.name
    //     },
    //     body: file
    // })

    form[0].value = ""
})

async function upload (file) {

    var xhr = new XMLHttpRequest();

    xhr.onload = xhr.onerror = function () {
        if (this.status == 200) {
            return console.log("Отправлено")
        } 
        
        return console.log(`error ${this.status}`);
    }

    // обработчик для отправки
    xhr.upload.onprogress = function (event) {
        console.log(`${event.loaded} / ${event.total}`)
    }

    xhr.open("POST", "/", true)
    // console.log(encodeURIComponent(file.name))
    // ломает загрузку больших файлов
    console.log(file.name)
    xhr.setRequestHeader("File-Name", encodeURIComponent(file.name)) 
    xhr.send(file)
}