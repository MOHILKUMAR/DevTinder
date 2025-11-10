import Body from "./components/Body.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed.jsx";

function App() {
  return (
    <>
     <Provider store = {appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
           <Route path="/" element={<Feed /> }/>
           <Route path="/login" element={<Login /> }/>
           <Route path="/profile" element={<div>Profile </div>} />
          </Route>
          

         
        </Routes>
      </BrowserRouter>
     </Provider>
    </>
  );
}

export default App;
