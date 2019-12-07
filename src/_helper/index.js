import { createHashHistory } from 'history';
import {userService} from '../_services'


export const history = createHashHistory({ forceRefresh: true });

export function authHeader() {
    // return authorization header with jwt token
    try {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
            return { 'Authorization': 'Bearer ' + user.token };
        } else {
            return {};
        }  
    } catch (error) {
        console.log(error)
    }
}

export function handleResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function handleOnChange(e, setFunc) {
    e.preventDefault();
    setFunc( e.target.value )

    // console.log("funcs:", test);
}

