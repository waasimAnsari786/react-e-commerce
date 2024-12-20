import "./index.css";
import {
  LoginPage,
  SignUpPage,
  AuthProtectedLayout,
  MyWebLayout,
  HomePage,
  SingleProduct,
  AllProducts,
  Admin,
  AdminStats,
  CartPage,
  AddCatogory,
  ProductForm,
  AllItemsPage,
  EditItemsPage,
  ProfileSection,
} from "./components/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MyWebLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: (
            <AuthProtectedLayout authentication={false}>
              <LoginPage />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthProtectedLayout authentication={false}>
              <SignUpPage />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/shop",
          element: (
            <AuthProtectedLayout authentication>
              <AllProducts />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/product/:slug/:productId",
          element: (
            <AuthProtectedLayout authentication>
              <SingleProduct />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/cart",
          element: (
            <AuthProtectedLayout authentication>
              <CartPage />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin",
          element: (
            <AuthProtectedLayout authentication>
              <Admin />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/dashboard",
          element: (
            <AuthProtectedLayout authentication>
              <AdminStats />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/add-product",
          element: (
            <AuthProtectedLayout authentication>
              <ProductForm />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/add-category",
          element: (
            <AuthProtectedLayout authentication>
              <AddCatogory />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/categories",
          element: (
            <AuthProtectedLayout authentication>
              <AllItemsPage
                searchKeyword="catogName"
                rowCompName="categories"
                tHeadArr={[
                  "Category Name",
                  "Category Slug",
                  "Parent Category",
                  "Sub Categories",
                  "Action",
                ]}
              />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/products",
          element: (
            <AuthProtectedLayout authentication>
              <AllItemsPage
                searchKeyword="pName"
                rowCompName="products"
                tHeadArr={[
                  "Product Image",
                  "Product Name",
                  "Product Slug",
                  "Product Category",
                  "Product Price",
                  "Product Sale Price",
                  "Product Status",
                  "Action",
                ]}
              />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/pending-orders",
          element: (
            <AuthProtectedLayout authentication>
              <AllItemsPage
                searchKeyword="pName"
                rowCompName="pending-orders"
                tHeadArr={[
                  "Product Image",
                  "Product Name",
                  "Product Slug",
                  "Product Qty",
                  "Product Price",
                  "Product Sale Price",
                  "Order Status",
                  "Customer Name",
                  "Action",
                ]}
              />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/completed-orders",
          element: (
            <AuthProtectedLayout authentication>
              <AllItemsPage
                searchKeyword="pName"
                rowCompName="completed-orders"
                tHeadArr={[
                  "Product Image",
                  "Product Name",
                  "Product Slug",
                  "Product Qty",
                  "Product Price",
                  "Product Sale Price",
                  "Order Status",
                  "Customer Name",
                ]}
              />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/edit-category/:slug/:categoryId",
          element: (
            <AuthProtectedLayout authentication>
              <EditItemsPage editItem="category" />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/edit-product/:slug/:productId",
          element: (
            <AuthProtectedLayout authentication>
              <EditItemsPage editItem="product" />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/admin/edit-orders/:slug",
          element: (
            <AuthProtectedLayout authentication>
              <EditItemsPage editItem="order" />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/profile",
          element: (
            <AuthProtectedLayout authentication>
              <ProfileSection />
            </AuthProtectedLayout>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
