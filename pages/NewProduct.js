import React from 'react';
import Layout from '../components/Layout';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useMutation} from '@apollo/client'
import mutations from '../graphgql/mutations';
import {useRouter} from 'next/router'
import query from '../graphgql/query';
import Swal from 'sweetalert2';

const NewProduct = () => {

    const router = useRouter()

    const [newProduct] = useMutation(mutations.NEW_PRODUCT,{
        update(cache, {data:{newProduct}}){
            const {getProducts} = cache.readQuery({query: query.GET_PRODUCTS})

            cache.writeQuery({
                query: query.GET_PRODUCTS,
                data:{
                    getProducts: [...getProducts, newProduct ]
                }
            })
        }
    })

    const formik = useFormik({
        initialValues:{
            name:"",
            existence:"",
            price:""
        },
        validationSchema:Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            existence:Yup.number().required("Agrega la cantidad disponible").positive("No se aceptan número negativos").integer("La existencia deben ser número enteros"),
            price:Yup.number().required("El precio es obligatorio").positive("No se aceptan números negativos")
        }),
        onSubmit: async input =>{
            try {
              const {data} = await newProduct({
                  variables:{input}
              })  

              Swal.fire(
                'Creado!',
                'El producto creó correctamente',
                'success'
            )
              router.push("/Productos")
            } catch (error) {
                console.log(error);
            }
        }
    })
    return ( 
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Nuevos Productos</h1>

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
                                placeholder='Nombre Producto'
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
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existence'>Cantidad Disponible</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='existence'
                                type='number'
                                placeholder='Cantidad Disponible'
                                 value={formik.values.existence}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                            />
                        </div>
                         {formik.touched.existence && formik.errors.existence && (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.existence}</p>
                            </div>
                        )} 
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>Precio</label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='price'
                                type='number'
                                placeholder='Precio'
                                 value={formik.values.price}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                            />
                        </div>
                         {formik.touched.price && formik.errors.price && (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.price}</p>
                            </div>
                        )} 
                  
                        <input
                            type="submit"
                            value="Agregar nuevo Producto"
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:cursor-pointer'
                        />

                    </form>
                </div>

            </div>
        </Layout>
     );
}
 
export default NewProduct;