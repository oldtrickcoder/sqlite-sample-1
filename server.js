const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const PORT = 1818;

const morgan = require("morgan");
const { SERIALIZE, InsertData, GetAllData } = require("./controller");
app.use(express.json());
app.use(morgan("tiny"));

// parse application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(BodyParser.json());
app.get("/", (req, res) => {
  res.status(200).json({ mesg: "SQLITE3 API SAMPLE" });
});
app.get("/test", (req, res) => {
  SERIALIZE();
  res.status(200).json({ mesg: "SQLITE3 API SAMPLE test" });
});
app.post("/InsertData", (req, res) => {
  console.log(req.body, "from Server");
  InsertData(req.body);
  res.status(200).json({ mesg: "Data Successfully Inserted...." });
});
app.get("/AllData", GetAllData);

app.listen(PORT, () => {
  console.log(`Server Listen at Port ${PORT}`);
});
