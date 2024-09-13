import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../context and hooks/AuthContext";

function ReviewForm({ onAddReview, handleClick, id }) {

    const { trainer } = useAuth();
    const numbers = [1, 2, 3, 4, 5];

    const formSchema = yup.object().shape({
        content: yup.string().required("Must enter content for review.").min(50, "Please make review at least 50 characters long."),
        danger: yup.number().integer().required("Must give habitat an observed danger level."),
        rating: yup.number().integer().required("Must give habitat a rating."),
    });

    const onSubmit = async (values, actions) => {
        const reviewData = {
            ...values,
            trainer_id: trainer.id,
            danger: id
        };

        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error("Error occurred in adding new review.");
            }
        })
        .then(data => {
            onAddReview(data);
            handleClick();
        })
        .catch(error => console.error(error))
        actions.resetForm()
      };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            content: "",
            danger: "",
            rating: ""
        },
        validationSchema: formSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="content">Review</label>
            <input
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                id="content" 
                type="text" 
                placeholder="Write your review here"
                className={errors.content && touched.content ? "input-error" : ""} 
            />
            {errors.content && touched.content && <p className="error">{errors.content}</p>}
            <label htmlFor="danger">Danger level</label>
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
            <label htmlFor="rating">Rating</label>
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
export default ReviewForm;