import {globalData} from "../constants";

class keyActionsClass {

    handleClickRoot = (e:MouseEvent)=>{
        const letter = (e.target as HTMLTextAreaElement).textContent as string;
         switch (letter){
             case  '«' : {
                 this.handleClear();
                 break;
             }
            case 'ENTER' : {
                this.handleSubmit();
                break;
            }
            default:{
                this.handleClick(letter);
                break;
            }
        }
    }

    handleClick =(letter:string)=>{
        if(globalData.gameRowIndex >=5)return
        const tile = document.getElementById(`${globalData.rowIndex}.${globalData.gameRowIndex}`) as Element;
        tile.textContent = letter;
        globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] = letter;
        globalData.gameRowIndex++
    }

    handleClear = ()=>{
        if(globalData.gameRowIndex <=0)return
        globalData.gameRowIndex--
        const tile = document.getElementById(`${globalData.rowIndex}.${globalData.gameRowIndex}`) as Element;
        tile.textContent = '';
        globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] = '';
    }

    handleSubmit = ()=>{
        const currentRowPanel = globalData.guessRowsPanel[globalData.rowIndex].includes('')
        console.log(currentRowPanel)
        globalData.rowIndex++
        globalData.gameRowIndex = 0
    }
}
export default  keyActionsClass


