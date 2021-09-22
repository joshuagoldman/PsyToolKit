module App.View

open Sutil
open Thoth.Json
open Shared
open Sutil
open App.GlobalTypes
open Sutil.Attr
open Fable.Core.JsInterop
open Sutil.DOM
open Fable.Core.JsInterop
open Feliz
open Main.Functions.Miscellaneous


let zIndex3LevelStyle =
    style [
            Css.padding 30
            Css.positionAbsolute
            Css.zIndex 3
            Css.backgroundImage "linear-gradient(270deg, rgba(0, 0, 0, 0.0 ), rgba(0, 0, 0, 0.8))"
            Css.height 700
        ]

let homeView (model: Main.Types.Model) dispatch =
    Html.div[
        class' "home"
        zIndex3LevelStyle
        
        Html.div [
            class' "home-basic-info"
            Main.Functions.Miscellaneous.showTitle model dispatch 
        ]

        Html.div [
            class' "home-menu-area"
            Html.div [
                class' "menu-grid"
                burgerMenuAlts model dispatch
                hamburgerMenu model dispatch
            ]
        ]
    ]

let infoView (model: Main.Types.Model) dispatch =
    Html.div[
        class' "info"

        zIndex3LevelStyle

        Html.div [
            class' "info-menu-area"
            Html.div [
                class' "menu-grid"
                burgerMenuAlts model dispatch
                hamburgerMenu model dispatch
            ]
        ]
        
        Main.Functions.Miscellaneous.infoContent model dispatch
    ]

let app() =

    let iObsModel, dispatch = () |> Store.makeElmish Main.State.init Main.State.update ignore

    if iObsModel.Value.Hubb.IsNone
    then
        Main.Types.SignalRMessage >> dispatch |> Main.Types.Msg.ConnectToServer |> dispatch

    let iObsIsMenuButtonFolded = 
        Store.map (fun (x:Main.Types.Model) -> x.MenuButton) iObsModel

    Html.div [
        Html.div [
            class' "backgroundVideo"
            Html.video [
                Attr.autoPlay true
                Attr.muted true
                Attr.loop true
                Html.source [
                    Attr.src "video.mp4"
                    Attr.type' "video/mp4"
                ]
                Html.source [
                    Attr.src "video.webm"
                    Attr.type' "video/webm" 
                ]
            ]
        ]
        Html.div [
            class' "backgroundImg"
        ]
        Bind.fragment iObsModel (fun model ->
            match model.CurrPage with
            | Main.Types.Home -> homeView model dispatch
            | _ -> infoView model dispatch
        )
    ]

app() 
|> DOM.mountElement "sutil-app"

