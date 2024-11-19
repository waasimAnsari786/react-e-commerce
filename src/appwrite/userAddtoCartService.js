import { Client, Databases, ID, Query } from "appwrite";
import envImport from "../environment variables import file/envImport";
import { toast } from "react-toastify"; // Import toast from React-Toastify

class AddToCArts {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.database = new Databases(this.client);
  }

  async createAddtoCart(product) {
    try {
      const addedProduct = await this.database.createDocument(
        envImport.databaseID,
        envImport.userAddToCartsID,
        ID.unique(),
        { ...product }
      );
      return addedProduct;
    } catch (error) {
      toast.error("Error add to cart: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async updateAddToCart(product) {
    try {
      const updatedAddtoCart = await this.database.updateDocument(
        envImport.databaseID,
        envImport.userAddToCartsID,
        product.docID,
        { ...product.updatedObj }
      );
      return updatedAddtoCart;
    } catch (error) {
      toast.error("Error updating add to cart: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async deleteAddToCart(docID) {
    try {
      const deletedAddToCart = await this.database.deleteDocument(
        envImport.databaseID,
        envImport.userAddToCartsID,
        docID
      );
      toast.success("Product has deleted form cart!");
      return true;
    } catch (error) {
      toast.error("Error deleting add to cart: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async getAddToCarts() {
    try {
      const fetchedAddToCarts = await this.database.listDocuments(
        envImport.databaseID,
        envImport.userAddToCartsID
      );
      return fetchedAddToCarts;
    } catch (error) {
      toast.error("Error fetching add to carts: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }
}

const addToCartService = new AddToCArts();

export default addToCartService;
