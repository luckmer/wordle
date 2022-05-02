import words from "../../../json/words.json"
import {globalData} from "../../constants";

class randomWordGenerator {
    readonly wordIndex = Math.floor(Math.random() * words.length)
    generateRandomWord = () => {
        globalData.secretWord = words[this.wordIndex]
    }
}

const randomWord = new randomWordGenerator()

export default randomWord