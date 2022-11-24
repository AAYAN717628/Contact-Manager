import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Contact from "./pages/Contact";
function App() {
  return (
   <>
  <Router>
    
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/main" element={<Contact/>}/>
    </Routes>

</Router>
   </>
  );
}

export default App;
