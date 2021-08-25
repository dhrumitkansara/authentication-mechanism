import "./App.css";
import { useFormik } from "formik";
import axios from "axios";

// validation function for formik
const validate = (values) => {
  let errors = {};
  if (!values.accessCode) {
    errors.accessCode = "This field cannot be empty";
  } else if (values.accessCode.length < 6) {
    errors.accessCode = "Access Code should be atleast 6 characters long";
  }
  return errors;
};

function App() {
  // formik form starts here
  const formik = useFormik({
    initialValues: {
      accessCode: "",
    },
    validate,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      axios
        .post("http://localhost:4000/api/user-signin", values)
        .then((res) => {
          if (res.status === 200) {
            window.open("https://app.virtualbooth.me/booth/1LOlM26k", "_self");
          } else {
            alert("Invalid credentials!!!");
          }
        });
    },
  });

  return (
    <div className="App">
      <h1> Please enter your login access code here! </h1>
      {/* formik form that renders on front end */}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label className="label"> Access Code* </label> <br />
          <input
            name="accessCode"
            type="password"
            placeholder="Minimum 6 characters"
            className="input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accessCode}
          />
          {formik.touched.accessCode && formik.errors.accessCode ? (
            <div className="error-div"> {formik.errors.accessCode} </div>
          ) : null}
        </div>
        <br />
        <div className="btn">
          <button className="button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
