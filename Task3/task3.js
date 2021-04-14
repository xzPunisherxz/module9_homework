// Задание 3.
//
// Напишите код приложения, интерфейс которого представляет собой input и кнопку.
//     В input можно ввести любое число. При клике на кнопку происходит следующее:
//
//     Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 —
// сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10,
// // где get-параметр limit — это введённое число.
//     После получения данных вывести ниже картинки на экран.

let button=document.querySelector('.btn')
button.addEventListener('click',getInput)


function getInput(){
    let valueInput = document.querySelector('input').value
    let numberInput = Number(valueInput)
    if(numberInput<1 || numberInput>10 ){
        console.log(`число вне диапазона от 1 до 10`)
        return

    }
    const xhr = new XMLHttpRequest()
    const request = `https://picsum.photos/v2/list?limit=${valueInput}`
    xhr.open('GET',request)
    xhr.responseType= 'json'
    xhr.onload= () => {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status)
        }
        xhr.response.forEach(element => {
            let imageInner = document.getElementById('image-container')
            let img = document.createElement('IMG')
            img.setAttribute("id", "idOne")
            let br = document.createElement('BR')
            img.src = element.download_url
            imageInner.appendChild(img)
            imageInner.appendChild(br)

        });


    }
    xhr.onerror = () =>{
        console.log('Ошибка! Статус ответа: ', xhr.status);
    }
    xhr.send()

}