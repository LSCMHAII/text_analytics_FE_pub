import {
  Badge,
  Button
} from "reactstrap";
import React from "react";
import { Row, Col} from "reactstrap";
const CustomizedBadge = (props) => { 
         
        const { text, hideBadge, hidePlus,  hideMinus, hideCross, plusActionHandler, minusActionHandler, labelActionHandler, crossActionHandler,  ...restProps } = props;
        
    
        if (hideBadge){
          return null 
        }else{
          return (           
            <div> 
                <Badge {...restProps}> 
                                                 
                      {hidePlus? null: <a  className="glyphicon glyphicon-plus" style={{fontSize: '8px', marginRight:'10px', marginBottom:'5px'}} onClick={(e)=> plusActionHandler(text)}/>}
                      {hideMinus? null : <a  className="glyphicon glyphicon-minus" style={{fontSize: '8px', marginRight:'10px', marginBottom:'5px'}} onClick={(e)=>minusActionHandler(text)}/>}
                      {hideCross? null : <a   className="glyphicon glyphicon-remove" style={{fontSize: '8px', marginRight:'10px', marginBottom:'5px'}} onClick={(e)=>crossActionHandler(text)}/>}
                      
                      
                      <a>
                        {text}
                      </a> 
                </Badge> 
                             
            </div> 
                      
         )
       }


};

CustomizedBadge.defaultProps = {
  hidePlus: false,
  hideMinus: false,
  hideCross: false,
  hideBadge: false,
  plusActionHandler: () => {},
  minusActionHandler: () => {},
  labelActionHandler: () => {},
  crossActionHandler: () => {},
  color:"gray"
  
};

export default CustomizedBadge;


