import LoaddingSpnner from '../Photo/Homepageloadingspnner.gif';
import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Home.css'

const Home = () => {
    const [products, setproducts] = useState([])

    useEffect(() => {
        fetch('https://rhubarb-crumble-96713.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setproducts(data))
    }, [])
    return (
            <div className="container mt-5">
                <div className="row">
                    {
                        products.length === 0 && <img src={LoaddingSpnner} alt="" />
                    }
                    {
                        products.map(pd => <Products pd={pd} ></Products>)
                    }
                </div>
            </div>
       
    );
};

export default Home;