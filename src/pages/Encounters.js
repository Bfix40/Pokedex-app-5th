import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './Encounters.css' 
import getPokemonLocation from "../services/getPokeLocation"


const Encounters = () => {

    const { id } = useParams();


    const [encounters, setEncounters] = useState([])
    useEffect(() => {
        getPokemonLocation(id)
            .then((res) => {
                setEncounters(res.data)
                console.log(res.data)
            })
    }, [id])
    
    
    const list = encounters?.map((item) => (
        <span key={item.location_area.name}>{item.location_area.name.replaceAll('-', ' ')}</span>
    ));

    return <div className="list">{list}</div>;
}

export default Encounters