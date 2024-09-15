import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useAuth } from "../context and hooks/AuthContext";

function EditProfile( { handleClick, onUpdateProfile }) {

    const [biomes, setBiomes] = useState([]);
    const { trainer, setTrainer } = useAuth();

    useEffect(() => {
        fetch('/biomes')
        .then(res => res.json())
        .then(data => setBiomes(data))
        .catch(error => console.error(error));
    }, []);

    const formSchema = yup.object().shape({
        name: yup.string().optional().max(24),
        age: yup.number().integer().optional().min(10),
        image: yup.string().optional(),
        biome_id: yup.string().optional(),
    });

    const onSubmit = async (values, actions) => {

        const filteredValues = Object.entries(values).reduce((acc, [key, value]) => {
            if(value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});

        fetch(`/trainers/${trainer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filteredValues),
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error("Error occurred updating profile.");
            }
        })
        .then(data => {
            setTrainer(data);
            onUpdateProfile(data);
            handleClick();
        })
        .catch(error => console.error(error))
        actions.resetForm()
      };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            age: "",
            image: "",
            biome_id: "",
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
                type="name" 
                placeholder="Enter your new name"
                className={errors.name && touched.name ? "input-error" : ""} 
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
            <label htmlFor="age">Age</label>
            <input
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                id="age" 
                type="number" 
                placeholder="Enter your new age" 
                className={errors.age && touched.age ? "input-error" : ""} 
            />
            {errors.age && touched.age && <p className="error">{errors.age}</p>}
            <label htmlFor="image">Profile Picture</label>
            <input
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                id="image" 
                type="text" 
                placeholder="Post your profile new picture's url" 
                className={errors.image && touched.image ? "input-error" : ""} 
            />
            {errors.image && touched.image && <p className="error">{errors.image}</p>}
            <label htmlFor="biome">Favorite Biome</label>
            <select
                value={values.biome_id}
                onChange={handleChange}
                onBlur={handleBlur}
                id="biome_id" 
                type="text" 
                placeholder="Select your new favorite biome" 
                className={errors.biome_id && touched.biome_id ? "input-error" : ""}>
                    <option value="" hidden disabled>Select a biome</option>
                    {biomes.map((biome) => (
                    <option key={biome.id} value={biome.id}>{biome.name}</option>
                ))}
            </select>
            {errors.biome_id && touched.biome_id && <p className="error">{errors.biome_id}</p>}
                <button disabled={isSubmitting} type="submit">Submit</button>
        </form>
    )
};
export default EditProfile;