export const getUserBySlug = (slug: string) => {
    return fetch(`https://frontend-test-api.yoldi.agency/api/user/${slug}`, {
        headers: {
            'accept': 'application/json'
        },
    }).then(response => response.json());
} 

export const getUser = () => {
    return fetch('https://frontend-test-api.yoldi.agency/api/user').then(response => {if (response.status > 201) {
        throw new Error('get user error');
    } else return response.json()});
}