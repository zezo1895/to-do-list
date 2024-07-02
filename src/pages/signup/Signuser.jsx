import React, { useEffect, useState } from "react";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { NavLink } from "react-router-dom";
import "./signup.css";
import "../../config/config";
import { auth } from "../../config/config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../comp/Loading";
import Error404 from "../Error/Error404";
import { useTranslation } from "react-i18next";
const Signuser = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showerr, setshowerr] = useState(false);
  const [errorr, seterror] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const {  i18n } = useTranslation();
  useEffect(() => {
    if(user){
    if(user.emailVerified){
      navigate("/");}
    }
  }, );
  const handelsign = (eo) => {
    if(i18n.language === "ar"){
      eo.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            // ...
            console.log("verify")
            
  
          });
  
  
  
  
          updateProfile(auth.currentUser, {
            displayName: username,
          })
            .then(() => {
              // Profile updated!
              // ...
              console.log(user)
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
  
          // ...
          console.log("done");
          navigate("/");
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          switch (errorCode) {
            case "auth/missing-email":
              seterror("Enter Your Email");
              break;
            case "auth/network-request-failed":
              seterror("Check your internet");
              break;
  
            case "auth/missing-passwordl":
              seterror("Enter Password");
              break;
            case "auth/email-already-in-use":
              seterror("The Email already use");
              break;
            case "auth/weak-password":
              seterror("Password more than 6 char");
              break;
            
            case "auth/invalid-email":
              seterror("Enter corect Email");
              break;
            default:
              seterror(errorCode);
              break;
          }
          setshowerr(true);
        });
    }
else{eo.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
        console.log("verify")
        

      });




      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log(user)
        })
        .catch((error) => {
          // An error occurred
          // ...
        });

      // ...
      console.log("done");
      navigate("/");
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      switch (errorCode) {
        case "auth/missing-email":
          seterror("Enter Your Email");
          break;
        case "auth/network-request-failed":
          seterror("Check your internet");
          break;

        case "auth/missing-passwordl":
          seterror("Enter Password");
          break;
        case "auth/email-already-in-use":
          seterror("The Email already use");
          break;
        case "auth/weak-password":
          seterror("Password more than 6 char");
          break;
        
        case "auth/invalid-email":
          seterror("Enter corect Email");
          break;
        default:
          seterror(errorCode);
          break;
      }
      setshowerr(true);
    });}
    
  };
  if (loading) {
    return (
      <>
    <Loading />
      </>
    );
  }
  if(error){
    <Error404/>
  }


  if(user){
 if(!user.emailVerified){
  if(i18n.language === "ar"){
    return(
      <>
      <Header/>
      <main style={{ flexDirection:"column" }}>
        <h2>لقد ارسلنا لك على ايميلك رابط التفعيل</h2>
        <button style={{fontSize:"1.3rem",
            
            width:"10rem",
            height:"2rem",
            marginTop:"10px",
            backgroundColor:"red",
            border:"2px solid red",
  
   }} on onClick={() => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      console.log("verify")
      
  
    });
    
   }}>إرسال مجددا</button>
      </main>
      <Footer/>
      </>
    )
  }
  if(i18n.language === "en"){
    return(
      <>
      <Header/>
      <main style={{ flexDirection:"column" }}>
        <h2>We send Verifiction link to your Email</h2>
        <button style={{fontSize:"1.3rem",
            
            width:"10rem",
            height:"2rem",
            marginTop:"10px",
            backgroundColor:"red",
            border:"2px solid red",
  
   }} on onClick={() => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      console.log("verify")
      
  
    });
    
   }} >Send again</button>
      </main>
      <Footer/>
      </>
    )
  }
  
 }
}




  if(!user){
    if(i18n.language === "ar"){  return (
      <>
        <Header />
        <main className="signup">
          <h1 dir="rtl" className="headsign">
            إنشاء حساب<span>🧡</span>
          </h1>
          <form className="flex" action="">
            <input
              onChange={(eo) => {
                setusername(eo.target.value);
              }}
              type="text"
              placeholder="user_name🧡:"
              required
            />
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
            <button onClick={handelsign}>إنشاء حساب</button>
            <p>
              بالفعل لديك حساب؟ <NavLink to="/signin">سجل الدخول</NavLink>
            </p>
          </form>
          {showerr && (
            <div className="toast">
              <i class="fa-solid fa-exclamation"> </i>
              <div>{errorr}</div>
            </div>
          )}
        </main>
        <Footer />
      </>
    );}
    if(i18n.language === "en"){  return (
      <>
        <Header />
        <main className="signup">
          <h1 className="headsign">
            Sing up <span>🧡</span>
          </h1>
          <form className="flex" action="">
            <input
              onChange={(eo) => {
                setusername(eo.target.value);
              }}
              type="text"
              placeholder="user_name🧡:"
              required
            />
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
            <button onClick={handelsign}>Sign up </button>
            <p>
              already have account <NavLink to="/signin">Sign in</NavLink>
            </p>
          </form>
          {showerr && (
            <div className="toast">
              <i class="fa-solid fa-exclamation"> </i>
              {errorr}
            </div>
          )}
        </main>
        <Footer />
      </>
    )}
;}
};

export default Signuser;
