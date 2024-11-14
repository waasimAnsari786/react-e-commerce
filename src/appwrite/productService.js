import { Client, Databases, ID, Query } from "appwrite";
import envImport from "../environment variables import file/envImport";
import { toast } from "react-toastify"; // Import toast from React-Toastify

class Product {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.database = new Databases(this.client);
  }

  async createProduct(product) {
    try {
      const createdProduct = await this.database.createDocument(
        envImport.databaseID,
        envImport.collectionID,
        ID.unique(),
        { ...product }
      );
      return createdProduct;
    } catch (error) {
      toast.error("Error creating product: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async updateProduct(product) {
    try {
      const updatedProduct = await this.database.updateDocument(
        envImport.databaseID,
        envImport.collectionID,
        product.docID,
        { ...product.updatedObj }
      );
      return updatedProduct;
    } catch (error) {
      toast.error("Error updating product: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async deleteProduct(docID) {
    try {
      const deletedProduct = await this.database.deleteDocument(
        envImport.databaseID,
        envImport.collectionID,
        docID
      );
      return deletedProduct;
    } catch (error) {
      toast.error("Error deleting product: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async getProducts() {
    try {
      const fetchedProducts = await this.database.listDocuments(
        envImport.databaseID,
        envImport.collectionID
      );
      return fetchedProducts;
    } catch (error) {
      toast.error("Error fetching products: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }
}

const product = new Product();

export default product;
