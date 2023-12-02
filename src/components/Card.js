import React, { useRef, useState, useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer'

export default function Card(props) {

    let dispatch = useDispatchCart()
    let data = useCart()
    let options = props.options
    let priceOptions = Object.keys(options)
    // let foodItems = props.foodItem

    let priceRef = useRef()
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    let totalPrice = qty * parseInt(options[size])

    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;

                break;
            }
        }


        if (food.length!==0) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: props.foodItems._id, price: totalPrice, qty: qty })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: totalPrice, qty: qty, size: size,img: props.ImgSrc })
              console.log("Size different so simply ADD one more to the list")
              return
            }
            return
          }

        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: totalPrice, qty: qty, size: size })
        // await console.log(data)
    }


    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "400px" }}>
                <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                <div className="card-body bg-black">
                    <h5 className="card-title text-white"> {props.foodItems.name} </h5>
                    {/* <p className="card-text text-white"> {props.description} </p> */}
                    <div className='container w-100 h-300'>
                        <select className='m-2 h-100 bg-success rounded text-white' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return <option key={i + 1} value={i + 1}>{i + 1}</option>
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded text-white' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5 text-white'>
                            Rs.{totalPrice}
                        </div>
                    </div>
                    <hr className='bg-white' />
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
