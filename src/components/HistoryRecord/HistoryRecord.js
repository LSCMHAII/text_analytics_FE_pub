import React,{ useState } from "react";
import { Row, Col, Badge } from "reactstrap";
import Widget from "../Widget";
import BadgeBox from "../BadgeBox";
import CustomizedBadge from "../CustomizedBadge";


const HistoryRecord = (props) => {
       
        const [labelList, setState] = useState({label:props.labels});
        return (
        
        <Widget
          title={
            <h5>
              <CustomizedBadge key={props.labels} hideCross={true} text={props.title} {...props}/>
                       
           
              
            </h5>
          }
          collapse
          collapsed="true"
          close
          
        >

          <div className="widget-padding-md w-100 h-100 text-left border rounded">
          <BadgeBox label={props.labels} key={props.labels} hideCross={true} {...props}/>
          
               
          </div>       
       </Widget>

       );
};



export default HistoryRecord;

