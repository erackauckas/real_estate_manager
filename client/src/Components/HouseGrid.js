import HouseCard from "./HouseCard.js";
import {useParams} from "react-router-dom";
import NoMatch from './NoMatch.js';
import { useState } from "react"


function HouseGrid({houses, isAdmin, setHouses}) {
    const [newPrice, setNewPrice] = useState("")
    let { id } = useParams(); 
    
    if (!id) {
        return <AllHouses />;        
    }   
  
    let singleHouse = houses.find((house) => house.id == id);
    
    function AllHouses() {
        return (
            <div className="main-container">
                <div className="results-container">                 
                <br></br>
                {houses.map((house) => {
                return <HouseCard key={house.id} house={house} />;
            })}</div>
            </div>
        );
    }
    
    if (!singleHouse) {
        return <NoMatch />;
    }

    function handleDelete () {
        fetch(`/properties/${id}`, {
            method: "DELETE"
        })
        .then(resp=>resp.json())
        .then(deletedHouse => {
            console.log(deletedHouse)
            setHouses(houses.filter((house) => house.id !== deletedHouse.id))
        })
    }

    function handleUpdate (event) {
        event.preventDefault()
        fetch(`/properties/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                price: newPrice
            })
        })
        .then(resp=>resp.json())
        .then((updatedHouse) => {
            console.log(updatedHouse)
        })
    }

    function handleChange(event) {
        setNewPrice(event.target.value)
    }

    return <div>
        <h1>{singleHouse.address}</h1>            
        <img src={singleHouse.image} alt={singleHouse.name}></img>
        <h2>{singleHouse.description}</h2>
        <h2> {singleHouse.price} {singleHouse.rooms} {singleHouse.sq_ft}</h2>
            
            {(isAdmin) ? (
                <button onClick={handleDelete}>Delete Property</button>
                ) : (
                <p>.Only admins can delete properties.</p>
                )
            }

            {(isAdmin) ? (
                
                    <form onSubmit={handleUpdate} >
                        <input type="text" name="newPrice" onChange={handleChange} value={newPrice} placeholder="Edit Price"></input>
                        <input type="submit"></input>
                    </form>
                
                ) : (
                <p>Only admins can update prices.</p>
                )
            }
    </div>

}
export default HouseGrid;