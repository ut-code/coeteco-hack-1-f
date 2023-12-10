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
