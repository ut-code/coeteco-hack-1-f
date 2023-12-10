// form.js
const questionJson = JSON.parse(localStorage.getItem("question"));
const questionsContainer = document.getElementById('questions-container');
const submitButton = document.getElementById('submit');

function setupQuestions() {
    for (let i = 0; i < questionJson.length; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('box', 'mb-5');

        const questionText = document.createElement('p');
        questionText.classList.add('title', 'is-4');
        questionText.textContent = questionJson[i].q;

        const answersContainer = document.createElement('div');
        answersContainer.classList.add('buttons', 'are-medium');

        for (let j = 1; j <= 4; j++) {
            const label = document.createElement('label');
            label.classList.add('button', 'is-light');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer-' + (i + 1);
            input.value = 'option' + j;

            const text = document.createTextNode(questionJson[i]['s' + j]);

            const span = document.createElement('span');
            span.id = 'option' + j + '-' + (i + 1);

            label.appendChild(input);
            label.appendChild(span);
            label.appendChild(text);
            answersContainer.appendChild(label);
        }

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answersContainer);
        questionsContainer.appendChild(questionDiv);
    }

    submitButton.addEventListener('click', checkAndStoreRadioButton);
}

function checkAndStoreRadioButton() {
    for (let i = 0; i < questionJson.length; i++) {
        const radioButtons = document.getElementsByName('answer-' + (i + 1));
        let selectedValue = null;

        for (let j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].checked) {
                selectedValue = radioButtons[j].value;
                break;
            }
        }

        if (selectedValue !== null) {
            const storedValue = selectedValue;
            localStorage.setItem('storedValue-' + (i + 1), storedValue);

            if (i === questionJson.length - 1) {
                alert('全ての問題に回答しました。');
                redirectToResult();
            }
        } else {
            alert('ボタンが選択されていません。');
            return;
        }
    }
}

function redirectToResult() {
    window.location.href = 'result.html';
}

setupQuestions();
