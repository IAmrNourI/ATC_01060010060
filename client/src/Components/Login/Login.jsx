import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginApi } from "../../Network/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await LoginApi(values);
        console.log(result);
        

        if (result.data.success) {
          toast.success(result.data.message);
          formik.resetForm();
          localStorage.setItem("token", result.data.token);

          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);   
        console.log(error);
        
      }
    },
  });

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? "is-invalid" : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          New User?{" "}
          <Link to="/auth/register" className="text-primary fw-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
