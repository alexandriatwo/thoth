import Rete from "rete";
import { TextInputControl } from "../controls/TextInputControl";
import { triggerSocket } from "../sockets";

const info = `When the alert component is triggered, it will fire an alert with the message in the input box.`;

export class Alert extends Rete.Component {
  task: { outputs: object };
  category: string;
  info: string;

  constructor() {
    // Name of the component
    super("Alert");

    this.task = {
      outputs: {},
    };
    this.category = "I/O";
    this.info = info;
  }
  // the builder is used to "assemble" the node component.
  // when we have enki hooked up and have grabbed all few shots, we would use the builder
  // to generate the appropriate inputs and ouputs for the fewshot at build time
  builder(node) {
    // create inputs here. First argument is the name, second is the type (matched to other components sockets), and third is the socket the i/o will use
    const dataInput = new Rete.Input("trigger", "Trigger", triggerSocket);

    const value = node.data.text ? node.data.text : "Input text here";

    const input = new TextInputControl({
      emitter: this.editor,
      key: "text",
      value,
    });

    return node.addInput(dataInput).addControl(input);
  }

  // the worker contains the main business logic of the node.  It will pass those results
  // to the outputs to be consumed by any connected components
  async worker(node, inputs, data) {
    alert(node.data.text);
  }
}