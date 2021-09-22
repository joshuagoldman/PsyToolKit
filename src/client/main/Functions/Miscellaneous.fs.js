import { cons, exists, map, append, singleton, iterate, empty, ofArray } from "../../.fable/fable-library.3.2.9/List.js";
import { Msg, Page } from "../Types.fs.js";
import { HtmlEngine$1__img_BB573A, HtmlEngine$1__br_BB573A, HtmlEngine$1__p_Z721C83C5, HtmlEngine$1__text_Z721C83C5, HtmlEngine$1__div_BB573A } from "../../.fable/Feliz.Engine.1.0.0-beta-004/HtmlEngine.fs.js";
import { style, on, onClick, class$0027 } from "../../.fable/Sutil.1.0.0-alpha-006/Attr.fs.js";
import { CssEngine$1__fontSize_Z524259A4, CssEngine$1__borderColor_Z721C83C5, CssEngine$1__backgroundColor_Z721C83C5, CssEngine$1__color_Z721C83C5, CssEngine$1__get_fontWeightBold, CssEngine$1__padding_Z524259A4 } from "../../.fable/Feliz.Engine.1.0.0-beta-004/CssEngine.fs.js";
import { text, Css } from "../../.fable/Sutil.1.0.0-alpha-006/DOM.fs.js";
import { Attr$, Html } from "../../.fable/Sutil.1.0.0-alpha-006/Html.fs.js";
import { singleton as singleton_1, append as append_1, delay, toList } from "../../.fable/fable-library.3.2.9/Seq.js";
import { some } from "../../.fable/fable-library.3.2.9/Option.js";
import { rangeDouble } from "../../.fable/fable-library.3.2.9/Range.js";
import { AttrEngine$1__alt_Z721C83C5, AttrEngine$1__src_Z721C83C5 } from "../../.fable/Feliz.Engine.1.0.0-beta-004/AttrEngine.fs.js";

export const menuAltNames = ofArray(["About me", "Interests", "Education", "Experience"]);

export function matchMenuItemNames(strVal) {
    switch (strVal) {
        case "About me": {
            return new Page(1);
        }
        case "Interests": {
            return new Page(2);
        }
        case "Education": {
            return new Page(3);
        }
        case "Experience": {
            return new Page(4);
        }
        default: {
            return new Page(0);
        }
    }
}

export function mouseMoveEventHandler(dispatch, enters) {
    if (enters) {
        return dispatch(new Msg(7, "burger-grid glass-hover"));
    }
    else {
        return dispatch(new Msg(7, "burger-grid glass"));
    }
}

export function mouseMoveEventHandlerMenuAlt(dispatch, menuAltName, enters) {
    let tupledArg, tupledArg_1;
    if (enters) {
        return dispatch((tupledArg = ["menu-items-grid-item button glass-hover", menuAltName], new Msg(6, tupledArg[0], tupledArg[1])));
    }
    else {
        return dispatch((tupledArg_1 = ["menu-items-grid-item button glass", menuAltName], new Msg(6, tupledArg_1[0], tupledArg_1[1])));
    }
}

export function menuAlt(strVal, model, dispatch) {
    const patternInput = model.MenuAlt;
    const page = patternInput[1];
    const element = patternInput[0];
    let chosenClass;
    const matchValue = [page === strVal, element.Class];
    let pattern_matching_result;
    if (matchValue[0]) {
        if (matchValue[1] != null) {
            pattern_matching_result = 0;
        }
        else {
            pattern_matching_result = 1;
        }
    }
    else {
        pattern_matching_result = 1;
    }
    switch (pattern_matching_result) {
        case 0: {
            const className = matchValue[1];
            chosenClass = className;
            break;
        }
        case 1: {
            chosenClass = "menu-items-grid-item button glass";
            break;
        }
    }
    return HtmlEngine$1__div_BB573A(Html, [class$0027(chosenClass), onClick((_arg1) => {
        dispatch(new Msg(5, matchMenuItemNames(strVal)));
    }, empty()), HtmlEngine$1__div_BB573A(Html, [on("mousemove", (_arg2) => {
        mouseMoveEventHandlerMenuAlt(dispatch, strVal, true);
    }, empty()), on("mouseleave", (_arg3) => {
        mouseMoveEventHandlerMenuAlt(dispatch, strVal, false);
    }, empty()), style([CssEngine$1__padding_Z524259A4(Css, 17), CssEngine$1__get_fontWeightBold(Css), CssEngine$1__color_Z721C83C5(Css, "white"), CssEngine$1__backgroundColor_Z721C83C5(Css, "transparent"), CssEngine$1__borderColor_Z721C83C5(Css, "transparent")]), text(strVal)])]);
}

export function menuAction(model, dispatch, _arg1) {
    const matchValue = model.MenuButton.IsActive;
    if (matchValue != null) {
        const isActive = matchValue;
        const msgs = ofArray([new Msg(5, new Page(0)), new Msg(3, isActive)]);
        iterate((x) => {
            dispatch(x);
        }, msgs);
    }
}

export function burgerMenuAlts(model, dispatch) {
    let list2;
    const matchValue = model.MenuButton.IsActive;
    let pattern_matching_result;
    if (matchValue != null) {
        if (matchValue) {
            pattern_matching_result = 1;
        }
        else {
            pattern_matching_result = 0;
        }
    }
    else {
        pattern_matching_result = 1;
    }
    switch (pattern_matching_result) {
        case 0: {
            return HtmlEngine$1__div_BB573A(Html, [class$0027("menu-grid-items"), HtmlEngine$1__div_BB573A(Html, (list2 = singleton(class$0027("menu-items-grid")), append(map((name) => menuAlt(name, model, dispatch), menuAltNames), list2)))]);
        }
        case 1: {
            return HtmlEngine$1__div_BB573A(Html, [class$0027("menu-grid-items")]);
        }
    }
}

export function hamburgerMenu(model, dispatch) {
    return HtmlEngine$1__div_BB573A(Html, toList(delay(() => append_1(singleton_1(class$0027("menu-grid-burger")), delay(() => append_1(singleton_1(on("mousemove", (_arg1) => {
        mouseMoveEventHandler(dispatch, true);
    }, empty())), delay(() => append_1(singleton_1(on("click", (arg20$0040) => {
        menuAction(model, dispatch, arg20$0040);
    }, empty())), delay(() => append_1(singleton_1(on("mouseleave", (_arg2) => {
        mouseMoveEventHandler(dispatch, false);
    }, empty())), delay(() => {
        let x;
        let className_1;
        console.log(some("value is: "));
        console.log(some(model.MenuButton.Class));
        const matchValue = model.MenuButton.Class;
        if (matchValue != null) {
            const className = matchValue;
            className_1 = className;
        }
        else {
            className_1 = "burger-grid glass";
        }
        return singleton_1(HtmlEngine$1__div_BB573A(Html, (x = map((pos) => {
            if (exists((posComp) => (posComp === pos), ofArray([1, 2, 6, 7]))) {
                console.log(some(pos));
                return HtmlEngine$1__div_BB573A(Html, [class$0027("burger-grid-burger")]);
            }
            else {
                console.log(some(pos));
                return HtmlEngine$1__div_BB573A(Html, [class$0027("burger-grid-burger"), style([CssEngine$1__backgroundColor_Z721C83C5(Css, "white")])]);
            }
        }, toList(rangeDouble(1, 1, 7))), cons(class$0027(className_1), x))));
    })))))))))));
}

export const loreIpsumTxt = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u0027s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\r\n\r\nWhy do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \u0027Content here, content here\u0027, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \u0027lorem ipsum\u0027 will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n\r\n";

export const htmlText = HtmlEngine$1__div_BB573A(Html, [class$0027("main-grid-content"), HtmlEngine$1__div_BB573A(Html, [class$0027("main-grid-text"), HtmlEngine$1__div_BB573A(Html, [class$0027("main-grid-text-header"), HtmlEngine$1__text_Z721C83C5(Html, "What is Lorem Ipsum?"), style([CssEngine$1__color_Z721C83C5(Css, "white"), CssEngine$1__get_fontWeightBold(Css), CssEngine$1__fontSize_Z524259A4(Css, 18)])]), HtmlEngine$1__div_BB573A(Html, [class$0027("main-grid-text-text"), HtmlEngine$1__p_Z721C83C5(Html, loreIpsumTxt), style([CssEngine$1__color_Z721C83C5(Css, "white"), CssEngine$1__get_fontWeightBold(Css)])])])]);

export const singleContent = HtmlEngine$1__div_BB573A(Html, [class$0027("content-grid-content"), HtmlEngine$1__div_BB573A(Html, [class$0027("section-grid"), HtmlEngine$1__div_BB573A(Html, [class$0027("section-grid-header"), HtmlEngine$1__text_Z721C83C5(Html, "What is Lorem Ipsum?"), style([CssEngine$1__color_Z721C83C5(Css, "white"), CssEngine$1__get_fontWeightBold(Css), CssEngine$1__fontSize_Z524259A4(Css, 18)])]), HtmlEngine$1__div_BB573A(Html, [class$0027("section-grid-content"), HtmlEngine$1__p_Z721C83C5(Html, loreIpsumTxt), HtmlEngine$1__br_BB573A(Html, []), HtmlEngine$1__br_BB573A(Html, []), HtmlEngine$1__div_BB573A(Html, [HtmlEngine$1__img_BB573A(Html, [AttrEngine$1__src_Z721C83C5(Attr$, "FSharpAnimation.gif"), AttrEngine$1__alt_Z721C83C5(Attr$, "description")])]), style([CssEngine$1__color_Z721C83C5(Css, "white"), CssEngine$1__get_fontWeightBold(Css)])])])]);

export function infoContent(model, dispatch) {
    let cntnt;
    return HtmlEngine$1__div_BB573A(Html, [class$0027("info-content-area glass main-scroll"), HtmlEngine$1__div_BB573A(Html, [HtmlEngine$1__div_BB573A(Html, (cntnt = map((_arg1) => singleContent, toList(rangeDouble(1, 1, 3))), cons(class$0027("content-grid"), cntnt)))])]);
}

export function showTitle(model, dispatch) {
    if (model.CurrPage.tag === 0) {
        return HtmlEngine$1__div_BB573A(Html, [class$0027("title"), HtmlEngine$1__div_BB573A(Html, [class$0027("title-name gradient-text"), HtmlEngine$1__div_BB573A(Html, []), HtmlEngine$1__div_BB573A(Html, [class$0027("title-author"), text("Joshua Goldman / יהושוע גולדמן")]), style([CssEngine$1__fontSize_Z524259A4(Css, 60)])])]);
    }
    else {
        return HtmlEngine$1__div_BB573A(Html, []);
    }
}

