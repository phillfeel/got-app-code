import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';

import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import GotService from '../../services/gotService'

const styledBtn = {
    
    marginBottom: '30px'
    
}

const styledH1 = {
    marginTop: '50px',
    color: '#fff',
    textAlign:'center'
    
}



export default class App extends Component{
    gotService = new GotService();

    constructor(){
        super();
        this.state = {
            show: true,
            error: false         
        }
        this.toggleChar = this.toggleChar.bind(this);

       
    
    }

    toggleChar(){
        this.setState({
            show : !this.state.show
        })
    }


    componentDidCatch(){
        console.log('error');
        this.setState({
            error: true
        })
    }

    render(){
        

        const {show} = this.state;

        const Char = show ? <RandomChar/> : null;

        if (this.state.error){
            return <ErrorMessage/>
    }

        return(
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {Char}
                                <Button 
                                     style = {styledBtn}
                                    className='toggleChar'
                                    onClick={this.toggleChar}
                                >Toggle char</Button>
                            </Col>
                        </Row>
                        <Switch>
                        <Route path="/" exact component={()=>{
                            return <h1
                                style={styledH1}
                            >Welcome to Game of Thrones Data Base!</h1>
                        }}/>
                        
                        <Route path='/character' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route exact path='/books' component={BooksPage}/>
                        <Route path="/books/:id" render={
                            ({match}) => {
                                const {id}=match.params;
                             return <BooksItem bookId={id}/> }
                        }/>
                        <Route path="*/*" exact={true} component={ ()=>{
                            return <><h1
                                style={styledH1}
                            >404</h1>
                            <h3
                                style={styledH1}
                            >Page don't exist</h3>
                            </>
                        }} />
                        </Switch>
                    </Container>
                </div>
            </Router>
        )
    }
            
}



