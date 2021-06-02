import React from 'react'
import { useHistory } from 'react-router'

const NavBar = () => {
    const data=localStorage.getItem('user')
    let currentUser
    if(data)
    {
        currentUser=JSON.parse(data)
    }
    const history=useHistory()
    const logout =()=>{
        localStorage.removeItem('user')
        history.push('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-dark fixed-top  bg-dark">
                <div className="container-fluid">
                    <h1 className="navbar-brand">LISTIEE</h1>
                    {currentUser?<button className="btn btn-primary" type="submit" onClick={logout}>Logout</button>:null}
                </div>
            </nav>
        </div>
    )
}

export default NavBar
