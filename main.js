import { exec, execSync } from "child_process";

const OUT_DIR = "out";

const main = () => {
  // 第一引数を取得
  if (process.argv.length < 3) {
    console.log("第一引数にファイル名を指定してください");
    return;
  }
  const args = process.argv[2];

  // ファイルの存在確認
  let fileNamePart
  try {
    const ls = execSync(`ls ${args}`);
    fileNamePart = args.split("/").pop().split(".")[0];
  } catch (error) {
    console.log("ファイルが存在しません");
    return;
  }

  try{
    execSync(`whisper ${args} --model large --language Japanese --output_dir ${OUT_DIR}`);
  } catch (error) {
    console.log("変換に失敗しました");
    return;
  }

  // textファイルの読み込み
  const text = execSync(`cat ${OUT_DIR}/${fileNamePart}.txt`).toString();
  console.log({text});
};

main();