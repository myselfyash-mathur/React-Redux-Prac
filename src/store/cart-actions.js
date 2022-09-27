import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const fetchData = () =>{
    return async(dispatch)=>{
        const fetchHandler = async()=>{
            const res = await fetch("https://cartapp-884c5-default-rtdb.firebaseio.com/cartitems.json")
            const data = await res.json();
            return data;
        }
        try{
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData))
        }
        catch(err){ 
            dispatch(uiActions.showNotification({
                open:true,
                message:"Sending request Failed",
                type:"error"
              }))
        }
    }
}

export const sendCartData = (cart) =>{
    return async(dispatch) => {
        dispatch(
            uiActions.showNotification({
                open:true,
                message:"Sending request",
                type:"warning"
            })
        );
        const sendRequest = async () =>{ 
            //Send state as sending request
            
            const res = await fetch("https://cartapp-884c5-default-rtdb.firebaseio.com/cartitems.json",{
              method:"PUT",
              body: JSON.stringify(cart)
            })
            const data = await res.json();
            //Send state as Request is successful
            dispatch(uiActions.showNotification({
              open:true,
              message:"Sent Request TO Database Successfully",
              type:"success"
            }))  
        }
        try {
            await sendRequest();
        }
        catch(err){
            dispatch(uiActions.showNotification({
                open:true,
                message:"Sending request Failed",
                type:"error"
              }))
        }
    };
    
}
