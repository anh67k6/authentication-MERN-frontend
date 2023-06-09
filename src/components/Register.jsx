import React, { useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authActions";
import { useAlert } from "react-alert";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Register = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const {loading, authenticate,error, successMessage, myInfo } = useSelector(state => state.auth);
  
  const dispatch = useDispatch();

  const [loadImage, setLoadImage] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  useEffect(()=>{
    // if(authenticate){
    //   navigate("/")
    // }
    if(successMessage !== ""){
      dispatch({
        type: SUCCESS_MESSAGE_CLEAR
      })
      alert.success(successMessage);
    }

    if(error){
      error.map(err => alert.error(err));
      dispatch({type : ERROR_CLEAR})
    }
  }, [successMessage, error]);
  
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const registerHandle = (e) => {
    const {username, email, password, confirmPassword, image} = state;
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));
    
    console.log(formData);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h1>Register</h1>
        </div>

        <div className="card-body">
          <form action="" onSubmit={registerHandle}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                value={state.username}
                name="username"
                onChange={inputHandle}
                type="text"
                placeholder="Username"
                id="username"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="mail"
                placeholder="Email"
                id="email"
                className="form-control"
                value={state.email}
                name="email"
                onChange={inputHandle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="form-control"
                value={state.password}
                name="password"
                onChange={inputHandle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                className="form-control"
                value={state.confirmPassword}
                name="confirmPassword"
                onChange={inputHandle}
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt='avartar'/> : ""}{" "}
                </div>
              </div>

              <div className="file"></div>
              <label htmlFor="image">Select Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={fileHandle}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/messenger/login">Login Your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
