import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            {" "}
           <Route path="/login" element={<div>Login Page </div>} />
           <Route path="/profile" element={<div>Profile </div>} />
          </Route>
          

         
        </Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;
