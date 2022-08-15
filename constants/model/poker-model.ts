export enum ICardKeys {
    Half = "Half",
    One = "One",
    OneAndHalf = "OneAndHalf",
    Two = "Two",
    TwoAndHalf = "TwoAndHalf",
    Three = "Three",
    ThreeAndHalf = "ThreeAndHalf",
    Four = "Four",
    FourAndHalf = "FourAndHalf",
    Five = "Five",
    FiveAndHalf = "FiveAndHalf",
    Coffee = "Coffee",
    Empty = "?",
}

export interface CardValue {
    key: string,
    text: string,
    value: number,
}

export const CardValues: CardValue[] = [
    {
        key: ICardKeys.Half,
        text: "1/2",
        value: 0.5
    },
    {
        key: ICardKeys.One,
        text: "1",
        value: 1
    },
    {
        key: ICardKeys.OneAndHalf,
        text: "1.5",
        value: 1.5
    },
    {
        key: ICardKeys.Two,
        text: "2",
        value: 2
    },
    {
        key: ICardKeys.TwoAndHalf,
        text: "2.5",
        value: 2.5
    },
    {
        key: ICardKeys.Three,
        text: "3",
        value: 3
    },
    {
        key: ICardKeys.ThreeAndHalf,
        text: "3.5",
        value: 3.5
    },
    {
        key: ICardKeys.Four,
        text: "4",
        value: 4
    },
    {
        key: ICardKeys.FourAndHalf,
        text: "4.5",
        value: 4.5
    },
    {
        key: ICardKeys.Five,
        text: "5",
        value: 5
    },
    {
        key: ICardKeys.FiveAndHalf,
        text: "5.5",
        value: 5.5
    },
    {
        key: ICardKeys.Coffee,
        text: "Coffee",
        value: 0
    },
]

const emptyCard = {
    key: ICardKeys.Empty,
    text: "?",
    value: 0
}

export const cardKeyToCardValue = (key: ICardKeys | null | "" | undefined): CardValue => {
    if (!key) {
        return emptyCard;
    }
    const result = CardValues.find(c => c.key === key);
    return result ?? emptyCard;
}