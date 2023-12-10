const questionJson = JSON.parse(localStorage.getItem("question"));
const numberOfQuestions = questionJson.length;
//const answer = "option1";
//const description = "解説";
const questionsContainer = document.getElementById('questions-container');
questionsContainer.innerHTML = '';

function setupQuestions() {
    for (let i = 1; i <= numberOfQuestions; i++) {
        const storedValue = localStorage.getItem('storedValue-' + i);
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('div');
        questionText.id = 'question-' + i;
        questionText.textContent = questionJson[i].q;

        const answersContainer = document.createElement('div');
        answersContainer.id = 'answers-' + i;

        // ここでdescriptionElementを作成
        const descriptionElement = document.createElement('div');
        descriptionElement.id = 'description-' + i;

        for (let j = 1; j <= 4; j++) {
            const label = document.createElement('label');
            label.classList.add('radio');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer-' + i;
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
                descriptionElement.innerHTML = (storedValue === answer.toString())
                    ? "正解！<br>" + description
                    : "正解は " + answer + "<br>" + description;
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
