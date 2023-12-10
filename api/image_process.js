import OpenAI from "openai";
import fs from "fs";


export const handler = async (req) => {
  // console.log(req);
  const { base64Image, numberOfQuestion, difficultyOfQuestion } = JSON.parse(req.body);

  const openai = new OpenAI();
  /*const img = await fs.promises.readFile("images/kosobo.png"); // ←画像のファイル名
  let binary = "";
  for (var i = 0; i < img.length; i++) {
    binary += String.fromCharCode(img[i]);
  }
  const img64 = btoa(binary);*/
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: [
          // プロンプト
          {
            type: "text",
            text: "この画像の範囲内から4択式の問題を1つ作ってください。出力はJSONで{'q':問題文,'a':正解,'s1':誤った選択肢1,'s2':誤った選択肢2,'s3':誤った選択肢3}の形式で出力してください。",
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
  });
  console.log(response);
  console.log(response.choices[0]);
  const question = response.choices[0].message.content;
  const question2 = question.slice(question.indexOf("{"), question.lastIndexOf("}") + 1).replace("\n", "");
  console.log("question2=", question2);
  return {
    statusCode: 200,
    body: question2,
  };
};
