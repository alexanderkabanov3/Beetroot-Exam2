const divRoot = document.getElementById('root');


const divContainer = document.createElement('div');
divContainer.classList.add('root__container');
divRoot.append(divContainer);

const h1 = document.createElement('h1');
h1.innerText = 'todolist';
h1.classList.add('root__heading');
divContainer.append(h1);

const divEnter = document.createElement('div');
divEnter.classList.add('root__enter');
divContainer.append(divEnter);

const input = document.createElement('input');
input.placeholder = 'what needs to be done?';
input.classList.add('root__input');
divEnter.append(input);

const divAdd = document.createElement('div');
divAdd.innerText = '+';
divAdd.classList.add('root__add');
divEnter.append(divAdd);

const divContent = document.createElement('div');
divContent.classList.add('root__content');
divContainer.append(divContent);

const divBottom = document.createElement('div');
divBottom.classList.add('root__bottom')
divContainer.append(divBottom);

const divProgress = document.createElement('div');
divProgress.classList.add('root__progress');
divBottom.append(divProgress);

const btn = document.createElement('button');
btn.classList.add('root__removedChecked');
btn.innerText = 'remove checked';
divBottom.append(btn);

const storageArr = [];
const getStorage = window.localStorage.getItem('data');
const parseStorage = JSON.parse(getStorage);

if (parseStorage !== null) {
    parseStorage.forEach(e => {
        createItem(e);
    })
}


divAdd.addEventListener('click', () => {
    const input = document.querySelector('.root__input').value;
   
    if (input !== '') {
        createItem(input);
        storageArr.push(input);
    }

    window.localStorage.setItem('data', JSON.stringify(storageArr));
});


function createItem(value) {
    const divItem = document.createElement('div');
    divItem.classList.add('root__item');
    const check = document.createElement('input');
    check.classList.add('root__checkbox');
    check.type = 'checkbox';
    const divText = document.createElement('div');
    divText.classList.add('root__text');
    divText.innerText = value;

    const divLeft = document.createElement('div');
    divLeft.classList.add('root__left');
    divLeft.append(check, divText);


    const divPencil = document.createElement('div');
    divPencil.classList.add('root__pencil');
    divPencil.innerHTML = '&#9998';
    const divDelete = document.createElement('div');
    divDelete.classList.add('root__delete');
    divDelete.innerHTML = '&#10005';
    const divRight = document.createElement('div');
    divRight.classList.add('root__left');
    divRight.append(divPencil, divDelete);


    divItem.append(divLeft, divRight);

    divContent.append(divItem);

    divDelete.addEventListener('click', () => {
        divItem.remove();
        const findIndex = storageArr.findIndex(i => i == divText.innerHTML)
        storageArr.splice(findIndex, 1);   
        window.localStorage.setItem('data', JSON.stringify(storageArr));

        getProgress();
    });


    divPencil.addEventListener('click', () => {
        const textDiv = divText.innerHTML;
        const input = document.createElement('input');
        input.value = textDiv;
        divText.replaceWith(input);
        divPencil.innerHTML = '&#10003';

        divPencil.addEventListener('click', () => {
            const inputChange = input.value;
            divText.innerHTML = inputChange;
            input.replaceWith(divText);
            divPencil.innerHTML = '&#9998';

            const findIndex = storageArr.findIndex(i => i == textDiv)
            storageArr.splice(findIndex, 1, inputChange);   
            window.localStorage.setItem('data', JSON.stringify(storageArr));

        });
    });

    check.addEventListener('click', () => {
        divText.classList.toggle('root__text--through');
        divItem.classList.toggle('item__remove');

        getChecks();
    })

    getProgress();
}

function getChecks() {
    const checked = document.querySelectorAll('.item__remove');

    getProgress()

    btn.addEventListener('click', () => {
        checked.forEach((e, i) => {
            if (e.classList.contains('item__remove')) {
                e.remove();
                let val = e.innerText.substring(0, e.innerText.length - 2);
                const findIndex = storageArr.findIndex(e => e == val)
                storageArr.splice(findIndex, 1);   
                window.localStorage.setItem('data', JSON.stringify(storageArr));
            }

            btn.style.display = 'none';

            getProgress();
      
        });

        

    })

    if (checked.length !== 0) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }

}

function getProgress() {
    const items = document.querySelectorAll('.root__item');
    const checked = document.querySelectorAll('.item__remove');

    let countCheck

    checked.forEach((val, i) => {
        countCheck = i + 1;
    });

    if (countCheck == undefined) {
        countCheck = 0;
    }

    let countAll

    items.forEach((val, i) => {
        countAll = i + 1;
    });

    divProgress.innerHTML = `${countCheck} of ${countAll} tasks done`
    divProgress.style.backgroundSize = `${100 / countAll * countCheck}% 100%`;
    

    if (items.length !== 0) {
        divProgress.style.display = 'block';
    } else {
        divProgress.style.display = 'none';
    }
}















