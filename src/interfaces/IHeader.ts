import { IProfile } from './IProfile';

export interface IHeader {
    url: string;
    userData: IProfile | null;
}