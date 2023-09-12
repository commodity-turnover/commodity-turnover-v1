import Router from "../routes/Router";
import Header from "../components/UI/Header/Header";
import Footer from "../components/UI/Footer/Footer";

import 'animate.css';
import "../assets/styles/reset.scss";
import "../assets/styles/global.scss";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
