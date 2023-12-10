const questionJson = JSON.parse(localStorage.getItem("question"));
console.log(questionJson)
document.getElementById("question").textContent = questionJson.q;
document.getElementById("option1").textContent = questionJson.a;
document.getElementById("option2").textContent = questionJson.s1;
document.getElementById("option3").textContent = questionJson.s2;
document.getElementById("option4").textContent = questionJson.s3;

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', checkAndStoreRadioButton);

function checkAndStoreRadioButton() {
  const radioButtons = document.getElementsByName('answer');
  let selectedValue = null;

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      selectedValue = radioButtons[i].value;
      break;
    }
  }

  if (selectedValue !== null) {
    const storedValue = selectedValue;
    localStorage.setItem('storedValue', selectedValue);
    redirectToResult();
  } else {
    alert('ボタンが選択されていません。');
  }
}

function redirectToResult() {
    window.location.href = 'result.html';
  }
