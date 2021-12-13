import { PortConfig } from "./types/Bridge";

export const isPortConfigBetter = (initialPortConfig: PortConfig, newPortConfig: PortConfig, strict = true): boolean => {
    if (newPortConfig.root_id < initialPortConfig.root_id) {
        return true;
    } else if (newPortConfig.root_id > initialPortConfig.root_id) {
        return false;
    }

    if (newPortConfig.cost_to_root < initialPortConfig.cost_to_root) {
        return true;
    } else if (newPortConfig.cost_to_root > initialPortConfig.cost_to_root) {
        return false;
    }

    if (newPortConfig.sender_id < initialPortConfig.sender_id) {
        return true;
    }

    return strict ? false : newPortConfig.sender_id === initialPortConfig.sender_id;
}

export const arePortConfigsEqual = (portConfig1: PortConfig, portConfig2: PortConfig): boolean => {
    return portConfig1.root_id === portConfig2.root_id &&
        portConfig1.cost_to_root === portConfig2.cost_to_root &&
        portConfig1.sender_id === portConfig2.sender_id;
}

export const portConfigToString = (portConfig: PortConfig): string => {
    return `${portConfig.root_id}.${portConfig.cost_to_root}.${portConfig.sender_id}`;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));