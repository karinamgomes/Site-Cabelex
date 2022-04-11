import MaterialTable from 'material-table';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import CustomButton from '../../components/CustomButton';
import { deleteBranch, editBranch, listBranches, createBranch } from '../../services/branches-service';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import GetvalidationErrors from '../../utils/getValidationerros';
import CustomInput from '../../components/CustomInput'
import { UseToast } from '../../hooks/ToastContext';
// import { Container } from './styles';

interface branchInterface {
  id: string;
  name: string;
  numberEmployees: string;
}
const Branches: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [branches, setBranches] = useState<[]>([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const { addToast, removeToast } = UseToast();
  const [currentBranch, setCurrentBranch] = useState<branchInterface>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    { title: "Id", field: "id" },
    { title: "Nome", field: "name" },
    { title: "Numero de funcionários", field: "numberEmployees" },
  ];

  useEffect(() => {
    listBranches().then(response => {
      setBranches(response)
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

      if (!edit)
        result = await createBranch(data.name);
      else if (currentBranch) {
        result = await editBranch(currentBranch.id, data.name);
        setEdit(false);
      }


      if (!result)
        throw new Error("Ocorreu um erro ao adicionar filial")

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Filial salva com sucesso'
      });

      handleClose()

      listBranches().then(response => {
        setBranches(response)
      })

    } catch (err) {

      if (err instanceof yup.ValidationError) {
        const erros = GetvalidationErrors(err);
        formRef.current?.setErrors(erros);
      }

      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao adicionar filial'
      });

    }
  }, [addToast, handleClose, currentBranch, edit]);


  async function deleteBranchRow(rowData: any) {
    try {
      await deleteBranch(rowData.id);
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Filial deletada com sucesso'
      });
      listBranches().then(response => {
        setBranches(response)
      })

    } catch (error: any) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao deletar filial'
      });
    }
  }

  async function enableEditBranch(rowData: any) {
    handleShow();
    setEdit(true);
    setCurrentBranch(rowData)
  }


  return (
    <>

      <Row>
        <Col>
          <h2>Filiais</h2>
        </Col>
        <Col className='d-flex justify-content-end'>
          <CustomButton onClick={handleShow}>
            Adicionar Filial
          </CustomButton>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Editar Filial' : 'Criar Filial'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleSubmit}>
            {!edit && (<>
              <h5>Nome</h5>
              <CustomInput name="name" type="text" /></>
            )}
            {edit && (
              <>
                <h5>Nome</h5>
                <CustomInput name="name" type="text" defaultValue={currentBranch?.name} />
                <br />
                <h5>Número de funcionários</h5>
                <CustomInput name="numberEmployees" type="text" defaultValue={currentBranch?.numberEmployees} disabled />
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

        title={''
        }
        columns={columns}
        data={branches}
        // options={{
        //     pageSize: 20
        // }}

        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Filial',
            onClick: (_event: any, _rowData: any) => enableEditBranch(_rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Deletar filial',
            onClick: (_event: any, _rowData: any) => deleteBranchRow(_rowData)
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    </>
  );
}

export default Branches;


