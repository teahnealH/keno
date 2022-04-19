import React from 'react';
import './App.css';
import {Keno} from "./components/keno/Keno";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Provider store={store}>
                    <Keno/>
                </Provider>
            </header>
        </div>
    );
}

export default App;
