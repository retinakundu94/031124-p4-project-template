import React, {useState} from "react"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {Link} from "react-router-dom"


export default function CartFunction({itemId}){
    console.log("itemId",itemId)
    const [itemCount, setItemCount]= useState(0)


    const handleClickAdd = ()=>{
        setItemCount(itemCount + 1);

        fetch('/api/carts',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                item_id: itemId,
                quantity:1,
            })
        })
        .then(res =>{
            if (res.ok){
                res.json()
            } else {
                alert('Failed to add to cart table!')
            }
        })  
        .then(data => {
            console.log('Item added to cart:', data);
          })
        .catch(error =>{
            console.error('Failed to add to cart: ', error)
            alert('Failed to add to cart table!')
        })
    }

    return (
        <div className="cart">
                <Link to="/cart">
                    <Badge overlap="rectangular" 
                    color="secondary" badgeContent={itemCount}>
                        <ShoppingCartIcon />{" "}
                    </Badge>
                </Link>
                <ButtonGroup>
                    <Button
                        onClick={() => {
                            setItemCount(Math.max(itemCount - 1, 0));
                        }}
                    >
                        {" "}
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                        onClick={handleClickAdd}
                    >
                        {" "}
                        <AddIcon fontSize="small" />
                    </Button>
                </ButtonGroup>

        </div>
    )
}
