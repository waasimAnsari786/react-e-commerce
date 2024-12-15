import { Client, Account, ID } from "appwrite";
import envImport from "../environment variables import file/envImport";
import { toast } from "react-toastify";

class Auth {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const createdAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (createdAccount) {
        await this.logInAccount({ email, password });
      }
      return createdAccount;
    } catch (error) {
      toast.error("Signup error: " + error.message, { position: "top-right" });
      return false;
    }
  }

  async logInAccount({ email, password }) {
    try {
      const loggedIn = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return loggedIn;
    } catch (error) {
      toast.error("Login error: " + error.message, { position: "top-right" });
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const getedUser = await this.account.get();
      return getedUser;
    } catch (error) {
      toast.error("Get user error: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  async logOut() {
    try {
      const loggedOut = await this.account.deleteSessions();
      return loggedOut;
    } catch (error) {
      toast.error("Logout error: " + error.message, { position: "top-right" });
      return false;
    }
  }

  // New method: Update email
  async updateEmail({ newEmail, password }) {
    try {
      const updatedEmail = await this.account.updateEmail(newEmail, password);
      return updatedEmail;
    } catch (error) {
      toast.error("Update email error: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }
  async updateName(name) {
    try {
      const updatedName = await this.account.updateName(name);
      return updatedName;
    } catch (error) {
      toast.error("Update name error: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }

  // New method: Update password
  async updatePassword({ newPassword, oldPassword }) {
    try {
      // Appwrite does not require the old password to update the password.
      const updatedPassword = await this.account.updatePassword(
        newPassword,
        oldPassword
      );
      return updatedPassword;
    } catch (error) {
      toast.error("Update password error: " + error.message, {
        position: "top-right",
      });
      return false;
    }
  }
}

const auth = new Auth();
export default auth;
