import "./index.css";
import {
  LoginPage,
  SignUpPage,
  AuthProtectedLayout,
  MyWebLayout,
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
        // {
        //   path: "",
        //   element: <HomePage />,
        // },
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
        // {
        //   path: "/add-post",
        //   element: (
        //     <AuthProtectedLayout authentication>
        //       <PostForm />
        //     </AuthProtectedLayout>
        //   ),
        // },
        // {
        //   path: "/all-posts",
        //   element: (
        //     <AuthProtectedLayout authentication>
        //       <HomePage />
        //     </AuthProtectedLayout>
        //   ),
        // },
        // {
        //   path: "/post/:slug",
        //   element: (
        //     <AuthProtectedLayout authentication>
        //       <SinglePost />
        //     </AuthProtectedLayout>
        //   ),
        // },

        // {
        //   path: "/edit-post/:slug",
        //   element: (
        //     <AuthProtectedLayout authentication>
        //       <EditPostPage />
        //     </AuthProtectedLayout>
        //   ),
        // },
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
