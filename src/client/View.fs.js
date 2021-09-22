import { class$0027, style } from "./.fable/Sutil.1.0.0-alpha-006/Attr.fs.js";
import { CssEngine$1__height_Z524259A4, CssEngine$1__backgroundImage_Z721C83C5, CssEngine$1__zIndex_Z524259A4, CssEngine$1__get_positionAbsolute, CssEngine$1__padding_Z524259A4 } from "./.fable/Feliz.Engine.1.0.0-beta-004/CssEngine.fs.js";
import { mountElement, Css } from "./.fable/Sutil.1.0.0-alpha-006/DOM.fs.js";
import { HtmlEngine$1__source_BB573A, HtmlEngine$1__video_BB573A, HtmlEngine$1__div_BB573A } from "./.fable/Feliz.Engine.1.0.0-beta-004/HtmlEngine.fs.js";
import { infoContent, hamburgerMenu, burgerMenuAlts, showTitle } from "./main/Functions/Miscellaneous.fs.js";
import { Attr$, Html } from "./.fable/Sutil.1.0.0-alpha-006/Html.fs.js";
import { Store_map, Store_makeElmish } from "./.fable/Sutil.1.0.0-alpha-006/Store.fs.js";
import { update, init } from "./main/State.fs.js";
import { Msg } from "./main/Types.fs.js";
import { AttrEngine$1__type$0027_Z721C83C5, AttrEngine$1__src_Z721C83C5, AttrEngine$1__loop_Z1FBCCD16, AttrEngine$1__muted_Z1FBCCD16, AttrEngine$1__autoPlay_Z1FBCCD16 } from "./.fable/Feliz.Engine.1.0.0-beta-004/AttrEngine.fs.js";
import { BindApi_Bind_fragment } from "./.fable/Sutil.1.0.0-alpha-006/Bindings.fs.js";

export const zIndex3LevelStyle = style([CssEngine$1__padding_Z524259A4(Css, 30), CssEngine$1__get_positionAbsolute(Css), CssEngine$1__zIndex_Z524259A4(Css, 3), CssEngine$1__backgroundImage_Z721C83C5(Css, "linear-gradient(270deg, rgba(0, 0, 0, 0.0 ), rgba(0, 0, 0, 0.8))"), CssEngine$1__height_Z524259A4(Css, 700)]);

export function homeView(model, dispatch) {
    return HtmlEngine$1__div_BB573A(Html, [class$0027("home"), zIndex3LevelStyle, HtmlEngine$1__div_BB573A(Html, [class$0027("home-basic-info"), showTitle(model, dispatch)]), HtmlEngine$1__div_BB573A(Html, [class$0027("home-menu-area"), HtmlEngine$1__div_BB573A(Html, [class$0027("menu-grid"), burgerMenuAlts(model, dispatch), hamburgerMenu(model, dispatch)])])]);
}

export function infoView(model, dispatch) {
    return HtmlEngine$1__div_BB573A(Html, [class$0027("info"), zIndex3LevelStyle, HtmlEngine$1__div_BB573A(Html, [class$0027("info-menu-area"), HtmlEngine$1__div_BB573A(Html, [class$0027("menu-grid"), burgerMenuAlts(model, dispatch), hamburgerMenu(model, dispatch)])]), infoContent(model, dispatch)]);
}

export function app() {
    const patternInput = Store_makeElmish(init, (msg, model) => update(msg, model), (value) => {
    })();
    const iObsModel = patternInput[0];
    const dispatch = patternInput[1];
    if (iObsModel.Value.Hubb == null) {
        dispatch(new Msg(0, (arg) => {
            dispatch(new Msg(2, arg));
        }));
    }
    const iObsIsMenuButtonFolded = Store_map((x) => x.MenuButton, iObsModel);
    return HtmlEngine$1__div_BB573A(Html, [HtmlEngine$1__div_BB573A(Html, [class$0027("backgroundVideo"), HtmlEngine$1__video_BB573A(Html, [AttrEngine$1__autoPlay_Z1FBCCD16(Attr$, true), AttrEngine$1__muted_Z1FBCCD16(Attr$, true), AttrEngine$1__loop_Z1FBCCD16(Attr$, true), HtmlEngine$1__source_BB573A(Html, [AttrEngine$1__src_Z721C83C5(Attr$, "video.mp4"), AttrEngine$1__type$0027_Z721C83C5(Attr$, "video/mp4")]), HtmlEngine$1__source_BB573A(Html, [AttrEngine$1__src_Z721C83C5(Attr$, "video.webm"), AttrEngine$1__type$0027_Z721C83C5(Attr$, "video/webm")])])]), HtmlEngine$1__div_BB573A(Html, [class$0027("backgroundImg")]), BindApi_Bind_fragment(iObsModel, (model_1) => ((model_1.CurrPage.tag === 0) ? homeView(model_1, dispatch) : infoView(model_1, dispatch)))]);
}

mountElement("sutil-app", app());

