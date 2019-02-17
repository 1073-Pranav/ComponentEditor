import {
  supportedControllersSchema,
  supportedControllersUISchema
} from "../form/commonfields";

export function circuitsuiSchema(supportBlocksList) {
  return {
    circuits: {
      "ui:field": "tabbedarray",
      items: {
        "ui:field": "tabbedobject",
        "ui:options": {
          tabs: [
            {
              name: "Info",
              props: ["name", "cost", "supportedControllers"]
            },
            { name: "Parts", props: ["parts"] },
            { name: "Ports", props: ["ports"] },
            { name: "Wiring", props: ["wires"] },
            { name: "Coders", props: ["coders"] },
            { name: "Support Blocks", props: ["requiredBlocks"] }
          ]
        },
        name: {
          classNames: "two-coloumn-field"
        },
        cost: {
          classNames: "two-coloumn-field"
        },
        supportedControllers: supportedControllersUISchema,
        parts: {
          "ui:options": {
            orderable: false
          },
          items: {
            name: {
              classNames: "two-coloumn-field",
              "ui:disabled": "true"
            },
            part: {
              "ui:field": "partfield",
              classNames: "two-coloumn-field"
            }
          }
        },
        coders: {
          "ui:options": {
            orderable: false
          },
          items: {
            "ui:field": "coderfield"
          }
        },
        wires: {
          items: {
            from: {
              classNames: "two-coloumn-field",
              "ui:widget": "wiredropdown"
            },
            to: {
              classNames: "two-coloumn-field",
              "ui:widget": "wiredropdown"
            }
          },
          "ui:options": {
            orderable: false
          }
        },
        ports: {
          "ui:options": {
            orderable: false
          },
          items: {
            classNames: "Card",
            interface: {
              requires: {
                "ui:options": {
                  orderable: false
                },
                items: {
                  cost: {
                    classNames: "three-coloumn-field"
                  },
                  spec: {
                    classNames: "three-coloumn-field",
                    "ui:emptyValue": ""
                  },
                  voltage: {
                    classNames: "three-coloumn-field"
                  }
                }
              },
              provides: {
                "ui:options": {
                  orderable: false
                },
                items: {
                  spec: {
                    classNames: "two-coloumn-field",
                    "ui:emptyValue": ""
                  },
                  voltage: {
                    classNames: "two-coloumn-field"
                  }
                }
              },
              isBus: {
                "ui:widget": "hidden"
              }
            }
          }
        },
        requiredBlocks: {
          "ui:options": {
            orderable: false
          },
          items: {
            cost: {
              classNames: "two-coloumn-field"
            },
            blocks: {
              "ui:field": "typeahead",
              "ui:options": {
                forceLabelDisplay: true
              },
              classNames: "two-coloumn-field",
              typeahead: {
                options: supportBlocksList,
                minLength: 0,
                multiple: true
              }
            }
          }
        }
      }
    }
  };
}
