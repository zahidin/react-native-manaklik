import React, { Component } from "react"
import { Container,Header,Content,Card,CardItem,Body,Text,Left,Right,Icon,Button, Col,Grid, Spinner} from "native-base";
import { Image , View,Alert } from "react-native";
import { connect } from "react-redux";
import NumericInput from 'react-native-numeric-input'
import { ALL_PRODUCTS } from "../../redux/actions/product";
import ip from '../../configIp'
import axios from 'axios'

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
        qty :0
    }
  }

  componentDidMount() {
    this.props.dispatch(ALL_PRODUCTS())
  }

  handleBuy = (id,price) =>{
    let jml = price * this.state.qty
    axios.post(`${ip}/order`,{
        product_id: id,
        qty:this.state.qty,
        price:jml,
        transaction_id:1
    }).then(res =>{
        this.props.dispatch(ALL_PRODUCTS())
        Alert.alert('Beli','Masuk Keranjang')
        
    })      
  }

  static navigationOptions = ({ navigation, screenProps }) =>({
    title: 'Manaklik',
    headerStyle: {
      backgroundColor: '#2AA137',
    },
    headerTintColor: '#FFFFFF',
    headerRight:(
        <Button transparent style={{marginTop:5}} onPress={()=>{ navigation.navigate('Cart') }}>
            <Icon style={{color:'white'}} name="cart"></Icon>
        </Button>
    )
  })    

  render() {
    return (
            <Container>
                {this.props.products.isLoading ? (
                    <Spinner color='#2AA137' style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}} />
                ):(
                <Content>
                {this.props.products.results.map((val, key) => (
                    <Card key={key} style={{ padding: 10 }}>
                    <CardItem cardBody>
                        <Image
                        source={{
                            uri: val.image_url
                        }}
                        style={{ height: 200, width: "100%", flex: 1 }}
                        />
                    </CardItem>

                    <CardItem bordered>
                        <Text>{val.name}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text>Rp.{val.price}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text>Qty </Text>
                        <NumericInput value={this.state.qty} onChange={qty => this.setState({qty})} 
                        initValue={this.state.qty}  
                        editable
                        totalWidth={75} 
                        totalHeight={30} 
                        step={1}
                        rounded 
                        minValue={0}
                        rightButtonBackgroundColor='#2AA137' 
                        leftButtonBackgroundColor='#E56B70' />
                    </CardItem>

                    
                    <CardItem>
                        <Body>
                        <Button full success rounded onPress={()=>this.handleBuy(val.id,val.price)}>
                            <Text style={{ fontSize: 20 }}>
                            Beli
                            </Text>
                        </Button>
                        </Body>
                    </CardItem>
                    </Card>

                ))}
                </Content>
           
        )}
        </Container>

    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer
});

export default connect(mapStateToProps)(index);
