import React,{useState} from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import mutations from '../graphql/mutations';
import query from '../graphql/query';
import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'

const newClient = () => {

    const router = useRouter()
    const [msg, setMsg] = useState(null)

    const [newCliente] = useMutation(mutations.NEW_CLIENTE, {
        update(cache, {data: {newCliente}}){
            const { getClientesbySeller} = cache.readQuery({query: query.GET_CLIENTES_SELLER});

            cache.writeQuery({
                query: query.GET_CLIENTES_SELLER,
                data:{
                    getClientesbySeller: [...getClientesbySeller, newCliente]
                }
            })

        }
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            business: "",
            email: "",
            phone: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            lastName: Yup.string().required("El apellido es obligatorio"),
            business: Yup.string().required("La empresa es obligatoria"),
            email: Yup.string().email("No es un email valido").required("El email es obligatorio"),
        }),
        onSubmit: async input => {
            try {
                const {data} = await newCliente({
                    variables:{input}
                })
                router.push('/')
            } catch (error) {
                setMsg(error.message)
                setTimeout(() => {
                    setMsg(null)
                }, 2000);
            }
        }

    })

    const viewMessage = () =>{
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
            <p>{msg}</p>
        </div>
        )
    }
    return (
        <Layout>

            <h1 className='text-2xl text-gray-800 font-light'>Nuevos Clientes</h1>
            {msg && viewMessage()}

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        onSubmit={formik.handleSubmit}
                        className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                    >
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Nombre</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='name'
                                type='text'
                                placeholder='Nombre Cliente'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.name && formik.errors.name && (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        )}
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastName'>Apellidos</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='lastName'
                                type='text'
                                placeholder='Apellido Cliente'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.lastName && formik.errors.lastName && (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.lastName}</p>
                            </div>
                        )}
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='business'>Empresa</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='business'
                                type='text'
                                placeholder='Empresa Cliente'
                                value={formik.values.business}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.business && formik.errors.business && (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.business}</p>
                            </div>
                        )}
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='email'
                                type='email'
                                placeholder='Email Cliente'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        )}
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>Telefono</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='phone'
                                type='text'
                                placeholder='Telefono Cliente'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Crear Cliente"
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer'
                        />

                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default newClient;