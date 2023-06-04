export const postImage = (image: FormData) => {
    return fetch('https://frontend-test-api.yoldi.agency/api/image', {
        method: "POST",
        body: image
    }).then(response => {if (response.status > 201) {
        throw new Error('post image error');
    } else return response.json()});
}

export const getImageById = (id: string) => {
    return fetch(`https://frontend-test-api.yoldi.agency/api/image/${id}`).then(response => {if (response.status > 201) {
        throw new Error('get image by id error');
    } else return response.json()});
}