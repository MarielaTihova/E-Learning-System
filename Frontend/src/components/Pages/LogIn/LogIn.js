// import React, { useState } from "react";
// import { Button, FormGroup, FormControl,FormLabel } from "react-bootstrap";
// import "./Login.css";

// // ControlLabel is work in the old version of react bootstrap,
// // In the new Version is FormLabel and also,
// //The solution is to find every instance of bsSize="large" in the code, and replace that with size="lg".



// const Login = () => {
//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   function validateForm() {
//     return username.length > 0 && password.length > 0;
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   return (
//     <div className="Login">
//       <form onSubmit={handleSubmit}>
//         <FormGroup controlId="username" size="lg">
//           <FormLabel>Username</FormLabel>
//           <FormControl
//             autoFocus
//             type="username"
//             value={username}
//             onChange={e => setUserName(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup controlId="password" size="lg">
//           <FormLabel>Password</FormLabel>
//           <FormControl
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             type="password"
//           />
//         </FormGroup>
//         <Button block size="lg" disabled={!validateForm()} type="submit">
//           Login
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default Login;
