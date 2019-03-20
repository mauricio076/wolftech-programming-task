import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CheckboxTree from 'react-checkbox-tree';

class DepartmentSelector extends Component {

    constructor(props) {
        super(props);

        let nodes = this.loadTree(props.Departments);
        nodes = this.countSelected(nodes, props.Checked);

        this.state = {
            active: null,
            checked: props.Checked || [],
            expanded: [],
            nodes: nodes,
        };

        this.onCheck = this.onCheck.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    onCheck(checked) {
        this.setState({checked});
        this.countSelected(this.state.nodes, checked);
        this.props.SetSelected(checked);
    }

    onExpand(expanded) {
        this.setState({expanded});
    }

    onClick(node) {
        let checked = this.state.checked;
        console.log(checked);
        if (checked.includes(node.value))
            checked.splice(checked.indexOf(node.value));
        else {
            if (node.children)
                node.children.map(this.onClick);
            else
                checked.push(node.value);
        }
        this.setState({checked});
        console.log(node.checked);
    }

    countSelected(nodes, checked) {
        console.log("countSelected Called")
        nodes.map((elem) => {

            function countChilds(node) {

                if (node.children) {

                    node.leafs = node.children.length;
                    node.children.map(countChilds);
                    node.selected = node.children.reduce((a, b) => {
                        a += checked.includes(b.OID.toString()) || checked.includes(b.OID) ? 1 : 0;
                        a += b.selected ? b.selected : 0;

                        node.leafs += (b.leafs - 1) || 0;
                        return a;
                    }, 0);


                    //console.log(node.Title, node.selected, "/", node.leafs);
                    node.label = (<span> {node.Title} <sup>{node.selected}/{node.leafs}</sup></span>);
                }
                return node;
            }

            return countChilds(elem);

        });
        return nodes;
    }

    loadTree(array) {

        return array.reduce((root, element) => {
            element.value = element.OID;
            element.label = <span>{element.Title}</span>;
            element.icon = <FontAwesomeIcon icon="grip-lines-vertical" color={element.Color}/>;
            element.className = "node-label";

            function getParent(arr, elem) {
                let parent;
                for (let item of arr) {
                    if (elem === item.OID) {
                        parent = item;
                        break;
                    } else if (item.children) {
                        parent = getParent(item.children, elem);
                        if (parent) break;
                    }
                }
                return parent;

            }

            if (!element.DepartmentParent_OID) {
                root.push(element);
            } else {
                let parent = getParent(root, element.DepartmentParent_OID);
                if (parent) {
                    parent.children = parent.children || [];
                    parent.children.push(element);
                } else {

                }
            }
            return root;
        }, []);
    }


    render() {
        const {checked, expanded, nodes} = this.state;
        this.countSelected(this.state.nodes, this.state.checked);
        return (
            <CheckboxTree
                icons={{
                    check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check" size={"xs"}
                                            position={"right"}/>,
                    uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon="check" size={"xs"}
                                              color={"gray"} opacity={"0.0"} position={"right"}/>,
                    halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check" size={"xs"}
                                                color={"gray"} position={"right"}/>,
                    expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right"/>,
                    expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down"/>,
                    expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square"/>,
                    collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square"/>,
                    parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder"/>,
                    parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open"/>,
                    leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file"/>
                }}
                onlyLeafCheckboxes
                checked={checked}
                expanded={expanded}
                nodes={nodes}
                onCheck={this.onCheck}
                onExpand={this.onExpand}
            />
        );
    }
}


export default DepartmentSelector;