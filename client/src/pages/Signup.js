import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Signup() {
    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            image: "",
            password: "",
            confirm: ""
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
        </form>
    )
};
export default Signup;