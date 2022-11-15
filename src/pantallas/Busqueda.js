import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../css/style.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useRecoilValue } from 'recoil';
import ic_shipping from '../Assets/ic_shipping.png';
import { arrayProducto } from '../recoil/storage';

function Busqueda() {
  const infoData = useRecoilValue(arrayProducto);

  return (
    <div className='header'>
      {Object.values(infoData).map((producto, id) => {
        return (
          <Fragment key={id}>
            <LinkContainer to={`/items/${producto.id}`}>
              <Nav.Link>
                <div className='card-busqueda'>
                  <Container className='container-gral'>
                    <Row>
                      <Col sm={4}>
                        <img
                          src={producto.picture}
                          alt=''
                          className='img-busqueda'
                        />
                      </Col>
                      <Col sm={4}>
                        <p className='precio'>
                          $
                          {Intl.NumberFormat('de-DE', {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          }).format(producto.price.amount)}{' '}
                          {producto.free_shipping === true && (
                            <img
                              src={ic_shipping}
                              alt=''
                              className='img-shipp'
                            />
                          )}
                        </p>
                        <p>{producto.title}</p>
                      </Col>
                      <Col sm={4}>
                        <p className='location'> {producto.location}</p>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Nav.Link>
            </LinkContainer>
          </Fragment>
        );
      })}
    </div>
  );
}

export default Busqueda;
