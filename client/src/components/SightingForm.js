import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useAuth } from "../context and hooks/AuthContext";

function SightingForm({ onAddSighting, handleClick, habitats }) {

    const { trainer } = useAuth();

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter name for rare sighting. Enter 'Unknown Pokemon' if unknown").max(30),
        habitat_id: yup.string().required("Please select the habitat this sighting was found in."),
        image: yup.string().required("Must submit an image for rare sighting posts."),
        blurb: yup.string().required("Please say something about your rare encounter.").max(200, "Please keep your recount of the rare sighting brief and below 200 characters.")
    });

    const onSubmit = async (values, actions) => {
        const sightingData = {
            ...values,
            trainer_id: trainer.id
        };

        fetch('/sightings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sightingData),
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error("Error occurred in adding new rare sighting.");
            }
        })
        .then(data => {
            onAddSighting(data);
            handleClick();
        })
        .catch(error => console.error(error))
        actions.resetForm()
      };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            image: "",
            habitat_id: "",
            blurb: "",
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
                placeholder="Enter Pokemon's name"
                className={errors.name && touched.name ? "input-error" : ""} 
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
            <label htmlFor="habitat">Habitat</label>
            <select
                value={values.habitat_id}
                onChange={handleChange}
                onBlur={handleBlur}
                id="habitat_id" 
                type="text" 
                placeholder="Select the habitat sighitng was found in" 
                className={errors.habitat_id && touched.habitat_id ? "input-error" : ""}>
                    <option value="" hidden disabled>Select a habitat</option>
                    {habitats.map((habitat) => (
                    <option key={habitat.id} value={habitat.id}>{habitat.name}</option>
                ))}
            </select>
            {errors.habitat_id && touched.habitat_id && <p className="error">{errors.habitat_id}</p>}
            <label htmlFor="image">Sighting Picture</label>
            <input
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                id="image" 
                type="text" 
                placeholder="Post an image url of the rare sighting" 
                className={errors.image && touched.image ? "input-error" : ""} 
            />
            {errors.image && touched.image && <p className="error">{errors.image}</p>}
            <label htmlFor="blurb">Enter a Short Blurb for the Sighting</label>
            <input
                value={values.blurb}
                onChange={handleChange}
                onBlur={handleBlur}
                id="blurb" 
                type="text" 
                placeholder="Enter your blurb"
                className={errors.blurb && touched.blurb ? "input-error" : ""} 
            />
            {errors.blurb && touched.blurb && <p className="error">{errors.blurb}</p>}
                <button disabled={isSubmitting} type="submit">Submit</button>
        </form>
    )
};
export default SightingForm;