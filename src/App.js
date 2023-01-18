import './App.css';
import React from 'react';
import Routers from "./Router/Router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){

  return(
      <>
        <Routers/>
        <ToastContainer
            closeButton={<img src={process.env.PUBLIC_URL + '/assets/image/ico_toast_delete.svg'} alt="Custom close icon" />}
            position="bottom-left"
            autoClose={30000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </>


  );
}

export default App;
