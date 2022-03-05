import React from 'react';
import {useQuery} from '@apollo/client'
import query from '../graphql/query';
import credentials from '../services/credentials'
import {useRouter} from 'next/router';

const Header = () => {

    const {data, loading} = useQuery(query.GET_USER)
    const router = useRouter()
    if(loading) return null
    //if(!data) return router.push('/Login')
   

  
    const closeSesion = () =>{
        credentials._clear()
        router.push('/Login')
    }
    return ( 
        <div className='sm:flex sm:justify-between mb-6'>
            <p className='mr-2'>Hola: {data.getUser.name} {data.getUser.lastName}</p>

            <button
            onClick={closeSesion}
             type='button'
             className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
             >Cerrar Sesión</button>
        </div>
     );
}
 
export default Header;