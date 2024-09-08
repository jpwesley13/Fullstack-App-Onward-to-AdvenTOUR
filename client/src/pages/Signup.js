import { useFormik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Signup() {
    const formik = useFormik()
    const userAttr = {
        name: "",
        age: "",
        image: "",
        password: "",
        confirm: ""
    };
}