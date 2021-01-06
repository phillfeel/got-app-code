import React from 'react';
import {Col, Row} from 'reactstrap';


const RowBLock = ({left,right}) => {
  return(
    <Row>
       <Col md='6'>
           {left}
       </Col>
       <Col md='6'>
           {right}
       </Col>
   </Row>
   )
}

export default RowBLock;