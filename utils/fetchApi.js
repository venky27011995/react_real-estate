import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const {data} = await axios.get((url),{
        headers: {
             'x-rapidapi-host': 'bayut.p.rapidapi.com',
             'x-rapidapi-key': '2d63abdf94msh134964cab96febfp1875d3jsnbc4e7a5fe904'
          }
    })
    return data;
}
