import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios"
import { red } from "@mui/material/colors";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function ResultsFeed() {
  return (
        <div className="resultsfeed">
          <div className="resultsWrapper">
                       
          </div>
        </div>
  );
}
