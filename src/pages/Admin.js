import React, { Component } from 'react';
import { auth, database } from '../firebase.js';
import jsPDF from 'jspdf';

import LoadingScreen from '../components/loadingScreen.js';
import LoadingComponent from '../components/loadingComponent.js';
import ListItem from '../components/listItem';

import '../fonts.css';

export default class Admin extends Component {

    constructor() {
        super();
        this.state = {
            logUser: {
                email: '',
                password: '',
            },
            registered: [],
            findedAllergies: [],
            user: '',
            loading: true,
            loadingRegistered: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmRegistered = this.confirmRegistered.bind(this);
        this.createPdf = this.createPdf.bind(this);
    }

    handleChange(e) {
        this.setState({
            logUser: {
                ...this.state.logUser,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit() {
        auth.signInWithEmailAndPassword(this.state.logUser.email, this.state.logUser.password).catch((err) => {
            alert(err.message);
        })
    }

    confirmRegistered(uuid, val) {
        database.ref(`/youth/acampform`).child(uuid).update({
            "confirmed": val
        })
            .then(() => console.log("done"))
            .catch(err => console.log(err));
    }

    createPdf(param) {
        let document = new jsPDF();
        let confirmedArr = this.state.registered.filter(person => person.confirmed);
        let text = '';

        for (let i = 0; i <= confirmedArr.length - 1; i++) {
            
            if ((i+1)%4 == 0){
                document.text(text, 20, 15);
                document.addPage();
                text = '';
            }

            text += `${confirmedArr[i].name}\n` +
                `${confirmedArr[i].church ? '\tFrequenta: ' + confirmedArr[i].church + '\n' : ''}` +
                `${confirmedArr[i].email ? '\tEmail: ' + confirmedArr[i].email + '\n' : ''}` +
                `${confirmedArr[i].fixedPhone ? '\tTelefone Fixo: ' + confirmedArr[i].fixedPhone + '\n' : ''}` +
                `${confirmedArr[i].answerableName1 ? '\tResponsavel 1 : ' + confirmedArr[i].answerableName1 + '\n' : ''}` +
                `${confirmedArr[i].answerablePhone1 ? '\tCelular Responsavel 1: ' + confirmedArr[i].answerablePhone1 + '\n' : ''}` +
                `${confirmedArr[i].answerableEmail1 ? '\tEmail Responsavel 1: ' + confirmedArr[i].answerableEmail1 + '\n' : ''}` +
                `${confirmedArr[i].answerableName2 ? '\tResponsavel 2: ' + confirmedArr[i].answerableName2 + '\n' : ''}` +
                `${confirmedArr[i].answerablePhone2 ? '\tCelular Responsavel 2: ' + confirmedArr[i].answerablePhon2 + '\n' : ''}` +
                `${confirmedArr[i].answerableEmail2 ? '\tEmail Responsavel 2: ' + confirmedArr[i].answerableEmail2 + '\n' : ''}` +
                `${confirmedArr[i].address ? '\tEndereço: ' + confirmedArr[i].address + '\n' : ''}` +
                `${confirmedArr[i].cep ? '\tCEP: ' + confirmedArr[i].cep + '\n' : ''}` +
                `${confirmedArr[i].city ? '\tCity: ' + confirmedArr[i].city + '\n' : ''}` +
                `${confirmedArr[i].nerghborhood ? '\tBairro: ' + confirmedArr[i].nerghborhood + '\n' : ''}` +
                `${confirmedArr[i].state ? '\tEstado: ' + confirmedArr[i].state + '\n' : ''}` +
                `${confirmedArr[i].complement ? '\tComplemento: ' + confirmedArr[i].complement + '\n' : ''}` +
                `${confirmedArr[i].allergy ? '\tAlergia: ' + confirmedArr[i].allergy + '\n' : ''}` +
                `${confirmedArr[i].specialCare ? '\tCuidados especiais: ' + confirmedArr[i].specialCare + '\n' : '\n'}`
        }

        let date = new Date();
        document.save(`FichaConfirmados${date.getDate()+'_'+date.getMonth()+'_'+date.getFullYear()}` );
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user)
                this.setState({ user });

            this.setState({ loading: false });
        });

        database.ref('/youth/acampform').on('value', snap => {
            this.setState({ loadingRegistered: true });
            const registeredObject = snap.val();

            if (registeredObject) {
                const registeredList = Object.keys(registeredObject).map(key => ({
                    ...registeredObject[key],
                    uid: key,
                }));

                this.setState({
                    registered: registeredList,
                    loadingRegistered: false
                });
            }
        })
    }

    componentWillUnmount() {
        auth.signOut().then(() => {
            console.log("Signed Out");
        }).catch(err => {
            console.log("error");
        })
    }

    render() {
        let registered;
        let confirmed;
        let findedAllergies = [];
        let allergies;

        if (this.state.registered.length !== 0) {
            registered = this.state.registered
                .filter(person => !person.confirmed ? person : null)
                .map(person => (
                    <li key={person.uid + '0'}>
                        <div onClick={() => this.refs[person.uid].handleAcordeao()}>
                            {person.name}
                            <label className="checkContainer">
                                <input type={"checkbox"} onClick={() => this.confirmRegistered(person.uid, true)} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <ListItem ref={`${person.uid}`} person={person} />
                    </li>
                ));
            confirmed = this.state.registered
                .filter(person => person.confirmed ? person : null)
                .map((person, i) => {
                    return (
                        <li key={i}>
                            <div onClick={() => this.refs[person.uid].handleAcordeao()}>
                                {person.name}
                                <label className="checkContainer">
                                    <input checked={true} type={"checkbox"} onClick={() => this.confirmRegistered(person.uid, false)} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <ListItem ref={`${person.uid}`} person={person} />
                        </li>

                    )
                });

            this.state.registered
                .filter(person => person.allergy)
                .map(person => {
                    person.allergy
                        .split(/[,;\n]+/)
                        .map(allergy => {
                            if (!findedAllergies.includes(allergy.toLowerCase()))
                                findedAllergies.push(allergy.toLowerCase());
                        })
                })

            allergies = findedAllergies
                .map((allergy, i) => {
                    return (
                        <li key={i}>
                            {allergy}
                        </li>
                    )
                })
        }
        return (
            <div className={"container"}>
                {
                    this.state.loading ?
                        <LoadingScreen />
                        :
                        this.state.user ?
                            <div className={"pageContainer"}>
                                <h1>Bem vindo Admin</h1>
                                <div>
                                    <h2>Inscritos</h2>
                                    {this.state.loadingRegistered ?
                                        <LoadingComponent />
                                        :
                                        <ul className={"registeredContainer"} >{registered}</ul>
                                    }
                                    <p>Total: {this.state.registered.length}</p>
                                </div>
                                <div>
                                    <h2>Confirmados <button className={"btn"} onClick={this.createPdf}>Download informations (emTeste)</button></h2>
                                    {this.state.loadingRegistered ?
                                        <LoadingComponent />
                                        :
                                        <ul className={"registeredContainer"} >{confirmed}</ul>
                                    }
                                    <p>Total: {this.state.registered.filter(person => person.confirmed).length} </p>
                                    
                                </div>
                                <div>
                                    <h2>Alergias Encontradas</h2>
                                    {this.state.loadingRegistered ?
                                        <LoadingComponent />
                                        :
                                        <ul>{allergies}</ul>
                                    }
                                </div>
                            </div>
                            :
                            <div className={"loginContainer centerColumn"}>
                                <h1>Loggin!</h1>
                                <input placeholder={"Email"} name={"email"} onChange={this.handleChange} />
                                <input placeholder={"Senha"} name={"password"} onChange={this.handleChange} type={"password"} />
                                <button className={"btn"} onClick={this.handleSubmit}>Entrar</button>
                            </div>
                }
                <style jsx>{`
                    body, html {
                        margin: 0;
                        padding: 0;
                        font-family: "Gotham light";
                        letter-spacing: 2px;
                        font-size: 1.3rem;
                    }

                    .centerColumn {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .container {
                        width: 100%;
                        height: 100vh;
                    }
                    .loginContainer {
                        height: 100%;
                    }
                    .loginContainer input{  
                        padding: 8px;
                        margin: 5px;
                        //box-shadow: 3px 6px 21px 3px rgba(0,0,0,0.2);
                        border: none;
                    }

                    .btn {
                        background: white;
                        border: none;
                        font-family: "Gotham light";
                        letter-spacing: 2px;
                        padding: 10px;
                        margin: 5px;
                        color: rgb(80,80,85);
                        transition: all .5s;
                        //box-shadow: 3px 6px 21px 3px rgba(0,0,0,0.2);
                    }
                    .btn:hover {
                        background: rgb(80,80,85);
                        color: white;
                    }

                    /* ADMIN PAGE */

                    .pageContainer {
                        background: white;
                        color: rgb(80,80,85);
                        font-size: 1rem;
                        height: 100%;
                        padding: 5%;
                    }

                    .pageContainer > div:last-child{
                        margin-bottom: 100px;
                    }

                    .registeredContainer {
                        background: #ececec;
                        min-height: 200px;
                        max-height: 500px;
                        margin: 2%;
                        padding: 2%;
                        overflow-y: scroll;
                    }

                    .registeredContainer > li {
                        list-style: none;
                        background: #fefefe;
                        padding: 10px;
                        margin: 1.6%;
                        font-size: .8em;
                        position: relative;
                    }

                    li .checkContainer {
                        position: absolute;
                        height: 100%;
                        right: 0;
                        top: 0;         
                    }

                    .checkmark {
                        width: 100%;
                        height: 100%;
                        background: gray;
                        color: white;
                    }
                    
                `}</style>
            </div>
        );
    }
}