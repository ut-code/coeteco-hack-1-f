import OpenAI from "openai";
import fs from "fs";

export const handler = async () => {
	const openai = new OpenAI();
	const img = await fs.promises.readFile("images/kosobo.png");  // ←画像のファイル名
	let binary = "";
	for (var i = 0; i < img.length; i++) {
		binary += String.fromCharCode(img[i]);
	}
	const img64 = btoa(binary);
	const response = await openai.chat.completions.create({
		model: "gpt-4-vision-preview",
		max_tokens: 300,
		messages: [
			{
				role: "user",
				content: [ // プロンプト
					{ type: "text", text: "この画像の範囲内から4択式の問題を1つ作ってください。" },
					{
						type: "image_url",
						image_url: {
							"url": `data:image/png;base64,${img64}`,
						},
					},
				],
			},
		],
	});
	console.log(response);
	return {
		statusCode: 200,
		body: JSON.stringify(response.choices[0].message.content)
	};
}