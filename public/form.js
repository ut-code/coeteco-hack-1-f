const questionJson = JSON.parse(localStorage.getItem("question"));
console.log(questionJson)

const numberOfQuestions = questionJson.length; 
const questionsContainer = document.getElementById('questions-container');
const submitButton = document.getElementById('submit');
questionsContainer.innerHTML = '';

for(let i = 0; i < numberOfQuestions; i++){
  // 1問ごとの問題文と解答
  document.getElementById("question").textContent = questionJson[i].q;
  document.getElementById("option1").textContent = questionJson[i].a;
  document.getElementById("option2").textContent = questionJson[i].s1;
  document.getElementById("option3").textContent = questionJson[i].s2;
  document.getElementById("option4").textContent = questionJson[i].s3;
}

function setupQuestions() {
  for (let i = 1; i <= numberOfQuestions; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('div');
        questionText.id = 'question-' + i;
        questionText.textContent = 'Question ' + i;

        const answersContainer = document.createElement('div');
        answersContainer.id = 'answers-' + i;

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
        }

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answersContainer);
        questionsContainer.appendChild(questionDiv);
    }

    submitButton.removeEventListener('click', checkAndStoreRadioButton);
    submitButton.addEventListener('click', checkAndStoreRadioButton);
}

function checkAndStoreRadioButton() {
    for (let i = 1; i <= numberOfQuestions; i++) {
        const radioButtons = document.getElementsByName('answer-' + i);
        let selectedValue = null;

        for (let j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].checked) {
                selectedValue = radioButtons[j].value;
                break;
            }
        }

        if (selectedValue !== null) {
            const storedValue = selectedValue;
            localStorage.setItem('storedValue-' + i, storedValue);

            if (i === numberOfQuestions) {
                redirectToResult(); 
            }
        } else {
            alert('ボタンが選択されていません。');
            return; 
        }
    }
}

setupQuestions();

function redirectToResult() {
    window.location.href = 'result.html';
}
