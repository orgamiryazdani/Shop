import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUser } from "../../services/loginService";
import { useAuthActions, useAuth } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ history }) => {
  const setAuth = useAuthActions();
  const auth = useAuth();
  const [error, setError] = useState(null);
  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      setError(null);
      history.push(redirect);
    } catch (error) {
      setError(error.message);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="fromContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <div className="btnSgn">
          <div>
            <button
              style={{ width: "100%" }}
              type="submit"
              disabled={!formik.isValid}
              className="btn primary"
            >
              Login
            </button>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
            <Link to={`/signup?redirect=${redirect}`}>
              <p style={{ marginTop: "15px" }}>Not signup yet ?</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
