import {
  GET_RECOM,
  GET_ORDERLIST,
  GET_ORDERLISTOLD,
  GET_ORDER,
  GET_BUY,
  GOODS_LIKE,
  GOODS_DISLIKE,
  GOODS_INIT,
  INSERT_RECOM,
  UPDATE_RECOM,
  DELETE_RECOM,
  DELETE_RECOMS,
  INSERT_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  UPDATE_BUY,
  GET_ORDERID
} from "./actionTypes";

//actionCreater

export const insertRecommand = (value) => {
  return { type: INSERT_RECOM, value };
};
//加入購物車
export const insertRecommandAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/cartinsert";
    let memberId = (localStorage.getItem("loginAccount"))?JSON.parse(localStorage.getItem("loginAccount")).memberId:3;
    const cartinsert={ goodsId:value[0] ,name:value[1] ,price:value[2] ,goodsImgs:value[3] ,memberId:memberId };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(cartinsert),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(insertRecommand(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};


export const changeRecommand = (value) => {
  return { type: GET_RECOM, value };
};

export const changeRecommandAsync = (value) => {
  return async (dispatch, getState) => {
    dispatch(changeRecommand([...value]))
  };
};

export const updateRecommand = (value) => {
  return { type: UPDATE_RECOM, value };
};
//更新購物車
export const updateRecommandAsync = (value,cartId) => {
  return async function getRecommandCart(dispatch, getState) {
     console.log("JSON : ", JSON.stringify({value,cartId}))
    const url = "http://localhost:3001/straymao/cart/cartupdate";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({value,cartId}),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      console.log("updateRecommandAsync updateRecommandAsync data = ",data);

      await dispatch(updateRecommand(data.data));
    } catch (error) {
      console.log('error', error)
      //setError(error)
    }
  };
};


export const deleteRecommand = (value) => {
  return { type: DELETE_RECOM, like: value };
};
//刪除購物車
export const deleteRecommandAsync = (value) => {
  return async function deleteCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/cartlist";
    const goods = { cartId: value };
    const request = new Request(url, {
      method: "DELETE",
      body: JSON.stringify(goods),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(deleteRecommand(false));
    } catch (error) {
      //setError(error)
    }
  };
};

export const deleteRecommands = (value) => {
  return { type: DELETE_RECOMS, like: value };
};
//刪除購物車
export const deleteRecommandsAsync = (value,cartId) => {
  return async function deleteCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/cartlists";
    const goods = { value,cartId };
    const request = new Request(url, {
      method: "DELETE",
      body: JSON.stringify(goods),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(deleteRecommands(false));
    } catch (error) {
      //setError(error)
    }
  };
};


export const getRecommand = (value) => {
  return { type: GET_RECOM, value };
};
//購物車列表
export const getRecommandAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/cartlist/get/" + value;
    const cartlist={ memberId:value };
    const request = new Request(url, {
      method: "GET",
      // body: JSON.stringify(cartlist),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(getRecommand(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};


export const insertOrder = (value) => {
  return { type: INSERT_ORDER, value };
};
//加入訂單
export const insertOrderAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/orderinsert";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(value),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(insertOrder(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};


export const getBuy = (value) => {
  return { type: GET_BUY, value };
};
//購買
export const getBuyAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/buy";
    const order={ orderId: value };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(order),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      console.log('getBuyAsync-data:',data);

      await dispatch(getBuy(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};

export const changeBuy = (value) => {
  return { type: GET_BUY, value };
};

export const changeBuyAsync = (value) => {
  return async (dispatch, getState) => {
    dispatch(changeBuy([...value]))
  };
};

export const updateBuy = (value) => {
  return { type: UPDATE_BUY, value };
};
//更新cartlist
export const updateBuyAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/buyupdate";
    // const order={ orderId: 110 };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(value),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      console.log('updateBuyAsync-data:',data);

      // await dispatch(updateBuy(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};


export const updateOrder = (value) => {
  return { type: UPDATE_ORDER, value };
};
//更新cartlist
export const updateOrderAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/orderupdate";
    const order={ cartId:value[0] ,quantity:value[1] ,totalPrice:value[2] ,memberName:value[3],moblie:value[4],address:value[5],productDelivery:value[6] ,paymentTerm:value[7], orderId:value[8] };
    console.log('order:',order)
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(order),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      console.log('updateOrderAsync:',data);

      // await dispatch(updateOrder(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};


export const deleteOrder = (value) => {
  return { type: DELETE_ORDER, value };
};
//更新cartlist
export const deleteOrderAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/orderdelete";
    const order={ cartId: value };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(order),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(deleteOrder(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};


export const getOrderList = (value) => {
  return { type: GET_ORDERLIST, value };
};
//訂單列表
export const getOrderListAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/orderlist/desc";
    const orderlist={ memberId: value };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(orderlist),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log('data:',data);
      console.log('data.data:',data.data);
      await dispatch(getOrderList(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};

export const getOrderListOld = (value) => {
  return { type: GET_ORDERLISTOLD, value };
};
//訂單列表
export const getOrderListOldAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/orderlist/asc";
    const orderlist={ memberId: value };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(orderlist),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log('data:',data);
      console.log('data.data:',data.data);
      await dispatch(getOrderListOld(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};








export const getOrderId = (value) => {
  return { type: GET_ORDERID, value };
};
export const getOrder = (value) => {
  return { type: GET_ORDER, value };
};
//某一筆訂單
//OrderCardBoxM.js OrderDetailBoxM.js
export const getOrderAsync = (value) => {
  return async function getRecommandCart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/order";
    const order={ orderId: value };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(order),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(getOrder(data.data));
    } catch (error) {
      //setError(error)
    }
  };
};

export const goodsLike = (value) => {
  return { type: GOODS_LIKE, like: value };
};

export const goodsLikeAsync = (value) => {
  return async function addGoodsHeart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/goods_heart";
    let memberId = (localStorage.getItem("loginAccount"))?JSON.parse(localStorage.getItem("loginAccount")).memberId:3;
    const goods = { goodsId: value, memberId: memberId };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(goods),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(goodsLike(true));
    } catch (error) {
      //setError(error)
    }
  };
};

export const goodsDisLike = (value) => {
  return { type: GOODS_DISLIKE, like: value };
};

export const goodsDisLikeAsync = (value) => {
  return async function addGoodsHeart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/goods_heart";
    let memberId = (localStorage.getItem("loginAccount"))?JSON.parse(localStorage.getItem("loginAccount")).memberId:3;
    const goods = { goodsId: value, memberId: memberId };
    const request = new Request(url, {
      method: "DELETE",
      body: JSON.stringify(goods),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log(data);

      await dispatch(goodsDisLike(false));
    } catch (error) {
      //setError(error)
    }
  };
};

export const goodsInitLike = (value) => {
  return { type: GOODS_INIT, like: value };
};

export const goodsInitLikeAsync = (value) => {
  return async function addGoodsHeart(dispatch, getState) {
    const url = "http://localhost:3001/straymao/cart/goods_heart_init";
    let memberId = (localStorage.getItem("loginAccount"))?JSON.parse(localStorage.getItem("loginAccount")).memberId:3;
    const goods = { goodsId: value, memberId: memberId };
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(goods),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    try {
      const response = await fetch(request);
      const data = await response.json();
      // data會是一個物件值
      // console.log("init:", data.data);
      let dataValue = false;
      if (data.data.length > 0) {
        dataValue = true;
        console.log("action true")
      }
      await dispatch(goodsInitLike(dataValue));
    } catch (error) {
      //setError(error)
    }
  };
};



