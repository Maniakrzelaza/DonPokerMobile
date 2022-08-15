import { IMainState, IRootState } from "../model/mainSliceModel";

export const getPlayers = (state: IMainState) => state.players;

export const getPlayerName = (state: IMainState) => state.userName;

export const getRoomId = (state: IMainState) => state.roomId;
