import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
//import { sendCartData } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";
import { fetchData,sendCartData } from './store/cart-actions';
let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.ui.notification);
  const cart = useSelector(state=>state.cart);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(()=>{
    dispatch(fetchData());
  },[dispatch]);
  useEffect(()=>{
    if(isFirstRender){
      isFirstRender=false;
       return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
     }
    },[cart,dispatch])
  
  //   dispatch(
  //     uiActions.showNotification({
  //         open:true,
  //         message:"Sending request",
  //         type:"warning"
  //     })
  // );
    // const sendRequest = async () =>{
    //   //Send state as sending request
      
    //   const res = await fetch("https://cartapp-884c5-default-rtdb.firebaseio.com/cartitems.json",{
    //     method:"PUT",
    //     body: JSON.stringify(cart)
    //   })
    //   const data = await res.json();
    //   //Send state as Request is successful
    //   dispatch(uiActions.showNotification({
    //     open:true,
    //     message:"Sent Request TO Database Successfully",
    //     type:"success"
    //   }))
    // }
    //sendRequest().catch(err=>{
      //send state as Error
      // dispatch(uiActions.showNotification({
      //   open:true,
      //   message:"Sending request Failed",
      //   type:"error"
      // }))
   // });

  return (
    <div className="App">
      { notification && <Notification type={notification.type} message={notification.message}></Notification>}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
