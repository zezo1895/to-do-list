import React, { useState } from "react";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { NavLink } from "react-router-dom";
import { auth } from "../../config/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Loading from "../../comp/Loading";
import Modal from "../../shared/Modal/modal";
import { useTranslation } from "react-i18next";
const Signin = () => {
  const [email, setemail] = useState("");
  const [reemail, setreemail] = useState("");
  const [password, setpassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [showerr, setshowerr] = useState(false);
  const [errorr, seterror] = useState("");
  const [showmodal, setshowmodal] = useState(false);
  const [showsend, setshowsend] = useState(false);
  const navigate = useNavigate();const { t, i18n } = useTranslation();

  const close = () => {
    setshowmodal(false);
  };
  const handellogin = (eo) => {
    if(i18n.language === "ar"){eo.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("done ya zozzzz");
          const user = userCredential.user;
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          switch (errorCode) {
            case "auth/invalid-email":
              seterror("ادخل ايميل صحيح ");
              break;
            case "auth/invalid-credential":
              seterror("ايميل او كلمه المرور خطأ");
              break;
            case "auth/network-request-failed":
              seterror("تحقق من الانترنت");
              break;
  
            case "auth/missing-password":
              seterror("ادخل كلمه المرور");
              break;
            default:
              seterror(errorCode);
              break;
          }
  
          setshowerr(true);
        });}
        else{  eo.preventDefault();
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log("done ya zozzzz");
              const user = userCredential.user;
              navigate("/");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
      
              switch (errorCode) {
                case "auth/invalid-email":
                  seterror("Enter a correct Email ");
                  break;
                case "auth/invalid-credential":
                  seterror("Email or Password wrong");
                  break;
                case "auth/network-request-failed":
                  seterror("Check your internet");
                  break;
      
                case "auth/missing-password":
                  seterror("Enter Your Password");
                  break;
                default:
                  seterror(errorCode);
                  break;
              }
      
              setshowerr(true);
            });
        };}
    
        if (loading) {
          return (
            <>
              <Loading />
            </>
          );
        }



  

  if(i18n.language === "ar"){
    return (
      <>
        <Header />
        {showmodal && (
          <Modal close={close}>
            <h3>استعاده كلمه المرور</h3>
            <input
              onChange={(eo) => {
                setreemail(eo.target.value);
              }}
              type="email"
              placeholder="Email🧡:"
              required
              className="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();
                sendPasswordResetEmail(auth, reemail)
                  .then(() => {
                    // Password reset email sent!
                    // ..
                    setshowsend(true);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                  });
              }}
            >
              {" "}
              استرجاع
            </button>
            {showsend && <p>Check Your Email</p>}
          </Modal>
        )}
  
        <main className="signup">
          <h1 className="headsign" dir="rtl">
            تسجيل الدخول <span>🧡</span>
          </h1>
          <form className="flex" action="">
            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              type="email"
              placeholder="Email🧡:"
              required
            />
            <input
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              placeholder="Pssword🧡:"
              type="password"
              required
            />
            <button type="submit" onClick={handellogin}>
              تسجيل الدخول{" "}
            </button>
            <p dir="rtl">
               ليس لديك حساب ؟<NavLink to="/signup">إنشاء حساب</NavLink>
            </p>
            <p
              onClick={() => {
                setshowmodal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              نسيت كلمه المرور
            </p>
          </form>
          {showerr && (
            <div className="toast">
              <i className="fa-solid fa-exclamation"> </i>
              {errorr}
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  }
  if(i18n.language === "en"){
    return (
      <>
        <Header />
        {showmodal && (
          <Modal close={close}>
            <h3>Reset Your Password</h3>
            <input
              onChange={(eo) => {
                setreemail(eo.target.value);
              }}
              type="email"
              placeholder="Email🧡:"
              required
              className="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();
                sendPasswordResetEmail(auth, reemail)
                  .then(() => {
                    // Password reset email sent!
                    // ..
                    setshowsend(true);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                  });
              }}
            >
              {" "}
              Reset
            </button>
            {showsend && <p>Check Your Email</p>}
          </Modal>
        )}
  
        <main className="signup">
          <h1 className="headsign">
            Sign in <span>🧡</span>
          </h1>
          <form className="flex" action="">
            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              type="email"
              placeholder="Email🧡:"
              required
            />
            <input
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              placeholder="Pssword🧡:"
              type="password"
              required
            />
            <button type="submit" onClick={handellogin}>
              Sign in{" "}
            </button>
            <p>
              Don 't have account ? <NavLink to="/signup">Sign Up</NavLink>
            </p>
            <p
              onClick={() => {
                setshowmodal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              Forget Your password
            </p>
          </form>
          {showerr && (
            <div className="toast">
              <i className="fa-solid fa-exclamation"> </i>
              {errorr}
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  }

;
}
export default Signin;
