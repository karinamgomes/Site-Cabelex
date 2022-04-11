import api from "../api";


export async function singInService(email:string,password:string){
    return api.post('login',{email,password}).then(response=>{
        const {token, user } = response.data;
        return {token, user}
    }).catch(err=>{
        throw new Error("Failed to login");
    })
}
