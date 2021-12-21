import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import Yargs from "yargs";

const userPath = process.argv[2];
const option = Yargs(process.argv.slice(2)).argv;
const regEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;

const isMdFile = (fileToRead) => {
  const ext = path.extname(fileToRead.toLowerCase());
  if (ext === ".md") {
    return readUserFile(fileToRead);
  } else {
    console.log("Extensión del archivo incorrecto");
  }
};

const readUserFile = (readFile) => {
  try {
    if (fs.existsSync(readFile)) {
      const data = fs.readFileSync(readFile, {
        encoding: "utf8",
        flag: "r",
      });
      return readLinks(data);
    }
  } catch (err) {
    console.log(err);
  }
};

const readLinks = (file) => {
  const lines = file.split("\n");
  let allLinks = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const links = line.matchAll(regEx);
    const match = regEx.test(line);
    if (match) {
      for (const link of links) {
        const data = {
          text: link[1],
          href: link[2],
          file: userPath,
          line: i + 1,
        };
        allLinks.push(data);
      }
    }
  }
  return allLinks;
};

const validateLinks = (links) => {
  const validated = links.map((link) =>
    fetch(link.href).then((response) => {
      return {
        text: link.text,
        href: link.href,
        file: link.file,
        line: link.line,
        status: response.status,
        statusText: response.statusText,
      };
    })
  );
  return Promise.all(validated);
};

// const validate = true;
const mdLinks = (fileToRead) => {
  return new Promise((resolve, reject) => {
    const links = isMdFile(fileToRead);
    if (option.validate) {
      resolve(validateLinks(links));
    } else {
      resolve(links);
    }
    reject();
  });
};

mdLinks(userPath).then((results) => console.log(results));

export { mdLinks, readLinks, readUserFile, validateLinks, isMdFile };
