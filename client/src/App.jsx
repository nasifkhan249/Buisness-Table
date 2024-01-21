import React, {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductList from "./pages/Product-List";
import FullscreenLoader from "./components/Fullscreen-Loader";
const App = () => {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<ProductList  />}  />
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
};
export default App;
