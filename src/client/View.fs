module App.View

open Sutil
open Thoth.Json
open Shared
open Sutil
open App.GlobalTypes
open Sutil.Attr
open Fable.Core.JsInterop
open Sutil.DOM

let styleSheet = [
    Sutil.Styling.rule ".cv-img" [
        Css.height 175
        Css.width 250  
        Css.borderStyleSolid
        Css.marginLeft 5
        Css.borderWidth 2
    ]
]

let sharedModelState modelState =
    match modelState with
    | Deferred.HasNotStarteYet ->
        [Html.none]
    | Deferred.Ongoing ->
        [
            Html.div [
                Html.i [
                     class' "fas fa-spinner fa-spin"
                ]
                style [
                    Css.fontSize 15
                    Css.marginTop 20
                    Css.textAlignCenter
                    Css.color "black"
                ]
            ]
            Html.div [
                text "laddar..."
                style [
                    Css.marginLeft 4
                    Css.fontSize 15
                    Css.marginTop 20
                    Css.textAlignCenter
                    Css.color "black"
                ]
            ] 
        ]
    | Deferred.Resolved result ->
        match result with
        | Ok sharedModel ->
            let errorAsElement =
                Html.div [
                    class' "column"
                    Html.a [
                        Attr.href (sharedModel : Shared.Model).CurrLink
                        text "Klicka på denna länk för att börja undersökningen"
                    ]
                    style [
                        Css.fontSize 15
                        Css.marginTop 20
                        Css.textAlignCenter
                        Css.color "black"
                    ]
                ]

            [errorAsElement]
        | Result.Error errType ->
            match errType with
            | ErrorType.Multiple errors ->
                let errorsAsElement =
                    errors
                    |> List.map (fun error ->
                            Html.div [
                                class' "column is-2"
                                text error
                            ]
                        )

                errorsAsElement
               
                
            | ErrorType.Single singleError ->
                let errorAsElement =
                    Html.div [
                        class' "column is-2"
                        text singleError
                        style [
                            Css.fontSize 15
                            Css.marginTop 20
                            Css.textAlignCenter
                        ]
                    ]

                [errorAsElement]

let app() =

    let iObsModel, dispatch = () |> Store.makeElmish Main.State.init Main.State.update ignore

    if iObsModel.Value.Hubb.IsNone
    then
        Main.Types.SignalRMessage >> dispatch |> Main.Types.Msg.ConnectToServer |> dispatch

    let iObsCurrCode = iObsModel |> Store.map (fun model -> model.CurrCode)

    Html.div [
        class' "columns is-centered"
        Html.div [
            class' "column"
            style [
                Css.minHeight 1000
                Css.minWidth 1000
                Css.backgroundRepeatNoRepeat
                Css.backgroundSizeCover
                Css.backgroundImage("url(Island.jpg)")
            ]
            Html.div [
                class' "columns is-centered"
                Html.div [
                    Bind.fragment iObsModel ( fun model ->
                        Html.div [
                            class' "button"
                            style [
                                Css.marginTop 40
                                Css.borderStyleSolid
                                Css.borderWidth 2
                                Css.borderColor "black"
                            ]
                            onClick (fun _ -> Main.Types.ExercizeButtonClicked |> dispatch
                                    ) []

                            text "Hämta länk"
                        ]
                    )
                ]
            ]
            Bind.fragment iObsModel (fun model ->
                [
                    (class' "columns is-centered")
                    style [
                        Css.marginBottom 20
                        Css.fontWeightBold
                        Css.fontSize 25
                    ]
                ]
                |> List.append (sharedModelState model.Shared) 
                |> Html.div
             )
        ]
    ] |> Sutil.Styling.withStyle styleSheet

app() 
|> DOM.mountElement "sutil-app"
