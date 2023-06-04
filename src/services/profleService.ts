import {IUpdateProfile} from '../interfaces/IUpdateProfile';

export const getProfileUser = (value: string) => {
    return fetch('https://frontend-test-api.yoldi.agency/api/profile', {
        headers: {
            "X-API-KEY": value,
        }
    }).then(response => {if (response.status > 201) {
        throw new Error('profile error');
    } else return response.json()});
}

export const updateProfileUser = (updateData: IUpdateProfile, value: string) => {
    return fetch('https://frontend-test-api.yoldi.agency/api/profile', {
        method: "PATCH",
        body: JSON.stringify(updateData),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            "X-API-KEY": value,
        }
    }).then(response => response.json());
}