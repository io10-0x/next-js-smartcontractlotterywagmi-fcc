const fs = require("fs");
const path = require("path");

function replaceAssetPaths(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      replaceAssetPaths(filepath);
    } else if (
      file.endsWith(".html") ||
      file.endsWith(".js") ||
      file.endsWith(".css")
    ) {
      let content = fs.readFileSync(filepath, "utf8");
      // Replace asset paths starting with '/_next' with './_next'
      content = content.replace(/(href|src)=["']\/_next\//g, '$1="./_next/');
      // Replace asset paths starting with '/' but not '/_next/' with './'
      content = content.replace(/(href|src)=["']\/(?!_next\/)/g, '$1="./');
      fs.writeFileSync(filepath, content, "utf8");
    }
  });
}

replaceAssetPaths(path.join(__dirname, "out"));
