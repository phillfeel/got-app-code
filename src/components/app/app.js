import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import styled from 'styled-components';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService'

const styledBtn = {
    
    marginBottom: '30px'
    
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
            <> 
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
                    <CharacterPage/>
                    <Row>
                       <Col md='6'>
                           <ItemList onItemSelected={this.onItemSelected}
                             getData={this.gotService.getAllBooks}
                             renderItem={ (item) => item.name}
                           />
                       </Col>
                       <Col md='6'>
                           <CharDetails charId={this.state.selectedChar}/>
                       </Col>
                   </Row>
                   <Row>
                       <Col md='6'>
                           <ItemList onItemSelected={this.onItemSelected}
                             getData={this.gotService.getAllHouses}
                             renderItem={ (item) => item.name }
                           />
                       </Col>
                       <Col md='6'>
                           <CharDetails charId={this.state.selectedChar}/>
                       </Col>
                   </Row>
                    
                </Container>
            </>
        )
    }
            
}



