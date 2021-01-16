import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import RowBLock from '../rowBlock';

import GotService from '../../services/gotService';


export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    error: false,
    selectedChar: null 
  }

  onItemSelected = (id) => {
    this.setState({
        selectedChar: id 
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
              getData={this.gotService.getAllCharacters}
              renderItem={ (item) => `${item.name} (${item.gender}) ` }
            />
    )
    const itemDetails = (
      <ItemDetails itemId={this.state.selectedChar}
        getData={this.gotService.getCharacter}>
        <Field field='gender' label='Gender'/>
        <Field field='born' label='Born'/>
        <Field field='died' label='Died'/>
        <Field field='culture' label='Culture'/>
      </ItemDetails>
      )

    return (
      <RowBLock left={itemList} right={itemDetails}/>
    )
  }
}
