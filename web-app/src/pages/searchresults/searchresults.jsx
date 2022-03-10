import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import { useEffect, useState } from 'react'
import axios from "axios"

export default function SearchResultsFeed() {

    return (
        <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                    <div className= "searchresultsFeed">
                    
                    </div>
                <Rightbar/>
            </div>
        </>
    )
}