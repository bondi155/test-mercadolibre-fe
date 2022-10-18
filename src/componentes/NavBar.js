import '../css/style.css';
import LogoMl from '../Assets/img/Logo_ML.png';
import React from 'react';
import { useRecoilState } from 'recoil';
import { queryState, arrayProducto } from '../recoil/storage';
import axios from 'axios';
import { useNavigate, Outlet, useSearchParams } from "react-router-dom";
import { Navbar, Container, Form } from 'react-bootstrap';

function BarraNav() {
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useRecoilState(queryState);
  const [, setInfoData] = useRecoilState(arrayProducto);

  const addParams = () => {
    setParams({ query });
  };


  //get lista productos (busqueda)
  const getProducto = async () => {
    await axios
      .get(`http://localhost:5007/api/search?q=${query}`, {
        params: {
          query: query,
        },
      })
      .then((products) => {
        const productos = [...products.data];

        const encabezado = {
          author: { name: "Alejandro", lastname: "Redonte" },
          categories: ["id", "name"],
          items: products.data,
        };

        setInfoData(productos);
        console.log(encabezado);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate({
      pathname: "/items",
      search: `?search=${params}`,
    });
  };

  return (
    <>
      <Navbar className="barranav">
        <Container className="container-input">
          <Navbar.Brand href="#home">
            <img
              src={LogoMl}
              width="30"
              height="30"
              className="d-inline-block align-top logo  "
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              getProducto();
            }}
          >
            <Form.Control
              type="text"
              id="myInput"
              placeholder="Nunca dejes de buscar"
              title="busqueda"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <button onClick={addParams} className="btn-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default BarraNav;
