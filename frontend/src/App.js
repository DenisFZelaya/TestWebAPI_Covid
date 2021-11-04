import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Employee, Vacunacion } from './Vacunacion';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { Pacientes } from './Pacientes';

function App() {
  return (
    <BrowserRouter>

      <div className="App container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img src="https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_960_720.png" style={{ width: "50px" }} />
               COVID 19
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <NavLink className="btn btn-light" to="/home">
                  Inicio
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="btn btn-light" to="/pacientes">
                  Pacientes
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="btn btn-light" to="/vacunacion">
                  Vacunacion
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/pacientes" component={Pacientes} />
          <Route path="/vacunacion" component={Vacunacion} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
