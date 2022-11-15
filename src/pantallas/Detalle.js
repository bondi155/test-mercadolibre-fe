import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detalle() {
  const [infoItem, setInfoItem] = useState({});

  //parametro id para url router-dom
  const { id } = useParams();

  const getItem = async () => {
    await axios
      .get(`http://localhost:5007/items/${id}`, {
        params: {
          id: { id },
        },
      })
      .then((item) => {
        const single_item = item.data;

        const encabezado = {
          author: { lastname: 'Redonte', name: 'Alejandro' },
          item: item.data,
        };
        setInfoItem(single_item);
        console.log(encabezado);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isMounted = useRef(false);

  /* 
    con hook useRef checa si el componente esta montado antes de actualizar
    el estado , y asi evitamos doble renderizacion con useEffect por el strict
    mode.
    */

  useEffect(() => {
    if (isMounted.current) {
      getItem();
    } else {
      isMounted.current = true;
    }
  }, []);

  return (
    <div className='header'>
      {Object.values(infoItem).map((item, id) => {
        return (
          <Fragment key={id}>
            <div className='card'>
              <Container>
                <Row>
                  <Col sm={6}>
                    <img src={item.picture} alt='' className='img-detalle' />
                  </Col>
                  <Col sm={1}></Col>
                  <Col sm={4}>
                    <p className='condition'>{item.condition} - </p>
                    <p className='vendidos'>
                      {' '}
                      - {item.sold_quantity} vendidos
                    </p>{' '}
                    <h3>{item.title}</h3>
                    <h1>
                      ${' '}
                      {Intl.NumberFormat('de-DE', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }).format(item.price.amount)}{' '}
                    </h1>
                    <Button variant='primary'>Comprar</Button>{' '}
                  </Col>
                </Row>
              </Container>
              <br />
              <Container>
                <Row>
                  <Col className='description' sm={8}>
                    <h4>Descripción del producto</h4>
                    <p className='text-descrip'> {item.description}</p>
                  </Col>
                </Row>
              </Container>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default Detalle;
