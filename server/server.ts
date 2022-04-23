import getWordsResponse from "./controllers/getWordsResponse";
import getWordsMatch from "./controllers/getWordsMatch";
import * as dotenv from "dotenv";

dotenv.config();

export const words = getWordsResponse()
export const matchWord = (word:string) => getWordsMatch(word)


