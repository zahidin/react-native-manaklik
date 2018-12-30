import React, { Component } from "react"
import { Container,Header,Content,Card,CardItem,Footer,Body,Text,Left,List,Icon,Button,Thumbnail, Col,Grid, Spinner, ListItem,Right} from "native-base"
import { Image,View,Alert } from "react-native"
import { connect } from "react-redux"
import { ALL_ORDERS } from "../../redux/actions/product"
import NumericInput from 'react-native-numeric-input'
import ip from '../../configIp'
import _ from "lodash"
import axios from 'axios'

class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sumAll: 0,
            value: 0,
            price: 0,
            key:[]
        }
      }

    componentDidMount() {
        this.props.dispatch(ALL_ORDERS())
    }

    handleCheckout = async (order) =>{
        await this.setState({sumAll:_.sumBy(this.props.orders.results, e => parseInt(e.price))})

        let total = this.state.sumAll
        let res = null
        

        axios.post(`${ip}/transaction/`,{total:total}).then(res => {
            this.checkout(res.data.id)
        })
       
    }

    checkout(transaction_id){
        
        this.props.orders.results.map(async (val) =>{
            try{
                res = await axios.patch(`${ip}/order/${val.id}`,{
                    transaction_id:transaction_id
                })
                alert('Checkout Success')
            }catch(err){
                alert(err.message)
            }
        })
    }

    static navigationOptions = {
        title: 'Cart User',
        headerStyle: {
          backgroundColor: '#2AA137',
        },
        headerTintColor: '#FFFFFF',
      }

    selectionDelete = (id) =>{
        Alert.alert(
            'Delete',
            'Are you sure ?',
            [
              {text: 'NO',},
              {text: 'YES', onPress: () => this.handleDelete(id)}
            ]
          );
    }
    handleDelete = (id) => {
        axios.delete(`${ip}/order/${id}`)
        .then(res => {
            this.props.dispatch(ALL_ORDERS());
            Alert.alert('Delete','Success Delete')
        })
    }
    
    listItem(data,key){
        return(
             <ListItem thumbnail key={key}>
                <Left>
                    <Thumbnail square source={{ uri: data.product.image_url }} />
                </Left>
                <Body>
                    <Text>{data.product.name}</Text> 
                    <Text note numberOfLines={1}>Rp.{data.price}</Text>      
                </Body>
                <Right style={{flexDirection:'row',flex:1}}>
                    <NumericInput 
                        onChange={value => this.setState({ ["value"+key] :value })} 
                        initValue={this.state["value"+key] || data.qty}  
                        editable
                        totalWidth={75} 
                        totalHeight={30} 
                        step={1}
                        rounded 
                        minValue={0}
                        rightButtonBackgroundColor='#2AA137' 
                        leftButtonBackgroundColor='#E56B70' />

                        <Button rounded danger style={{marginLeft:18}} onPress={()=>this.selectionDelete(data.id)}><Icon name='md-trash'></Icon></Button>   
                    
                </Right>
            </ListItem>
        )
    }

    render(){
        return(
            <Container>
                {this.props.orders.isLoading ? (
                    <Spinner color='#2AA137' style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}} />
                ):(
                    <Content>
                    <Grid>
                        <Col>
                            <List>
                                {this.props.orders.results.map((val,key) => this.listItem(val,key))}     
                            </List>
                        </Col>
                    </Grid>
                    </Content>
                )}
                    <Button full success style={{height:50}} onPress={()=>this.handleCheckout()}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Checkout <Icon style={{color:'white',fontSize:20}} name='md-basket'></Icon></Text>
                    </Button>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.orderReducer
});
  
export default connect(mapStateToProps)(index);
  