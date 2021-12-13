import { TPS } from "../config";
import { isPortConfigBetter, portConfigToString, arePortConfigsEqual } from "../utils";
import { Link } from "./Link"

export enum PortStatus {
    DESIGNATED = "DESIGNATED",
    BLOCKED = "BLOCKED",
    ROOT = "ROOT",
}

export type PortConfig = {
    root_id: number,
    cost_to_root: number,
    sender_id: number,
}

export type Port = {
    id: number;
    link?: Link;
    status?: PortStatus;
    config?: PortConfig;
    bridge?: Bridge;
}

export class Bridge {
    private id: number;
    private ports: Port[];
    private BPDU: PortConfig;

    private taskId: number;
    private lastChange: number;
    private done = false;

    constructor(id: number, ports: Port[]) {
        this.id = id;
        this.ports = ports;
    }

    public link(port_id: number, link: Link): void {
        const port = this.ports.find(port => port.id === port_id);
        if (port === undefined) {
            throw new Error(`Port ${port_id} not found`);
        }
        port.link = link;
        link.addPort(port);
    }

    public init(removeUnusedPorts = true): void {
        if (removeUnusedPorts) {
            // Remove unused ports
            this.ports = this.ports.filter(port => port.link !== undefined);
        }

        // Initialize ports
        this.ports.forEach(port => {
            port.status = PortStatus.DESIGNATED;
            port.config = { root_id: this.id, cost_to_root: 0, sender_id: this.id };
            port.bridge = this;
        });

        // Initialize BPDU
        this.BPDU = { root_id: this.id, cost_to_root: 0, sender_id: this.id };
        this.lastChange = Date.now();
    }

    public run(): void {
        // Run the tick method periodically
        this.taskId = setInterval(() => this.tick(), 1000 / TPS);

        console.log(`Bridge ${this.id} is running and has ${this.ports.length} connected ports`);
    }

    private getRootConfig(withLocalCost: boolean = false): PortConfig {
        const rootPort = this.ports.find(port => port.status === PortStatus.ROOT);
        return rootPort
            ? { ...rootPort.config, cost_to_root: rootPort.config.cost_to_root + (withLocalCost ? rootPort.link?.getCost() : 0) }
            : { root_id: this.id, cost_to_root: 0, sender_id: this.id };
    }

    public tick(): void {
        // Check if the bridge is done
        if ((Date.now() - this.lastChange) / (1000 / TPS) > 8) {
            clearInterval(this.taskId);
            this.done = true;
            return;
        }
        this.ports.filter(port => port.status !== PortStatus.ROOT).forEach(port => port.link?.send(port, this.BPDU));
    }

    private unsetRootPort(): void {
        const rootPort = this.ports.find(port => port.status === PortStatus.ROOT);
        if (rootPort !== undefined) {
            rootPort.status = PortStatus.DESIGNATED;
        }
    }

    public receiveConfigMsg(from: Port, configMsg: PortConfig): void {

        // Check if the new port config is better than the current one
        if (isPortConfigBetter(from.config, configMsg)) {
            // Update the port config
            from.config = { ...configMsg };
        } else return;

        let rootChanged = false;

        // Check if the new port config is better than the current root port config, including local cost, in which case this port becomes the new root port
        const newConfigWithLocalCost = { ...configMsg, cost_to_root: configMsg.cost_to_root + from.link?.getCost() };
        const currentConfigWithLocalCost = this.getRootConfig(true);
        if (isPortConfigBetter(currentConfigWithLocalCost, newConfigWithLocalCost)) {
            console.log(`Bridge ${this.id} got a better config: ${portConfigToString(newConfigWithLocalCost)} on port ${from.id} is better than ${portConfigToString(currentConfigWithLocalCost)}`);

            // Update root port
            this.unsetRootPort();
            from.status = PortStatus.ROOT;
            rootChanged = true;

            // Update BPDU
            this.BPDU = { ...newConfigWithLocalCost, sender_id: this.id };
            console.log(`Bridge ${this.id} sending new config: ${portConfigToString(this.BPDU)}`);

            // Update designated ports
            this.ports.filter(port => port.status === PortStatus.DESIGNATED).forEach(port => {
                if (isPortConfigBetter(port.config, this.BPDU)) {
                    port.status = PortStatus.DESIGNATED;
                    port.config = { ...this.BPDU };
                } else {
                    port.status = PortStatus.BLOCKED;
                }
            });
        } else {
            // If port already has a better config and isn't root, it is blocked
            from.status = PortStatus.BLOCKED;
        }
    }

    public printStatus(header = true): void {
        if (header)
            console.log(`Bridge ${this.id} has ${this.ports.length} connected ports:`);
        console.table(
            this.ports.reduce((acc, port) => ({ ...acc, [port.id]: { Config: portConfigToString(port.config), Status: port.status } }), {}),
        );
    }

    public isDone(): boolean {
        return this.done;
    }
}