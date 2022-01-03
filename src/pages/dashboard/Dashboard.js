import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

import Widget from "../../components/Widget";

import Calendar from "./components/calendar/Calendar";
import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";

import AnimateNumber from "react-animated-number";

// import s from "./Dashboard.module.scss";
import './Dashboard.module.scss'

import peopleA1 from "../../assets/people/a1.jpg";
import peopleA2 from "../../assets/people/a2.jpg";
import peopleA5 from "../../assets/people/a5.jpg";
import peopleA4 from "../../assets/people/a4.jpg";

import React, { useState, useEffect } from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';
import loadingImage from './giphy.gif';
import SearchBar from "../../components/SearchBox/SearchBar";
import Histree from '../../components/Histree/Histree';

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations, Hoverable, DragNodeWithForce } = Behaviors;


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    //this.state = {data: "undefined"};
    //this.checkTable = this.checkTable.bind(this);
    this.state = { data: {} };
    console.log(this.state.data);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.getDataFromAPI = this.getDataFromAPI.bind(this);
  }

  componentDidMount() {
    this.getDataFromAPI("Front-end person is telling that should to have only one request to that API to have user authenticated and authorized at the same time with response back containing JWT, user role(s) and user data. Back-end person claims that front-end should to have two calls");
    console.log("send api");
  }

  handleSearchClick(para) {
    this.getDataFromAPI(para);
    console.log("send api");
  }

  getDataFromAPI(para) {

    fetch('/test').then(response => response.json())
      .then(jsonResult => this.setState({
        data: {
          nodes: jsonResult["nodes"].map(element => this.createNode(element, element)),
          edges: jsonResult["edges"].map(element => this.createEdge(element["from"], element["to"], element["value"]))
        }
      }));
  }

  createNode(id, label) {
    return {
      "id": id,
      "style": {
        label: {
          value: label,
          position: 'right',
        }
      },
    }
  }

  createEdge(fromNode, toNode, value) {
    return {
      source: fromNode,
      target: toNode,
      style: {
        label: {
          value: value,

        },
      }
    }
  }

  render() {

    if (Object.keys(this.state.data).length > 0) {
      return (<div>
        <div className="hellokitty"><h1>Test </h1></div>
        <Graphin data={this.state.data} layout={{ type: 'graphin-force' }} theme={{ mode: 'dark' }} height="100%">
          <Hoverable bindType="node" />
          <Hoverable bindType="edge" />
          <DragNodeWithForce autoPin="false" />
        </Graphin>
        <SearchBar name={"Search"}
          onSearchClick={this.handleSearchClick}
        />
        {/* <Histree /> */}
      </div>
      );
    }


    return (<div>extraordinary</div>);

  }


}

export default Dashboard;
