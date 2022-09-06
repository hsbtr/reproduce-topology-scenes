import { useState, useRef, useEffect } from "react";
import Topologys from "./components/Topologys";
import { Tabs, Button } from "antd";
import logo from './logo.svg';
import './App.css';
import topologys from "./components/Topologys";

function App() {
    const drawRef = useRef(null);
    const isUnmount = useRef(false);
    const [dataSource, setDataSource] = useState(null);
    const [tabsList, setTabsList] = useState([]);
    const [currentKey, setCurrentKey] = useState("");
    const penList = [
        {
            title: "母线",
            name: "baseBusBar",
            background: '#ff0000',
        },
        {
            title: "三角形",
            name: "triangle",
        },
        {
            title: "logo",
            name: "image",
            image: logo,
        },
    ];
    const onMenuClick = (e) => {
        console.log(e);
        if (e.target.dataset.key === "1") {
            setDataSource(null);
        } else {
            setDataSource({
                bkImage: undefined,
                center: {x: 0, y: 0},
                origin: {x: 0, y: 0},
                paths: {},
                pens: [
                    {
                        anchors: [
                            {
                                anchorId: undefined,
                                connectTo: undefined,
                                hidden: undefined,
                                id: "0",
                                penId: "8bc79a1",
                                prevNextType: undefined,
                                x: 0.5,
                                y: 0,
                            },
                            {
                                anchorId: undefined,
                                connectTo: undefined,
                                hidden: undefined,
                                id: "1",
                                penId: "8bc79a1",
                                prevNextType: undefined,
                                x: 1,
                                y: 0.5,
                            },
                            {
                                anchorId: undefined,
                                connectTo: undefined,
                                hidden: undefined,
                                id: "2",
                                penId: "8bc79a1",
                                prevNextType: undefined,
                                x: 0.5,
                                y: 1,
                            },
                            {
                                anchorId: undefined,
                                connectTo: undefined,
                                hidden: undefined,
                                id: "3",
                                penId: "8bc79a1",
                                prevNextType: undefined,
                                x: 0,
                                y: 0.5,
                            }
                        ],
                        fontSize: 12,
                        height: 100,
                        id: "8bc79a1",
                        lineHeight: 1.5,
                        lineWidth: 1,
                        name: "rectangle",
                        rotate: 0,
                        text: "矩形",
                        width: 100,
                        x: 100,
                        y: 100,
                    }
                ],
                // websocket: "ws://192.168.1.9:8080",
                scale: 1,
                version: "1.1.32",
                x: 0,
                y: 0,
            })
        }
    };
    const onDragStart = (e, item) => {
        const data = {
            name: item.name,
            text: item.title,
            background: item.background,
            height: 50,
            width: 50,
        };
        e.dataTransfer.setData('topology', JSON.stringify(data));
    };
    const onSave = () => {
        const current = window?.topology?.data();
        console.log(current);
        console.log(currentKey);
        const tabs = tabsList.map((v) => {
            console.log(typeof v.key, typeof currentKey);
            if (v.key.toString() === currentKey) {
                return { ...v, dataSource: current };
            }
            return { ...v };
        });
        console.log(tabs);
        sessionStorage.setItem("tabs", JSON.stringify(tabs));
    };
    const onChange = (activeKey) => {
      setCurrentKey(activeKey);
    }
    const onEdit = (action, event) => {
        if (action === "remove") return;
        setTabsList((prevState) => {
            const addItem = {
                key: prevState.length + 1,
                name: "新视图" + prevState.length + 1,
                dataSource: null,
            };
            return [...prevState, addItem];
        });
    };
    useEffect(() => {
        const tabsData = sessionStorage.getItem("tabs");
        if (tabsData && !isUnmount.current) {
            const tabs = JSON.parse(tabsData);
            const defaultKey = tabs[0].key;
            console.log(tabs);
            setCurrentKey(String(defaultKey));
            setTabsList(tabs);
        }
        return () => {
            isUnmount.current = true;
        }
    }, []);
    return (
        <div className="App">
            <div className={"app-left-menu"}>
                {penList.map((v) => (
                    <div
                        className={"app-left-pen"}
                        key={v.name}
                        onDragStart={(e) => onDragStart(e, v)}
                        draggable={true}
                    >
                        <img src={v.image}  alt={v.image}/>
                        <span>{v.title}</span>
                    </div>
                ))}
            </div>
            <div className={"app-right-content"}>
                <Tabs
                    type={"editable-card"}
                    onEdit={onEdit}
                    onChange={onChange}
                    tabBarExtraContent={{
                        right: <Button type={"primary"} size={"small"} onClick={onSave}>保存</Button>
                    }}
                    destroyInactiveTabPane={true}
                >
                    {tabsList.map((v) => (
                        <Tabs.TabPane tab={v.name} key={v.key}>
                            <Topologys
                                ref={drawRef}
                                rootId={`topology${v.key}`}
                                dataSource={v.dataSource}
                            />
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

export default App;
