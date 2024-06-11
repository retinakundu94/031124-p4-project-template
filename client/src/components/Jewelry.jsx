import CartFunction from "./CartFunction";


function Jewelry({itemId, userId, name, price, image, category, onDelete, inCart }) {
    console.log(itemId)



    return (

        <article className="jewelryPost">
            <div className="jewelry-img">
                <img src={image} alt={name} />
            </div>
            <div className="jewelry-footer">
                <h3>{name}</h3>
                <h4>${price}</h4>
                <h4 className="category">{category}</h4>
            </div>
            {inCart ? (
                <button onClick={() => onDelete(itemId)} className="btn-delete">Remove from Cart</button>
            ) : (
                <CartFunction userId={userId} itemId={itemId} />
            )}
        </article>
    );
}

export default Jewelry