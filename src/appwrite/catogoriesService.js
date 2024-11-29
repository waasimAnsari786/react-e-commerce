import { Client, Databases, ID, Query } from "appwrite";
import envImport from "../environment variables import file/envImport";
import { toast } from "react-toastify"; // Import toast from React-toastify

class Category {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.database = new Databases(this.client);
  }

  async createCategory(category) {
    console.log(category);

    try {
      const createdCategory = await this.database.createDocument(
        envImport.databaseID,
        envImport.catogoriesID,
        ID.unique(),
        { ...category }
      );
      return createdCategory;
    } catch (error) {
      toast.error("Error creating category: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async updateCategory(category) {
    try {
      const updatedCategory = await this.database.updateDocument(
        envImport.databaseID,
        envImport.catogoriesID,
        category.$id,
        { ...category.updatedObj }
      );
      return updatedCategory;
    } catch (error) {
      toast.error("Error updating category: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async deleteCategory(docID) {
    try {
      const deletedCategory = await this.database.deleteDocument(
        envImport.databaseID,
        envImport.catogoriesID,
        docID
      );
      return deletedCategory;
    } catch (error) {
      toast.error("Error deleting category: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async getCategories() {
    try {
      const fetchedCategories = await this.database.listDocuments(
        envImport.databaseID,
        envImport.catogoriesID
      );
      return fetchedCategories;
    } catch (error) {
      toast.error("Error fetching categories: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }
}

const category = new Category();

export default category;
