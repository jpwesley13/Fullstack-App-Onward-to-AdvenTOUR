import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

function HabitatForm({ onAddHabitats, handleClick }) {

    const [regions, setRegions] = useState([])

    useEffect(() => {
        fetch('/regions')
            .then(res => res.json())
            .then(data => setRegions(data))
            .catch(error => console.error(error));
    }, []);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter habitat's name.").max(30),
        region_id: yup.string().required("Please select the region this habitat is located in."),
        image: yup.string().required("Must submit an image for new habitat posts."),
        review: yup.string().required("New habitat posts must be accompanied with a review.")
    });

    const onSubmit = async (values, actions) => {
        fetch('/habitats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(res => {
            if(res.ok) {
                res.json()
                .then(data => onAddHabitats(data))
                handleClick()
            } else {
                throw new Error("Error occurred in adding new habitat.");
            }
        })
        .catch(error => console.error(error))
        actions.resetForm()
      };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            image: "",
            region_id: "",
            review: ""
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
                placeholder="Enter habitat's name"
                className={errors.name && touched.name ? "input-error" : ""} 
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
            <label htmlFor="region">Region</label>
            <select
                value={values.region_id}
                onChange={handleChange}
                onBlur={handleBlur}
                id="region_id" 
                type="text" 
                placeholder="Select the habitat's region" 
                className={errors.region_id && touched.region_id ? "input-error" : ""}>
                    <option value="" hidden disabled>Select a region</option>
                    {regions.map((region) => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                ))}
            </select>
            {errors.region_id && touched.region_id && <p className="error">{errors.region_id}</p>}
            <label htmlFor="image">Habitat Picture</label>
            <input
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                id="image" 
                type="text" 
                placeholder="Post an image url of the habitat" 
                className={errors.image && touched.image ? "input-error" : ""} 
            />
            {errors.image && touched.image && <p className="error">{errors.image}</p>}
            <label htmlFor="review">Enter a Review for the Habitat</label>
            <input
                value={values.review}
                onChange={handleChange}
                onBlur={handleBlur}
                id="review" 
                type="text" 
                placeholder="Enter habitat review"
                className={errors.review && touched.review ? "input-error" : ""} 
            />
            {errors.review && touched.review && <p className="error">{errors.review}</p>}
                <button disabled={isSubmitting} type="submit">Submit</button>
        </form>
    )
};
export default HabitatForm;