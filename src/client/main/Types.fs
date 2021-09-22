module Main.Types

open Shared
open Sutil
open Fable.SignalR
open App.GlobalTypes

type KeyType =
    | BackSpace
    | OtherKey of string

type UserInfo = {
    CurrUserName: string option
    CurrPassword: string option
}

type Page = 
    | Home
    | AboutMe
    | Interests
    | Education
    | Experience

type Msg =
    | ConnectToServer of Dispatch<Client.ClientMsg>
    | RegisterHub of Fable.SignalR.Elmish.Elmish.Hub<Server.ServerMsg,Client.ClientMsg>
    | SignalRMessage of Client.ClientMsg
    | MenuButtonClicked of bool
    | TestCredential of string
    | PageChanged of Page
    | ChangeMenuAltColor of color:string * menuAltName:string
    | ChangeMenuButtonColor of string
type Model =  {
    Shared: Deferred<Result<Shared.Model, ErrorType>>
    Hubb: Fable.SignalR.Elmish.Elmish.Hub<Server.ServerMsg,Client.ClientMsg> option
    MenuButton: HtmlElement
    MenuAlt: HtmlElement * string
    CurrPage: Page
}

