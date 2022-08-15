import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { IMainState, IPlayer, IRoomSnapshot } from "./model/mainSliceModel";
import { store } from "./store";
import { addRoomId, changeName, mapSnapshotToState } from "./slices/mainSlice";
import { initializeApp } from 'firebase/app';
import navigationService from "./navigation-service";
import { ICardKeys } from "../constants/model/poker-model";

// storing creds is bad, only for dev purpose
const firebaseConfig = {
    apiKey: "AIzaSyAVjqocnkOQuh28tCsS2o_bw5D-jMGwdIk",
    authDomain: "don-poker.firebaseapp.com",
    projectId: "don-poker",
    storageBucket: "don-poker.appspot.com",
    messagingSenderId: "177063809802",
    appId: "1:177063809802:web:f491e74ce515d6f830a0f3",
    measurementId: "G-WG45KJ19B0",
    databaseURL: "https://don-poker-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const init = async () => {
    initializeApp(firebaseConfig);
    getDatabase();
}

const initAllListeners = (roomId: string) => {
    const db = getDatabase();
    const roomRef = ref(db, '/rooms/' + roomId);
    onValue(roomRef, (snapshot) => {
        const data: IRoomSnapshot = snapshot.val();
        store.dispatch(mapSnapshotToState(data))
    });
}

export const createRoom = async (name: string = "KacperAdmin") => {
    const db = getDatabase();
    const code = Math.floor(Math.random() * 100000);
    const roomsRef = ref(db, 'rooms/' + code);
    await set(roomsRef, {
        players: [{
            playerName: name,
            point: ""
        }]
    }).then(() => {
        store.dispatch(addRoomId(code?.toString()))
        store.dispatch(changeName(name))
        initAllListeners(`${code}`);
        navigationService.navigate('Poker');
    });
    return code;
}

export const addYourselfToRoom = (name: string, roomId: string) => {
    const db = getDatabase();
    return get(ref(db, '/rooms/' + roomId))
        .then(snapshot => {
            const data: IRoomSnapshot = snapshot.val();
            set(ref(db, '/rooms/' + roomId), {
                players: [
                    ...data.players,
                    {
                        playerName: name,
                        point: ""
                    }
                ]
            });
            initAllListeners(roomId);
            navigationService.navigate('Poker');
        })
}

export const upDateYourselfInRoom = () => {
    const db = getDatabase();
    const state: IMainState = store.getState();
    const roomId = state.roomId;
    const player: IPlayer = {
        playerName: state.userName,
        point: state.point as ICardKeys,
        command: null,
    }
    return get(ref(db, '/rooms/' + roomId))
        .then(snapshot => {
            const data: IRoomSnapshot = snapshot.val();
            return set(ref(db, '/rooms/' + roomId), {
                ...data,
                players: [
                    ...(data.players.filter(p => p.playerName !== player.playerName)),
                    player
                ]
            });
        })
}

export const resetVotes = () => {
    const db = getDatabase();
    const state: IMainState = store.getState();
    const roomId = state.roomId;
    return get(ref(db, '/rooms/' + roomId))
        .then(snapshot => {
            const data: IRoomSnapshot = snapshot.val();
            return set(ref(db, '/rooms/' + roomId), {
                ...data,
                players: [
                    ...data.players.map((p) => ({
                        ...p,
                        point: "",
                    }))
                ]
            });
        })
}

