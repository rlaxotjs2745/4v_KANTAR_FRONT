import './App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Routers from "./Router/Router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useToastAlert} from "./Util/toastAlert";

import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "./Util/env";
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import {getCookie} from "./Util/cookie";

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

  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [isToken, setIsToken] = useState('');
  const {
    toastNoticeInfo,
    toastNoticeSuccess,
    toastNoticeError,
    toastNoticeWarning,
} = useToastAlert();

  useEffect(() => {
    const _chkToken = setInterval(function(){
      let token = getCookie('X-AUTH-TOKEN');
      // console.log('token:'+token)
      if(token!==''){
        setIsToken(token);
        clearInterval(_chkToken);
      }
    },1000)
  },[])

  const webSocketUrl = 'ws://15.165.18.70:8000';
  let ws = useRef(null);

  // 소켓 객체 생성
  useEffect(() => {
    if(isToken!==''){
      if (!ws.current) {
        ws.current = new WebSocket(webSocketUrl + '/?roomId='+isToken);
        ws.current.onopen = () => {
          console.log("connected to " + webSocketUrl);
          setSocketConnected(true);
        };
        ws.current.onclose = (error) => {
          console.log("disconnect from " + webSocketUrl);
          console.log(error);
        };
        ws.current.onerror = (error) => {
          console.log("connection error " + webSocketUrl);
          console.log(error);
        };
        ws.current.onmessage = (evt) => {
          const data = JSON.parse(evt.data);
          console.log(data);
          toastNoticeSuccess(data.msg, data.link)
        };
      }

      return () => {
        console.log("clean up");
        // ws.current.close();
      };
    }
  }, [isToken, webSocketUrl]);

  // 소켓이 연결되었을 시에 send 메소드
  useEffect(() => {
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          message: '{"roomId":"'+ isToken +'"}',
        })
      );

      setSendMsg(true);
    }
  }, [socketConnected, isToken]);



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
