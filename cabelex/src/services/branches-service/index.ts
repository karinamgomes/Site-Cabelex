import api from "../api";


export function listBranches(){
    return  api.get('branches').then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Failed to login");
    })
}

export async function createBranch(name: string){
    return  await api.post('branches',{name}).then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Ocorreu um erro ao adicionar filiais! Tente novamente mais tarde.");
    })
}

export async function deleteBranch(id: string){
    return  await api.delete('branches/'+id).then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Ocorreu um erro ao excluir a filial! Tente novamente mais tarde.");
    })
}

export async function editBranch(id: string,name:string){
    return  await api.put('branches/'+id,{name}).then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Ocorreu um erro ao atualizar a filial! Tente novamente mais tarde.");
    })
}