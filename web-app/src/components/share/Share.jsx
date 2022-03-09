import "./share.css"
import {PermMedia} from "@mui/icons-material"
import { useRef, useState } from "react"
import axios from "axios"

export default function Share() {

    // const desc = useRef();
    const [file,setFile] = useState(null)

    const submitHandler = async (e) =>{
        e.preventDefault()
        const newPost = {
            title: "title", 
            text: "it was good",
            ingredients: "rice"
        }
        try {
          await axios.post("/recipes", newPost)
        }catch(err){

        }
    }


  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src="/assets/person/1.jpg" alt="" />
                <input placeholder="What recipe is in your mind?"
                className="shareInput"/>
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
