import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMainState, IRoomSnapshot } from "../model/mainSliceModel";

const initialState: IMainState = {
    players: [],
    roomId: "",
    userName: "",
    point: "",
}

const mainSlice = createSlice({
    name: "main",
    initialState: initialState,
    reducers: {
        addRoomId: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload;
        },
        changeName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
        changePoint: (state, action: PayloadAction<{ data: string }>) => {
            state.point = action.payload.data;
        },
        mapSnapshotToState: (state, action: PayloadAction<IRoomSnapshot>) => {
            state.players = action.payload.players;
        },
    }
})

export const {
    addRoomId,
    changeName,
    changePoint,
    mapSnapshotToState,
} = mainSlice.actions
export default mainSlice.reducer