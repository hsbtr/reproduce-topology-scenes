import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Topology } from "@topology/core";
import { baseBusBar } from "./customizePen";
import "./index.css";
function Topologys(props, ref) {
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
        topologyRef.current.register({ baseBusBar });
        topologyRef.current.fitView();
    };
    useEffect(() => {
        registerTopology();
        return () => {
            topologyRef.current?.destroy();
        };
    }, []);
    useEffect(() => {
        topologyRef.current?.open(dataSource);
    }, [dataSource]);
    useImperativeHandle(ref, () => {
        return topologyRef.current;
    });
    return (
        <div className={"topology-wrapper"}>
            <div id={rootId} className={"topology"}></div>
        </div>
    );
}
export default forwardRef(Topologys);
