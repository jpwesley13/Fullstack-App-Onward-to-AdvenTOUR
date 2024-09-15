import { useFormik } from "formik";
import * as yup from "yup";

function EditReview({ review, setReviews, handleClick}) {

    const numbers = [1, 2, 3, 4, 5];

    const formSchema = yup.object().shape({
        content: yup.string().optional().min(50, "Please make review at least 50 characters long."),
        danger: yup.number().integer().optional(),
        rating: yup.number().integer().optional(),
    });

    const onSubmit = async (values, actions) => {
        const filteredValues = Object.entries(values).reduce((acc, [key, value]) => {
            if(value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});

        fetch(`/reviews/${review.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filteredValues),
        })
        .then(async res => {
            const data = await res.json();
            if (res.status >= 400) {
                actions.setErrors(data.errors);
            } else {
                setReviews(reviews => reviews.map(review => review.id === data.id ? data : review));
                handleClick();
                actions.resetForm();
            }
        })
        .catch(error => console.error(error))
      };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            content: review.content,
            danger: review.danger,
            rating: review.rating,
            trainer_id: "",
            habitat_id: ""
        },
        validationSchema: formSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="content">Review</label>
            <textarea
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                id="content" 
                placeholder="Update your review here"
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
                placeholder="Update how dangerous the habitat felt." 
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
                placeholder="Update your rating for the habitat." 
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
export default EditReview;