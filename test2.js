const EventEmitter = require('events');
const event_test_obj = new EventEmitter();

const TEST = {}

let length = 10;
let i = 0;

TEST.initialize = async function () {

    event_test_obj.on("message", () => {
        console.log("cluster_on");
    });

    createSlave();
    i++;

    let handler = (instance, data) => {
        if (i > length - 1) {
            console.log("cluster_off");
            event_test_obj.off("message", handler);
            return;
        }

        setTimeout(() => {
            createSlave();
            i++;
        }, 0);

        event_test_obj.on("message", handler);
        console.log("cluster_on");
    }

    event_test_obj.on("message", handler);

}

function createSlave() {
    event_test_obj.emit("message");
    console.log("createSlave");
}

TEST.initialize();