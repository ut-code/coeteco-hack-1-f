import fs from "fs";

// images以下のファイル名の一覧を取得
export default function handler(request, response) {
  fs.readdir("public/images", (err, files) => {
    response.status(200).json(files);
  })
}
