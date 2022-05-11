import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import PokeType from "../components/PokeType"
import getPokemonById from "../services/getPokemonById"
import PokeMov from "../components/PokeMov"
import PokeAb from "../components/PokeAb"

const Pokemon = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState('')
    const [pokeName, setPokeName] = useState('')
    const [pokemonImage, setPokemonImage] = useState('')
    const [pokemonType, setPokemonType] = useState([])
    const [pokeMov, setPokeMov] = useState([])
    const [pokeAb, setPokeAb] = useState([])
    const [pokeWeight, setPokeWeight] = useState('')
    const [pokeHeight, setPokeHeight] = useState("");
    
    useEffect(() => {
        if (id) {
            getPokemonById(id)
                .then((res) => {
                setPokemon(res.data)
                setPokeName(res.data.name)
                setPokemonImage(res.data.sprites.other['official-artwork'].front_default)
                setPokemonType(res.data.types)
                setPokeMov(res.data.moves)
                setPokeAb(res.data.abilities)
                setPokeWeight(res.data.weight)
                setPokeHeight(res.data.height);
                
        })}
    },[id])

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>{pokeName}</h2>
            <h2>{pokemon.id}</h2>
            <img src={pokemonImage} alt="" />
            <Link to={`/pokedex/pokemon/${id}/encounters`}>Location</Link>
            <h3>
                {pokemonType.map((item) => (
                    <PokeType key={item.slot} type={item.type} />
                ))}
            </h3>
            <p>
                Weight: {pokeWeight} Height: {pokeHeight}
            </p>

            <ol>
                {pokeMov.map((item) => (
                    <PokeMov key={item.move.name} mov={item.move.name} />
                ))}
            </ol>
            <h4>
                {pokeAb.map((item) => (
                    <PokeAb key={item.slot} ab={item.ability.name} />
                ))}
            </h4>
        </div>
    );
}

export default Pokemon