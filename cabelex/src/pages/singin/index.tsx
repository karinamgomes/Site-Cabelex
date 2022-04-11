import React, { useCallback, useRef } from 'react';
import { Col, Row, Container as BootsTrapContainer } from 'react-bootstrap';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { useAuth } from '../../hooks/AuthContext';
import { UseToast } from '../../hooks/ToastContext';
import GetvalidationErrors from '../../utils/getValidationerros';
import CustomInput from '../../components/CustomInput'

import { Container, Content, ContentRight, ContentLeft, Card } from './styles';
import CustomButton from '../../components/CustomButton';
import logo from '../../assets/logoazul.png'

interface SingInFormData {
  email: string,
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn } = useAuth();
  const { addToast } = UseToast();

  const handleSubmit = useCallback(async (data: SingInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        email: yup.string().required('E-mail obrigatório').email(),
        password: yup.string().min(6, 'Mínimo 6 caracteres'),
      });

      await schema.validate(data, { abortEarly: false });

      await singIn({
        email: data.email,
        password: data.password
      });

    } catch (err) {

      if (err instanceof yup.ValidationError) {
        const erros = GetvalidationErrors(err);
        formRef.current?.setErrors(erros);
      }

      addToast({
        type: 'error',
        title: 'Erro',
        description: 'E-mail ou senha incorretos'
      });

    }
  }, [addToast, singIn]);

  return (
    <Container>
      <Content >
        <Row className="h-100">
          <Col md={6} style={{ paddingRight: 0 }} className="d-flex justify-content-center align-items-center" >
            <ContentLeft >
              <Form ref={formRef} onSubmit={handleSubmit} className="w-100">
                <Row >
                  <Col>
                    <Row >
                      <h2 className="d-flex justify-content-center ">
                        <img src={logo}></img>
                      </h2>
                    </Row>
                    <br />
                    <Row className='mb-3'>
                      <label>E-mail <CustomInput name="email" type="email" placeholder='Insira seu e-mail' /> </label>
                    </Row>
                    <Row className='mb-4'>
                      <label>Senha <CustomInput name="password" type="password" placeholder='Senha' /> </label>
                    </Row>
                    <br />
                    <Row >
                      <CustomButton type='submit'>Entrar</CustomButton>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </ContentLeft>
          </Col>
          
          <Col md={6} style={{ paddingLeft: 0 }} className="d-none d-md-block">
            <ContentRight className='d-flex justify-content-center align-items-sm-end'>
              <Card >
                <h1>Bem vindo ao Cabelex.</h1>
                <h3> O melhor lugar para a sua beleza</h3>
                <br />
                <h4>Insira suas informações para logar-se ao sistema de gerenciamento</h4>
              </Card>
            </ContentRight>
          </Col>
        </Row>
      </Content>
    </Container>

  );
}

export default SingIn;

