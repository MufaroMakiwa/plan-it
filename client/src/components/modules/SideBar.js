import { Link } from '@reach/router';
import React, { Component } from 'react';
import { sideBarMenus } from "./SideBarMenus.js";
import "./SideBar.css";


class SideBar extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.setState ({
            selected: window.location.pathname
        })
    }


    componentDidUpdate() {
        window.onpopstate = (e) => {
            this.updateSelected(window.location.pathname)
        }
    }


    updateSelected = (link) => {
        if (link === this.state.selected) {
            console.log("Clicked the same tab");
            return;
        }
        this.setState({
            selected: link
        })
        console.log(link);
    }


    render() { 
        return ( 
            <div className="SideBar-container">
                <ul className="SideBar-menus">
                    {sideBarMenus.map((val, key) => {
                        return (
                            <li key={key} onClick={() =>this.updateSelected(val.link)}>
                                <Link to={ val.link } className={val.link === window.location.pathname ? "SideBar-row selected" : "SideBar-row"} >
                                    <div>{val.title}</div>
                                </Link>
                            </li>
                        )
                    })}
                </ul> 

                <div className="SideBar-signOutContainer">
                    <hr className="SideBar-horizontalLine" />
                    <button className="SideBar-button" onClick={() => alert("Handle me")}>
                        Sign out
                    </button>
                </div>
                
            </div>
        );
    }
}

 
export default SideBar;