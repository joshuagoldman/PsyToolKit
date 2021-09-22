module Main.Functions.Miscellaneous

open Main.Types
open Sutil
open Shared
open Fable.SignalR
open Fable.SignalR.Elmish
open Microsoft.AspNetCore.SignalR.Client
open App.GlobalTypes
open Thoth.Json
open Sutil
open App.GlobalTypes
open Sutil.Attr
open Fable.Core.JsInterop
open Sutil.DOM
open Fable.Core.JsInterop
open Feliz

let menuAltNames = [
    "About me"
    "Interests"
    "Education"
    "Experience"
]

let matchMenuItemNames strVal =
    match strVal with 
    | "About me" -> AboutMe
    | "Interests" -> Interests
    | "Education" -> Education
    | "Experience" -> Experience
    | _ -> Home

let mouseMoveEventHandler dispatch enters =
    match enters with
    | true ->
        "burger-grid glass-hover"
        |> Msg.ChangeMenuButtonColor
        |> dispatch
    | false -> 
        "burger-grid glass"
        |> Msg.ChangeMenuButtonColor
        |> dispatch

let mouseMoveEventHandlerMenuAlt dispatch menuAltName enters =
    match enters with
    | true ->
        ("menu-items-grid-item button glass-hover", menuAltName)
        |> Msg.ChangeMenuAltColor
        |> dispatch
    | false -> 
        ("menu-items-grid-item button glass", menuAltName)
        |> Msg.ChangeMenuAltColor
        |> dispatch

let menuAlt strVal (model: Main.Types.Model) dispatch =
    let (element,page) = model.MenuAlt

    let chosenClass =
        match page = strVal, element.Class with 
        | true,Some(className) -> className
        | _,_ -> 
            "menu-items-grid-item button glass"

    Html.div [
        class' chosenClass
        onClick (fun _ ->
            strVal
            |> matchMenuItemNames
            |> Msg.PageChanged
            |> dispatch) []
        Html.div [
            on "mousemove" (fun _ -> true |> mouseMoveEventHandlerMenuAlt dispatch strVal) []
            on "mouseleave" (fun _ -> false |> mouseMoveEventHandlerMenuAlt dispatch strVal) []
            style [
                Css.padding 17
                Css.fontWeightBold
                Css.color "white"
                Css.backgroundColor "transparent"
                Css.borderColor "transparent"
            ]
            text strVal
        ]   
    ]

let menuAction model dispatch =
    fun _ ->
        match  model.MenuButton.IsActive with 
        | Some isActive ->
            let msgs =
                [
                    Home
                    |> Msg.PageChanged

                    Main.Types.Msg.MenuButtonClicked isActive
                ]

            msgs   
            |> List.iter (fun x -> x |> dispatch)

        | _ -> ()

let burgerMenuAlts (model: Main.Types.Model) dispatch =
    match model.MenuButton.IsActive with
        | Some(false) ->
            Html.div [
                class' "menu-grid-items"
                [class' "menu-items-grid"]
                |> List.append (
                    menuAltNames
                    |> List.map (fun name ->
                            menuAlt name model dispatch
                        )
                )
                |> Html.div
            ]
            
        | _ -> Html.div[class' "menu-grid-items"]



let hamburgerMenu (model: Main.Types.Model) dispatch = 
    Html.div [
        class' "menu-grid-burger"
        on "mousemove" (fun _ -> true |> mouseMoveEventHandler dispatch) []
        on "click" (menuAction model dispatch ) []
        on "mouseleave" (fun _ -> false |> mouseMoveEventHandler dispatch) []
        let className =
            Browser.Dom.console.log("value is: ")
            Browser.Dom.console.log(model.MenuButton.Class)
            match model.MenuButton.Class with
            | Some className -> className
            | _ -> "burger-grid glass"

        [1..7]
        |> List.map (fun  pos ->
                match ([1;2;6;7] |> List.exists(fun posComp -> posComp = pos)) with
                | true ->
                    Browser.Dom.console.log(pos)
                    Html.div [
                        class' "burger-grid-burger"
                    ]
                | false ->
                    Browser.Dom.console.log(pos)
                    Html.div [
                        class' "burger-grid-burger"
                        style [
                            Css.backgroundColor "white"
                        ]
                    ]
                
            )
        |> fun x ->
            (class' className) :: x
        |> fun x -> Html.div x
    ]

let loreIpsumTxt =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

"  

let htmlText = 
    Html.div [
        class' "main-grid-content"
        Html.div[
            class' "main-grid-text"
            Html.div [
                class' "main-grid-text-header"
                Html.text "What is Lorem Ipsum?"
                style [
                    Css.color "white"
                    Css.fontWeightBold
                    Css.fontSize 18
                ]
            ]
            Html.div [
                class' "main-grid-text-text"
                Html.p loreIpsumTxt
                style [
                    Css.color "white"
                    Css.fontWeightBold
                ]
            ]
        ]
    ]

let singleContent =
    Html.div [
        class' "content-grid-content"
        Html.div [
            class' "section-grid"
            Html.div [
                class' "section-grid-header"
                Html.text "What is Lorem Ipsum?"
                style [
                    Css.color "white"
                    Css.fontWeightBold
                    Css.fontSize 18
                ]
            ]
            Html.div [
                class' "section-grid-content"
                Html.p loreIpsumTxt
                Html.br[]
                Html.br[]
                Html.div [
                    Html.img [
                        Attr.src "FSharpAnimation.gif"
                        Attr.alt "description"
                    ]
                ]
                style [
                    Css.color "white"
                    Css.fontWeightBold
                ]
            ]
        ]
    ]

let infoContent (model: Main.Types.Model) dispatch =
    Html.div [
            class' "info-content-area glass main-scroll"
            Html.div [
                [1..3]
                |> List.map ( fun _ ->
                        singleContent
                    )
                |> fun cntnt ->
                    (class' "content-grid") :: cntnt
                |> Html.div
            ]
    ]

let showTitle (model: Main.Types.Model) dispatch =
    match model.CurrPage with
    | Home ->
        Html.div [
                class' "title"
                Html.div [
                    class' "title-name gradient-text"
                    Html.div[]
                    Html.div[
                        class' "title-author"
                        text "Joshua Goldman / יהושוע גולדמן"
                    ]
                    style [
                        Css.fontSize 60
                    ]
                    
                ]
        ]
    | _ -> 
        Html.div[]

