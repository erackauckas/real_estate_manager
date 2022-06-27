function Navigation({setIsAuthenticated, setUser, setIsAdmin}) {
    
    const logout = () => {
        fetch ('/logout', {
            method:'DELETE'
        })
        
        .then(()=>{
            setIsAuthenticated(false)
            setUser(null)
            setIsAdmin(false)
        })
    }
    return (
        <> 
   
         <h1> Real Estate Website</h1>
         <div>
            <button onClick={logout}>Logout</button>           
         </div>

        </>
    )
}

export default Navigation;