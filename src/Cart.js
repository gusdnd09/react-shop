import React, {useEffect, memo} from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {

	let state = useSelector((state) => state)
	// let state = useSelector((state) => state.reducer)
	console.log(state.reducer);
	
	let dispatch = useDispatch();

	return (
		<div>
			<Table responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>변경</th>
					</tr>
				</thead>
				<tbody>
						{state.reducer.map((item, index) =>{
							return (
								<tr key={index}>
									<td>{ index+1 }</td>
									<td>{ item.name }</td>
									<td>{ item.quan }</td>
									<td><button className="btn btn-warning" onClick={()=>{ dispatch({ type: '수량증가', index: index }) }}> + </button></td>
									<td><button className="btn btn-warning" onClick={()=>{ dispatch({ type: '수량감소', index: index }) }}> - </button></td>
								</tr>
							)
						})}
				</tbody>
			</Table>
			{
				props.alert열렸니 === true ?
					<div className="my-alert2">
						<p>지금 구매하시면 신규할인 20%</p>
						<button onClick={ ()=>{ props.dispatch({ type: '닫기' }) } }>닫기</button>
					</div>
				: null
			}
		<Parent />
		</div>
	)
}

function Parent(props){
	return (
	  <div>
      <Child1 이름={props.존박} />
      <Child2 나이={props.나이} />
	  </div>
	)
  }

  let Child1 = memo(function(){
	useEffect( ()=>{ console.log('렌더링됨1') } );
	return <div>1111</div>
  });

  let Child2 = memo(function(){
	useEffect( ()=>{ console.log('렌더링됨2') } );
	return <div>2222</div>
  });
// function state를props화(state) {
// 	console.log(state);
// 	return {
// 		state: state.reducer,
// 		alert열렸니 : state.reducer2
// 	}
// }

// export default connect (state를props화)(Cart)
export default Cart;