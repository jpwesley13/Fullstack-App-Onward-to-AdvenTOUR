import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();
    const {onAddTrainer} = useOutletContext();

    function handleAddTrainer(newTrainer){
        onAddTrainer(newTrainer)
    };

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter name.").max(24),
        age: yup.number().integer().required("Must enter age.").min(10, "Must be at least 10 years old to join."),
        image: yup.string().optional(),
        biome: yup.string().optional(),
        password: yup.string().min(6).max(30).required("Must create a password."),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match.").required("Required.")
    });

    const onSubmit = async (values, actions) => {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(res => res.json())
        .then(data => {
            handleAddTrainer(data)
        })
        actions.resetForm();
        // navigate('/')
      };
    
    const {values, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            name: "",
            age: "",
            image: "",
            biome: "",
            password: "",
            confirmPassword: ""
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
                id="name" 
                type="name" 
                placeholder="Enter your name" />
            <label htmlFor="age">Age</label>
            <input
                value={values.age}
                onChange={handleChange}
                id="age" 
                type="number" 
                placeholder="Enter your age" />
            <label htmlFor="image">Profile Picture</label>
            <input
                value={values.image}
                onChange={handleChange}
                id="image" 
                type="text" 
                placeholder="Post your profile picture's url" />
            <label htmlFor="biome">Favorite Biome</label>
            <input
                value={values.biome}
                onChange={handleChange}
                id="biome" 
                type="text" 
                placeholder="Enter your favorite biome" />
            <label htmlFor="password">Password</label>
            <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password" 
                type="password" 
                placeholder="Enter your password" />
            <label htmlFor="password">Confirm Password</label>
            <input
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" />
                <button disabled={isSubmitting} type="submit">Submit</button>
        </form>
    )
};
export default Signup;