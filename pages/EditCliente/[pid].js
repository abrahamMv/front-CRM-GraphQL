import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import query from '../../graphgql/query';
import mutations from '../../graphgql/mutations';
import { useQuery,useMutation } from '@apollo/client';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const EditCliente = () => {

    const router = useRouter()


    const { data, loading, error } = useQuery(query.GET_CLIENTE, {
        variables: { id: router.query.pid }
    })

    const [updateCliente] = useMutation(mutations.UPDATE_CLIENTE)

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        lastName: Yup.string().required("El apellido es obligatorio"),
        business: Yup.string().required("La empresa es obligatoria"),
        email: Yup.string().email("No es un email valido").required("El email es obligatorio"),
    })

    if (loading) return "Cargando..."
    const { getCliente } = data

    const handleSubmit = async values =>{
        const {name, lastName, email, phone, business} = values
        try {
            const {data} = await updateCliente({
                variables:{
                    id: router.query.pid,
                    input:{
                        name,
                        lastName,
                        email,
                        phone,
                        business
                    }
                }
            })
            Swal.fire(
                'Actualizado!',
                'El cliente se actualizo correctamente',
                'success'
            )

            router.push("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Editar Clientes</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={getCliente}
                        onSubmit={handleSubmit}
                    >

                        {props => {

                            return (

                                <form
                                    onSubmit={props.handleSubmit}
                                    className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                                >
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Nombre</label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='name'
                                            type='text'
                                            placeholder='Nombre Cliente'
                                            value={props.values.name}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    {props.touched.name && props.errors.name && (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    )}
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastName'>Apellidos</label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='lastName'
                                            type='text'
                                            placeholder='Apellido Cliente'
                                            value={props.values.lastName}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    {props.touched.lastName && props.errors.lastName && (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.lastName}</p>
                                        </div>
                                    )}
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='business'>Empresa</label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='business'
                                            type='text'
                                            placeholder='Empresa Cliente'
                                            value={props.values.business}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    {props.touched.business && props.errors.business && (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.business}</p>
                                        </div>
                                    )}
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='email'
                                            type='email'
                                            placeholder='Email Cliente'
                                            value={props.values.email}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    {props.touched.email && props.errors.email && (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    )}
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>Telefono</label>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='phone'
                                            type='text'
                                            placeholder='Telefono Cliente'
                                            value={props.values.phone}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="Editar Cliente"
                                        className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer'
                                    />

                                </form>
                            )
                        }}

                    </Formik>
                </div>

            </div>
        </Layout>
    );
}

export default EditCliente;