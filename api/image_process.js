import OpenAI from "openai";
// import fs from "fs";

export default async function handler(request, response) {
  // console.log(req);
  const { base64Image, numberOfQuestion, difficultyOfQuestion } = JSON.parse(
    request.body
  );

  const openai = new OpenAI();
  /*const img = await fs.promises.readFile("images/kosobo.png"); // ←画像のファイル名
  let binary = "";
  for (var i = 0; i < img.length; i++) {
    binary += String.fromCharCode(img[i]);
  }
  const img64 = btoa(binary);*/
  openai.chat.completions
    .create({
      model: "gpt-4-vision-preview",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            // プロンプト
            {
              type: "text",
              text: `この画像の範囲内から4択式の問題を${numberOfQuestion}つ作ってください。問題は画像を見なくても答えられるものにして下さい。出力はJSONで{'q':問題文,'a':正解,'s1':誤った選択肢1,'s2':誤った選択肢2,'s3':誤った選択肢3}のArrayの形式で出力してください。`,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image, //`data:image/png;base64,${img64}`,
              },
            },
          ],
        },
      ],
    })
    .then((openAIResponse) => {
      console.log(openAIResponse);
      console.log(openAIResponse.choices[0]);
      const question = openAIResponse.choices[0].message.content;
      const question2 = question
        .slice(question.indexOf("["), question.lastIndexOf("]") + 1)
        .replace("\n", "");
      if(question2 !== ""){
        console.log("question2=", question2);
        response.status(200).send(question2);
      }else{
        response.status(500).send(question); // AIがJSON以外の出力をした場合エラーメッセージとして返す
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.error.message == "Invalid image.") {
        response.status(500).send("画像の読み込みに失敗しました。");
      } else {
        response.status(500).send(error.error.message);
      }
    });
}
