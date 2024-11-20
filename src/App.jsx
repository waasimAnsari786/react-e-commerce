import "./index.css";
import {
  LoginPage,
  SignUpPage,
  AuthProtectedLayout,
  MyWebLayout,
  HomePage,
  AddProduct,
  SingleProduct,
  AllProducts,
  Admin,
  AdminStats,
  CartPage,
} from "./components/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
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
          path: "/product/:slug",
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
      ],
    },
    {
      path: "/admin",
      element: (
        <AuthProtectedLayout authentication>
          <Admin />
        </AuthProtectedLayout>
      ),
      children: [
        {
          path: "stats",
          element: (
            <AuthProtectedLayout authentication>
              <AdminStats />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "add-product",
          element: (
            <AuthProtectedLayout authentication>
              <AddProduct />
            </AuthProtectedLayout>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
