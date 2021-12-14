/* eslint-disable */
import React, { useContext, useState, lazy, Suspense } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import './App.css';
import shoesData from './data';
// import Detail from './Detail';
let Detail = lazy(()=>import('./Detail.js') );
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Cart from './Cart.js';

export let 재고context = React.createContext();

function App() {
  
  let [shoes, shoes변경] = useState(shoesData);
  let [재고, 재고변경] = useState([10, 11, 12]);

	return (
		<div className="App">
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/">Home</Nav.Link>
							<Nav.Link as={Link} to="/detail">Detail </Nav.Link>
							<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							<Nav.Link href="#deets">More deets</Nav.Link>
							<Nav.Link eventKey={2} href="#memes">
								Dank memes
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
      <Switch>
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Suspense fallback={<div>로딩중이에요</div>}>
              <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
            </Suspense>
          </재고context.Provider>
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/:id">
          <div>아무거나 적었을때 이거 보여줭</div>
        </Route>
        <Route path="/">
          <재고context.Provider value={재고}>
            <Main shoes={shoes} shoes변경={shoes변경} />
          </재고context.Provider>
        </Route>
      </Switch>
		</div>
	);
}

function Main(props) {
  return(
    <div>
      <div className="Jumbotron">
        <h1>20% Season Off</h1>
        <Button variant="primary">Learn more</Button>
      </div>	
      <div className="container">
        <div className="row">
          {
            props.shoes.map((_shoe, index) => {
              return (
                <Shoes shoe={props.shoes[index]} key={index} />
              )
            })
          }
        </div>
      </div>
      <button className="btn btn-primary" onClick={()=>{
        
        // axios.post('서버url', { id: 'codingapple', pw: 1234});

        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
          // var newShoesData = [...props.shoes];
          // result.data.map((data)=>{
          //   newShoesData.push(data);
          // })
          // props.shoes변경(newShoesData);
          props.shoes변경([...props.shoes, ...result.data]);
        })
        .catch(()=>{
          console.log('fail');
        });
      }}>더보기</button>
    </div>
  )
}

function Shoes(props) {

  let 재고 = useContext(재고context);
  let history = useHistory();

  return(
    <div className="col-md-4" key={props.shoe.id} onClick={()=>{ history.push('/detail/' + props.shoe.id) }}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoe.id+1}.jpg`} width="100%" />
      <h4><Nav.Link as={Link} to={`/detail/${props.shoe.id}`}>{props.shoe.title}</Nav.Link></h4>
      <p>{props.shoe.content} & {props.shoe.price}</p>
      <p>{재고[props.shoe.id]}</p>
    </div>
  ) 

}

export default App;
