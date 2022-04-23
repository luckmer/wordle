import axios from "axios";
import {wordsOptions} from "../config/wordsConfig";

const  getWordsResponse = async ()=>{
    try{
        const responseJson = await axios.request(wordsOptions)
        return  await responseJson.data[0]
    }catch (error){
        console.error(`couldn't get words , ${error}`)
    }
}

export default getWordsResponse