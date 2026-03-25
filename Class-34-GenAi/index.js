import { ChatMistralAI } from "@langchain/mistralai";
import "dotenv/config";
import * as readline from "readline/promises";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

while (true) {
  let userInput = await rl.question("You : ");
  if (userInput === "exit") {
    break;
  }
  const response = await model.invoke(userInput);
  console.log("AI : " + response.text);
}

// const question = await rl.question("Enter your prompt: ");
// const response = await model.invoke(question);

// console.log(response.text);

rl.close();
