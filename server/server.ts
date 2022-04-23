import getWordsResponse from "./controllers/getWordsResponse";
import getWordsMatch from "./controllers/getWordsMatch";

export const words = await getWordsResponse()
export const matchWord = (word:string) => {
    let status

   const  asyncStatus = async() =>{
        status = await getWordsMatch(word)

    }

    asyncStatus().then(() =>{} )

    return status
}


