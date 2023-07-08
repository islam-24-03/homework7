import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts, productsSelect} from "../../redux/productsSlice";
import ProductItem from "../ProducItem/ProductItem";
import {Box, Skeleton} from "@mui/material";

const MainPage = () => {
    const dispatch = useDispatch()
    const {products, load} = useSelector(productsSelect)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div>
            <ul className='ul' style={{width: '1300px', margin: '20px auto'}}>
                {!load
                        ?
                        products.map(i => <ProductItem i={i}/>)
                        :
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 4fr)',
                            gap: '20px',
                            margin: '20px auto',
                            width: '1300px'
                        }}>
                            {
                                Array.from({length: 8}).map((_, index) => (
                                    <Box key={index} sx={{
                                        width: '300px',
                                        height: '500px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Skeleton animation="wave" variant="rounded" width={300} height={500}/>
                                    </Box>
                                ))
                            }
                        </Box>
                }
            </ul>
        </div>
    );
};

export default MainPage;