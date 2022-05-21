import words from "../../../json/words.json";
import { globalData } from "../../constants";

class randomWordGenerator {
  readonly wordIndex = Math.floor(Math.random() * words.length);
  returnRandomWord = () => words[this.wordIndex];
  generateRandomWord = () => {
    globalData.secretWord = this.returnRandomWord();
  };
}

const randomWord = new randomWordGenerator();

export default randomWord;
