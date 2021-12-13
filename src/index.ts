import { Bridge } from './types/Bridge';
import { Link, LinkSpeed } from './types/Link';
import { delay } from './utils';


// Exercise 1
const B1 = new Bridge(1, [
    { id: 1 },
    { id: 2 },
]);

const B3 = new Bridge(3, [
    { id: 1 },
    { id: 2 },
]);

const B5 = new Bridge(5, [
    { id: 1 },
    { id: 2 },
]);

const B7 = new Bridge(7, [
    { id: 1 },
    { id: 2 },
]);

const bridges = [B1, B3, B5, B7];

const L1 = new Link(LinkSpeed._100Mbps);
const L2 = new Link(LinkSpeed._1Gbps  );
const L3 = new Link(LinkSpeed._10Mbps );
const L4 = new Link(LinkSpeed._100Mbps);

B1.link(1, L2);
B1.link(2, L3);

B3.link(1, L3);
B3.link(2, L4);

B5.link(1, L1);
B5.link(2, L2);

B7.link(1, L1);
B7.link(2, L4);


/*
// Exercise 2
const B1 = new Bridge(1, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
]);

const B2 = new Bridge(2, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const B3 = new Bridge(3, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const B4 = new Bridge(4, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const B5 = new Bridge(5, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const bridges = [B1, B2, B3, B4, B5];

const L1 = new Link(LinkSpeed._1Gbps  );
const L2 = new Link(LinkSpeed._100Mbps);
const L3 = new Link(LinkSpeed._100Mbps);
const L4 = new Link(LinkSpeed._1Gbps  );
const L5 = new Link(LinkSpeed._100Mbps);
const L6 = new Link(LinkSpeed._1Gbps  );
const L7 = new Link(LinkSpeed._1Gbps  );
const L8 = new Link(LinkSpeed._1Gbps  );

B1.link(1, L1);
B1.link(2, L2);
B1.link(3, L3);
B1.link(4, L4);

B2.link(1, L6);
B2.link(2, L5);
B2.link(3, L1);

B3.link(1, L8);
B3.link(2, L5);
B3.link(3, L4);

B4.link(1, L6);
B4.link(2, L2);
B4.link(3, L7);

B5.link(1, L8);
B5.link(2, L3);
B5.link(3, L7);
*/

/*
// Exercise 3
const B1 = new Bridge(1, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const B2 = new Bridge(2, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const B3 = new Bridge(3, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const B4 = new Bridge(4, [
    { id: 1 },
    { id: 2 },
    { id: 3 },
]);

const bridges = [B1, B2, B3, B4];

const L1 = new Link(LinkSpeed._1Gbps  );
const L2 = new Link(LinkSpeed._1Gbps  );
const L3 = new Link(LinkSpeed._1Gbps  );
const L4 = new Link(LinkSpeed._1Gbps  );
const L5 = new Link(LinkSpeed._100Mbps);
const L6 = new Link(LinkSpeed._100Mbps);

B1.link(1, L2);
B1.link(2, L4);
B1.link(3, L6);

B2.link(1, L2);
B2.link(2, L1);
B2.link(3, L5);

B3.link(1, L3);
B3.link(2, L4);
B3.link(3, L5);

B4.link(1, L3);
B4.link(2, L1);
B4.link(3, L6);
*/

bridges.forEach(bridge => bridge.init());
bridges.forEach(bridge => bridge.run());
// bridges.forEach(bridge => bridge.printStatus());

(async () => {
    while (!bridges.every(bridge => bridge.isDone())) {
        await delay(1000);
    }
    console.log('All bridges are settled!');
    bridges.forEach(bridge => bridge.printStatus());
})();