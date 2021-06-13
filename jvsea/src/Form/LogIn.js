import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import BoxShadow from "../UI/BoxShadow";
import Center from "../UI/Center";
import MyButton from "../UI/MyButton";
import Spacer from "../UI/Spacer";
import formik, { useFormik } from "formik";
import * as Yup from "yup";

const Uservalidation = Yup.object({
  Email: Yup.string().email("Invalid email address").required(),
  Password: Yup.string()
    .matches(
      "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    )
    .required(),
});

export default function LogIn() {
  const [type, settype] = useState("advertiser");
  const action = useContext(UserContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: Uservalidation,
    onSubmit: (values) => {
      action.setlogin(true);
      history.replace("/Dashboard");
    },
  });

  useEffect(() => {
    console.log("context value", action);
    action.setuser(type);
  }, [type]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "580px",
        border: "1px solid black",
      }}
    >
      <BoxShadow>
        <div style={{ width: "400px", padding: "40px" }}>
          <div>
            <Center>
              <h2 style={{ textDecoration: "underline" }}>SIGN IN</h2>
            </Center>
            <Spacer space={30} />
            <Center>
              <TextField
                fullWidth
                id="standard-basic"
                label="Email"
                name="Email"
                variant="outlined"
                placeholder="Enter the Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
              />
            </Center>
            {formik.touched.Email && formik.errors.Email ? (
              <div style={{ color: "#B00020" }}>{formik.errors.Email}</div>
            ) : null}
            <Spacer space={10} />
            <Center>
              <TextField
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
                id="standard-basic"
                label="Password"
                name="Password"
                variant="outlined"
                placeholder="Enter the Password"
              />
            </Center>
            {formik.touched.Password && formik.errors.Password ? (
              <div style={{ color: "#B00020" }}>{formik.errors.Password}</div>
            ) : null}
            <Spacer space={10} />
            <Center>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div style={{ display: "flex" }}>
                  <input
                    style={{ marginTop: "5px" }}
                    type="radio"
                    value="advertiser"
                    checked={type == "advertiser"}
                    name="user"
                    onChange={() =>
                      settype(type == "advertiser" ? "promoter" : "advertiser")
                    }
                  />
                  <span style={{ marginLeft: "10px" }}>
                    <span style={{ fontWeight: "500" }}>Advertiser</span>
                    <p style={{ color: "#737070" }}>Manage Brand</p>
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    style={{ marginTop: "5px" }}
                    type="radio"
                    value="promoter"
                    checked={type == "promoter"}
                    name="user"
                    onChange={() =>
                      settype(type == "advertiser" ? "promoter" : "advertiser")
                    }
                  />
                  <span style={{ marginLeft: "10px" }}>
                    <span style={{ fontWeight: "500" }}>Promoter</span>
                    <p style={{ color: "#737070" }}>Promoter Brands</p>
                  </span>
                </div>
              </div>
            </Center>
            <Spacer space={5} />

            <MyButton
              style={{ display: "flex" }}
              onPress={() => {
                console.log("cliced");
                formik.handleSubmit();
              }}
            >
              SIGN IN
            </MyButton>

            <Spacer space={5} />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <span style={{ color: "#737070" }}>Forgot Password?</span>
              <span style={{ color: "#737070" }}>Not a member yet?</span>
            </div>
          </div>
        </div>
      </BoxShadow>
    </div>
  );
}
