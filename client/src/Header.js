import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">TAI<span style={{fontWeight:'normal',paddingLeft:'5px',fontSize:'18px'}}>Blog</span></Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="create">+ <span>Thêm bài</span></Link>
            <a className="logout" onClick={logout}>Đăng xuất({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link className="login1" to="/login">Đăng nhập</Link>
            <Link className="signup" to="/register">Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  );
}
