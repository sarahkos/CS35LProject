import "./share.css"
import {PermMedia} from "@mui/icons-material"
import { useRef, useState } from "react"
import axios from "axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Share() {
    //testing
    // const desc = useRef();
    const [file,setFile] = useState(null)
    const [recipeid, setRecipeId] = useState("")

    const submitHandler = async (e) =>{
        e.preventDefault()

        const title_text = document.getElementById("titleField").value;
        const body_text = document.getElementById("instructionField").value;
        const ingredient_text = document.getElementById("ingredientField").value;

        const ingredient_array = ingredient_text.split(',');

        const RecipeObject = {title: title_text, text: body_text, ingredients: ingredient_array};
        
        const textHandler = async () => {
            axios.post(SERVER_URL + "/api/recipes", RecipeObject, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                    const recipe_id = res.data.recipe.id;
                    if (file) {
                        const formData = new FormData();
                        formData.append('image', file);
                        axios.post(SERVER_URL + '/api/recipes/' + recipe_id + '/image', formData, {
                            withCredentials: true,
                            'Content-Type': 'multipart/form-data',
                        })
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                    document.getElementById("titleField").value = '';
                    document.getElementById("instructionField").value = '';
                    document.getElementById("ingredientField").value = '';
                })
                .catch(err => {
                    console.log(err)
                });
        }
        textHandler();
        

        

        
    }


  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <span className="shareOptionText">Share a Recipe</span>
                <form>
                    <input id="titleField" placeholder="Title" className="shareInput"/>
                    <input id="ingredientField" placeholder="Ingredients as comma separated list" className="shareInput" />
                    <textarea id="instructionField" placeholder="Instructions" className="shareInput" />
                </form>
                {/* ref ={desc} */}
            </div>
            <hr className="shareHr"/>
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display: "none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
