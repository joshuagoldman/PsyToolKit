module App.GlobalTypes

let delayedMsg (time: int) 
               (dispatch: 'msg -> unit)
               (msg: 'msg) = async {
    do! Async.Sleep time
    msg |> dispatch
}

let delayedMsgs (time: int) 
               (dispatch: 'msg -> unit)
               (msgs: List<'msg>) = async {
    do! Async.Sleep time
    msgs
    |> List.iter (fun msg -> msg |> dispatch)
}

type Deferred<'a> =
    | HasNotStarteYet
    | Ongoing
    | Resolved of 'a


type HtmlElement = {
    BackgroundColor: string option
    FontColor: string option
    FontWeight: string option
    FontSize: string option
    FontFamily: string option
    BorderWidth: string option
    IsActive: bool option
    Class: string option
}

let initELement = {
    BackgroundColor = None
    FontColor = None
    FontWeight = None
    FontSize = None
    FontFamily = None
    BorderWidth = None
    IsActive = Some true
    Class = None
}

type User = {
    Username: string
    Password: string
    NickName: string
    PictureID: string
    Friends: User List
}

type Status = 
    | Online
    | Offline
    | Away

type UserState = {
    CurrUser: User
    CurrUserStatus: Status
}

