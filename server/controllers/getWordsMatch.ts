import {wordCheck } from "../config/wordsConfig"
import axios from 'axios'

const getWordsMatch = async (word:string)=>{
    try{
        const wordOptions=  wordCheck(word)
        const responseJson = await axios.request(wordOptions)
        return  await responseJson.data.result_msg
    }catch (error){
        console.error(`couldn't match words , ${error}`)
    }
}
export default  getWordsMatch