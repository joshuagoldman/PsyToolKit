import { Record, Union } from "../.fable/fable-library.3.2.9/Types.js";
import { tuple_type, lambda_type, unit_type, record_type, option_type, union_type, string_type } from "../.fable/fable-library.3.2.9/Reflection.js";
import { Validation$1$reflection, ErrorType$reflection, Model$reflection as Model$reflection_1, Server_ServerMsg$reflection, Client_ClientMsg$reflection } from "../../shared/Shared.fs.js";
import { Elmish_Hub$2$reflection } from "../.fable/Fable.SignalR.Elmish.0.11.5/Elmish.fs.js";
import { FSharpResult$2 } from "../.fable/fable-library.3.2.9/Choice.js";
import { HtmlElement$reflection, Deferred$1$reflection } from "../GlobalTypes.fs.js";

export class KeyType extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["BackSpace", "OtherKey"];
    }
}

export function KeyType$reflection() {
    return union_type("Main.Types.KeyType", [], KeyType, () => [[], [["Item", string_type]]]);
}

export class UserInfo extends Record {
    constructor(CurrUserName, CurrPassword) {
        super();
        this.CurrUserName = CurrUserName;
        this.CurrPassword = CurrPassword;
    }
}

export function UserInfo$reflection() {
    return record_type("Main.Types.UserInfo", [], UserInfo, () => [["CurrUserName", option_type(string_type)], ["CurrPassword", option_type(string_type)]]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ConnectToServer", "RegisterHub", "ExercizeButtonClicked", "SignalRMessage", "TestCredential", "Changeinput"];
    }
}

export function Msg$reflection() {
    return union_type("Main.Types.Msg", [], Msg, () => [[["Item", lambda_type(Client_ClientMsg$reflection(), unit_type)]], [["Item", Elmish_Hub$2$reflection(Server_ServerMsg$reflection(), Client_ClientMsg$reflection())]], [], [["Item", Client_ClientMsg$reflection()]], [["credential", string_type]], [["Item", KeyType$reflection()]]]);
}

export class Model extends Record {
    constructor(Shared, Hubb, GoToExercizeButton, CurrCode) {
        super();
        this.Shared = Shared;
        this.Hubb = Hubb;
        this.GoToExercizeButton = GoToExercizeButton;
        this.CurrCode = CurrCode;
    }
}

export function Model$reflection() {
    return record_type("Main.Types.Model", [], Model, () => [["Shared", Deferred$1$reflection(union_type("Microsoft.FSharp.Core.FSharpResult`2", [Model$reflection_1(), ErrorType$reflection()], FSharpResult$2, () => [[["ResultValue", Model$reflection_1()]], [["ErrorValue", ErrorType$reflection()]]]))], ["Hubb", option_type(Elmish_Hub$2$reflection(Server_ServerMsg$reflection(), Client_ClientMsg$reflection()))], ["GoToExercizeButton", HtmlElement$reflection()], ["CurrCode", Validation$1$reflection(union_type("Microsoft.FSharp.Core.FSharpResult`2", [string_type, tuple_type(string_type, ErrorType$reflection())], FSharpResult$2, () => [[["ResultValue", string_type]], [["ErrorValue", tuple_type(string_type, ErrorType$reflection())]]]))]]);
}

