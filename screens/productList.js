import React, { Component } from "react";
import { Container,Header,Content,Card,CardItem,Body,Text,Left,Right,Icon,Button, Col,Grid} from "native-base";
import { Image } from "react-native";
import { connect } from "react-redux";
import { ALL_PRODUCTS } from "../redux/actions/product";

class ProductList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(ALL_PRODUCTS());
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'#03A482',marginBottom:10}}>
          <Left>
            <Text style={{fontSize:20,color:'white'}}>Manaklik</Text>
          </Left>
          <Right>
            <Icon style={{color:'white'}} name="cart"></Icon>
          </Right>
        </Header>
        <Content>
          <Grid>
            <Col>
                <Row>
                    <Text>Asd</Text>
                </Row>
                <Row>
                  <Text>Asd</Text>
                </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }

  // render() {
  //   return (
  //     <Container>
  //       <Header style={{backgroundColor:'#03A482',marginBottom:10}}>
  //         <Left>
  //           <Text style={{fontSize:20,color:'white'}}>Manaklik</Text>
  //         </Left>
  //         <Right>
  //           <Icon style={{color:'white'}} name="cart"></Icon>
  //         </Right>
  //       </Header>
  //       <Content>
  //         {this.props.product.results.map((val, key) => (
  //           <Card key={key} style={{ padding: 10 }}>
              
  //             <CardItem cardBody>
  //               <Image
  //                 source={{
  //                   uri: val.image_url
  //                 }}
  //                 style={{ height: 200, width: "100%", flex: 1 }}
  //               />
  //             </CardItem>

  //             <CardItem bordered>
  //               <Text>{val.name}</Text>
  //             </CardItem>
  //             <CardItem bordered>
  //               <Text>Rp.{val.price}</Text>
  //             </CardItem>

              
  //             <CardItem>
  //               <Body>
  //                 <Button full success rounded>
  //                   <Text style={{ fontSize: 20 }}>
  //                     Beli
  //                   </Text>
  //                 </Button>
  //               </Body>
  //             </CardItem>
  //           </Card>

  //         ))}
  //       </Content>
  //     </Container>
  //   );
  // }
}

const mapStateToProps = state => ({
  products: state.productReducer
});

export default connect(mapStateToProps)(ProductList);
