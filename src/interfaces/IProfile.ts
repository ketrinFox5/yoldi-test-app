import { IImage } from './IImage';

export interface IProfile {
    name: string;
    email: string;
    slug: string;
    image: IImage | null;
    cover: IImage | null;
    description: string;
}