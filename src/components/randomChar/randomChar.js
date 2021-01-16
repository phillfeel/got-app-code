import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`
const RandomBlock_h4 = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`

const Term = styled.span`
    font-weight: bold;
`

export default class RandomChar extends Component {
    constructor(){
        super();
        
    }
        
    mygotService = new gotService();

    state = {
        character: {},
        loading: true,
        error: false
    }

    componentDidMount(){
        this.updateChar()
        this.timerId = setInterval(this.updateChar, this.props.interval ) 
    }

    componentWillUnmount(){
        clearInterval(this.timerId)
    }

    onCharLoaded = (character) => {
        this.setState({
            character,
            loading:false
        })
    }

    onError = () =>{
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        //const id = 400000;
        this.mygotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
       
    render() {
        const {character, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View character={character}/> : null;

        if (loading){
           return <Spinner/> 
        }
        return (
            <RandomBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
        
    }
}

RandomChar.defaultProps = {
    interval : 15000,
}

RandomChar.propTypes = {
    interval : (props, propName , componentName) => {
        const value = props[propName];
        if (typeof value === "number" && !isNaN(value)){
            return null;
        }
        return new TypeError(`${componentName} : ${propName} must be a number`)
    }
}

const View = ({character}) => {
    const {name, gender,born,died,culture} = character;
    return (
        <>
           <RandomBlock_h4>Random Character: {name}</RandomBlock_h4>
           <ul className="list-group list-group-flush">
               <li className="list-group-item d-flex justify-content-between">
           <Term>Gender</Term>
                   <span>{gender}</span>
               </li>
               <li className="list-group-item d-flex justify-content-between">
                   <Term>Born </Term>
                   <span>{born}</span>
               </li>
               <li className="list-group-item d-flex justify-content-between">
                   <Term>Died </Term>
                   <span>{died}</span>
               </li>
               <li className="list-group-item d-flex justify-content-between">
                   <Term>Culture </Term>
                   <span>{culture}</span>
               </li>
           </ul>
        </>
    )
}
