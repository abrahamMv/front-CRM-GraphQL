import React,{useEffect} from 'react';
import Layout from '../components/Layout';
import query from '../graphql/query';
import { useQuery } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const bestClientes = () => {

    const {data, loading,startPolling, stopPolling} = useQuery(query.BEST_CLIENTES)

    useEffect(()=>{
        startPolling(1000)
        return () =>{
            stopPolling()
        }
    },[startPolling,stopPolling])

    if(loading) return "Cargando..."
    
    const clientesGrafica = []

    data.bestCliente.map((cliente, index)=>{
        clientesGrafica[index] ={
            ...cliente.cliente[0],
            total:cliente.total
        }
    })
    console.log(clientesGrafica);
    return ( 
        <Layout>
             <h1 className='text-2xl text-gray-800 font-light'>Mejores Clientes</h1>

             <BarChart
        className='mt-10'
          width={600}
          height={500}
          data={clientesGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182CE" />
        </BarChart>
        </Layout>
     );
}
 
export default bestClientes;