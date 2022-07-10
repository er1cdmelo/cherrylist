import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from './App.module.css'

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import WatchList from "./pages/WatchList";
import Favorites from "./pages/Favorites";

import Navbar from "./components/Navbar";
import ShowInfo from "./pages/ShowInfo";
import { WatchContext } from "./components/providers/watchlist";

function App() {
  return (
    <Router>
      <div className={styles.globalizer}>
      <Navbar />
      <WatchContext>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shows/:id" element={<ShowInfo />} />
        </Routes>
      </WatchContext>
      </div>
    </Router>
  );
}

export default App;
