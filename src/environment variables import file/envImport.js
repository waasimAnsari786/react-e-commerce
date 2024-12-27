const envImport = {
  projectURL: import.meta.env.VITE_PROJECT_URL,
  projectID: import.meta.env.VITE_PROJECT_ID,
  databaseID: import.meta.env.VITE_DATABASE_ID,
  collectionID: import.meta.env.VITE_COLLECTION_ID,
  userRoleCollectionID: import.meta.env.VITE_USER_ROLE_COLLECTION_ID,
  userAddToCartsID: import.meta.env.VITE_USER_ADD_TO_CARTS,
  catogoriesID: import.meta.env.VITE_CATOGORIES,
  ordersCollectionID: import.meta.env.VITE_ORDERS,
  productImagesID: import.meta.env.VITE_PRODUCTS_IMAGES_BUCKET_ID,
  profileImagesID: import.meta.env.VITE_PROFILE_IMAGES_BUCKET_ID,
  RTE_Key: import.meta.env.VITE_RTE_KEY,
};
export default envImport;
