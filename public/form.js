// 
// JavaScriptファイル
const questionJson = JSON.parse(localStorage.getItem("question"));
console.log(questionJson)
for(let i = 0; i < questionJson.length; i++){
  // 1問ごとの問題文と解答
  document.getElementById("question").textContent = questionJson[i].q;
  document.getElementById("option1").textContent = questionJson[i].a;
  document.getElementById("option2").textContent = questionJson[i].s1;
  document.getElementById("option3").textContent = questionJson[i].s2;
  document.getElementById("option4").textContent = questionJson[i].s3;
}

const numberOfQuestions = questionJson.length; 
const questionsContainer = document.getElementById('questions-container');
const submitButton = document.getElementById('submit');
questionsContainer.innerHTML = '';

function setupQuestions() {
    for (let i = 0; i < questionJson.length; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('div');
        questionText.id = 'question-' + (i + 1);
        questionText.textContent = questionJson[i].q;

        const answersContainer = document.createElement('div');
        answersContainer.id = 'answers-' + (i + 1);

        for (let j = 1; j <= 4; j++) {
            const label = document.createElement('label');
            label.classList.add('radio');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer-' + (i + 1);
            input.value = 'option' + j;

            const text = document.createTextNode(questionJson[i]['s' + j]);

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
                alert('全ての問題に回答しました。');
                redirectToIndex2(); 
            }
        } else {
            alert('ボタンが選択されていません。');
            return; 
        }
    }
}

function checkAndStoreRadioButton() {
    for (let i = 1; i <= questionJson.length; i++) {
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

            if (i === questionJson.length) {
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

// const questionJson = JSON.parse(localStorage.getItem("question"));
// console.log(questionJson)
// for(let i = 0; i < questionJson.length; i++){
//   // 1問ごとの問題文と解答
//   document.getElementById("question").textContent = questionJson[i].q;
//   document.getElementById("option1").textContent = questionJson[i].a;
//   document.getElementById("option2").textContent = questionJson[i].s1;
//   document.getElementById("option3").textContent = questionJson[i].s2;
//   document.getElementById("option4").textContent = questionJson[i].s3;
// }

// const numberOfQuestions = questionJson.length; 
// console.log(numberOfQuestions)
// const questionsContainer = document.getElementById('questions-container');
// const submitButton = document.getElementById('submit');
// questionsContainer.innerHTML = '';

// function setupQuestions() {

//     for (let i = 1; i <= numberOfQuestions; i++) {
//         const questionDiv = document.createElement('div');
//         questionDiv.classList.add('question');

//         const questionText = document.createElement('div');
//         questionText.id = 'question-' + i;
//         questionText.textContent = 'Question ' + i;

//         const answersContainer = document.createElement('div');
//         answersContainer.id = 'answers-' + i;

//         for (let j = 1; j <= 4; j++) {
//             const label = document.createElement('label');
//             label.classList.add('radio');

//             const input = document.createElement('input');
//             input.type = 'radio';
//             input.name = 'answer-' + i;
//             input.value = 'option' + j;

//             const text = document.createTextNode('option ' + j);

//             label.appendChild(input);
//             label.appendChild(text);
//             answersContainer.appendChild(label);
//         }

//         questionDiv.appendChild(questionText);
//         questionDiv.appendChild(answersContainer);
//         questionsContainer.appendChild(questionDiv);
//     }

//     submitButton.removeEventListener('click', checkAndStoreRadioButton);
//     submitButton.addEventListener('click', checkAndStoreRadioButton);
// }

// function checkAndStoreRadioButton() {
//     for (let i = 1; i <= numberOfQuestions; i++) {
//         const radioButtons = document.getElementsByName('answer-' + i);
//         let selectedValue = null;

//         for (let j = 0; j < radioButtons.length; j++) {
//             if (radioButtons[j].checked) {
//                 selectedValue = radioButtons[j].value;
//                 break;
//             }
//         }

//         if (selectedValue !== null) {
//             const storedValue = selectedValue;
//             localStorage.setItem('storedValue-' + i, storedValue);

//             if (i === numberOfQuestions) {
//                 alert('全ての問題に回答しました。');
//                 redirectToIndex2(); 
//             }
//         } else {
//             alert('ボタンが選択されていません。');
//             return; 
//         }
//     }
// }

// setupQuestions();

// function redirectToIndex2() {
//     window.location.href = 'result.html';
// }