import { withStyle, rule } from "./.fable/Sutil.1.0.0-alpha-006/Styling.fs.js";
import { CssEngine$1__get_fontWeightBold, CssEngine$1__marginBottom_Z524259A4, CssEngine$1__borderColor_Z721C83C5, CssEngine$1__backgroundImage_Z721C83C5, CssEngine$1__get_backgroundSizeCover, CssEngine$1__get_backgroundRepeatNoRepeat, CssEngine$1__minWidth_Z524259A4, CssEngine$1__minHeight_Z524259A4, CssEngine$1__color_Z721C83C5, CssEngine$1__get_textAlignCenter, CssEngine$1__marginTop_Z524259A4, CssEngine$1__fontSize_Z524259A4, CssEngine$1__borderWidth_Z524259A4, CssEngine$1__marginLeft_Z524259A4, CssEngine$1__get_borderStyleSolid, CssEngine$1__width_Z524259A4, CssEngine$1__height_Z524259A4 } from "./.fable/Feliz.Engine.1.0.0-beta-004/CssEngine.fs.js";
import { mountElement, text, Css } from "./.fable/Sutil.1.0.0-alpha-006/DOM.fs.js";
import { append, empty, map, singleton, ofArray } from "./.fable/fable-library.3.2.9/List.js";
import { HtmlEngine$1__get_none, HtmlEngine$1__a_BB573A, HtmlEngine$1__i_BB573A, HtmlEngine$1__div_BB573A } from "./.fable/Feliz.Engine.1.0.0-beta-004/HtmlEngine.fs.js";
import { onClick, style, class$0027 } from "./.fable/Sutil.1.0.0-alpha-006/Attr.fs.js";
import { Attr$, Html } from "./.fable/Sutil.1.0.0-alpha-006/Html.fs.js";
import { AttrEngine$1__href_Z721C83C5 } from "./.fable/Feliz.Engine.1.0.0-beta-004/AttrEngine.fs.js";
import { Store_map, Store_makeElmish } from "./.fable/Sutil.1.0.0-alpha-006/Store.fs.js";
import { update, init } from "./main/State.fs.js";
import { Msg } from "./main/Types.fs.js";
import { BindApi_Bind_fragment } from "./.fable/Sutil.1.0.0-alpha-006/Bindings.fs.js";

export const styleSheet = singleton(rule(".cv-img", ofArray([CssEngine$1__height_Z524259A4(Css, 175), CssEngine$1__width_Z524259A4(Css, 250), CssEngine$1__get_borderStyleSolid(Css), CssEngine$1__marginLeft_Z524259A4(Css, 5), CssEngine$1__borderWidth_Z524259A4(Css, 2)])));

export function sharedModelState(modelState) {
    switch (modelState.tag) {
        case 1: {
            return ofArray([HtmlEngine$1__div_BB573A(Html, [HtmlEngine$1__i_BB573A(Html, [class$0027("fas fa-spinner fa-spin")]), style([CssEngine$1__fontSize_Z524259A4(Css, 15), CssEngine$1__marginTop_Z524259A4(Css, 20), CssEngine$1__get_textAlignCenter(Css), CssEngine$1__color_Z721C83C5(Css, "black")])]), HtmlEngine$1__div_BB573A(Html, [text("laddar..."), style([CssEngine$1__marginLeft_Z524259A4(Css, 4), CssEngine$1__fontSize_Z524259A4(Css, 15), CssEngine$1__marginTop_Z524259A4(Css, 20), CssEngine$1__get_textAlignCenter(Css), CssEngine$1__color_Z721C83C5(Css, "black")])])]);
        }
        case 2: {
            const result = modelState.fields[0];
            if (result.tag === 1) {
                const errType = result.fields[0];
                if (errType.tag === 0) {
                    const singleError = errType.fields[0];
                    const errorAsElement_1 = HtmlEngine$1__div_BB573A(Html, [class$0027("column is-2"), text(singleError), style([CssEngine$1__fontSize_Z524259A4(Css, 15), CssEngine$1__marginTop_Z524259A4(Css, 20), CssEngine$1__get_textAlignCenter(Css)])]);
                    return singleton(errorAsElement_1);
                }
                else {
                    const errors = errType.fields[0];
                    const errorsAsElement = map((error) => HtmlEngine$1__div_BB573A(Html, [class$0027("column is-2"), text(error)]), errors);
                    return errorsAsElement;
                }
            }
            else {
                const sharedModel = result.fields[0];
                const errorAsElement = HtmlEngine$1__div_BB573A(Html, [class$0027("column"), HtmlEngine$1__a_BB573A(Html, [AttrEngine$1__href_Z721C83C5(Attr$, sharedModel.CurrLink), text("Klicka p� denna l�nk f�r att b�rja unders�kningen")]), style([CssEngine$1__fontSize_Z524259A4(Css, 15), CssEngine$1__marginTop_Z524259A4(Css, 20), CssEngine$1__get_textAlignCenter(Css), CssEngine$1__color_Z721C83C5(Css, "black")])]);
                return singleton(errorAsElement);
            }
        }
        default: {
            return singleton(HtmlEngine$1__get_none(Html));
        }
    }
}

export function app() {
    const patternInput = Store_makeElmish(init, (msg, model) => update(msg, model), (value) => {
    })();
    const iObsModel = patternInput[0];
    const dispatch = patternInput[1];
    if (iObsModel.Value.Hubb == null) {
        dispatch(new Msg(0, (arg) => {
            dispatch(new Msg(3, arg));
        }));
    }
    const iObsCurrCode = Store_map((model_1) => model_1.CurrCode, iObsModel);
    return withStyle(styleSheet, HtmlEngine$1__div_BB573A(Html, [class$0027("columns is-centered"), HtmlEngine$1__div_BB573A(Html, [class$0027("column"), style([CssEngine$1__minHeight_Z524259A4(Css, 1000), CssEngine$1__minWidth_Z524259A4(Css, 1000), CssEngine$1__get_backgroundRepeatNoRepeat(Css), CssEngine$1__get_backgroundSizeCover(Css), CssEngine$1__backgroundImage_Z721C83C5(Css, "url(Island.jpg)")]), HtmlEngine$1__div_BB573A(Html, [class$0027("columns is-centered"), HtmlEngine$1__div_BB573A(Html, [BindApi_Bind_fragment(iObsModel, (model_2) => HtmlEngine$1__div_BB573A(Html, [class$0027("button"), style([CssEngine$1__marginTop_Z524259A4(Css, 40), CssEngine$1__get_borderStyleSolid(Css), CssEngine$1__borderWidth_Z524259A4(Css, 2), CssEngine$1__borderColor_Z721C83C5(Css, "black")]), onClick((_arg1) => {
        dispatch(new Msg(2));
    }, empty()), text("H�mta l�nk")]))])]), BindApi_Bind_fragment(iObsModel, (model_3) => {
        let list2;
        return HtmlEngine$1__div_BB573A(Html, (list2 = ofArray([class$0027("columns is-centered"), style([CssEngine$1__marginBottom_Z524259A4(Css, 20), CssEngine$1__get_fontWeightBold(Css), CssEngine$1__fontSize_Z524259A4(Css, 25)])]), append(sharedModelState(model_3.Shared), list2)));
    })])]));
}

mountElement("sutil-app", app());

