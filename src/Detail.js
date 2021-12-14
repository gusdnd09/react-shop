import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Nav } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './App.js';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let 박스 = styled.div`
	padding : 20px;
`;

let 제목 = styled.h4`
	font-size : 25px;
	color : ${ props => props.색상 }
`;

// class방식
// class Detail2 extends React.Component {

// 	componentDidMount() {

// 	}

// 	componentWillUnmount() {

// 	}

// }

function Detail(props) {
	let [ alertState, alertState변경 ] = useState(true);
	let [ input, input변경 ] = useState('');
	let 재고 = useContext(재고context);
	let { id } = useParams();
	let watch_id = id;
	let [누른탭, 누른탭변경] = useState(0);
	let [스위치, 스위치변경] = useState(false);

	useEffect(() => {
		console.log('what?');
		let timer = setTimeout(()=>{
			alertState변경(false);
		}, 2000);
		return ()=> { clearTimeout(timer) }
		//setTimeout같은 함수는 예로 2초안에 페이지 나가면 timer 문제생길까봐 return에서 clear 시켜줌
	},[alertState]); 
	//중요!! [] 빈칸이면 _ <- 가 변경될때 실행이라 페이지 로딩시 한번만 실행.

	useEffect(() => {
		// if(localStorage.getItem('shoes') === null){
			// localStorage.setItem('shoes',JSON.stringify([id]));
		// }else{
			// if(!JSON.parse(localStorage.getItem('shoes')).includes(id)) {
			// 	let storage = JSON.parse(localStorage.getItem('shoes'));
			// 	storage.push(id);
			// 	console.log(storage);
			// 	localStorage.setItem('shoes',JSON.stringify(storage));	
			// }			
		// }
		var arr = localStorage.getItem('watched');
		if(arr === null) {arr = []} else {arr = JSON.parse(arr)}
		arr.push(watch_id);
		arr = new Set(arr);
		arr = [...arr];
		localStorage.setItem('watched',JSON.stringify(arr));	
	},[]);
	


	id = parseInt(id);
	let findItem = props.shoes.find(function (shoes) {
		return shoes.id === id;
	});
	let history = useHistory();



	return (
		<div className="container">
			<박스>
				<제목 className="red">Detail</제목>
				{/* <제목 색상={'blue'}>상세페이지</제목> */}
			</박스>
			<input type="text" onChange={(e)=>{ input변경(e.target.value); }}/>
			{input}
			{
				alertState === true ? <Alert /> : null
			}
			<div className="row">
				<div className="col-md-6">
					<img src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`} width="100%" />
				</div>
				<div className="col-md-6 mt-4">
					<h4 className="pt-5">{findItem.title}</h4>
					<p>{findItem.content}</p>
					<p>{findItem.price}</p>
					<Info 재고={props.재고} id={findItem.id} ></Info>
					<button className="btn btn-danger" onClick={ ()=>{ 
						var temp재고 = [...props.재고];
						temp재고[id] = temp재고[id]-1;
						props.재고변경(temp재고);
						props.dispatch({type: '항목추가', payload: {id: props.shoes[findItem.id].id, name: props.shoes[findItem.id].title, quan: 1}});
						history.push('/cart'); //페이지 이동 강제로 시켜줘서 data 리셋 없이 이동
					 } } >주문하기</button>
					<button className="btn btn-warning" onClick={() => {
						history.goBack();
					}}>뒤로가기</button>
				</div>
			</div>
			<Nav className="mt-5" variant="tabs" defaultActiveKey="/link-0">
				<Nav.Item>
					<Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0) }}>Active</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1) }}>Option 2</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-2" onClick={()=>{ 스위치변경(false); 누른탭변경(2) }}>Option 3</Nav.Link>
				</Nav.Item>
			</Nav>
			
			<CSSTransition in={스위치} classNames="wow" timeout={500}>
				<TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
			</CSSTransition>

		</div>
	)
}

function TabContent(props) {

	useEffect(()=>{
		props.스위치변경(true);
	})

	if(props.누른탭 === 0) {
		return <div>0번째 내용입니다</div>
	} else if(props.누른탭 === 1) {
		return <div>1번째 내용입니다</div>
	} else if(props.누른탭 === 2) {
		return <div>2번째 내용입니다</div>
	}

}

function Info(props) {
	return (
		<p>재고 : {props.재고[props.id]}</p>
	)
}

function Alert() {
	return (
		<div className="my-alert2">
			<p>재고가 얼마 남지 않았습니다.</p>
		</div>
	)
}

function state를props화(state) {
	console.log(state);
	return {
		state: state.reducer,
		alert열렸니 : state.reducer2
	}
}

// export default Detail;
export default connect (state를props화)(Detail)