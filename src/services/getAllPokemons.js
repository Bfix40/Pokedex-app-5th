import axios from 'axios'

const getAllPokemons = async (position) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${position}&limit=${20}`
    const req = await axios.get(URL)
  
    return req
}

export default getAllPokemons