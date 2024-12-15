import { Client, ID, Storage } from "appwrite";
import envImport from "../environment variables import file/envImport";

class ProfileImageService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.storage = new Storage(this.client);
  }

  async uploadProfileImage(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        envImport.profileImagesID, // Updated to use profile images bucket
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      console.log(
        "Appwrite error :: upload profile image error :: " + error.message
      );
      return false;
    }
  }

  getProfileImagePreview(fileId) {
    try {
      const previewFile = this.storage.getFilePreview(
        envImport.profileImagesID, // Updated to use profile images bucket
        fileId
      );
      return previewFile;
    } catch (error) {
      console.log(
        "Appwrite error :: get profile image preview error :: " + error.message
      );
      return false;
    }
  }

  async deleteProfileImage(fileId) {
    try {
      const deletedFile = await this.storage.deleteFile(
        envImport.profileImagesID, // Updated to use profile images bucket
        fileId
      );
      return deletedFile;
    } catch (error) {
      console.log(
        "Appwrite error :: delete profile image error :: " + error.message
      );
      return false;
    }
  }

  async getAllProfileImages() {
    try {
      const filesArr = await this.storage.listFiles(envImport.profileImagesID); // Updated to use profile images bucket
      return filesArr;
    } catch (error) {
      console.log(
        "Appwrite error :: get profile images error :: " + error.message
      );
      return false;
    }
  }
}

const profileImageService = new ProfileImageService();

export default profileImageService;
