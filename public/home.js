// import fs from "fs";

const generateQuestionButtom = document.getElementById('generateQuestion');
generateQuestionButtom.addEventListener('click', goToQuestion);

function goToQuestion() {
    const files = document.getElementById("file").files;
    const checkBox = document.getElementById('checkbox').checked;
    // console.log(checkBox)
    if(files.length === 0 && checkBox === false){
        alert("ファイルをアップロードしてください")
    }else if(checkBox === true){
    }else{
        const FR = new FileReader();    
        FR.addEventListener("load", goToQuestion2)
        FR.readAsDataURL(files[0]);
    }
}
function goToQuestion2(FREvent){
    const base64Image = FREvent.target.result; // "data:image/png;..." がかえってくる
    // console.log(base64Image)

    const numberOfQuestion = document.getElementById('number-of-problems').value;
    const difficultyOfQuestion = document.getElementById('difficulty').value;

    if(numberOfQuestion !== ""){
        localStorage.setItem('base64Image', base64Image);
        localStorage.setItem('numberOfQuestion', numberOfQuestion);
        localStorage.setItem('difficultyOfQuestion', difficultyOfQuestion);
        
        fetch("/.netlify/functions/image_process", {
            method: "post",
            body: JSON.stringify({
                base64Image,
                numberOfQuestion,
                difficultyOfQuestion,
            })
        }).then(async (result) => {
            // const
            const question = await result.text();
            console.log(question)
            localStorage.setItem('question', question);
            window.location.href = 'form.html';
        })
    }else{
        alert('問題数を選択してください');
    }
}