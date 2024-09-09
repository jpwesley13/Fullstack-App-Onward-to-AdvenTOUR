import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Signup() {
    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            image: "",
            biome: "",
            password: "",
            confirmPassword: ""
        }
    });
    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                value={formik.values.name}
                onChange={formik.handleChange}
                id="name" 
                type="name" 
                placeholder="Enter your name" />
            <label htmlFor="age">Age</label>
            <input
                value={formik.values.age}
                onChange={formik.handleChange}
                id="age" 
                type="number" 
                placeholder="Enter your age" />
            <label htmlFor="image">Profile Picture</label>
            <input
                value={formik.values.image}
                onChange={formik.handleChange}
                id="image" 
                type="text" 
                placeholder="Post your profile picture's url" />
            <label htmlFor="biome">Favorite Biome</label>
            <input
                value={formik.values.biome}
                onChange={formik.handleChange}
                id="biome" 
                type="text" 
                placeholder="Enter your favorite biome" />
            <label htmlFor="password">Password</label>
            <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password" 
                type="password" 
                placeholder="Enter your password" />
            <label htmlFor="password">Confirm Password</label>
            <input
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" />
                <button type="submit">Submit</button>
        </form>
    )
};
export default Signup;