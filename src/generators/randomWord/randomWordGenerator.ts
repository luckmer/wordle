import words from "../../../json/words.json";
import { globalData } from "../../constants/globalData";

class randomWordGenerator {
  returnRandomWord = () => {
    const wordIndex = Math.floor(Math.random() * words.length);
    return words[wordIndex];
  };
  generateRandomWord = () => {
    globalData.secretWord = this.returnRandomWord();
  };
}

const randomWord = new randomWordGenerator();

export default randomWord;
