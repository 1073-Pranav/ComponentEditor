import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { InputGroupModalField } from "./inputgroupmodalfield";
import { EditorForm } from "./editorform";
import { partuiSchema } from "../schema/partSchema.js";
import { read_a_part, update_a_part, read_a_svgdata } from "../controller.js";
import { SVGCreator } from "../svg-creator";
import ReactTooltip from "react-tooltip";

import * as partSchema from "../../../circuito-schema/part.json";

export class PartField extends React.Component {
  constructor(props) {
    super(props);

    this.preventNextReload = false;
    this.state = { objName: props.formData };
    this.onSave = this.onSave.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectNew = this.onSelectNew.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onShowModal() {
    if (!this.preventNextReload)
      read_a_part(this.state.objName).then(newPartData => {
        this.setState({ objData: newPartData });
        ReactTooltip.rebuild();
      });
  }

  onSave() {
    update_a_part(this.state.objName, this.lastData).then(res => {
      if (!(res && res.ok))
        toast.error(
          "Update part failed:" + ((res && res.statusText) || "can't connect")
        );
      else toast.success("Saved " + this.state.objName, { autoClose: 2000 });
    });
  }

  onSelectNew(newPartName) {
    var newData = { name: newPartName };
    this.preventNextReload = true; // don't reload file on modalShow, because it's not ready
    update_a_part(newPartName, newData).then(res => {
      if (!(res && res.ok))
        toast.error(
          "Create part failed:" + ((res && res.statusText) || "can't connect")
        );
      else {
        toast.success("Created " + newPartName, {
          autoClose: 2000
        });
        this.setState({
          objName: newPartName,
          objData: newData
        });
        this.props.formContext.partsList.push(newPartName);
        this.props.onChange(newPartName);
      }
    });
  }

  onSelect(partName) {
    this.setState({ objName: partName });
    this.props.onChange(partName);
  }

  onChange(form) {
    var formData = form.formData;
    var symbolurl = formData.symbol;

    if (symbolurl && symbolurl != this.lastCheckedSymbolurl) {
      this.lastCheckedSymbolurl = symbolurl;

      var imgid = symbolurl
        .split("/")
        .slice(4)
        .join("/");
      read_a_svgdata(imgid)
        .then(svgdata => {
          if (!(svgdata && svgdata.success && svgdata.Connectors.length > 0))
            toast.error("No connectors found in Symbol SVG", {
              autoClose: false
            });
        })
        .catch(ex => {
          console.log(ex);
          toast.error("Symbol SVG error:" + ex);
        });
    }
    this.lastData = formData;
  }

  render() {
    return (
      <InputGroupModalField
        labelProps={this.props}
        modalTitle={"Part " + this.state.objName}
        onSave={this.onSave}
        onShowModal={this.onShowModal}
        options={this.props.formContext.codersList}
        placeholder="Select a part..."
        defaultSelected={this.state.objName ? [this.state.objName] : []}
        newSelectionPrefix="Create new part:"
        onSelect={this.onSelect}
        onSelectNew={this.onSelectNew}
      >
        <React.Fragment>
          <SVGCreator />
          <EditorForm
            schema={partSchema.default}
            uiSchema={partuiSchema(this.props.formContext.partsList)}
            formData={this.state.objData}
            onChange={this.onChange}
          >
            <Button type="submit" style={{ display: "none" }}>
              Submit
            </Button>
          </EditorForm>
        </React.Fragment>
      </InputGroupModalField>
    );
  }
}
