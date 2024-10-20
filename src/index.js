import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Main from './Components/Main';
import Pokemon from './Components/Pokemon';
import "./style.css"

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:name" element={<Pokemon />} /> 
      
    </Routes>
  </Router>,
  document.getElementById("app")
);