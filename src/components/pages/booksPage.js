import React,{Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage/errorMessage';
import GotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';
import { BooksItem } from '.';

 class BooksPage extends Component {
  gotService = new GotService();

  state = {
    error: false
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

    return (
      <ItemList onItemSelected={(itemId)=>{
          this.props.history.push(itemId)
      }}
              getData={this.gotService.getAllBooks}
              renderItem={ (item) => `${item.name} (${item.publisher}) ` }
            />
    )
  }
}
export default withRouter(BooksPage)
