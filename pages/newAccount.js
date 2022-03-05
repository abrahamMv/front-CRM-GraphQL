import React,{useState} from 'react';
import Layout from '../components/Layout';
import {useFormik} from "formik"
import * as Yup from "yup"
import mutations from '../graphgql/mutations'
import { useMutation } from '@apollo/client'
import {useRouter} from 'next/router'



const newAccount = () => {

    const [newUser] = useMutation(mutations.CREATE_ACCOUNT)
    const [msg, setMsg] = useState(null)
    const router = useRouter()

  
    const formik = useFormik({
        initialValues:{
            name:"",
            lastName:"",
            email:"",
            password:""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            lastName: Yup.string().required("El apellido es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria").min(6,"La contraseña debe ser de minimo 6 caracteres")
        }),
        onSubmit: async input =>{
            try {
             const {data} = await  newUser({
                   variables:{input}
               })
               setMsg(`Se creo correctamente el Usuario ${data.newUser.name}`)
               setTimeout(() => {
                setMsg(null)
                router.push('/Login')
            }, 3000);
            } catch (error) {
               setMsg(error.message)
               setTimeout(() => {
                   setMsg(null)
               }, 3000);
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
        <>
            <Layout>
                {msg && viewMessage()}
            <h1 className='text-center text-2xl text-white font-light'>Crear Cuenta</h1>

            <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-sm'>
                        <form
                            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                            onSubmit={formik.handleSubmit}
                        >
                             <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Nombre</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='name'
                                    type='text'
                                    placeholder='Nombre Usuario'
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
                                    placeholder='Apellidos Usuario'
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
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='email'
                                    type='email'
                                    placeholder='Email Usuario'
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
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='password'
                                    type='password'
                                    placeholder='password Usuario'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4  '>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            )}
                                <input
                                type="submit"
                                className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900 hover:cursor-pointer'
                                value="Crear Cuenta"
                                 />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
     );
}
 
export default newAccount;