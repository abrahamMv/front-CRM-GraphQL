import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import query from '../../graphql/query';
import {useQuery} from '@apollo/client'
import {useDispatch} from 'react-redux'
import {saveProduct} from '../../actions/PedidosActions'

const DefineProducts = () => {

    const dispatch = useDispatch()
    const [product, setProduct] = useState([])
    const {data, loading} = useQuery(query.GET_PRODUCTS)
    useEffect(()=>{
        dispatch(saveProduct(product))
    },[product])

    if (loading) return "Cargando..."
    const {getProducts} = data

    const SelectProduct = product =>{
        setProduct(product)
    }
    return ( 
        <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Selecciona o busca los Productos</p>
          <Select
          className="mt-3"
          options={getProducts}
          isMulti={true}
          getOptionValue={options => options.id}
          getOptionLabel={options => `${options.name} - ${options.existence} Disponibles`}
          onChange={(option) => SelectProduct(option)}
          placeholder="Busque o Seleccione un Producto"
          noOptionsMessage={() => 'No hay Resultados'}
          />
        </>
     );
}
 
export default DefineProducts;