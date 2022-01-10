import React from "react";
import {
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

class SearchBar extends React.Component {
     
    constructor(props) {
         super(props);
         this.state = {notificationsOpen: false, searchText: ""};
         this.handleSearchClick = this.handleSearchClick.bind(this);
        
      
    }

    handleSearchClick(){
       return this.props.onSearchClick(this.state.searchText);

    }

    onSearchTextChange=(evt)=>{
       this.setState({ searchText: evt.target.value });
    }

    render(){
      return (
      <Form className="d-md-down-none mr-3 ml-3" inline>
            <FormGroup>
              <InputGroup className={`input-group-no-border `}>
                <InputGroupAddon addonType="prepend" onClick={this.handleSearchClick}>
                  <InputGroupText >
                    <SearchIcon />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="search-input"
                  className="input-transparent"
                  placeholder="Search Dashboard"
                  value={this.state.searchText}
                  onChange={this.onSearchTextChange}
                />
              </InputGroup>
            </FormGroup>
      </Form>
      );
   }
}


export default SearchBar;


