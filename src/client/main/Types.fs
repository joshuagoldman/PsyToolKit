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

type Msg =
    | ConnectToServer of Dispatch<Client.ClientMsg>
    | RegisterHub of Fable.SignalR.Elmish.Elmish.Hub<Server.ServerMsg,Client.ClientMsg>
    | ExercizeButtonClicked
    | SignalRMessage of Client.ClientMsg
    | TestCredential of credential:string  
    | Changeinput of KeyType
type Model =  {
    Shared: Deferred<Result<Shared.Model, ErrorType>>
    Hubb: Fable.SignalR.Elmish.Elmish.Hub<Server.ServerMsg,Client.ClientMsg> option
    GoToExercizeButton : HtmlElement
    CurrCode: Validation<Result<string,string * ErrorType>>
}

