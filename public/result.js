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

        const options = JSON.parse(localStorage.getItem(`options-${i}`));
        console.log(options)
        const answer = questionJson[i].a;

        const questionText = document.createElement('p');
        questionText.classList.add('title', 'is-4');
        questionText.textContent = questionJson[i].q;

        const answersContainer = document.createElement('div');
        answersContainer.classList.add('buttons', 'are-medium');
        answersContainer.style.marginBottom = "20px"; // でっちあげ

        // ここでdescriptionElementを作成
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('mt-3', 'has-text-centered');
        descriptionElement.id = 'description-' + (i + 1);

        for (let j = 1; j <= 4; j++) {
            const label = document.createElement('label');
            label.classList.add('button', 'is-light');
            label.style.marginBottom = "-15px";

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer-' + (i + 1);
            input.value = options[j - 1];
             input.disabled = true;

            const text = document.createTextNode(options[j - 1]);

            label.appendChild(input);
            label.appendChild(text);
            answersContainer.appendChild(label);

            // ラジオボタンの選択状態を設定
            if (input.value === storedValue) {
                input.checked = true;
            }
            console.log(storedValue)
            // 選択されたラジオボタンに対する処理
            if (storedValue && input.checked) {
               
                label.style.backgroundColor = (storedValue === answer) ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)";
                label.style.borderRadius = '10px';

                
                // id="description"のtextContentを設定
                descriptionElement.style.fontSize = '20px';
                descriptionElement.innerHTML = (storedValue === option1.toString())
                    ? "正解！<br>" + questionJson[i].d
                    : "正解は " + option1;
            }
        }
        const nextQuestionButton = document.createElement('button');
        nextQuestionButton.classList.add('button', 'is-primary', 'mt-3');
        nextQuestionButton.textContent = '解説';
        nextQuestionButton.addEventListener('click', function() {
            nextQuestionButton.textContent = "解説で〜す";
        });
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answersContainer);

        // descriptionElementを追加
        questionDiv.appendChild(descriptionElement);
        questionDiv.appendChild(nextQuestionButton);
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
