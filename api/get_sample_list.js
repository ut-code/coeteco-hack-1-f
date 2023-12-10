// import fs from "fs";

// images以下のファイル名の一覧を取得
export default function handler(request, response) {
  // fs.readdir("public/images", (err, files) => {
  //   response.status(200).json(files);
  // })
  response.status(200).json([
    "kosobo.png",
    "HighChe.jpeg",
    "HighEng.jpeg",
    "HighGeo.jpeg",
    "HighJap.jpeg",
    "HighMat.jpeg",
    "HighPhy.jpeg",
    "JuniEng.jpeg",
    "JuniJap.jpeg",
    "JuniMat.jpeg",
    "JuniSci.jpeg",
    "Junisoc.png",
    "UnivMat.jpeg",
  ]);
};
