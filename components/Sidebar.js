import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

const Sidebar = () => {

    const router = useRouter()
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-screen p-5">
            <div>
                <p className='text-white text-2xl font-black'>CRM Clientes</p>
            </div>

            <nav className='mt-2 list-none'>
                <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className='text-white mb-2 block'>Clientes</a>
                    </Link>
                </li>
                <li className={router.pathname === "/Pedidos" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/Pedidos">
                        <a className='text-white mb-2 block'>Pedidos</a>
                    </Link>
                </li>
                <li className={router.pathname === "/Productos" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/Productos">
                        <a className='text-white mb-2 block'>Productos</a>
                    </Link>
                </li>
            </nav>

            <nav className='mt-2 list-none'>

            <div className='sm:mt-10'>
                <p className='text-white text-2xl font-black'>Otras Opciones</p>
            </div>
                <li className={router.pathname === "/bestSellers" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/bestSellers">
                        <a className='text-white mb-2 block'>Mejores Vendedores</a>
                    </Link>
                </li>

                <li className={router.pathname === "/bestClientes" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/bestClientes">
                        <a className='text-white mb-2 block'>Mejores Clientes</a>
                    </Link>
                </li>
            </nav>

        </aside>
    );
}

export default Sidebar;