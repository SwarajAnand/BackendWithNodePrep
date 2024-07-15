import express from "express";
import { nanoid } from "nanoid";
import fs from "fs";
import cors from 'cors';
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(cors());

const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

app.post("/", (req, res) => {
  // console.log(req.body.longUrl)
  const isValidUrl = isUrlValid(req.body.longUrl);
  if (!isValidUrl) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid longUrl",
    });
  }

  const shortUrl = nanoid(5);
  const urlFile = fs.readFileSync("urls.json", { encoding: "utf-8" });
  const urlJson = JSON.parse(urlFile || "{}");
  // console.log(urlFile);

  urlJson[shortUrl] = req.body.longUrl;
  fs.writeFileSync("urls.json", JSON.stringify(urlJson));
  res.status(200).json({
    success: true,
    url: `https://backendwithnodeprep.onrender.com/${shortUrl}`,
  });
});

app.get("/:shortLink", (req, res) => {
  const { shortLink } = req.params;
  const urlObj = fs.readFileSync("urls.json", { encoding: "utf-8" });
  const urlJson = JSON.parse(urlObj);
  const newUrl = urlJson[shortLink];

  if (!newUrl) {
    return res.end("Invalid Short Url");
  }

  // console.log(urlJson[shortLink]);
  // res.status(200).json({
  //     success: true,
  //     url: `http://localhost:8080/${req.params.shortLink}`,
  // })

  res.redirect(newUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
