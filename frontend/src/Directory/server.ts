import express from "express";
import path from "path";

const app = express();
const port = 5174;

app.use(
  "/images",
  express.static(path.join(__dirname, "public/webfonts/images")),
);

app.listen(port, () => {
  console.log(`Image server listening at http://localhost:${port}`);
});
//TODO: Need to modify server based on code specifications
/*TODO: Need to integrate this into directory card page for images to
appear instead of a blank grey box.*/
