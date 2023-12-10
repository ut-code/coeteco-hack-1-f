const storedValue = localStorage.getItem('storedValue');
const answer = "option1";
const description = "解説";
const radioButtons = document.getElementsByName('answer');
const descriptionElement = document.getElementById('description');

if (storedValue) {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].value === storedValue) {
      radioButtons[i].checked = true;
      
      for (let j = 0; j < radioButtons.length; j++) {
        radioButtons[j].disabled = true;
      }

    // ラジオボタンの親要素である label にスタイルを設定
      radioButtons[i].closest('label').style.backgroundColor = (storedValue === answer) ? "green" : "red";

      // id="description"のtextContentを設定
      descriptionElement.textContent = (storedValue === answer.toString())
        ? "正解！" + description
        : "正解は"+ answer + description;

      break;
    }
  }
}

const redirectToHomeButton = document.getElementById('redirectToHome');
redirectToHomeButton.addEventListener('click', redirectToHome);

const regenerateQuestionButton = document.getElementById('regenerateQuestion');
regenerateQuestionButton.addEventListener('click', regenerateQuestion);

function redirectToHome() {
  window.location.href = 'home.html';
}

function regenerateQuestion() {
  window.location.href = 'form.html';
}