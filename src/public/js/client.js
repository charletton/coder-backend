console.log('Conectado a front!');
const socket = io();


socket.on('log', data => {
  const productsDiv = document.getElementById('productsLog');
  let products = "";
  data.forEach(product => {
    products += `<div class="col-6">${product.title}, precio: ${product.price}</div><br/>
    <form type="submit" action="/api/carts/668da83fd48241debf96cb01/product/${product._id}" method="POST">
      <button type="submit">add to cart!</button>
    </form>`;
  });


  productsDiv.innerHTML = products;
});
