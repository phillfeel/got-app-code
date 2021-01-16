import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import RowBLock from '../rowBlock';

import GotService from '../../services/gotService';


export default class HousesPage extends Component {
  gotService = new GotService();

  state = {
    error: false,
    selectedHouse: null 
  }

  onItemSelected = (id) => {
    this.setState({
        selectedHouse: id 
    })
  }

  componentDidCatch(){
    this.setState({
        error: true
    })
}

  render(){
    if(this.state.error){
      return <ErrorMessage/>
    }

    const itemList = (
      <ItemList onItemSelected={this.onItemSelected}
              getData={this.gotService.getAllHouses}
              renderItem={ (item) => `${item.name} (${item.region}) ` }
            />
    )
    const itemDetails = (
      <ItemDetails itemId={this.state.selectedHouse}
        getData={this.gotService.getHouse}>
        <Field field='region' label='Region'/>
        <Field field='words' label='Words'/>
        <Field field='titles' label='Titles'/>
        <Field field='ancestralWeapons' label='Ancestral Weapons'/>
      </ItemDetails>
      )

    return (
      <RowBLock left={itemList} right={itemDetails}/>
    )
  }
}
