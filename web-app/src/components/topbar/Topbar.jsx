import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import axios from 'axios';
import qs from 'qs';
import { useHistory } from 'react-router-dom';
import { Input, modalUnstyledClasses } from "@mui/material";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_LOGOUT = SERVER_URL + '/api/users/logout';

const PATH_SEARCH = SERVER_URL + '/api/recipes/';
 
export default function Topbar() {
  
  const history = useHistory();
  const routeChangeLogin = () =>{ 
    let path = '/'; 
    history.push(path);
  }
  
  const handleClick = async ()=> {
    try {
      await axios.post(PATH_LOGOUT, {}, {withCredentials: true})
        .then(res => {
          console.log(res.data);
          routeChangeLogin();
        })
        .catch(err => {
          console.log(err)
        });
    }catch (error){
      console.log(error);
    }
  }

    const routeChangeSearch = (params) =>{ 
    history.push({
      pathname: '/search',
      search: params
    });
  }

  const keyHandler = async () => {
    const textList = document.getElementById("textSearchField").value;
    const ingredientList = document.getElementById("ingredientSearchField").value
      .split(",").map(x => x.trim());
    console.log(ingredientList);
    const params = {
      text: textList,
      ingredients: ingredientList,
    }
    routeChangeSearch(qs.stringify(params, {arrayFormat: 'repeat'}));
    // try{
    //   axios.get(PATH_SEARCH, { 
    //     params: {
    //       text: textList,
    //       ingredients: ingredientList,
    //     },
    //     paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
    //   })
    //   .then(res => {
    //   });
    // } catch(error) {
    //   console.log(error);
    // }
  }

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
        <img className="logoImg" src="/assets/logo.png" alt="" />
          <span className="logoTop">The Recipe</span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
              <button onClick= {keyHandler}>
                <Search className="searchIcon"/> 
              </button>
            <input id="textSearchField" type= "text" placeholder="Search for friend's recipe!" className="searchInput" />
            <input id="ingredientSearchField" type= "text" placeholder="Find Recipes with these ingredients" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
          </div>
          <div className="topbarIcons">
            {/* <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div> */}
          </div>
          <button className="logoutbutton" onClick={handleClick}>Logout</button>
        </div>
    </div>
  )
}

