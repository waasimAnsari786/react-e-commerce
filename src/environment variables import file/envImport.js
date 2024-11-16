const envImport = {
  projectURL: String(import.meta.env.VITE_PROJECT_URL),
  projectID: String(import.meta.env.VITE_PROJECT_ID),
  databaseID: String(import.meta.env.VITE_DATABASE_ID),
  collectionID: String(import.meta.env.VITE_COLLECTION_ID),
  userRoleCollectionID: String(import.meta.env.VITE_USER_ROLE_COLLECTION_ID),
  productImagesID: String(import.meta.env.VITE_PRODUCTS_IMAGES_BUCKET_ID),
  profileImagesID: String(import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID),
};
export default envImport;
