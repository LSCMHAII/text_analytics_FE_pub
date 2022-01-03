import React, { useState } from "react";
import "./styles.css";
import Tree from "react-tree-graph";

const data = {
    name: "Parent",
    children: [
        {
            name: "Child One",
            children: [
                {
                    name: "Child One- one"
                },
                {
                    name: "Child One- Two"
                }
            ]
        },
        {
            name: "Child Two",
            gProps: {
                onClick: (event, node) => alert(`Own Clicked ${node}!`),
                onContextMenu: (event, node) => alert(`Own Right Clicked ${node}!`)
            }
        },
        {
            name: "Child Three",
            gProps: {
                onDoubleClick: (event, node) => {
                    alert(`Own onDoubleClick Clicked ${node}!`);
                }
            }
        }
    ]
};

export default function App() {
    const [clickNode, setClickNode] = useState("");
    const [dataNodes, setdataNodes] = useState(data);

    let clicks = [];
    let timeout;
    let samenode;

    function mouseDown(event, node) {
        samenode = node;
        console.log(`mouse click down ${node}!`);
    }

    function mouseUp(event, node) {
        console.log(`mouse click up ${node} from  ${samenode}!`);
        console.log(samenode);
        let newdata = {};
        newdata.children = [];
        let added = 0;
        if (samenode !== "Parent" && samenode && samenode !== node) {
            //alert(`${samenode} moved to ${node}`);
            //console.log(`${dataNodes}`);
            //for (let i = 0; i < Object.keys(dataNodes.children).length; i++) {
            //for (let i = 0; i < 3; i++) {
            Object.keys(dataNodes.children).forEach((element) => {
                console.log(` before ${node} - ${dataNodes.children[element].name}`);
                console.log(dataNodes.children[element].children);
                let subchildren = dataNodes.children[element].children;
                console.log(subchildren);
                if (subchildren) {
                    subchildren.map((subelement) => {
                        //newdata.children[element] = {};
                        //newdata.children[element].name = subelement.name;

                        console.log(
                            ` before into ${subelement.name} - ${node} - ${subelement.name === samenode
                            }`
                        );
                        console.log(subelement);
                        if (subelement.name !== samenode) {
                            newdata.children[element] = {};
                            newdata.children[element].name = samenode;
                            newdata.children[element].children = [];
                            console.log(`in ${node} - ${subelement.name}`);
                            newdata.children[element].children.push({
                                name: subelement.name
                            });
                            added = 1;
                        }

                        if ("Parent" === node) {
                            newdata.children.push({
                                name: subelement.name
                            });
                            added = 1;
                        }

                        if (added === 0 && samenode !== subelement.name) {
                            newdata.children[element] = {};
                            newdata.children[element].name = samenode;
                            newdata.children[element].children = [];
                            newdata.children[element].children.push({
                                name: subelement.name
                            });
                        }
                        added = 0;
                    });
                } else {
                    if (dataNodes.children[element].name === node) {
                        console.log(
                            `in ${node} - ${dataNodes.children[element].name} - ${dataNodes.children[element].name}`
                        );
                        newdata.children.push({
                            name: dataNodes.children[element].name
                        });
                        added = 1;
                    }
                    if ("Parent" === node) {
                        newdata.children.push({
                            name: dataNodes.children[element].name
                        });
                        added = 1;
                    }
                    if (added === 0 && samenode !== dataNodes.children[element].name) {
                        newdata.children.push({
                            name: dataNodes.children[element].name
                        });
                    }
                    added = 0;
                }
            });
        }
        //}
        if (newdata && Object.keys(newdata.children).length > 0) {
            setdataNodes({ name: "Parent", children: newdata.children });
            console.log(newdata.children);
        }
        //console.log({ name: "Parent", children: newdata.children });
        //console.log(dataNodes);
    }

    function onClick(event, nodeKey) {
        alert(`Left clicked ${nodeKey}`);
    }

    function onRightClick(event, nodeKey) {
        event.preventDefault();
        alert(`Right clicked ${nodeKey}`);
    }

    function singleClick(event, node) {
        alert(`single click ${node}`);
    }

    function doubleClick(event, node) {
        alert(`doubleClick ${node}`);
        setdataNodes(data);
    }

    function clickHandler(event, node) {
        event.preventDefault();
        clicks.push(new Date().getTime());
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            if (
                clicks.length > 1 &&
                clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250
            ) {
                doubleClick(event, node);
            } else {
                singleClick(event, node);
            }
        }, 250);
    }

    return (
        <div className="Histree">
            <Tree
                data={dataNodes}
                height={200}
                width={400}
                gProps={{
                    onClick: clickHandler,
                    onContextMenu: onRightClick,
                    onMouseDown: mouseDown,
                    onMouseUp: mouseUp
                }}
                animated
                svgProps={{
                    className: "custom"
                }}
            />
        </div>
    );
}
