import React, { useEffect, useReducer, useState } from 'react'
import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';
import { useDispatch, useSelector } from 'react-redux';
import { productByPaginate } from 'store/actions/product.actions';
import { getAllBrands } from 'store/actions/brands.action';
import CardBlock from 'utils/products/card.blocks';
import PaginateNav from 'utils/paginateNav';
import SearchBar from './searchBar';
import CollapseCheckBox from './collapseCheckbox';
import RangeSelect from './rangeSelect';

const defaultValues = { keywords:'',brand:[], min:0,max:5000,frets:[], page:1 }

const Shop = () => {
    const [grid, setGrid] = useState(false);
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state,...newState }),
        defaultValues
    );
    const { byPaginate } = useSelector(state=> state.products)
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();
    
    const goToPage =(page)=> {
        setSearchValues({page})
    }
    const handleResetSearch =(page)=> {
        setSearchValues({keywords: ''});
    }
    const handleKeywords =(values)=> {
        setSearchValues({keywords: values, page : 1});
    }
 
    const handleGrid = () => setGrid(!grid);

    const handleFilters =(filters, category)=> {
        console.log(filters, searchValues);
        if(category === 'brands'){
            setSearchValues({brand: filters, page: 1})
        }
    }

    const handleRange = (values)=> {
        setSearchValues({min: values[0], max: values[1], page : 1});
        console.log(searchValues)
    }

    useEffect(()=>{
        dispatch(getAllBrands())
    },[dispatch]);


    useEffect(()=>{
        dispatch(productByPaginate(searchValues))
    },[dispatch, searchValues])

    return(
        <div className="page_container">
            <div className="page_top">
                <div className="container">
                  <SearchBar handleKeywords={(keywords)=> handleKeywords(keywords)}/>
                </div>
            </div>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckBox
                            initState={true}
                            title="Brands"
                            list={brands.all}
                            handleFilters={(filters)=> handleFilters(filters, 'brands')}
                        />
                        <RangeSelect
                            title="Range Price"
                            handleRange={(values)=> handleRange(values)}
                        />
                    </div>
                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                                <div className={`grid_btn ${grid ? '': 'active'}`}
                                    onClick={()=> handleGrid()}
                                >
                                    <GridOnIcon/>
                                </div>
                                <div className={`grid_btn ${!grid ? '': 'active'}`}
                                    onClick={()=> handleGrid()}
                                >
                                    <GridOffIcon/>
                                </div>
                            </div>
                            <div>
                                { byPaginate && byPaginate.docs ?
                                    <>
                                       <CardBlock
                                        grid={grid}
                                        items={byPaginate.docs}
                                       />
                                        <PaginateNav
                                            prods={byPaginate}
                                            prev={(page)=> goToPage(page)}
                                            next={(page)=> goToPage(page)}
                                            resetSearch={()=> handleResetSearch()}
                                        />
                                    </>
                                    :null
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Shop
