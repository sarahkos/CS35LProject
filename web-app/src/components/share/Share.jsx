import "./share.css"
import {PermMedia} from "@mui/icons-material"

export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src="/assets/person/1.jpg" alt="" />
                <input placeholder="What recipe is in your mind?"
                className="shareInput"/>
            </div>
            <hr className="shareHr"/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <PermMedia htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                    </div>
                </div>
                <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  )
}
