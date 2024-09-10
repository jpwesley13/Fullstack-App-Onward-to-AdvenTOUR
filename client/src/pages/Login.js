import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from "yup";

export default function Login() {
    const navigate = useNavigate();

    const {setTrainer} = useOutletContext();

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required."),
        password: yup.string().required("Password is required.")
    });

    const onSubmit = async (values) => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(res => {
            if(res.ok) {
                res.json()
                .then(data => setTrainer(data))
                navigate('/')
            } else {
                throw new Error("Invalid login credentials.");
            }
        })
        .catch(error => console.error(error)) 
    };

    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="name" 
                type="text" 
                placeholder="Enter your name"
                className={errors.name && touched.name ? "input-error" : ""} 
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
            <label htmlFor="password">Password</label>
            <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password" 
                type="password" 
                placeholder="Enter your password"
                className={errors.password && touched.password ? "input-error" : ""} 
            />
            {errors.password && touched.password && <p className="error">{errors.password}</p>}
                <button disabled={isSubmitting} type="submit">Login</button>
        </form>
    )
}