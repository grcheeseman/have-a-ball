// import React from "react";
// import { useState } from "react";

// //create the context
// const UserContext = React.createContext();

// //crate a provider component
// function UserProvider({ children }) {
//     const [ user, setUser ] = useState(null);

//     // the value prop of the provider(App) will be our context data
//     // this value will be available to child components (login & logout) of the provider (App)
//     return (
//         <UserContext.Provider value={{ user, setUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export { UserContext, UserProvider };