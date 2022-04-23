import getWordsResponse from "./controllers/getWordsResponse";
import getWordsMatch from "./controllers/getWordsMatch";

export const words = await getWordsResponse()
export const  matchWord =  (word:string) =>  getWordsMatch(word)

