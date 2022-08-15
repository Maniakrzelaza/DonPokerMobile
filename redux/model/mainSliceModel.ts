import { ICardKeys } from "../../constants/model/poker-model";

export interface ICommand {
    value: string,
    hash: string,
}

export interface IRoomSnapshot {
    players: IPlayer[],
}

export interface IPlayer {
    playerName: string,
    point: ICardKeys | null | "",
    command?: ICommand | null,
}

export type IRootState = {
    main: IMainState,
}

export interface IMainState {
    players: IPlayer[],
    roomId: string,
    userName: string,
    point: string | "" | null,
}