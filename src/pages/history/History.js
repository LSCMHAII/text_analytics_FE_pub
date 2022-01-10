import React, { useState } from "react";
import { Row, Col } from "reactstrap";

import Widget from "../../components/Widget";
import HistoryRecord from "../../components/HistoryRecord"
import CustomizedBadge from "../../components/CustomizedBadge"
import {
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import s from "../tables/static/Static.module.scss";
import BadgeBox from "../../components/BadgeBox";
import SearchBar from "../../components/SearchBox/SearchBar";


const History = () => {

  const [badgeIncludeList, updateIncludeBadgeList] = useState(
      ["finish","cat","money"]
  );

  const [badgeExcludeList, updateExcludeBadgeList] = useState(
      ["blackhole","sun","war","cool","happy","tell"]
  );

  const removeIncludeList = (name) => {
     updateIncludeBadgeList(badgeIncludeList.filter(item => item !== name))

  };

  const removeExcludeList = (name) => {
     updateExcludeBadgeList(badgeExcludeList.filter(item => item !== name))
    
  };

  const addIncludeList = (name) => {
    // add item from include list
     if (!badgeIncludeList.includes(name)){
         updateIncludeBadgeList([...badgeIncludeList, name]) 
    }
    // remove item from exclude list
     if (badgeExcludeList.includes(name)){
         removeExcludeList(name)
     }
   
  };

  const addExcludeList = (name) => {
    // add item to exclude list
     if (!badgeExcludeList.includes(name)){
         updateExcludeBadgeList([...badgeExcludeList, name]) 
    }
    // remove item from include list
    if (badgeIncludeList.includes(name)){
         removeIncludeList(name)
     }
    
  };



  return (
  <div>
    <Row>
      <Col xs={12} lg={6}>
         <Widget
              
              settings
              close
            >           
            <Row>
              <SearchBar name          = {"Search"}  onSearchClick = {()=>{}}
            />
            </Row>           
              <Row>
              <Col xs={12} lg={6}>
                  <div className="glyphicon glyphicon-plus" style={{marginBottom: '20px',marginTop: '20px'}}>INCLUDE</div>
                  <BadgeBox label={badgeIncludeList} hidePlus={true} hideMinus={true} hideCross={false} crossActionHandler={removeIncludeList}/>               
              </Col>
              <Col xs={12} lg={6}>
                  <div className="glyphicon glyphicon-minus" style={{marginBottom: '20px',marginTop: '20px'}}>EXCLUDE</div>               
                  <BadgeBox label={badgeExcludeList} hidePlus={true} hideMinus={true} hideCross={false} crossActionHandler={removeExcludeList}/>
              </Col>
              </Row>
               
            </Widget>
      </Col>

      <Col xs={12} lg={3}>

         <HistoryRecord labels={["finish","cat"]} title={"Good title"} plusActionHandler={addIncludeList} minusActionHandler={addExcludeList}/>
         <HistoryRecord labels={["money","dogs"]} title={"bad title"} plusActionHandler={addIncludeList}  minusActionHandler={addExcludeList}/>
         <HistoryRecord labels={["cash","rocket"]} title={"super title"} plusActionHandler={addIncludeList}  minusActionHandler={addExcludeList}/>
         <HistoryRecord labels={["coco","nana"]} title={"sweet title"} plusActionHandler={addIncludeList}  minusActionHandler={addExcludeList}/>
         <HistoryRecord labels={["ddd","nnn"]} title={"No title"} plusActionHandler={addIncludeList}  minusActionHandler={addExcludeList}/>
         <HistoryRecord labels={["sdfsdfsd","qwewerwhhhher"]} title={"Good title"} plusActionHandler={addIncludeList}  minusActionHandler={addExcludeList}/>
         <HistoryRecord labels={["qwer","qwerrrr"]} title={"Good title"} plusActionHandler={addIncludeList}  minusActionHandler={addExcludeList}/>
       
               
      </Col>
    </Row>
  </div>
  )
};

export default History;
