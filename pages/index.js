import Layout from '../components/Layout'
import query from '../graphql/query'
import { useQuery } from '@apollo/client'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Cliente from '../components/Cliente'


export default function Home() {

  const { data, loading } = useQuery(query.GET_CLIENTES_SELLER)
  const router = useRouter()
  if (loading) return "Cargando..."
  //if(!data.getClientesbySeller) return router.push('/Login')
  
  
  return (

    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Clientes</h1>
        <Link href="/newClient">
        <a className='bg-blue-800 py-2 px-3 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>Nuevo Cliente</a>
        </Link>

        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Nombre</th>
              <th className='w-1/5 py-2'>Empresa</th>
              <th className='w-1/5 py-2'>Email</th>
              <th className='w-1/5 py-2'>Eliminar</th>
              <th className='w-1/5 py-2'>Editar</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {data?.getClientesbySeller.map(cliente => (
             <Cliente
              key={cliente.id}
              cliente={cliente}
             />
            ))}
          </tbody>
        </table>
      </Layout>

    </div>
  )
}
