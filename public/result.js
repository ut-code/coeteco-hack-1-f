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

        const questionNumber = document.createElement('p');
        questionNumber.classList.add('title', 'is-4');
        questionNumber.textContent = `Q ${i + 1}`;

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
            // 選択されたラジオボタンに対する処理
            if (storedValue && input.checked) {
               
                label.style.backgroundColor = (storedValue === answer) ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)";
                label.style.borderRadius = '10px';

                
                // id="description"のtextContentを設定
                descriptionElement.style.fontSize = '20px';
                descriptionElement.innerHTML = (storedValue === answer.toString())
                    ? "正解！"
                    : "正解は " + answer;
            }
        }
        const nextQuestionButton = document.createElement('button');
        const descriptionDiv = document.createElement("div"); // 解説
        nextQuestionButton.classList.add('button', 'is-primary', 'mt-3');
        nextQuestionButton.textContent = '解説';
        nextQuestionButton.addEventListener('click', function() {
            const base64Image = localStorage.getItem('base64Image');

            nextQuestionButton.classList.add("is-loading");
        
            fetch("/api/image_process2", {
                method: "post",
                body: JSON.stringify({
                    base64Image,
                    question: questionJson[i].q,
                })
            }).then(async (result) => {
                nextQuestionButton.classList.remove("is-loading");
                const description = await result.text();
                descriptionDiv.textContent = description;
            })
        });
        questionDiv.appendChild(questionNumber);
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answersContainer);

        // descriptionElementを追加
        questionDiv.appendChild(descriptionElement);
        questionDiv.appendChild(nextQuestionButton);
        questionDiv.appendChild(descriptionDiv);
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
