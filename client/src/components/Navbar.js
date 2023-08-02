import { NavLink } from 'react-router-dom'

function Navbar(){
    return (
        <div className=" bg-slate-300 ">
            <div>
                <NavLink to='/'><h1 className='text-4xl text-black font-bold m-5'>Have A Ball</h1></NavLink>
                <ul className="text-l flex me-4 justify-end">
                    <li className="text-l m-2 py-2 pl-3 pr-4 text-black"><NavLink to="/knitters">Browse Knitters</NavLink></li>  
                    <li className="text-l m-2 py-2 pl-3 pr-4 text-black"><NavLink to="/projects">Browse Projects</NavLink></li>  
                    {/* <li className="text-l m-2 py-2 pl-3 pr-4 text-black"><NavLink to="/login">Login</NavLink></li>                 */}
                    {/* <li><NavLink to="/checkout">Cart</NavLink></li>   */}
                    {/* <li className="text-l m-2 py-2 pl-3 pr-4 text-black"><NavLink to="/logout">Logout</NavLink></li>                 */}
                    {/* <li className="text-l m-2 py-2 pl-3 pr-4 text-white"><NavLink to="/orders">Orders</NavLink></li> */}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;