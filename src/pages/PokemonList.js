import { useEffect, useState } from "react";
import PokeItem from "../components/PokeItem";
import getAllPokemons from "../services/getAllPokemons";
import getAllPokemonsByType from "../services/getAllPokemonByType";
import axios from "axios";

const PokemonList = () => {
    const [pokeList, setPokeList] = useState([]);
    const [arrOffsetPosition, setArrOffsetPosition] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pages, setPages] = useState([]);
    const [pokeSearch, setPokeSearch] = useState('')
    const [exist, setExist] = useState(true)
    const [pokeType, setPokeType] = useState([])
    const [selectType, setSelectType] = useState('All pokemons')

    useEffect(() => {
        if (pokeSearch && selectType === 'All pokemons') {
            setPokeList([{ url: `https://pokeapi.co/api/v2/pokemon/${pokeSearch}` }])
            
        } else if (selectType === 'All pokemons') {
            getAllPokemons(arrOffsetPosition).then((res) => {
                setPokeList(res.data.results);
            });
        } else {
            axios.get(selectType)
                .then((res) => {
                    console.log(res.data.pokemon)
                    setPokeList(res.data.pokemon)
                })
        }

    }, [selectType, pokeSearch, arrOffsetPosition]);

    useEffect(() => {
        getAllPokemonsByType()
            .then((res) => {
                setPokeType(res.data.results)
               
            })
    }, [])

    const variable = (item, i) => {
        if (i >= arrOffsetPosition && i < arrOffsetPosition + 20) {
            return (
                <PokeItem
                    url={item.pokemon.url}
                    key={item.pokemon.url}
                    setExist={setExist}
                />
            );
        }
    };
    
    const list = pokeList[0]?.pokemon ?
        pokeList.map(variable())
    :
        pokeList.map((item) => (
            <PokeItem url={item.url} key={item.url} setExist={setExist} />
        ));
      
    const search = (e) => {
        e.preventDefault()
        setExist(true)
        setPokeSearch(e.target.firstChild.value.trim())
        e.target.firstChild.value = ''
    }

    const typeChanged = (e) => {
        setSelectType(e.target.value)
    }

    return (
        <div>
            <form onSubmit={search}>
                <input type="text" />
                <button>Search</button>
            </form>
            <select defaultValue='All pokemons' onChange={typeChanged}>
                <option value="All pokemons">
                    All pokemons
                </option>
                {pokeType?.map((type) => (
                        <option value={type.url} key={type.url}>{type.name}</option>
                    ))}
            </select>
            
            {exist ? list : 'Pokemon not found'}
            {arrOffsetPosition === 0 ? (
                <button
                    onClick={() => {
                        window.scrollTo(0,0)
                        setArrOffsetPosition(arrOffsetPosition + 20)
                    }}

                >
                    Next 20
                </button>
            ) : (
                <>
                    <button
                        onClick={() =>
                            setArrOffsetPosition(arrOffsetPosition - 20)
                        }
                    >
                        Prev 20
                    </button>
                    <button
                        onClick={() =>
                            setArrOffsetPosition(arrOffsetPosition + 20)
                        }
                    >
                        Next 20
                    </button>
                </>
            )}
        </div>
    );
};

export default PokemonList;
