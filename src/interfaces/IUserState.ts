import { IProfile } from './IProfile';

export interface IUserState {
    data: IProfile | null;
    isEditModalOpen: boolean;
    isSignOut: boolean;
}