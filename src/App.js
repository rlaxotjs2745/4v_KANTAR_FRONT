// eslint-disable-next-line
// eslint-disable-next-line react-hooks/exhaustive-deps

import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Routers from "./Router/Router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useToastAlert} from "./Util/toastAlert";
import {WS_URL} from "./Util/env";
import {getCookie} from "./Util/cookie";
import {useCookies} from "react-cookie";
if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
}


function App(){

  const [socketConnected, setSocketConnected] = useState(false);
  // const [sendMsg, setSendMsg] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);
  const [isToken, setIsToken] = useState('');
  const {
    toastNoticeSuccess
} = useToastAlert();

  useEffect(() => {
    const _chkToken = setInterval(function(){
      let token = getCookie('X-AUTH-TOKEN');
      // console.log('token:'+token)
      if(token!=='' && token!=='undefined' && token!==undefined){
        setIsToken(token);
        clearInterval(_chkToken);
      }
    },1000)
  },[])

  const webSocketUrl = WS_URL;
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
          // console.log(data);
          toastNoticeSuccess(data.msg, data.link)
          if(data.link.includes('report_detail')) {
            setCookie('report_detail', 'true');
          }

        };
      }

      return () => {
        // console.log("clean up", sendMsg);
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

      setInterval(function(){
        ws.current.send(
          JSON.stringify({
            message: '{"roomId":"'+ isToken +'"}',
          })
        );
      }, 1500);
      // setSendMsg(true);
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
      </>


  );
}

export default App;
