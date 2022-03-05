import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import query from '../../graphql/query';
import {useQuery} from '@apollo/client'
import {saveClient} from '../../actions/PedidosActions'
import {useDispatch} from 'react-redux'

const DefineCliente = () => {

    const dispatch = useDispatch()
    const { data, loading } = useQuery(query.GET_CLIENTES_SELLER)
    const [client, setClient] = useState({})

    useEffect(()=>{
        dispatch(saveClient(client))
    },[client])

    if (loading) return "Cargando..."
    const {getClientesbySeller} = data
    

    const SelectClient = client =>{
        setClient(client)
    }
    return ( 
       <>
       <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1.- Asigna un Cliente al pedido</p>
         <Select
         className="mt-3"
         options={getClientesbySeller}
         getOptionValue={options => options.id}
         getOptionLabel={options => options.name}
         onChange={(option) => SelectClient(option)}
         placeholder="Busque o Seleccione un cliente"
         noOptionsMessage={() => 'No hay Resultados'}
         />
       </>
     );
}
 
export default DefineCliente;