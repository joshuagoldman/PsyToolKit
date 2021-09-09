import { init as init_1 } from "../../shared/Shared.fs.js";
import { Model } from "./Types.fs.js";
import { Cmd_none } from "../.fable/Sutil.1.0.0-alpha-006/Types.fs.js";

export function init() {
    return [new Model(init_1, void 0, "", ""), Cmd_none()];
}

export function update(msg, model) {
    const s = msg.fields[0];
    return [model, Cmd_none()];
}

