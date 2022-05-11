import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import PokeType from "./PokeType"

const PokeItem = ({ url, setExist }) => {

    
    const [pokeObj, setPokeObj] = useState({})

    
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setExist(true)
                setPokeObj(res.data)
            })
            .catch(() => {
                setExist(false)
            })
    },[url, setExist])


    return (
        <Link to={`/pokedex/pokemon/${pokeObj.id}`}>
        <div>
            <img src={pokeObj.sprites?.other['official-artwork'].front_default} alt="" />
            <h3>{pokeObj.name}</h3>
            {pokeObj.types?.map((item) => <PokeType key={item.slot} type={item.type} />)}
            <h2>HP: {pokeObj.stats?.[0].base_stat}</h2>
            <h3>Attack: {pokeObj.stats?.[1].base_stat}</h3>
            <h3>Defense: {pokeObj.stats?.[2].base_stat}</h3>
            <h3>Speed: {pokeObj.stats?.[5].base_stat}</h3>
        </div>
         </Link>
    )
}
export default PokeItem