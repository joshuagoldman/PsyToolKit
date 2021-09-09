module App.GlobalTypes

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
}

let initELement = {
    BackgroundColor = None
    FontColor = None
    FontWeight = None
    FontSize = None
    FontFamily = None
    BorderWidth = None
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

