import {useState} from "react";
import Topologys from "./components/Topologys";
import logo from './logo.svg';
import './App.css';

function App() {
    const [dataSource, setDataSource] = useState(null);
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
                websocket: "ws://192.168.1.9:8080",
                scale: 1,
                version: "1.1.32",
                x: 0,
                y: 0,
            })
        }
    };
    return (
        <div className="App">
            <div className={"app-left-menu"} onClick={onMenuClick}>
                <div className={"app-left-menu-item"} data-key={1}>图纸1</div>
                <div className={"app-left-menu-item"} data-key={2}>图纸2</div>
            </div>
            <div className={"app-right-content"}>
                <Topologys
                    dataSource={dataSource}
                    websocketUrl={"ws://192.168.1.9:8080"}
                />
            </div>
        </div>
    );
}

export default App;
