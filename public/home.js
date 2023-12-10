const generateQuestionButtom = document.getElementById('generateQuestion');
generateQuestionButtom.addEventListener('click', goToQuestion);

function goToQuestion() {
    const numberOfQuestion = document.getElementById('number-of-problems').value;
    const difficultyOfQuestion = document.getElementById('difficulty').value;
    if(numberOfQuestion !== ""){
        localStorage.setItem('numberOfQuestion', numberOfQuestion);
        localStorage.setItem('difficultyOfQuestion', difficultyOfQuestion);
        
        window.location.href = 'form.html';
    }else{
        alert('問題数を選択してください');
    }
}