// Задание 4.
//
// Напишите код приложения, интерфейс которого представляет собой input и кнопку.
//     В input можно ввести любое число. При клике на кнопку происходит следующее:
//
//     Если оба числа не попадают в диапазон от 100 до 300 или введено не число —
// выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch
// по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
//     Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
//     После получения данных вывести ниже картинку на экран.

const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');

btnNode.addEventListener('click', () => {
    const userWidth = document.getElementById('pic_width').value;
    const userHeight = document.getElementById('pic_height').value;
    if (userWidth < 100 || userWidth > 300 || userHeight < 100 || userHeight > 300){
        resultNode.innerHTML = "<span>Одно из чисел вне диапазона от 100 до 300</span>"
    }else {
        fetch(`https://picsum.photos/${userWidth}/${userHeight}`)
            .then((response) => {
                const cardBlock = `
      <div class="card">
        <img
          src="${response.url}"
          class="card-image"
        />
      </div>
    `;
                resultNode.innerHTML = cardBlock;
            })
            .catch(() => { console.log('error') });
    }
});