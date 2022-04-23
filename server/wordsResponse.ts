import {getWordsResponse , getWordsMatch} from "./controllers";

export const words = await getWordsResponse()
export const  matchWord =  (word:string) =>  getWordsMatch(word)

