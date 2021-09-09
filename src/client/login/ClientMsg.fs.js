import { Model } from "../../shared/Shared.fs.js";
import { Cmd_none } from "../.fable/Sutil.1.0.0-alpha-006/Types.fs.js";

export function update(model, msg, dispatch) {
    const resp = msg.fields[0];
    const newModel = new Model(resp);
    return [newModel, Cmd_none()];
}

