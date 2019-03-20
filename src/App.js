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


library.add(faCheckSquare, faChevronDown, faChevronRight, faPlusSquare, faGripLinesVertical, fas)

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} alt="logo"/>
                    <p></p>
                    <Card className="bg-dark">
                        <CardBody>
                            <DepartmentSelector Departments={departments} Checked={checked}/>
                        </CardBody>
                    </Card>
                </header>
                <footer className="App-footer">Created with:</footer>
            </div>
        );
    }
}

export default App;
