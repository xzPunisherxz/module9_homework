// Задание 5.
//
// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
//
//     Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
//
//     Если число в первом input не попадает в диапазон от 1 до 10 или не является числом —
// выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом —
// выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже
// текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10,
// // где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
//     Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
//     После получения данных вывести список картинок на экран.
//
//     Если пользователь перезагрузил страницу, то ему должны показываться картинки из
// последнего успешно выполненного запроса (использовать localStorage).

function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {

        const result = JSON.parse(xhr.response);
        const lastSuccess = localStorage.setItem('myJSON', xhr.response);
        if (callback) {
            callback(result);
        }
    };
    xhr.send();
};

const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');
function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
    const userPage = document.getElementById('userPage').value;
    const userLim = document.getElementById('userLim').value;
    if ((userPage < 1 || userPage > 10) && (userLim < 1 || userLim > 10)){
        resultNode.innerHTML = "<p>Номер страницы и лимит вне диапазона от 1 до 10<p>"
    } else if(userPage < 1 || userPage > 10){
        resultNode.innerHTML = "<p>Номер страницы вне диапазона от 1 до 10<p>"
    } else if(userLim < 1 || userLim > 10){
        resultNode.innerHTML = "<p>Лимит вне диапазона от 1 до 10<p>"
    }else{
        useRequest(`https://picsum.photos/v2/list?page=${userPage}&limit=${userLim}`, displayResult);
    }
});

window.onload = function() {
    let lastSuccess = localStorage.getItem("myJSON");
    if (lastSuccess !== null) {
        displayResult(JSON.parse(lastSuccess));
    }
};