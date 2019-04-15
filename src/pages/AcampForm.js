import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../firebase';
import moment from 'moment';

import '../fonts.css';
import logo from '../static/img/jovens/logo_tsc_white.png'
import bg_05 from '../static/img/jovens/bg_05.jpg';
import logoAtos_white from '../static/img/logoAtos_white.png';
import logoJovens_white from '../static/img/jovens/logoJovens_white.png'

// import bg_form from '../static/img/jovens/bg_04.jpeg'

export default class AcampForm extends Component {

	constructor() {
		super();

		this.state = {
			newOne: {
				name: '',
				birth: '',
				email: '',
				phone: '',
				fixedPhone: '',
				allergy: '',
				specialCare: '',
				cep: '',
				neighborhood: '',
				city: '',
				address: '',
				state: '',
				complement: '',
				answerableName1: '',
				answerablePhone1: '',
				answerableEmail1: '',
				answerableName2: '',
				answerablePhone2: '',
				answerableEmail2: '',
				church: '',
			},
			checkBox1: false,
			checkBox2: false,
			checkBox3: false,
			underAge: false,
			accepted: false,
			modalOpen: false,
			errors: [],
		}

		this.youthRef = database.ref('youth').child('acampform');

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBirth = this.handleBirth.bind(this);
		this.findCep = this.findCep.bind(this);
	}

	handleChange(e) {
		this.setState({
			newOne: {
				...this.state.newOne,
				[e.target.name]: e.target.value
			}
		});
	}

	handleBirth(e) {
		let date = moment(e.target.value);
		this.setState({
			underAge: (2019 - date.year()) < 18
		});
	}

	//Find the address based on address
	findCep() {
		if (this.state.newOne.cep)
			fetch(`https://viacep.com.br/ws/${this.state.newOne.cep}/json/`)
				.then(req => {
					req.json()
						.then(address => {
							this.setState({
								newOne: {
									...this.state.newOne,
									neighborhood: address.bairro,
									city: address.localidade,
									address: address.logradouro,
									state: address.uf
								}
							})
						});
				})
				.catch(err => console.log(err));
		else
			console.log("vaizo");
	}

	//Saving on database
	handleSubmit(event) {
		event.preventDefault();
		let postData = this.state.newOne;
		this.youthRef
			.orderByChild('email')
			.equalTo(postData.email)
			.once('value').then(snap => {
				if (!snap.val()) {
					//Getting a new key
					let newKey = this.youthRef.push().key;

					//Writing the changes
					let updates = {};
					updates[`/${newKey}`] = postData;

					this.youthRef.update(updates)
					this.setState({ modalOpen: true });
				} else {
					alert("Email já cadastrado");
				}
			})
	}

	render() {
		return (
			<div className={"container"}>
				{/* success form aply modal */}
				<div className={"modalContainer"}>
					<div className={"modal"}>
						<h2>Parabéns!</h2>
						<p>Seu cadastro foi realizado com sucesso!</p>
						<div>
							<p>Estamos muito animados com este evento! A sua parte está quase completa, enviamos um
								email para você com todas as informações que você precisa saber a respeito do retiro.
							</p>
							<p>Agora deixe conosco e se prepare para a tão esperada data!</p>
						</div>
						<div className={"actions"}>
							<Link to={"/"} ><button>OK!</button></Link>
						</div>
					</div>
				</div>

				<form className={"formContainer"} onSubmit={this.handleSubmit}>
					<img className={"logo"} src={logo} alt={"logo"} />
					{/* Personal form */}
					<p>Campos com * são obrigatórios</p>
					<h3>Informações sobre você</h3>
					<div className={"personalContainer"}>
						<h4>Nome Completo*</h4>
						<input required name={"name"} onChange={e => this.handleChange(e)} />
						<h4>Nascimento</h4>
						<input name={"birth"} type={"date"} onChange={e => this.handleChange(e)} onBlur={e => this.handleBirth(e)} />
						<h4>Email*</h4>
						<input required name={"email"} type={"email"} value={this.state.newOne.email} onChange={e => this.handleChange(e)} />
						<h4>Seu Celular*</h4>
						<input required name={"phone"} type={"number"} value={this.state.newOne.phone} onChange={e => this.handleChange(e)} />
						<h4>Telefone fixo</h4>
						<input name={"fixedPhone"} type={"number"} value={this.state.newOne.fixedPhone} onChange={e => this.handleChange(e)} />
						{this.state.checkBox3 && (<div><h4>Qual?*</h4><input required={this.state.checkBox3} name={"church"} onChange={e => this.handleChange(e)} /></div>)}
						<label className="checkContainer">Frequenta alguma Igreja?
							<input checked={this.state.checkBox3 ? 'checked' : ''} type="checkbox" onChange={e => this.setState({ checkBox3: !this.state.checkBox3 })} />
							<span className="checkmark"></span>
						</label>
					</div>


					{/* Answerable if under age */}
					{this.state.underAge && (<div className="answerableContainer">
						<h3>Idade abaixo de 18?</h3>
						<div className={"answerableInner"}>
							<div className={"one"}>
								<h4>Nome do Responsável 1*</h4>
								<input required={this.state.underAge} name={"answerableName1"} value={this.state.answerableName1} onChange={(e) => this.handleChange(e)} />
								<h4>Telefone do Responsável 1*</h4>
								<input required={this.state.underAge} name={"answerablePhone1"} value={this.state.answerablePhone1} onChange={(e) => this.handleChange(e)} />
								<h4>Email do Responsável 1*</h4>
								<input required={this.state.underAge} name={"answerableEmail1"} type={"email"} value={this.state.answerableEmail1} onChange={(e) => this.handleChange(e)} />
							</div>
							<div className={"two"}>
								<h4>Nome do Responsável 2</h4>
								<input name={"answerableName2"} value={this.state.answerableName2} onChange={(e) => this.handleChange(e)} />
								<h4>Telefone do Responsável 2</h4>
								<input name={"answerablePhone2"} value={this.state.answerablePhone2} onChange={(e) => this.handleChange(e)} />
								<h4>Email do Responsável 2</h4>
								<input name={"answerableEmail2"} value={this.state.answerableEmail2} type={"email"} onChange={(e) => this.handleChange(e)} />
							</div>

						</div>
					</div>)}



					{/* Cep form */}
					<h3>Endereço</h3>
					<div className={"cepContainer"}>
						<h4>Seu CEP</h4>
						<input name={"cep"} onChange={e => this.handleChange(e)} />
						<a className={"cepBtn"} onClick={this.findCep}>Buscar</a>
					</div>

					{/* Filled fields by cep */}
					<div className={"addressContainer"}>
						<h4>Cidade</h4>
						<input value={this.state.newOne.city} name={"city"} onChange={e => this.handleChange(e)} />
						<h4>Bairro</h4>
						<input value={this.state.newOne.neighborhood} name={"neighborhood"} onChange={e => this.handleChange(e)} />
						<h4>Endereço</h4>
						<input value={this.state.newOne.address} name={"address"} onChange={e => this.handleChange(e)} />
						<h4>Estado</h4>
						<input value={this.state.newOne.state} name={"state"} onChange={e => this.handleChange(e)} />
						<h4>Complemento</h4>
						<input value={this.state.newOne.complement} name={"complement"} onChange={e => this.handleChange(e)} />
					</div>



					{/* Aditional Cares */}
					<div className={"caresContainer"}>
						<div>
							<label className="checkContainer">Tem alguma alergia?
                            <input checked={this.state.checkBox ? 'checked' : ''} type="checkbox" onChange={e => this.setState({ checkBox: !this.state.checkBox })} />
								<span className="checkmark"></span>
							</label>
							{this.state.checkBox && (<div><h4>Quais Alergias?*</h4><input required={this.state.checkBox} name={"allergy"} onChange={e => this.handleChange(e)} /></div>)}
						</div>

						<div>
							<label className="checkContainer">Necessita de algum cuidado especial?
                            <input checked={this.state.checkBox2 ? 'checked' : ''} type="checkbox" onChange={e => this.setState({ checkBox2: !this.state.checkBox2 })} />
								<span className="checkmark"></span>
							</label>
							{this.state.checkBox2 && (<div><h4>Quais Cuidados?*</h4><input required={this.state.checkBox2} name={"specialCare"} onChange={e => this.handleChange(e)} /></div>)}
						</div>
					</div>


					<div className={"rulesContainer"}>
						<h3>Regras!</h3>
						<ul>
							<li>Não ausentar-se do culto.</li>
							<li>Casais não devem ficar sozinhos em local algum.</li>
							<li>Não levar objetos caros, pois não nos responsabilizamos por quaisquer objetos perdidos.</li>
							<li>Auxiliar nas atividades para as quais possa ser escalado.</li>
							<li>Cumprir as determinações que possam ser feitas pela organização.</li>
						</ul>
						<label className="checkContainer">Li e aceito os termos de acampante!
                            <input checked={this.state.accepted ? 'checked' : ''} type="checkbox" onChange={e => this.setState({ accepted: !this.state.accepted })} />
							<span className="checkmark"></span>
						</label>
					</div>

					<input value={"INSCREVER-SE!"} type="submit" className={"btn"} disabled={!this.state.accepted} />
				</form>
				<div className="logosContainer">
					<img alt={"logo jovens"} src={logoJovens_white} />
					<hr />
					<img alt={"logo atos"} src={logoAtos_white} />
				</div>
				<style jsx={true}>{`

					.logosContainer {
						display:flex;
						justify-content: center;
						align-items: center;
						width: 100vw;
						margin: 5% 0px;
					}

					.logosContainer img {
						margin: 10px;
						height: 10vw;
					}

					.logosContainer hr {
						margin: 0;
						width: 5vw;
						border: .5vw solid white;
						background: white;
						border-radius: 50%;
						transform: rotate(90deg);
					}
					
					.modalContainer {
						position: fixed;
						width: 100vw;
						height: 100vh;
						background: rgba(10,10,10,.5);
						z-index: 90000;
						display: flex;
						justify-content: center;
						align-items:center;
						display: ${this.state.modalOpen ? '' : 'none'};
					}
					
					.modal {
						width: 70%;
						height: 80%;
						z-index:90001;
						background: white;
						color: rgb(60,60,65);
						box-shadow: 1px 4px 15px 1px black;
						display: flex;
						flex-direction: column;
						justify-content;
						align-items: center;	
						position: relative;
						padding: 30px;
						font-size: 4.1vh;
					}
					
					
					.modal .actions {
						position: absolute;
						bottom: 5%;
						display: flex;
					}

					.modal button {
						background: white;
						cursor: pointer;
						border: none;
					}
				
					@media screen and (max-width: 1024px) {
						.logosContainer img {
							margin: 10px;
							height: 15vw;
						}

						.logosContainer hr {
							margin: 0;
							width: 5vw;
							border: .5vw solid white;
							border-radius: 50%;
							transform: rotate(90deg);
						}

						.modal {
							font-size: 3vh;
						}
					}

					
                    body {
						padding: 0;
						margin: 0;
						width: 100%;
						background: url(${bg_05}) no-repeat top center;
						background-size: cover;
						background-attachment: fixed;
						color: white;
					}

					h3, p {
						letter-spacing: 2px;
						width: 100%;
					}
					h4 {
						padding: 0;
						margin:0;
						margin-top: 10px;
					}

					.logo {
						width: 50%;
						margin: 30px;
					}

					.formContainer {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 40vw;
						margin: 0 auto;
					}

                    .personalContainer {
						display: flex;
						flex-direction: column;
						width: 100%;
					}

					.answerableContainer {
						display: flex;
						flex-direction: column;
						width: 100%;
						justify-content: center;
						align-items: center;
					}

					.answerableContainer h3 {
						width: 100%;
					}

					.answerableInner div {
						display: flex;
						flex-direction: column;
						width: 100%;
					}

					.answerableInner {
						display: flex;
						width: 100%;
					}

					.answerableInner div.one {
						margin-right: 5px;
					}

					.answerableInner div.two {
						margin-left: 5px;
					}


					.cepContainer .cepBtn{
						background: none;
						border: 2px solid white;		
						transition: all .2s;				
						padding: 7px;
						-webkit-border-radius: 5px;
						-moz-border-radius: 5px;
						border-radius: 5px;
						color: white;
						cursor: pointer;
					}
					.cepContainer .cepBtn:hover{
						background: white;	
						color: black;
					}

					.addressContainer {
						display: flex;
						flex-direction: column;
						width: 100%;
					}

					.caresContainer {
						width: 100%;
						margin: 10px;
					}
				
					input {
						padding: 7px;
						font-family: "Lucida Console", Monaco, monospace;
						font-weight: bold;
						margin: 5px 2px;
						border: 1px solid white;
						background: white;
						color: rgb(60,65,65);
					}


					input:focus {
						border: 2px solid white;
						box-shadow:  2px 3px 13px -1px white;
					}

                    .btn {
                        background: transparent;
                        text-decoration: none;
                        padding: 15px 20px;
                        color: white;
                        font-family: 'Gotham Light';
                        font-weight: bold;
                        letter-spacing: 3px;
                        transition: all .2s; 
						width: 300px;
						border: 2px solid white;
						-webkit-border-radius: 5px;
						-moz-border-radius: 5px;
						border-radius: 5px;
						margin: 20px 0px;
                    }
                    .btn:hover {
                        background: white;
                        color: black;
                    }

                    .btn:disabled {
                        color: gray;
					}
					
					@media screen and ( max-width: 1060px) {

						.formContainer {
							width: 80vw;
						}
						.answerableInner {
							display: flex;
							flex-direction: column;
						}
						.answerableInner div.one {
							margin: 0px;
							margin-bottom: 40px;
						}
	
						.answerableInner div.two {
							margin: 0px;
						}
	
					}
                `}</style>
			</div>
		);
	}
}

