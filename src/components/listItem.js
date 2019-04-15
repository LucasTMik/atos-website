import React, { Component } from 'react';

export default class ListTitle extends Component {

    constructor(props) {
        super();
        this.state = {
            opened: false
        }
    }

    handleAcordeao() {
        console.log("clicked");
        this.setState({
            opened: !this.state.opened
        })
    }

    render() {
        return (
            <div>
                {this.state.opened &&
                <div>
                    <hr />
                    <h3>Informações</h3>
                    <div>
                        <p>Nascimento: {this.props.person.birth}</p>
                        {this.props.person.church && <p>Frequenta: {this.props.person.church}</p>}
                        {this.props.person.email && <p>Email: {this.props.person.email}</p>}
                        <p>Celular: {this.props.person.phone}</p>
                        {this.props.person.fixedPhone && <p>Telefone Fixo: {this.props.person.fixedPhone}</p>}
                        {this.props.person.answerableName1 && <p>Responsavel 1: {this.props.person.answerableName1}</p>}
                        {this.props.person.answerablePhone1 && <p>Celular Responsavel 1: {this.props.person.answerablePhone1}</p>}
                        {this.props.person.answerableEmail1 && <p>Email Responsavel 1: {this.props.person.answerableEmail1}</p>}
                        {this.props.person.answerableName2 && <p>Responsavel 2: {this.props.person.answerableName2}</p>}
                        {this.props.person.answerablePhone2 && <p>Celular Responsavel 2: {this.props.person.answerablePhon2}</p>}
                        {this.props.person.answerableEmail2 && <p>Email Responsavel 2: {this.props.person.answerableEmail2}</p>}
                        {this.props.person.address && <p>Endereço: {this.props.person.address}</p>}
                        {this.props.person.cep && <p>CEP: {this.props.person.cep}</p>}
                        {this.props.person.city && <p>City: {this.props.person.city}</p>}
                        {this.props.person.nerghborhood && <p>Bairro: {this.props.person.nerghborhood}</p>}
                        {this.props.person.state && <p>Estado: {this.props.person.state}</p>}
                        {this.props.person.complement && <p>Complemento: {this.props.person.complement}</p>}
                        {this.props.person.allergy && <p>Alergia: {this.props.person.allergy}</p>}
                        {this.props.person.specialCare && <p>Cuidados especiais: {this.props.person.specialCare}</p>}
                    </div>
                </div>}
            </div>
        );
    }
}