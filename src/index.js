import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

let 초기값 =[
  {id: 7, name: '멋진신발', quan: 2},
  {id: 8, name: '멋진신발1', quan: 5},
  {id: 9, name: '멋진신발2', quan: 3}
]

let alert초기값 = true;

function reducer(state = 초기값, 액션) {
  if(액션.type === '항목추가') {
    let checkDuplicate = false;
    let copy = [...state];
    
    let found = state.findIndex((a)=>{ return a.id === 액션.payload.id });
    if(found >= 0) {
      checkDuplicate = true;
      copy[found].quan++;
    }
    // copy.map((a, i)=>{
    //   if(a.id === 액션.payload.id){
    //     checkDuplicate = true;
    //     copy[i].quan++;
    //   }
    // })
    if(!checkDuplicate){
      copy.push(액션.payload);
    }
    return copy;
  } else if(액션.type === '수량증가') {
    let copy = [...state];
    copy[액션.index].quan++;
    return copy;
  } else if(액션.type === '수량감소') {
    let copy = [...state];
    if(copy[액션.index].quan > 0){
      copy[액션.index].quan--;
    }
    return copy;
  } else {
    return state;
  }
}

function reducer2(state = alert초기값, 액션) {
  
  if(액션.type === '닫기'){
    return false;
  }else{
    return state;
  } 

}

let store = createStore(combineReducers({reducer, reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
