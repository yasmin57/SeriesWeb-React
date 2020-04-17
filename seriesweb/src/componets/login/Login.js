import React, { Component } from "react";
import { signIn } from "../../services/auth-service";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MsgErro = props => {
  if (props.mensagem) {
    return <div className="alert alert-danger">{props.mensagem}</div>;
  } else return "";
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      senha: "",
      msgErro: ""
    };
  }

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  signIn = async e => {
    try {
      e.preventDefault();
      const usuario = this.state;
      delete usuario.msgErro;
      const retorno = await signIn(usuario);

      if (retorno.status === 400) {
        const erro = await retorno.json();
        this.setState({ msgErro: erro.erro });
      }

      if (retorno.ok) {
        this.props.history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="body">
        <form className="form-signin" onSubmit={this.signIn}>
          <img
            className="mb-4"
            src="../../assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <MsgErro mensagem={this.state.msgErro} />
          <label for="inputEmail" className="sr-only">
            Email address
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={this.inputHandler}
          />

          <label for="inputPassword" className="sr-only">
            Password
          </label>

          <input
            type="password"
            id="senha"
            name="senha"
            className="form-control"
            placeholder="Password"
            required
            onChange={this.inputHandler}
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
// import { import } from '@babel/types';

export default Login;
