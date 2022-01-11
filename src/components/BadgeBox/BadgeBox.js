import {
  Label,
  Badge,
} from "reactstrap";
import React,{ useState } from "react";
import CustomizedBadge from "../CustomizedBadge";

const BadgeBox = (props) => {
        const { hidePlus,  hideMinus, hideCross, ...restProps } = props;
        return (       
          <div >
          {props.label.map((x)=> 
            <div className="mb-3" key={x}>
              <CustomizedBadge  text={x} {...props} />
            </div>)
          }              
          </div>            
       );
};

BadgeBox.defaultProps = {
   hidePlus: false,
   hideMinus: false,
   hideCross: false,
   color: "gray"
}

export default BadgeBox;