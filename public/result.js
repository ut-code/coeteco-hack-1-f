// result.js
const questionJson = JSON.parse(localStorage.getItem("question"));
const numberOfQuestions = questionJson.length;

const questionsContainer = document.getElementById('questions-container');
questionsContainer.innerHTML = '';

function setupQuestions() {
    for (let i = 0; i < numberOfQuestions; i++) {
        const storedValue = localStorage.getItem('storedValue-' + (i + 1));
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('box', 'mb-5');

        const option1 = questionJson[i].a;
        const option2 = questionJson[i].s1;
        const option3 = questionJson[i].s2;
        const option4 = questionJson[i].s3;
        const answer = option1;

        const questionText = document.createElement('p');
        questionText.classList.add('title', 'is-4');
        questionText.textContent = questionJson[i].q;

        const answersContainer = document.createElement('div');
        answersContainer.classList.add('buttons', 'are-medium');

        // ここでdescriptionElementを作成
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('mt-3', 'has-text-centered');
        descriptionElement.id = 'description-' + (i + 1);

        for (let j = 1; j <= 4; j++) {
            const label = document.createElement('label');
            label.classList.add('button', 'is-light');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer-' + (i + 1);
            input.value = 'option' + j;

            const text = document.createTextNode('option ' + j);

            label.appendChild(input);
            label.appendChild(text);
            answersContainer.appendChild(label);

            // ラジオボタンの選択状態を設定
            if (input.value === storedValue) {
                input.checked = true;
            }

            // 選択されたラジオボタンに対する処理
            if (storedValue && input.checked) {
                input.disabled = true;
                label.style.backgroundColor = (storedValue === answer) ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)";
                label.style.borderRadius = '10px';

                // id="description"のtextContentを設定
                descriptionElement.style.fontSize = '20px';
                descriptionElement.innerHTML = (storedValue === option1.toString())
                    ? "正解！<br>" + questionJson[i].d
                    : "正解は " + option1 + "<br>" + questionJson[i].d;
            }
        }

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answersContainer);

        // descriptionElementを追加
        questionDiv.appendChild(descriptionElement);
        questionsContainer.appendChild(questionDiv);
    }
}

const redirectToHomeButton = document.getElementById('redirectToHome');
redirectToHomeButton.addEventListener('click', redirectToHome);

const regenerateQuestionButton = document.getElementById('regenerateQuestion');
regenerateQuestionButton.addEventListener('click', regenerateQuestion);

function redirectToHome() {
    window.location.href = 'index.html';
}

function regenerateQuestion() {
    window.location.href = 'form.html';
}

setupQuestions();
