import React, {useState} from "react"
import Jewelry from "./Jewelry"

export default function SearchBar({items, userId}){

    const [search, setSearch] = useState('')
    const[selectedCategory, setSelectedCategory]=useState('All')

    const filteredItems = items.filter(item=>{
        const filteredcategory = selectedCategory == 'All' || item.category == selectedCategory
        const filteredsearch = item.name.toLowerCase().includes(search.toLowerCase())
        return filteredcategory && filteredsearch
    })

    const mappedItems = filteredItems.map(item=>{
        return(
            <Jewelry key={item.id} itemId={item.id} userId={userId} name={item.name} price={item.price} image={item.image} category={item.category}/>
        )
    })

    return (
        <div>
            <div >
                <section className="searchcontainer">
                    <h3 className="jewelry-sub-header"> Search: </h3>
                    <input className="searchinput" type="text" onChange={e=>setSearch(e.target.value)} value={search} placeholder="Love yourself"/>
                </section>

                <section className="searchcontainer">
                    <h3 className="jewelry-sub-header"> Select Jewelry Type Here: </h3>
                    <select className="searchinput" value={selectedCategory} onChange ={e=> setSelectedCategory(e.target.value)}>
                        <option value="All"> All </option>
                        <option value="Bracelets"> Bracelets </option>
                        <option value="Necklaces"> Necklaces </option>
                        <option value="Rings"> Rings </option>
                    </select>
                </section>

            </div>
            <section className="jewelry">
                <div className="jewelry-container">
                    {mappedItems}
                </div>
            </section>
        </div>

     
    )

}