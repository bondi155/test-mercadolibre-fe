
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const port = 5007;
const getFunc = require('./controllers/Getfunc');
const router = express.Router();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

router.use((request, response, next) => {
  console.log('Get desde API ML OK');
  next();
});
//get productos busqueda
app.get('/api/search', getFunc.getDataProductos__);

//get item detalle
app.get('/items/:id', getFunc.getDataItems__);

app.listen(port, () => {
  console.log('servidor iniciado');
});
