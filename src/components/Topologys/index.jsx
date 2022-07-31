import { useRef, useEffect } from "react";
import { Topology } from "@topology/core";
import "./index.css";
export default function Topologys(props) {
    const topologyRef = useRef(null);
    const { rootId = "topology", engineOptions = {}, dataSource, websocketUrl } = props;
    const registerTopology = () => {
        let options = {
            anchorColor: "#ffd400",
            anchorBackground: "#ffd400",
            drawingLineName: "line",
            disableDockLine: false,
            autoAnchor: true,
            rule: true,
            grid: true,
            ...engineOptions,
        };
        topologyRef.current = new Topology(rootId, options);
        if (websocketUrl) {
            topologyRef.current?.connectWebsocket(websocketUrl);
        }
        topologyRef.current.socketFn = (mess, topic) => {
            console.log(mess);
        };
        topologyRef.current.fitView();
    };
    useEffect(() => {
        registerTopology();
    }, []);
    useEffect(() => {
        topologyRef.current?.open(dataSource);
    }, [dataSource]);
    return (
        <div className={"topology-wrapper"}>
            <div id={rootId} className={"topology"}></div>
        </div>
    );
}
