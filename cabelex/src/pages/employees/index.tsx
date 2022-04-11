import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Row,Col } from 'react-bootstrap';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import GetvalidationErrors from '../../utils/getValidationerros';
import CustomInput from '../../components/CustomInput'
import { UseToast } from '../../hooks/ToastContext';
import { createEmployee, deleteEmployee, listEmployees, updateEmployee } from '../../services/employees-service';
import CustomButton from '../../components/CustomButton';
import MaterialTable from 'material-table';
import Select from 'react-select';
import { listBranches } from '../../services/branches-service';

// import { Container } from './styles';
interface branchInterface {
    id: string;
    name: string;
}
interface employeeInterface {
    id: string;
    name: string;
    branch: branchInterface;
}

interface branchesSelectInterface {
    label: string;
    value: string
}

const Employees: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [employees, setEmployees] = useState<employeeInterface[]>([]);
    const [branchesSelect, setBranchesSelect] = useState<branchesSelectInterface[]>([]);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const { addToast, removeToast } = UseToast();
    const [currentEmployee, setCurrentEmployee] = useState<employeeInterface>();
    const [branchId, setBranchId] = useState<string>();
    const [employeeBranch, setEmployeeBranch] = useState<branchesSelectInterface>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const columns = [
        { title: "Id", field: "id" },
        { title: "Nome", field: "name" },
        { title: "Filial", field: "branch.name" },
    ];

    useEffect(() => {
        listEmployees().then(response => {
            setEmployees(response)
        })
        listBranches().then(response => {
            let auxBranch: any[] = []
            response.map((branch: any) => {
                auxBranch.push({ label: branch.name, value: branch.id })
            })
            setBranchesSelect(auxBranch)
            setBranchId(response[0].id)
        })
    }, [])

    const handleSubmit = useCallback(async (data) => {
        try {
            formRef.current?.setErrors({});

            const schema = yup.object().shape({
                name: yup.string().required('Nome obrigatório'),
            });

            await schema.validate(data, { abortEarly: false });

            let result = null;
            if (!branchId)
                throw new Error("no branch selected");

            if (!edit)
                result = await createEmployee(data.name, branchId!);
            else if (currentEmployee) {
                result = await updateEmployee(currentEmployee.id, data.name, branchId!);
                setEdit(false);
            }


            if (!result)
                throw new Error("Ocorreu um erro ao adicionar funcionário")

            addToast({
                type: 'success',
                title: 'Sucesso!',
                description: 'Funcionário adicionado com sucesso'
            });

            handleClose()

            listEmployees().then(response => {
                setEmployees(response)
            })

        } catch (err) {

            if (err instanceof yup.ValidationError) {
                const erros = GetvalidationErrors(err);
                formRef.current?.setErrors(erros);
            }
            //@ts-ignore
            console.log(err.message)
            addToast({
                type: 'error',
                title: 'Erro',
                description: 'Ocorreu um erro ao adicionar funcionário'
            });

        }
    }, [addToast, handleClose, currentEmployee, edit, branchId]);


    async function deleteEmployeeRow(rowData: any) {
        try {
            await deleteEmployee(rowData.id);
            addToast({
                type: 'success',
                title: 'Sucesso!',
                description: 'Funcionário deletado com sucesso'
            });
            listEmployees().then(response => {
                setEmployees(response)
            })

        } catch (error: any) {
            addToast({
                type: 'error',
                title: 'Erro',
                description: 'Ocorreu um erro ao deletar funcionário'
            });
        }
    }

    async function enableEditEmployee(rowData: any) {
        handleShow();
        setEdit(true);
        setCurrentEmployee(rowData)

        const branchEmp = branchesSelect.find(b => b.value == rowData.branch.id)
        setEmployeeBranch(branchEmp)
    }

    return (
        <>
            
            <Row className="my-3 my-md-2">
                <Col>
                <h2>Funcionários</h2>
                </Col>
                <Col className='d-flex justify-content-end'>
                <CustomButton onClick={handleShow} >
                        Adicionar Funcionário
                    </CustomButton>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{edit ? 'Editar Funcionário' : 'Criar Funcionário'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        {!edit && (
                            <>
                                <h5>Nome</h5>
                                <CustomInput name="name" type="text" placeholder='Nome' />
                                <br />
                                <h5>Filial</h5>

                                <Select defaultValue={branchesSelect[0]} options={branchesSelect} onChange={(val) => setBranchId(val?.value)} />
                            </>
                        )}
                        {edit && (
                            <>
                                <h5>Nome</h5>
                                <CustomInput name="name" type="text" defaultValue={currentEmployee?.name} />
                                <br />
                                <h5>Filial</h5>

                                <Select defaultValue={employeeBranch} options={branchesSelect} onChange={(val) => setBranchId(val?.value)} />
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton onClick={handleClose}>
                        Cancelar
                    </CustomButton>
                    <CustomButton onClick={() => { formRef.current?.submitForm() }}>
                        Salvar
                    </CustomButton>
                </Modal.Footer>
            </Modal>

            <MaterialTable

                title={
                    ''}
                columns={columns}
                data={employees}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar Funcionário',
                        onClick: (_event: any, _rowData: any) => enableEditEmployee(_rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Deletar Funcionário',
                        onClick: (_event: any, _rowData: any) => deleteEmployeeRow(_rowData)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,

                }}
            />
        </>
    );
}

export default Employees;