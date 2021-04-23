import React from 'react';
import config from '../config/config'




const Product = props => {

    const { id, name, author , page , stock, image } = props.data;

    const handleBorrow = e => {
        if(props.data.stock > 0)
            props.data.stock--
            console.log(props.data.stock)

    }

    const handleReturn = e => {
        props.data.stock++
        console.log(props.data.stock)
    }

    const updatePet = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, type, age, weight, price })
        //console.log('student id update: ', result.data)
        getPets()
    }





    return (
        <div className='container'>
            <img src={image} />
            <h4>{name}</h4>
            <small className='text-muted'>{author}</small>
            <div className='info'>
                <small className='page'>{page} Page</small>
                <small className='page'>{stock} Lefts</small>
            </div>
            <hr />
            <div className='action'>
                <small className='Borrow' onClick={handleBorrow}>Borrow</small>
                <small className='Return' onClick={handleReturn}>Return</small>

            </div>
            <style jsx>{`
                .container {
                    padding: 10px;
                    border-radius: 10px;
                    min-width: 180px;
                    max-width: 200px;
                    box-shadow: 0 0 6px 0px rgba(0,0,0,.15);
                    margin: 0 10px 10px 0;
                }
                .info, .action {
                    display: flex;
                    justify-content: space-between;
                }
                img {
                    width: 100%;
                    height: 160px;
                }
                .quantity, .delete {
                    color: var(--red);
                }
                .price {
                    color: var(--green-dark);
                }
                .Borrow {
                    color: var(--blue);
                    border-right: 1px solid var(--gray);
                    width: 50%;
                    text-align: center;
                    cursor: pointer;
                }
                .Return {
                    width: 50%;
                    text-align: center;
                    cursor: pointer;
                }


            `}</style>
        </div>
    )
}

export default Product;