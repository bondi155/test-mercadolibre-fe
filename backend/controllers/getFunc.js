const URL = 'https://api.mercadolibre.com';
const fetch = require('node-fetch');

//get productos limitado a 4 resultados en front y mapeo de respuesta
async function getDataProductos__(req, res) {
  const limiteRes = 4;

  let result;

  const query = req.query.q;

  await fetch(`${URL}/sites/MLA/search?q=${query}&limit=${limiteRes}`)
    .then((res) => res.json())
    .then((producto) => {
      result = producto.results;

      if (result.length > 0) {
        let products = result.map((result) => {
          return {
            condition: result.condition,
            free_shipping: result.shipping.free_shipping,
            id: result.id,
            location: result.address.state_name,
            picture: result.thumbnail,
            price: {
              amount: result.price,
              currency: result.currency_id,
              decimals: 2,
            },
            title: result.title,
          };
        });
        res.send(products);
      } else {
        throw 'Producto no encontrado.';
      }
    })
    .catch((err) => console.error('error:' + err));
}

//get item con mapeo de respuesta
async function getDataItems__(req, res) {
  const { id } = req.params;
  const response = await fetch(`${URL}/items/${id}`);
  const itemData = await response.json();

  const description = await fetch(`${URL}/items/${id}/description`);
  const descriptionParsed = await description.json();

  res.json({
    catch(error) {
      res.status(404).send(error);
      console.log(error);
    },

    item: {
      condition: itemData.condition,
      description: descriptionParsed.plain_text,
      free_shipping: itemData.shipping.free_shipping,
      id: id,
      picture: itemData.pictures[0].url,
      price: {
        amount: itemData.price,
        currency: itemData.currency_id,
        decimals: 2,
      },
      sold_quantity: itemData.sold_quantity,
      title: itemData.title,
    },
  });
}

module.exports = {
  getDataItems__: getDataItems__,
  getDataProductos__: getDataProductos__,
};
