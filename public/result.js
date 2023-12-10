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

      radioButtons[i].closest('label').style.backgroundColor = (storedValue === answer) ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)";
      radioButtons[i].closest('label').style.borderRadius = '10px';      

      // id="description"のtextContentを設定
      descriptionElement.style.fontSize = '30px';
      descriptionElement.innerHTML = (storedValue === answer.toString())
      ? "正解！<br>" + description
      : "正解は " + answer + "<br>" + description;

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