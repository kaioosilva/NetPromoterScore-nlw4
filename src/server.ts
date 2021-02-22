import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello World, NLW4" });
});

app.post("/", (request, response) => {
  return response.json({ message: "All data saved successfully!" });
});

app.listen(3333, () => console.log("Server is running!"));
