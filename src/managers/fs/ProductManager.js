import fs from 'fs';
const PATH = './src/files/products.json'

class ProductManager {

  constructor() {
    this.path = PATH;
    this.init();
  }

  //init method
  async init() {

    //if the file doesn't exist: create (or try) file.
    if (!fs.existsSync(this.path)) {
      console.log("Products doesn't exist.. Creating products.json")
      try {
        await fs.promises.writeFile(this.path, JSON.stringify([]))
      } catch (error) {
        process.exit(1);
      }
    } else {
      console.log("Products found!");
    }
  }

  //showproducts method
  getProducts = async () => {
    const data = fs.readFileSync(this.path, 'utf-8')
    const parsedData = JSON.parse(data);
    return parsedData;
  }

  //create product method
  createProduct = async ({title, description, code, price, status, stock, category}) => {
    try {
      const data = fs.readFileSync(this.path, 'utf-8')
      const products = JSON.parse(data);
      const existingProduct = products.find(product => product.code === code);
      if (existingProduct) {
        throw new Error(`El producto con código ${code} ya existe.`);
      }

      //creating new id
      let newId
      if (products.length === 0) {
        newId = 1;
      } else {
        newId = products[products.length -1].id+1;
      }

      const newProduct = {
        id: newId,
        title,
        description,
        code,
        price,
        status,
        stock,
        category
      };

      products.push(newProduct)
      await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t'))

    } catch (error) {
      console.log('Error al insertar el usuario ' + error)
    }
  }

 // removing product by id
  async deleteProduct(productId) {
    try {
      //get data + parse
      const data = fs.readFileSync(this.path, 'utf-8');
      let products = JSON.parse(data);

      const productIndex = products.findIndex(p => p.id === productId);
      if (productIndex === -1) {
        throw new Error(`ID ${productId} no encontrado.`);
      }
      //delete product
      products.splice(productIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }

  //function for update products
  async updateProducts(products) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    } catch (error) {
      throw new Error('Error al actualizar la lista de productos: ' + error.message);
    }
  }


  //function for validating code
  async isCodeInUse(productId, code) {
    try {
      const products = await this.getProducts();
      return products.some(product => product.code === code && product.id !== productId);
    } catch (error) {
      throw new Error('Error al verificar si el código está en uso: ' + error.message);
    }
  }

  //function for validating id
  async validateProductId(pid){
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find(p => p.id === pid);

      if (!product) {
        throw new Error(`El producto con ID ${pid} no existe`);
      }

      return true;
    } catch (error) {
      console.log('Error while validate id product:',  error)
      return false
    }
  }
}

export default ProductManager;
