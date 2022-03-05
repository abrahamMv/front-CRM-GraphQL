import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from "formik"
import * as Yup from "yup"
import mutations from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import credentials from '../services/credentials';

const Login = () => {

    const [AuthUser] = useMutation(mutations.LOGIN)
    const [msg, setMsg] = useState(null)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria")
        }),
        onSubmit: async input => {
            try {
                const { data } = await AuthUser({
                    variables: { input }
                })
                console.log(data);
                setMsg("Autenticando...")
                credentials._store(data.AuthUser)

                setTimeout(() => {
                    setMsg(null);
                    router.push("/")
                }, 2000);
            } catch (error) {
                setMsg(error.message)
                setTimeout(() => {
                    setMsg(null)
                }, 3000);
            }
        }
    })

    const viewMessage = () => {
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
                <h1 className='text-center text-2xl text-white font-light'>Login</h1>

                <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-sm'>
                        <form
                            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                            onSubmit={formik.handleSubmit}
                        >
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='email'
                                    type='email'
                                    placeholder='Email'
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
                                    placeholder='password'
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
                                value="Iniciar Sesión"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login;