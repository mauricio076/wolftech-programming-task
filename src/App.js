import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";
import {library} from '@fortawesome/fontawesome-svg-core';
import DepartmentSelector from "./DepartmentSelector";

import logo from './logoWT.svg';
import './App.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './opinionated.css';


import departments from './departments';
import checked from './checked';

import {
    faCheckSquare,
    faChevronDown,
    faChevronRight,
    faGripLinesVertical,
    faPlusSquare,
    fas
} from '@fortawesome/free-solid-svg-icons'
import CardFooter from "reactstrap/es/CardFooter";


library.add(faCheckSquare, faChevronDown, faChevronRight, faPlusSquare, faGripLinesVertical, fas)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: checked
        };

        this.setSelected = this.setSelected.bind(this)
    }

    setSelected(checked) {
        this.setState({selected: checked});
    }

    render() {

        const {selected} = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} alt="logo"/>
                    <p></p>
                    <Card className="bg-dark">
                        <CardBody>
                            <DepartmentSelector Departments={departments} Checked={checked}
                                                SetSelected={this.setSelected}/>
                        </CardBody>
                        <CardFooter>Results: [{selected.toString()}]</CardFooter>
                    </Card>
                </header>
            </div>
        );
    }
}

export default App;
