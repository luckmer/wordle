import {globalData} from "../../constants";
import keyActionsClass from "../../actions/keyActions"

const buttonsContainer = document.querySelector('.row_container') as unknown as Element;

class keyGeneratorClass extends keyActionsClass {

    generateDiv = (row: Element) => {
        const div: HTMLDivElement = document.createElement('div')
        div.classList.add("spacer")
        row.appendChild(div)
    }

    generateButton = (key: string, row: Element) => {
        const button: HTMLButtonElement = document.createElement('button')
        button.classList.add(`button`)
        if (key === 'ENTER' || key === '«') button.classList.add("action")
        button.addEventListener('click', this.handleClickRoot)
        button.textContent = key
        row.appendChild(button)
    }

    keyGenerator = () => {
        globalData.keys.forEach((arrayOfKeys: string[]) => {
            const row: HTMLDivElement = document.createElement('div')
            row.classList.add("row");
            row.classList.add("row-margin");
            arrayOfKeys.forEach((key: string) => {
                switch (key) {
                    case 'spacer': {
                        this.generateDiv(row)
                        break
                    }
                    default: {
                        this.generateButton(key, row)
                        break
                    }
                }
            })
            buttonsContainer.append(row)
        })
    }
}

const keyGenerator = new keyGeneratorClass()

export default keyGenerator