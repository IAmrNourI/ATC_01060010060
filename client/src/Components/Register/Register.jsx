import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../Network/auth.api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


export default function Register() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerApi({
          name: values.name,
          email: values.email,
          password: values.password,
        });

      toast.success(response.data.message);
        resetForm();

      } catch (error) {
        toast.error(error.response.data.message);   
        console.log("testtting")
      }
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    dirty,
    isValid,
  } = formik;


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit} noValidate>


          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button
            type="submit"
            disabled={!dirty || !isValid}
            className="btn btn-success w-100"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/auth/login" href="/check-mail" className="text-success fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
