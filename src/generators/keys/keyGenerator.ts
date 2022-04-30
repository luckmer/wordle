import {keys} from "../../constants";
import keyActionsClass from "./keyActions"
const buttonsContainer = document.querySelector('.row_container') as unknown as Element;

class keyGeneratorClass extends  keyActionsClass {
    spacerCreator = (row:Element)=>{
        const div = document.createElement('div')
        div.classList.add("spacer")
        row.appendChild(div)
    }

    buttonCreator = (key:string ,row:Element) =>{
        const button = document.createElement('button')
        button.classList.add(`button`)
        if(key === 'ENTER' || key === '«')button.classList.add("action")
        button.addEventListener('click', ()=>{})
        button.textContent =key
        row.appendChild(button)
    }

    keyGenerator = ()=>{
        keys.forEach(arrayOfKeys=>{
            const row = document.createElement('div')
            row.classList.add("row");
            arrayOfKeys.forEach(key=>{
                switch (key){
                    case 'spacer':{
                        this.spacerCreator(row)
                        break
                    }
                    default:{
                        this.buttonCreator(key,row)
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