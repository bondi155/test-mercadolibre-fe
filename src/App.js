import React from 'react';
import './App.css';
import './css/style.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './componentes/NavBar';
import Busqueda from './pantallas/Busqueda';
import Detalle from './pantallas/Detalle';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route path='/*' element={<Navigate replace to='/' />} />
            <Route path='/items' element={<Busqueda />}></Route>
            <Route path='/items/:id' element={<Detalle />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <br />
    </div>
  );
}

export default App;
