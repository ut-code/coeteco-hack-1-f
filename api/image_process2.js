import OpenAI from "openai";
// import fs from "fs";

export default async function handler(request, response) {
  // console.log(req);
  const { base64Image, question } = JSON.parse(request.body);

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
              text: `この画像をもとに生成した問題「${question}」に対して詳しい文章で解説をして下さい。`,
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
      answer = openAIResponse.choices[0].message.content;
      response.status(200).send(answer);
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
