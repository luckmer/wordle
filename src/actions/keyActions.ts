import {globalData, guessRows} from "../constants";
import wordColorsClass from "../tileAnimations/tileAnimations";
import dictionary from "../../json/dictionary.json"
import localStoragePanel from "../localStorage/localStorage";
import randomWord from "../generators/randomWord/randomWordGenerator";
import tileAnimationsClass from "../tileAnimations/tileAnimations";
import {tileAnimation} from "../tileAnimations/tileAnimations";


class keyActionsClass extends wordColorsClass {

    handleClickRoot = (e: MouseEvent) => {
        const letter = (e.target as HTMLTextAreaElement).textContent as string;
        switch (letter) {
            case  '«' : {
                ``
                this.handleClear();
                break;
            }
            case 'ENTER' : {
                this.handleSubmit();
                break;
            }
            default: {
                this.handleClick(letter);
                break;
            }
        }
    }

    handleClick = (letter: string) => {
        if (globalData.gameRowIndex >= 5) return
        const tile = document.getElementById(`${globalData.rowIndex}.${globalData.gameRowIndex}`) as Element;
        tile.textContent = letter;
        globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] = letter;
        globalData.gameRowIndex++
        localStoragePanel.saveArrayOfWords()

    }

    handleClear = () => {
        if (globalData.gameRowIndex <= 0) return
        globalData.gameRowIndex--
        const tile = document.getElementById(`${globalData.rowIndex}.${globalData.gameRowIndex}`) as Element;
        tile.textContent = '';
        globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] = '';
        localStoragePanel.saveArrayOfWords()
    }


    handleNewGame = () => {
        globalData.rowIndex = 0
        globalData.gameRowIndex = 0
        globalData.gameOver = false
        globalData.secretWord = randomWord.returnRandomWord()
        globalData.guessRowsPanel = guessRows
        localStoragePanel.saveArrayOfWords()
    }

    handleSubmit = () => {
        // const currentRowPanel = globalData.guessRowsPanel[globalData.rowIndex > 5 ? 5 : globalData.rowIndex].includes('')
        // if (currentRowPanel) return
        // const secretWord = globalData.secretWord
        const word = globalData.guessRowsPanel[globalData.rowIndex > 5 ? 5 : globalData.rowIndex].join("")

        if (!dictionary.includes(word)) {
            const shakeRow = document.getElementById(`${globalData.rowIndex}`) as HTMLElement
            tileAnimation.shakeRow(shakeRow)

            // tileAnimations.shakeTile(shakeRow)
            // TODO add alert
            // shake current row
            return
        }




        if (globalData.rowIndex < 5) {
            globalData.rowIndex++
            globalData.gameRowIndex = 0
        }

    }
}

export default keyActionsClass


