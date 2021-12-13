import { Port, PortConfig } from "./Bridge";

export enum LinkSpeed {
    _4Mbps = 250,
    _10Mbps = 100,
    _16Mbps = 62,
    _45Mbps = 39,
    _100Mbps = 19,
    _155Mbps = 14,
    _622Mbps = 6,
    _1Gbps = 4,
    _10Gbps = 2,

    _custom_3 = 3,
    _custom_1 = 1,
}

export class Link {
    private speed: LinkSpeed;
    private ports: Port[];

    constructor(speed: LinkSpeed) {
        this.speed = speed;
        this.ports = [];
    }

    public addPort(port: Port): void {
        this.ports.push(port);
    }

    public getCost(): number {
        return this.speed;
    }

    public send(from: Port, configMsg: PortConfig): void {
        this.ports.filter(port => port !== from).forEach(port => port.bridge.receiveConfigMsg(port, configMsg));
    }
}