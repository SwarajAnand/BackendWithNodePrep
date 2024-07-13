import express from "express";
import { nanoid } from "nanoid";
import fs from "fs";

const app = express();

app.use(express.json());

const PORT = 8080;

app.post("/shorten", (req, res) => {
  // console.log(req.body.longUrl)
  const shortUrl = nanoid(5);
  const urlFile = fs.readFileSync("urls.json", { encoding: "utf-8" });
  const urlJson = JSON.parse(urlFile || "{}");
  // console.log(urlFile);

  urlJson[shortUrl] = req.body.longUrl;
  fs.writeFileSync("urls.json", JSON.stringify(urlJson));
  res.status(200).json({
    success: true,
    url: `http://localhost:8080/${shortUrl}`,
  });
});

app.get("/:shortLink", (req, res) => {
    const { shortLink } = req.params;
    const urlObj = fs.readFileSync("urls.json", { encoding: "utf-8" });
    const urlJson = JSON.parse(urlObj);
    const newUrl = urlJson[shortLink];

    // console.log(urlJson[shortLink]);
    // res.status(200).json({
    //     success: true,
    //     url: `http://localhost:8080/${req.params.shortLink}`,
    // })

    res.redirect(newUrl);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
