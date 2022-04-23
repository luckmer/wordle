import  {AxiosRequestConfig} from 'axios'
import API_KEY from "./api.json"

const key = API_KEY

export const wordsOptions:AxiosRequestConfig = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5' , wordLength:'5'},
    headers: {
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
        'X-RapidAPI-Key': key as unknown as string
    }
};

export const wordCheck = (word:string):AxiosRequestConfig => {
return {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: {entry: word},
    headers: {
        'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
        'x-rapidapi-key': key as unknown as string
    }
}
}