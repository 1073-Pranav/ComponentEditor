import React from "react";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import { ImageWidget } from "./imagewidget";
import { PartField } from "./partfield";
import { CoderField } from "./coderfield";
import { ListArrayField } from "./listarrayfield";
import { TabbedArrayField } from "./tabbedarrayfield";
import { TabbedObjectField } from "./tabbedobjectfield";


const editorFields = { typeahead: TypeaheadField, listarray: ListArrayField, tabbedarray: TabbedArrayField, tabbedobject: TabbedObjectField, partfield: PartField , coderfield: CoderField};
const editorWidgets = { imagewidget: ImageWidget };

export const EditorFormRef = React.forwardRef((props, ref) => {
    return <Form fields={editorFields} widgets={editorWidgets} ref={ref} {...props} />;
});

export function EditorForm(props) {
    return <Form fields={editorFields} widgets={editorWidgets} {...props} />;
};

