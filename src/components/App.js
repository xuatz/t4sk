import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SessionCheckModule from "../components/common/SessionCheckModule";
import Layout from "../components/common/MyLayout";
import MainPage from "../components/MainPage";
import AboutPage from "../components/AboutPage";

import configureStore from "../store";

let store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SessionCheckModule>
                    <Router>
                        <Layout>
                            <Route exact path="/" component={MainPage} />
                            <Route path="/about" component={AboutPage} />
                            <Route path="/about/a" component={AboutPage} />
                            <Route path="/about/b" component={MainPage} />
                        </Layout>

                    </Router>
                </SessionCheckModule>

            </Provider>
        );
    }
}

export default App;
