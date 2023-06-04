import {ILogIn} from "../interfaces/ILogIn";
import {ISignUp} from "../interfaces/ISignUp";
    
export const loginUser = (user: ILogIn) => {
        return fetch('https://frontend-test-api.yoldi.agency/api/auth/login', {
            method: "POST",
            headers: {
                'accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json());
}

export const  signUpUser = (user: ISignUp) => {
        return fetch('https://frontend-test-api.yoldi.agency/api/auth/sign-up', {
            method: "POST",
            headers: {
                'accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json());
}