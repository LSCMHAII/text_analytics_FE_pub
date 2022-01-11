import React from 'react';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
} from 'reactstrap';
import classnames from 'classnames';
import Widget from "../../../components/Widget";

// import s from './Icons.module.scss';

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.render_list = this.render_list.bind(this);
        this.init_list = this.init_list.bind(this);
        this.state = {
            activeTab: '1',
            data: [], // List of dictionaries 
            // {Title: "",
            //  Text: "",}
        };
        this.init_list();
    }

    init_list() {
        var set_list = [];
        for (var i = 0; i < 3; i++) {
            this.setState({
                data: this.state.data.push({ "Title": i, "Text": i }),
            });
        }
        console.log(set_list);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });

        }
    }

    render_list() {
        var return_list = [];
        if (this.state.data.length > 0) {
            for (var i = 0; i < this.state.data.length; i++) {
                var item = this.state.data[i];
                var title = item["Title"];
                var text = item["Text"];

                return_list.push(<Widget title={<h6><b> {title} </b></h6>} collapse settings>
                    <Row >
                        <Col md={4} lg={3} xs={12}>
                            {text}
                        </Col>
                    </Row>
                </Widget>);
            }
        }
        return return_list;
    }

    render() {
        return (
            <section >
                {/* tabs */}
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            <span>Example 1</span>
                        </NavLink>
                    </NavItem>
                </Nav>

                {/* tab content */}

                <TabContent activeTab={this.state.activeTab}>

                    <TabPane tabId="1">
                        <div>
                            {this.render_list()}
                            {/* {this.state.data} */}
                        </div>
                    </TabPane>

                </TabContent>
            </section>
        );
    }
}

export default Lists;
