const boardContainer = document.querySelector('.board') as unknown as Element;
import {guessRowsPanel} from "../../constants";

class guessRowsGenerator {

    generatePTag= (div:HTMLDivElement,title:string)=>{
        const p:HTMLDivElement = document.createElement('p')
        p.classList.add('tile')
        p.textContent = title
        div.appendChild(p)
    }

     generateDivContainer= ( gameRow:HTMLDivElement,title:string,)=>{
        const div:HTMLDivElement = document.createElement('div')
        div.classList.add("row")
        this.generatePTag(div,title)
        gameRow.appendChild(div)
    }

    generateRows=()=>{
        guessRowsPanel.forEach((row:string[])=>{
            const gameRow:HTMLDivElement = document.createElement('div');
            gameRow.classList.add("game-row")
            row.forEach((title:string)=>this.generateDivContainer(gameRow, title))
            boardContainer.appendChild(gameRow)
        })
    }

}

const guessRows = new guessRowsGenerator()

export default  guessRows