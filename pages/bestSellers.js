import React,{useEffect} from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import query from '../graphql/query';
import { useQuery } from '@apollo/client';

const BestSllers = () => {

    const {data, loading,startPolling, stopPolling} = useQuery(query.BEST_SELLERS)

    useEffect(()=>{
        startPolling(1000)
        return () =>{
            stopPolling()
        }
    },[startPolling,stopPolling])

    if(loading) return "Cargando..."
   
    const SellerGrafica = []

    data.bestSeller.map((seller, index)=>{
        SellerGrafica[index]={
            ...seller.seller[0],
            total: seller.total
        }
    })
    console.log(SellerGrafica);

    
    return ( 
        <Layout>
             <h1 className='text-2xl text-gray-800 font-light'>Mejores Vendedores</h1>

            
        <BarChart
        className='mt-10'
          width={600}
          height={500}
          data={SellerGrafica}
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
 
export default BestSllers;