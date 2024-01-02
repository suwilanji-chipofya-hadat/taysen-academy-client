import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { RecoilRoot } from 'recoil';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.jsx';
import Featured from './routes/featured';
import Search from './routes/Search';
import Course from './routes/course';
import Lesson from './routes/lesson';
import Auth from './routes/auth';
import { AUTH_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context'
import Account from './routes/account';
import Login from './routes/login';
import Register from './routes/register';
import Enrollments from './routes/enrollments';
import Wishlist from './routes/wishlist';
import Cart from './routes/cart';
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ''
    }
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "",
        element: <Auth/>,
        children: [
          {
            path: "",
            element: <Featured/>,
          },
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/register",
            element: <Register/>
          },
          {
            path: "/search",
            element: <Search/>
          },
          {
            path: "/course",
            element: <Course/>
          },
          {
            path: "/lesson",
            element: <Lesson/>
          },
          {
            path: "/enrollments",
            element: <Enrollments/>
          },
          {
            path: "/wishlist",
            element: <Wishlist/>
          },
          {
            path: "/cart",
            element: <Cart/>
          },
          {
            path: "/account",
            element: <Account/>
          }
        ]
      }
    ]
  },
]);

const errorLink = onError(({ graphQLErrors, networkError }) => {

  if (graphQLErrors)

    graphQLErrors.forEach(({ message, locations, path }) =>

      console.log(

        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`

      )

    );

  if (networkError) console.log(`[Network error]: ${networkError}`);

});
const httpLink = createHttpLink({
  uri: 'https://taysenhqacademyapi.pythonanywhere.com/graphql/'
});
const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache()
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <RouterProvider router={router}/>
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>,
)
 
