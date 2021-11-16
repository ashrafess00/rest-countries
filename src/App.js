import Home from "./Home";
import NavBar from "./NavBar";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CountryInfo from "./CountryInfo";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
      <Route path="/" exact>
      <Home />
      </Route>
      <Route path="/:id" component={CountryInfo} />
      </Switch>
      

    </BrowserRouter>
  );
}

export default App;
