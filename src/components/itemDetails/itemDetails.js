import React, {Component} from 'react';
import GotService from '../../services/gotService';
import './itemDetails.css'
import styled from 'styled-components';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner';

const Field = ({item,field,label}) => {
    return(
       <li className="list-group-item d-flex justify-content-between">
          <span className="term">{label}</span>
          <span>{item[field]}</span>
      </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {
    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }
    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {itemId} = this.props;
        const {getData} = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then( this.onItemDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }


    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className="select-error">Please select item in the List</span>
        }

        const {item} = this.state
        const {name} = item;

        if (this.state.loading) {
            return (
                <div className="item-details rounded">
                    <Spinner/>
                </div>
            )
        }
        return (
           
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                           return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div> 
        );
    }
}