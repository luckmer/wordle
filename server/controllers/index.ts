import {wordCheck,wordsOptions } from "../config"
import axios from 'axios'

export const getWordsMatch = async (word:string)=>{
    try{
        const wordOptions=  wordCheck(word)
        const responseJson = await axios.request(wordOptions)
        return  await responseJson.data.result_msg
    }catch (error){
        console.error(`couldn't match words , ${error}`)
    }
}

export const  getWordsResponse = async ()=>{
    try{
        const responseJson = await axios.request(wordsOptions)
        return  await responseJson.data
    }catch (error){
        console.error(`couldn't get words , ${error}`)
    }
}

