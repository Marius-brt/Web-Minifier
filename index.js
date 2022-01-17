const fs = require("fs");
const path = require("path");
const glob = require("glob");
const copy = require("copy-dir");
const minify = require("minify");

export function cli(args) {
  const buildPath = path.join(
    process.cwd(),
    `../${process.cwd().split("\\").pop()}-build`
  );
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
    copy(process.cwd(), buildPath, () => {
      glob(buildPath + "/**/*.{js,css,html}", {}, (err, files) => {
        files.forEach((el, i) => {
          minify(el, {
            html: {
              removeAttributeQuotes: false,
              removeOptionalTags: false,
            },
            css: {
              compatibility: "*",
            },
            js: {
              ecma: 5,
            },
          }).then((data) => {
            fs.writeFileSync(el, data);
            if (i == files.length - 1) {
              console.log("Done ! Your build is here: " + buildPath);
            }
          });
        });
      });
    });
  } else {
    fs.rmdir(buildPath, { recursive: true }, (err) => {
      if (err) throw err;
      fs.mkdirSync(buildPath);
      copy(process.cwd(), buildPath, () => {
        glob(buildPath + "/**/*.{js,css,html}", {}, (err, files) => {
          files.forEach((el, i) => {
            minify(el, {
              html: {
                removeAttributeQuotes: false,
                removeOptionalTags: false,
              },
              css: {
                compatibility: "*",
              },
              js: {
                ecma: 5,
              },
            }).then((data) => {
              fs.writeFileSync(el, data);
              if (i == files.length - 1) {
                console.log("Done ! Your build is here: " + buildPath);
              }
            });
          });
        });
      });
    });
  }
}
