import './App.css';
import React, { useState, useEffect } from 'react';
import Routers from "./Router/Router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "./Util/env";

// import io from 'socket.io-client'
// const socket = io('http://localhost:8000'); // io안에 서버가 위치한 ip주소 or 도메인 이름으로 설정

function App(){
    // const [isConnected, setIsConnected] = useState(socket.connected);
    // const [lastPong, setLastPong] = useState(null);
    //
    // useEffect(() => {
    //     socket.on('connect', () => {
    //         setIsConnected(true);
    //     });
    //
    //     socket.on('disconnect', () => {
    //         setIsConnected(false);
    //     });
    //
    //     socket.on('pong', () => {
    //         setLastPong(new Date().toISOString());
    //     });
    //
    //     return () => {
    //         socket.off('connect');
    //         socket.off('disconnect');
    //         socket.off('pong');
    //     };
    // }, []);
    //
    // const sendPing = () => {
    //     socket.emit('ping');
    // }



    return(
      <>
        <Routers/>
        <ToastContainer
            closeButton={<img src={process.env.PUBLIC_URL + '/assets/image/ico_toast_delete.svg'} alt="Custom close icon" />}
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
          {/*<div>*/}
          {/*    <p>Connected: { '' + isConnected }</p>*/}
          {/*    <p>Last pong: { lastPong || '-' }</p>*/}
          {/*    <button onClick={ sendPing }>Send ping</button>*/}
          {/*</div>*/}
      </>


  );
}

export default App;
