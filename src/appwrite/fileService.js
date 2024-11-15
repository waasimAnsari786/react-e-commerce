import { Client, ID, Storage } from "appwrite";
import envImport from "../environment variables import file/envImport";

class File {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(envImport.projectURL);
    this.client.setProject(envImport.projectID);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        envImport.productImagesID,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      console.log("appwrite error :: upload file error :: " + error.message);
      return false;
    }
  }

  getPreviewFile(fileId) {
    try {
      const getPreviewedFile = this.storage.getFilePreview(
        envImport.productImagesID,
        fileId
      );
      return getPreviewedFile;
    } catch (error) {
      console.log(
        "appwrite error :: get previewd file error :: " + error.message
      );
      return false;
    }
  }
  async deleteImage(fileId) {
    try {
      const deletedFile = await this.storage.deleteFile(
        envImport.productImagesID,
        fileId
      );
      return deletedFile;
    } catch (error) {
      console.log("appwrite error :: delete file error :: " + error.message);
      return false;
    }
  }

  async getAllFiles() {
    try {
      const filesArr = await this.storage.listFiles(envImport.productImagesID);
      return filesArr;
    } catch (error) {
      console.log("appwrite error :: get files error :: " + error.message);
      return false;
    }
  }
}

const file = new File();

export default file;
