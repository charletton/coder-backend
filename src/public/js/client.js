console.log('Conectado a front!');
const socket = io();

socket.on('log', data => {
  const productsDiv = document.getElementById('productsLog');
  let products = "";
  data.forEach(product => {
    products += `${product.title}, precio: ${product.price}<br/>`;
  });
  productsDiv.innerHTML = products;
});
