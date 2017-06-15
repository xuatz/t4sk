import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { Half, Quarter } from "grid-styled";

//======================
//consider to relocate if necessary
const Icon = styled(Link)`
	font-size: 20px;
	text-decoration: none;
	color: black;
`;
const Header = props =>
    <div>
        <Half><Icon to="/">React Boilerplate 2017</Icon></Half>
        <Half>
            <Quarter> <Link to="/">Home</Link>{" "}
            </Quarter>
            <Quarter><Link to="/about">About</Link></Quarter>
            <Quarter>
                <a
                    href="/"
                    onClick={() => {
                        let API = axios.create({
                            baseURL:
                                process.env.REACT_APP_API_URL ||
                                    "http://localhost:9000",
                            withCredentials: true,
                            timeout: 5000
                        });

                        API.get("/auth/logout").then(res => {
                            console.log(res);
                        });
                    }}>
                    Logout
                </a>
            </Quarter>
        </Half>
    </div>;

//======================

const layoutStyle = {
    margin: "15px 10px",
    padding: "15px 10px"
    // border: '1px solid #DDD'
};
const Layout = props =>
    <div style={layoutStyle}>
        <Header />
        <hr />
        {props.children}
    </div>;

export default Layout;
