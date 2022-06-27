import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
import SellHouse from "./Components/SellHouse";
import HouseGrid from "./Components/HouseGrid";
import Login from "./Components/Login";
import Auth from "./Components/Auth";
import Navigation from "./Components/Navigation";

function App() {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState(houses);
  const [errors, setErrors] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/authorized_user')
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {          
          setIsAuthenticated(true);
          setIsAdmin(user.admin)
          setUser(user);
        });
      }
    });

    fetch("/properties")
    .then((r) => r.json())
    .then((data) => setHouses(data));

  },[]);
  
  function handlePost(obj){
    fetch('/properties',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => {
      if(data.errors){
        setErrors(data.errors)
      } else {
        setHouses([...houses,data])
      }
    })
  }

  
  function handleHouseSearch(e){    
    const filteredHome=houses.filter(house=>{      
      return house.address.includes(e.target.value)           
    })
    setFilteredHouses(filteredHome)
  }
  useEffect(() =>{
    setFilteredHouses(houses)
  }, [houses]);
  
  // if (!isAuthenticated) return <Login error={'please login'} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />;

  // function handleDelete (property_id) {
  //   fetch()
  // }
 
  return (
    <BrowserRouter>
    <Navbar />
    <Navigation setIsAuthenticated={setIsAuthenticated} setUser={setUser} user={user} setIsAdmin={setIsAdmin}/>
    <br></br>
    <Search handleHouseSearch= {handleHouseSearch} />
      <div className="App">
      {(isAuthenticated) ? (
                <h2>Welcome, {user.name}!</h2> 
                ) : (
                <h3>not logged in</h3>
                )
            }
      <Outlet />
        <Routes>
        <Route exact path={"/"} element={<HouseGrid handleHouseSearch={handleHouseSearch} houses={filteredHouses} Search={Search}/>} />
        <Route exact path={"/HouseGrid"} element={<HouseGrid handleHouseSearch={handleHouseSearch} houses={filteredHouses} Search={Search} isAuthenticated={isAuthenticated} />} />
        <Route exact path={"/SellHouse"} element={<SellHouse handleHouseSearch={handleHouseSearch}  handlePost={handlePost} errors={errors} houses={filteredHouses} Search={Search}/>} />
        <Route exact path={"/Signup"} element={<Auth setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>} />          
        <Route exact path={"/Login"} element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} setIsAdmin={setIsAdmin}/>} />
        <Route exact path={"/HouseGrid/:id"} element={<HouseGrid handleHouseSearch={handleHouseSearch} houses={filteredHouses} Search={Search} isAdmin={isAdmin} setHouses={setHouses}/>}></Route>    
        </Routes>
      </div>
    </BrowserRouter> 
  );
}

export default App;