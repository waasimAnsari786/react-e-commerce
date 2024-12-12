import { Client, Databases, ID, Query } from "appwrite";
import envImport from "../environment variables import file/envImport";
import { toast } from "react-toastify"; // Import toast from React-Toastify

class Orders {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.database = new Databases(this.client);
  }

  async createOrder(order) {
    try {
      const addedOrder = await this.database.createDocument(
        envImport.databaseID,
        envImport.ordersCollectionID,
        ID.unique(),
        { ...order }
      );
      if (addedOrder) {
        return addedOrder;
      }
    } catch (error) {
      toast.error("Error creating order: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async deleteOrder(docId) {
    try {
      const deletedOrder = await this.database.deleteDocument(
        envImport.databaseID,
        envImport.ordersCollectionID,
        docId
      );
      if (deletedOrder) {
        return true;
      }
    } catch (error) {
      toast.error("Error deleting order: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async updateOrder(order) {
    try {
      const updatedOrder = await this.database.updateDocument(
        envImport.databaseID,
        envImport.ordersCollectionID,
        order.$id,
        { ...order }
      );
      if (updatedOrder) {
        return updatedOrder;
      }
    } catch (error) {
      toast.error("Error updating order: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async getOrders(userId) {
    try {
      const fetchedOrders = await this.database.listDocuments(
        envImport.databaseID,
        envImport.ordersCollectionID,
        [Query.equal("adminId", userId)]
      );
      return fetchedOrders;
    } catch (error) {
      toast.error("Error fetching orders: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }
}

const ordersService = new Orders();
export default ordersService;
