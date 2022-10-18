const URL = "https://api.mercadolibre.com";
const fetch = require("node-fetch");

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
            id: result.id,
            title: result.title,
            price: {
              currency: result.currency_id,
              amount: result.price,
              decimals: 2,
            },
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping,
            location: result.address.state_name,
          };
        });
        res.send(products);
      } else {
        throw "Producto no encontrado.";
      }
    })
    .catch((err) => console.error("error:" + err));
}

//get item con mapeo de respuesta
async function getDataItems__(req, res) {
  const { id } = req.params;
  const response = await fetch(`${URL}/items/${id}`);
  const itemData = await response.json();

  const description = await fetch(`${URL}/items/${id}/description`);
  const descriptionParsed = await description.json();

  res.json({
    item: {
      id: id,
      title: itemData.title,
      price: {
        currency: itemData.currency_id,
        amount: itemData.price,
        decimals: 2,
      },
      picture: itemData.pictures[0].url,
      condition: itemData.condition,
      free_shipping: itemData.shipping.free_shipping,
      sold_quantity: itemData.sold_quantity,
      description: descriptionParsed.plain_text,
    },

    catch(error) {
      res.status(404).send(error);
      console.log(error);
    },
  });
}

module.exports = {
  getDataProductos__: getDataProductos__,
  getDataItems__: getDataItems__,
};
