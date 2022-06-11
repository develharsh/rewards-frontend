import { useState, useEffect } from "react";
// import { Form, FormField, TextInput, Button, Box } from "grommet";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors, clearMessages } from "../actions/user";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, message, error } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (error) {
//       alert(error);
//       dispatch(clearErrors());
//     }
//     if (user) {
//       if (message) {
//         alert(message);
//         dispatch(clearMessages());
//       }
//       navigate("/");
//     }
//   }, [dispatch, message, error, user, navigate]);
//   const [values, setValues] = useState({ ID: "", password: "" });

//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = () => {
//     const { ID, password } = values;
//     dispatch(login(values));
//   };

//   return (
//     <>
//       <div className="d-flex-wrap evenly login-main">
//         <div>
//           <img
//             src="https://media.wired.com/photos/5d09594a62bcb0c9752779d9/16:9/w_2000,h_1125,c_limit/Transpo_G70_TA-518126.jpg"
//             alt=""
//             className="login-Tile"
//           />
//         </div>
//         <Form onSubmit={handleSubmit} onReset={() => navigate("/register")}>
//           <FormField name="name" label="Email Or Phone">
//             <TextInput
//               name="ID"
//               onChange={handleChange}
//               placeholder="abc@xy.z 9999999999"
//             />
//           </FormField>
//           <FormField name="name" label="Password">
//             <TextInput
//               type="password"
//               name="password"
//               onChange={handleChange}
//               placeholder="nPxM_123#4"
//             />
//           </FormField>
//           <Box direction="row" gap="medium">
//             <Button type="submit" primary label="Submit" />
//             <Button type="reset" label="Reset" />
//           </Box>
//         </Form>
//       </div>
//     </>
//   );
// }



function Login() {
  return (
    <div>Login</div>
  )
}

export default Login;
