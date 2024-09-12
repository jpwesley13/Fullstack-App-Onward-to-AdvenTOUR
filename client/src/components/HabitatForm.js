import { useFormik } from "formik";
import * as yup from "yup";
import NewEntry from "./NewEntry";

function HabitatForm({ onAddHabitats, regions }) {

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter habitat's name.").max(30),
        region: yup.string().required("Please select the region this habitat is located in."),
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
            } else {
                throw new Error("Error occurred in adding new habitat.");
            }
        })
        .catch(error => console.error(error))
        return actions.resetForm()
      };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            image: "",
            region: "",
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
                placeholder="Enter your name"
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
                placeholder="Enter your age" 
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
                placeholder="Post your profile picture's url" 
                className={errors.image && touched.image ? "input-error" : ""} 
            />
            {errors.image && touched.image && <p className="error">{errors.image}</p>}
            <label htmlFor="biome">Favorite Biome</label>
            <input
                value={values.biome}
                onChange={handleChange}
                onBlur={handleBlur}
                id="biome" 
                type="text" 
                placeholder="Enter your favorite biome"
                className={errors.biome && touched.biome ? "input-error" : ""} 
            />
            {errors.biome && touched.biome && <p className="error">{errors.biome}</p>}
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
            <label htmlFor="password">Confirm Password</label>
            <input
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password"
                className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""} 
            />
            {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                <button disabled={isSubmitting} type="submit">Submit</button>
        </form>
    )
};
export default HabitatForm;