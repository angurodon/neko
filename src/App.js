import './App.css';
import Footer from './components/FooterComponents/Footer';
import Header from './components/HeaderComponents/Header';
import Homepage from './components/HomepageComponents/Homepage';
import Privacy from './components/PrivacyComponents/Privacy';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
// import SystemSupport from './components/SystemSupportComponents/SystemSupport';
// import BusinessSupport from './components/BusinessSupportComponents/BusinessSupport';
// import MAS from './components/MASComponents/MAS';
import Overview from './components/OverviewComponents/Overview';
import Company from './components/CompanyComponents/Company';


function App() {
  return (

    <Router>
      <div className="App">
                
      <Header />
        
        <Routes>
          <Route path="/neko" element={<Homepage />}></Route>
          <Route path="/" element={<Homepage />}></Route>

          <Route path="/overview" element={<Overview />} />
          <Route path="/company" element={<Company />} />

          {/* <Route path="/system-support" element={<SystemSupport />} />
          <Route path="/accounting-support" element={<BusinessSupport />} />
          <Route path="/management-advisory" element={<MAS />} /> */}
          <Route path="/privacy" element={<Privacy/> }></Route>
        </Routes>
        
      <Footer /> 
      </div>
    </Router>

  );
}

export default App;
