let base64Image = ""; // ←最終的にAIに送信する画像がここにはいる
const previewImg = document.getElementById("preview");

const generateQuestionButtom = document.getElementById('generateQuestion');
generateQuestionButtom.addEventListener('click', goToQuestion);

// サンプル画像の一覧を表示する
const sampleSelect = document.getElementById("sample-select");
sampleSelect.addEventListener("change", sampleChange);
fetch("/api/get_sample_list").then(async(result) => {
    const samples = await result.json();
    for(const s of samples){
        // sはそれぞれのファイル名
        const e = document.createElement("option");
        e.textContent = s;
        e.value = location.origin + "/images/" + s;
        sampleSelect.appendChild(e);
    }
});
// サンプルを選んだときの処理
function sampleChange(){
    base64Image = sampleSelect.value;
    previewImg.src = sampleSelect.value;
}

// ファイルをアップロードした時の処理
function displayFileName() {
    const fileInput = document.getElementById('file');
    const fileNameBox = document.querySelector('.file-label .file-label');
    
    if (fileInput.files.length > 0) {
        fileNameBox.textContent = fileInput.files[0].name;
    } else {
        fileNameBox.textContent = 'ファイルをアップロード';
    }

    base64Image = "";
    previewImg.src = "";

    const FR = new FileReader();    
    FR.addEventListener("load", (FREvent) => {
        previewImg.src = FREvent.target.result;
        base64Image = FREvent.target.result;
    });
    FR.readAsDataURL(fileInput.files[0]);
}

function goToQuestion() {
    // console.log(checkBox)
    if(base64Image == ""){
        alert("ファイルをアップロードしてください")
    }

    const numberOfQuestion = document.getElementById('number-of-problems').value;
    const difficultyOfQuestion = document.getElementById('difficulty').value;

    if(numberOfQuestion !== ""){
        localStorage.setItem('base64Image', base64Image);
        localStorage.setItem('numberOfQuestion', numberOfQuestion);
        localStorage.setItem('difficultyOfQuestion', difficultyOfQuestion);
        
        fetch("/api/image_process", {
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