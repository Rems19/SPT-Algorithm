import { Bridge, Port } from "./types/Bridge";
import { Link, LinkSpeed } from "./types/Link";


const L1 = new Link(LinkSpeed._custom_1);
const L2 = new Link(LinkSpeed._custom_3);
const p1: Port = { id: 1, link: L2 };
const p2: Port = { id: 2, link: L1 };
const p3: Port = { id: 3, link: L2 };

const b = new Bridge(90, [p1, p2, p3]);
b.init(false);

b.printStatus();

b.receiveConfigMsg(p1, { root_id: 41, cost_to_root: 0, sender_id: 41 });

b.printStatus();

b.receiveConfigMsg(p2, { root_id: 41, cost_to_root: 1, sender_id: 99 });

b.printStatus();


/*
const L1 = new Link(LinkSpeed._1Gbps);

const B3_P1: Port = { id: 1, link: L1 };
const B3_P2: Port = { id: 2, link: new Link(LinkSpeed._1Gbps  ) };
const B3_P3: Port = { id: 3, link: new Link(LinkSpeed._100Mbps) };
const B3 = new Bridge(3, [B3_P1, B3_P2, B3_P3]);

const B4_P1: Port = { id: 1, link: L1 };
const B4_P2: Port = { id: 2, link: new Link(LinkSpeed._1Gbps  ) };
const B4_P3: Port = { id: 3, link: new Link(LinkSpeed._100Mbps) };
const B4 = new Bridge(4, [B4_P1, B4_P2, B4_P3]);

B3.init(false);
B4.init(false);

console.log('------------------------------');
console.log('           BRIDGE 3           ');
console.log('------------------------------');

B3.printStatus();

B3.receiveConfigMsg(B3_P3, { root_id: 2, cost_to_root: 0, sender_id: 2 });
B3.printStatus();

B3.receiveConfigMsg(B3_P1, { root_id: 4, cost_to_root: 0, sender_id: 4 });
B3.printStatus();

B3.receiveConfigMsg(B3_P3, { root_id: 1, cost_to_root: 4, sender_id: 2 });
B3.printStatus();

B3.receiveConfigMsg(B3_P1, { root_id: 1, cost_to_root: 8, sender_id: 4 });
B3.printStatus();

B3.receiveConfigMsg(B3_P2, { root_id: 1, cost_to_root: 0, sender_id: 1 });
B3.printStatus();

console.log('------------------------------');
console.log('           BRIDGE 4           ');
console.log('------------------------------');

B4.printStatus();

B4.receiveConfigMsg(B4_P3, { root_id: 1, cost_to_root: 0, sender_id: 1 });
B4.printStatus();

B4.receiveConfigMsg(B4_P1, { root_id: 3, cost_to_root: 0, sender_id: 3 });
B4.printStatus();

B4.receiveConfigMsg(B4_P2, { root_id: 2, cost_to_root: 0, sender_id: 2 });
B4.printStatus();

B4.receiveConfigMsg(B4_P1, { root_id: 1, cost_to_root: 4, sender_id: 3 });
B4.printStatus();

B4.receiveConfigMsg(B4_P2, { root_id: 1, cost_to_root: 4, sender_id: 2 });
B4.printStatus();
*/