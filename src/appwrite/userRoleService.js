import { Client, Databases, ID, Query } from "appwrite";
import envImport from "../environment variables import file/envImport";

class UserRole {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.database = new Databases(this.client);
  }

  async createUserRole(role) {
    try {
      const userRole = await this.database.createDocument(
        envImport.databaseID,
        envImport.userRoleCollectionID,
        ID.unique(),
        { ...role }
      );
      return userRole;
    } catch (error) {
      console.log("create userRole error :: " + error.message);
      return false;
    }
  }

  async getUserRole() {
    try {
      const userRole = await this.database.listDocuments(
        envImport.databaseID,
        envImport.userRoleCollectionID
      );
      return userRole;
    } catch (error) {
      console.log("get userRole error :: " + error.message);
      return false;
    }
  }
}

const userRole = new UserRole();

export default userRole;
