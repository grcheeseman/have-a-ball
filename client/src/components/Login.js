// import { Link } from "react-router-dom";
// // import { UserContext } from "../context/User";
// // import { useContext } from "react";

// function Login({ user, setUser }) {

// // const { user, setUser } = useContext(UserContext)

//     function handleLogin(e) {
//         e.preventDefault();
  
//         let username = e.target.username.value;
//         let password = e.target.password.value;
  
//         fetch("/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify( { username, password } ),
//           }).then((resp) => {
//             if (resp.ok) {
//               resp.json().then((knitter) => setUser(knitter));
//             }
//           });
//     }

//     let loginForm = (user === null) ? (
//         <>
//         <h1>Login Form</h1>
//         <form onSubmit = {handleLogin}>
//           <label htmlFor="username">Username: </label>
//           <input id = "username" type = "text" />
//           <label htmlFor="password">Password: </label>
//           <input id = "password" type = "password" />
//           <button className = "border-2 p-2" type = "submit">Login</button>
//         </form>
//         </>
//       ) : "You are already logged in!";

//       return (
//         <>
//         {loginForm}
//         <Link to="/logout">Logout Instead</Link>
//         </>
//       )



// }

// export default Login;