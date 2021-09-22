import { Record, Union } from "../.fable/fable-library.3.2.9/Types.js";
import { tuple_type, bool_type, lambda_type, unit_type, record_type, option_type, union_type, string_type } from "../.fable/fable-library.3.2.9/Reflection.js";
import { ErrorType$reflection, Model$reflection as Model$reflection_1, Server_ServerMsg$reflection, Client_ClientMsg$reflection } from "../../shared/Shared.fs.js";
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

export class Page extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Home", "AboutMe", "Interests", "Education", "Experience"];
    }
}

export function Page$reflection() {
    return union_type("Main.Types.Page", [], Page, () => [[], [], [], [], []]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ConnectToServer", "RegisterHub", "SignalRMessage", "MenuButtonClicked", "TestCredential", "PageChanged", "ChangeMenuAltColor", "ChangeMenuButtonColor"];
    }
}

export function Msg$reflection() {
    return union_type("Main.Types.Msg", [], Msg, () => [[["Item", lambda_type(Client_ClientMsg$reflection(), unit_type)]], [["Item", Elmish_Hub$2$reflection(Server_ServerMsg$reflection(), Client_ClientMsg$reflection())]], [["Item", Client_ClientMsg$reflection()]], [["Item", bool_type]], [["Item", string_type]], [["Item", Page$reflection()]], [["color", string_type], ["menuAltName", string_type]], [["Item", string_type]]]);
}

export class Model extends Record {
    constructor(Shared, Hubb, MenuButton, MenuAlt, CurrPage) {
        super();
        this.Shared = Shared;
        this.Hubb = Hubb;
        this.MenuButton = MenuButton;
        this.MenuAlt = MenuAlt;
        this.CurrPage = CurrPage;
    }
}

export function Model$reflection() {
    return record_type("Main.Types.Model", [], Model, () => [["Shared", Deferred$1$reflection(union_type("Microsoft.FSharp.Core.FSharpResult`2", [Model$reflection_1(), ErrorType$reflection()], FSharpResult$2, () => [[["ResultValue", Model$reflection_1()]], [["ErrorValue", ErrorType$reflection()]]]))], ["Hubb", option_type(Elmish_Hub$2$reflection(Server_ServerMsg$reflection(), Client_ClientMsg$reflection()))], ["MenuButton", HtmlElement$reflection()], ["MenuAlt", tuple_type(HtmlElement$reflection(), string_type)], ["CurrPage", Page$reflection()]]);
}

