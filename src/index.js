import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FormPage from './Pages/FormPage';
import StartPage from './Pages/StartPage';
import SuccessPage from './Pages/SuccessPage';
import TransactionSplit from './Pages/TransactionSplit';
import PayPage from './Pages/PayPage';







import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"




const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage/>,
  },

  {
    path: "formPage",
    element: <FormPage/>,
  },
  {
    path: "successPage",
    element: <SuccessPage/>,
  },
  {
    path: "transactionSplitPage",
    element: <TransactionSplit/>,
  },
  {
    path: "payPage",
    element: <PayPage/>,
  },


  
  
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   {/*<App />*/}
  // </React.StrictMode>
  <RouterProvider router ={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
