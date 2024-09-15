import { useFormik } from "formik";
import * as yup from "yup";

function EditSighting({ sighting, handleClick, setSightings }) {

    const formSchema = yup.object().shape({
        name: yup.string().optional().max(30),
        image: yup.string().optional(),
        blurb: yup.string().optional().max(200, "Please keep your recount of the rare sighting brief and below 200 characters.")
    });

    const onSubmit = async (values, actions) => {
        const filteredValues = Object.entries(values).reduce((acc, [key, value]) => {
            if(value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});

        fetch(`/sightings/${sighting.id}`, {
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
                setSightings(sightings => sightings.map(sighting => sighting.id === data.id ? data : sighting));
                handleClick();
                actions.resetForm();
            }
        })
        .catch(error => console.error(error))
      };
    
    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: sighting.name,
            image: sighting.image,
            habitat_id: "",
            blurb: sighting.blurb,
            trainer_id: ""
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
                placeholder="Update Pokemon's name if discovered"
                className={errors.name && touched.name ? "input-error" : ""} 
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
            <label htmlFor="blurb">Update your short Blurb for the Sighting</label>
            <input
                value={values.blurb}
                onChange={handleChange}
                onBlur={handleBlur}
                id="blurb" 
                type="text" 
                placeholder="Update your blurb"
                className={errors.blurb && touched.blurb ? "input-error" : ""} 
            />
            {errors.blurb && touched.blurb && <p className="error">{errors.blurb}</p>}
            <label htmlFor="image">Sighting Picture</label>
            <input
                style={{ marginBottom: '1rem' }}
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                id="image" 
                type="text" 
                placeholder="Update image url of the rare sighting" 
                className={errors.image && touched.image ? "input-error" : ""} 
            />
            {errors.image && touched.image && <p className="error">{errors.image}</p>}
                <button disabled={isSubmitting} type="submit">Submit</button>
        </form>
    )
};
export default EditSighting;