import { response } from 'express';

import axios from 'axios'

interface IAcessTokenResponse {

    acess_token: string;
}
interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService {

    async execute(code: string) {

        const url = "https://github.com/login/ouath/acess_token";

        const { data: acessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {

            params: {
                client_id: process.env.CLIENTID_GITHUB,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Aceepts": "applitcation/json"
            }
        });

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${acessTokenResponse.acess_token}`
            }
        })

        return response.data;
    }

}

export { AuthenticateUserService }