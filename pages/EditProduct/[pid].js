import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router'
import { Formik } from 'formik';
import * as Yup from 'yup'
import query from '../../graphgql/query';
import mutations from '../../graphgql/mutations';
import {useQuery, useMutation} from '@apollo/client'
import Swal from 'sweetalert2';

const EditProduct = () => {
    const router = useRouter()
    

    const {data, loading} = useQuery(query.GET_PRODUCT,{
        variables:{id : router.query.pid}
    })

   const [updateProduct] = useMutation(mutations.EDIT_PRODUCT)
    
    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        existence:Yup.number().required("Agrega la cantidad disponible").positive("No se aceptan número negativos").integer("La existencia deben ser número enteros"),
        price:Yup.number().required("El precio es obligatorio").positive("No se aceptan números negativos")
    })
    if (loading) return "Cargando..."
    if(!data) return 'Accion no permitida'
      const {getProduct} = data

    const handleSubmit = async values =>{
        const {name, existence, price } = values

        try {
            const {data} = await updateProduct({
                variables:{
                    id:router.query.pid,
                    input:{
                        name,
                        existence,
                        price
                    }
                }
            })
            Swal.fire(
                'Actualizado!',
                'El Producto se actualizo correctamente',
                'success'
            )

            router.push("/Productos")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Editar Productos</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                   
                   <Formik
                   validationSchema={validationSchema}
                      enableReinitialize
                     initialValues={getProduct}
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
                                    placeholder='Nombre Producto'
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
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existence'>Cantidad Disponible</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='existence'
                                    type='number'
                                    placeholder='Cantidad Disponible'
                                      value={props.values.existence}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>
                            {props.touched.existence && props.errors.existence && (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.existence}</p>
                                </div>
                            )}
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>Precio</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='price'
                                    type='number'
                                    placeholder='Precio'
                                     value={props.values.price}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                />
                            </div>
                            {props.touched.price && props.errors.price && (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                    <p className='font-bold'>Error</p>
                                    <p>{props.errors.price}</p>
                                </div>
                            )}
    
                            <input
                                type="submit"
                                value="Editar Producto"
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

export default EditProduct;