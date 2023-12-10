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