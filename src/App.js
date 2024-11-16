import './App.css';
import Blog from './components/BlogComponents/Blog';
import Footer from './components/FooterComponents/Footer';
import Header from './components/HeaderComponents/Header';
import Homepage from './components/HomepageComponents/Homepage';
import Privacy from './components/PrivacyComponents/Privacy';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";


function App() {
  return (

    <Router>
      <div className="App">
                
      <Header />
        
        <Routes>
          <Route path="/" element={<Homepage />}></Route>

          <Route path="/blog" element={<Blog />}></Route>


          <Route path="/Privacy" element={<Privacy/> }></Route>
        </Routes>
        
      <Footer /> 
      </div>
    </Router>

  );
}

export default App;
