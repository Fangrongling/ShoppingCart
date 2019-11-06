import React,{ Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, } from 'react-bootstrap';

var productList = [
  {
      id: "product_1",
      name: "Lego",
      price: 1999,
      imagaeUrl: "https://img.prisguiden.no/2938/2938331/original.320x295m.png"
  },
  {
      id: "product_2",
      name: "Plysj leketøy",
      price: 69,
      imagaeUrl: "http://no.xhstoys.net/uploads/201612128/p201612231501223586635.jpg"
  },
  {
      id: "product_3",
      name: "Byggestein",
      price: 359,
      imagaeUrl: "https://www1.pcbaby.com.cn/goods/baiduyongpinku/bd-jimu-4.jpg"
  },
  {
      id: "product_4",
      name: "Bilmodell",
      price: 159,
      imagaeUrl: "http://china.pr.imgs.coovee.net/2023/12-14/11_22_37_46_06973233219542016351.jpg"
  },
  {
    id: "product_5",
    name: "Radiostyrt helikopter",
    price: 387,
    imagaeUrl: "https://cbu01.alicdn.com/img/ibank/2017/633/105/3880501336_285196795.220x220.jpg"
  },
  {
    id: "product_6",
    name: "Piano",
    price: 250,
    imagaeUrl: "https://s.yimg.com/ut/api/res/1.2/xa_ZqUAdC9dwRcsw5ypY9g--~B/dz02MDA7aD02MDA7cT04MTtmaT1maXQ7YXBwaWQ9eXR3bWFsbA--/https://s.yimg.com/fy/c273/item/p021954500762-item-7c5fxf4x0600x0600-m.jpg"
  }, 
]

class App extends Component{
  constructor(props){
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart= this.removeFromCart.bind(this);

    this.state = {
      list: [],
      totalNum: 0,
      total: 0
    }
  }
  
  /*componentDidMount() {
    // 检测是否滚动到底部
    this.refs.myscroll.addEventListener("scroll", () => {
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight
      ) {
        this.loadMore();
      }
    });
  }*/

  addToCart(product){
    let totalNum = this.state.totalNum;
    let list = this.state.list;
    let total = this.state.total;
    let exist = false;
    if (list.length) {
      list.map(p => {
        if (p.id === product.id) {
          p.number += 1;
          totalNum += 1;
          exist = true;
          this.setState({
            totalNum
          });
        }
      });
    }
    if(!exist){
      list = list.concat(Object.assign({}, product, {number:1}));
      totalNum += 1;
      this.setState({
          list,
          totalNum
      });
    }
   
    total = list.map(p => (Number(p.price * p.number))).reduce((prev, cur) => prev + cur, 0);
    //console.log(total)
    this.setState({
      total
    });
  }

  removeFromCart(product){
    let list = this.state.list;
    let totalNum = this.state.totalNum;
    let total = this.state.total;
    if(product.number === 1){
      this.setState(prevState => ({
        list: prevState.list.filter(p => p.id !== product.id ),
        totalNum: totalNum-1
      }));
    }else{
      list.map(p => {
        if (p.id === product.id) {
          p.number -= 1;
          totalNum -= 1;
          this.setState({
            totalNum
          });
        }
      });
    }
    total = total - product.price;
    this.setState({
      total
    });
  }

  render(){
    return (
      <div className="desktop">
        <div className="logo">
          <img src="https://sandvikastorsenter.no/globalassets/fellesgemensamt---webolavthon.no/-butikklogos/s/sprell-logo-500x300.png" alt="" style={{width:'15%'}}/>
        </div>
        <div className="products">
          {
          productList.map((l)=> (
            <Product product={l} onChange={this.addToCart}/>
          ))
          }
        </div>
        <div className="cart">
          <Cart {...this.state}  onChange1={this.removeFromCart} onChange2={this.addToCart}/>      
        </div>
      </div>
    );
  }
}

const Product = ({product, onChange}) => (
  <div className="product">
    <img className="image" src={product.imagaeUrl} alt="" style={{width: '100px'}}/>
    <h3>{product.name}</h3> 
    <p>{product.price+' kr'}</p>
    <Button variant="outline-primary" size="sm" className="buyButton" onClick={() => onChange(product)}>Buy now</Button>
  </div>
);

const Cart = ({list, totalNum, total, onChange1, onChange2}) =>(
    <div>  
      <h2>Shopping Cart</h2>
      <div style={{height: '370px', overflow:'auto'}}>    
      {
        list.map((p) =>(
          <li key={p.id}> {p.name}  {p.price+" kr."} 
          <div style={{float: "right"}}>
            <Button variant="outline-dark" size="sm" style={{ fontSize: '10px' }} onClick={() => onChange1(p)}>-</Button>
            &ensp;{p.number} &ensp;
            <Button variant="outline-dark" size="sm" style={{fontSize: '10px' }} onClick={() => onChange2(p)}>+</Button>          
          </div>
          </li>
        ))
      }
      </div>
      <div className='checkout'>
      <p>--------------------------------------</p>
      <p>Total {totalNum} products, Total price {total}kr</p>    
        <Continue length={list.length}/>
      </div>
    </div>
  );


class Continue  extends Component{
  constructor(props){
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {
      showModal: false,
    }
  }
 

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    
    return (
      <div>
        <Button
          variant="outline-dark" size="sm"
          onClick={this.open}
          disabled={this.props.length? false : true }
        >
          Continue to checkout
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <h1>Thanks for the purchase</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}




export default App;
