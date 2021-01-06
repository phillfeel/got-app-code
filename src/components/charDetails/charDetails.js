import React, {Component} from 'react';
import GotService from '../../services/gotService';
import './charDetails.css'
import styled from 'styled-components';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/';

const Field = ({char,field,label}) => {
    return(
       <li className="list-group-item d-flex justify-content-between">
          <span className="term">{label}</span>
          <span>{char[field]}</span>
      </li>
    )
}

export {
    Field
}

export default class CharDetails extends Component {
    gotService = new GotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }
    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then( this.onCharDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }


    render() {

        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }

        const {char} = this.state
        const {name} = char;

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }
        return (
           
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                           return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </div> 
        );
    }
}