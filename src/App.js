import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedPages from './pages/ProtectedPage';
import PokemonList from './pages/PokemonList';
import Pokemon from './pages/Pokemon';
import Encounters from './pages/Encounters';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path='/' element={<Login/>} />
          <Route element={<ProtectedPages/>}>
            <Route path='/pokedex' element={<PokemonList/>}/>
            <Route path='/pokedex/pokemon/:id' element={<Pokemon/>}/>
          <Route path='/pokedex/pokemon/:id/encounters' element={<Encounters/>}/>
            
        </Route>
        <Route path='/settings'/>
        </Routes>
    </div>
  );
}

export default App;
