import api from "../api";

export async function listEmployees(){
    return  await api.get('employees').then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Ocorreu um erro ao carregar os funcionários! Tente novamente mais tarde.");
    })
}

export async function createEmployee(name:string,branch_id:string){
    return  await api.post('employees',{name,branch_id}).then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Ocorreu um erro ao criar o funcionário! Tente novamente mais tarde.");
    })
}

export async function updateEmployee(id:string,name:string,branch_id:string){
    return  await api.put('employees/'+id,{name,branch_id}).then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Ocorreu um erro ao atualizar o funcionário! Tente novamente mais tarde.");
    })
}

export async function deleteEmployee(id:string){
    return  await api.delete('employees/'+id).then(response=>{
        const result = response.data;
        return result
    }).catch(err=>{
        throw new Error("Ocorreu um erro ao excluir o funcionário! Tente novamente mais tarde.");
    })
}