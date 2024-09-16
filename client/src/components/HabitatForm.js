import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useAuth } from "../context and hooks/AuthContext";

function HabitatForm({ onAddHabitats, handleClick }) {

    const [regions, setRegions] = useState([]);
    const numbers = [1, 2, 3, 4, 5];
    const { trainer } = useAuth();

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
        content: yup.string().required("New habitat posts must be accompanied with a review."),
        danger: yup.number().integer().required("Must give habitat an observed danger level."),
        rating: yup.number().integer().required("Must give habitat a rating."),
    });

    const onSubmit = async (values, actions) => {
        try {
            const habitatRes = await fetch('/habitats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    image: values.image,
                    region_id: values.region_id,
                }),
            });
            if(habitatRes.status >= 400) {
                const data = await habitatRes.json();
                actions.setErrors(data.errors);
            };

            const habitatData = await habitatRes.json();

            const reviewRes = await fetch('/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: values.content,
                    danger: values.danger,
                    rating: values.rating,
                    trainer_id: trainer.id,
                    habitat_id: habitatData.id,
                }),
            });

            if(!reviewRes.ok) {
                throw new Error("Error occurred in adding new review.");
            };

            const reviewData = await reviewRes.json();

            habitatData.reviews = [reviewData];

            onAddHabitats(habitatData);

            handleClick();
            actions.resetForm();
        } catch (error) {
            console.error(error);
        }
    };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            image: "",
            region_id: "",
            content: "",
            danger: "",
            rating: ""
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
            <label htmlFor="content">Review</label>
            <textarea
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                id="content" 
                placeholder="Write your review here"
                rows="5"
                cols="54"
                className={errors.content && touched.content ? "input-error" : ""} 
            />
            {errors.content && touched.content && <p className="error">{errors.content}</p>}
            <label htmlFor="danger">Danger level (lowest to highest)</label>
            <select
                value={values.danger}
                onChange={handleChange}
                onBlur={handleBlur}
                id="danger" 
                type="number" 
                placeholder="Select how dangerous the habitat felt." 
                className={errors.danger && touched.danger ? "input-error" : ""}>
                    <option value="" hidden disabled>Select danger level</option>
                    {numbers.map((number) => (
                    <option key={number} value={number}>{number}</option>
                ))}
            </select>
            {errors.danger && touched.danger && <p className="error">{errors.danger}</p>}
            <label htmlFor="rating">Rating (least best to best)</label>
            <select
                value={values.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                id="rating" 
                type="number" 
                placeholder="Select your rating for the habitat." 
                className={errors.rating && touched.rating ? "input-error" : ""}>
                    <option value="" hidden disabled>Select score</option>
                    {numbers.map((number) => (
                    <option key={number} value={number}>{number}</option>
                ))}
            </select>
            {errors.rating && touched.rating && <p className="error">{errors.rating}</p>}
                <button disabled={isSubmitting} type="submit">Submit</button>
        </form>
    )
};
export default HabitatForm;