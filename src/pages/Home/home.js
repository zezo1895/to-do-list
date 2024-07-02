import Header from "../../comp/header";
import Footer from "../../comp/Footer";

import { Helmet } from "react-helmet-async";
import { auth, db } from "../../config/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {  NavLink } from "react-router-dom";
import "./home.css";
import Loading from "../../comp/Loading";
import Error404 from "../Error/Error404";

import { useContext, useState } from "react";
import context  from "../context/context";

// Required for side-effects

import {  doc, setDoc } from "firebase/firestore";
import Homemodal from "./homemodal";
import AllTasks from "./all tasks/all_tasks";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
const Home = () => {
  const [showmodal, setshowmodal] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const { theme } = useContext(context);
  const [title, settitle] = useState("");
  const [array, setarray] = useState([]);
  const [details, setdetails] = useState("");
  const [load, setload] = useState(false);
  const [showtoast, setshowtoast] = useState(false);
  const {  i18n } = useTranslation();

  /*========================================
============== + fun of modal+ ===========
==========================================
*/
  const close = () => {
    setshowmodal(false);
    setarray([]);
  };
  const add_title = (eo) => {
    settitle(eo.target.value);
  };
  const details_input = (eo) => {
    setdetails(eo.target.value);
  };

  const add_details = () => {
    if (!array.includes(details)) {
      array.push(details);
    }

    setdetails("");
  };

  const Send_task = async () => {
    setload(true);
    const id = new Date().getTime();
    await setDoc(doc(db, user.uid, `${id}`), {
      userName: user.email,
      title: title,
      tasks: array,
      id: id,
      completed: false,
    });
    settitle("");
    setarray([]);
    setload(false);
    setshowmodal(false);
    setshowtoast(true);
    setTimeout(() => {
      setshowtoast(false);
    }, 3000);
  };

  /*========================================
============== +end + ===========
==========================================
*/

  if (loading) {
    return (
<>
        <Header/>
        <main><section><ReactLoading
        type={"bubbles"}
        color={theme==="Light"? "cyan":"#ca1271"}
        height={500}
        width={400}
      /></section></main>
        <Footer/>
</>
    );
  }
  if (error) {
    return (
      <>
        <Error404 />
      </>
    );
  }

  if (!user) {
    if (i18n.language === "ar") {
      return (
        <>
          <Header />
          <main>
            {" "}
            <p>
              من فضلك{" "}
              <NavLink
                to="/signin"
                className="wait"
                style={{ margin: "0px 10px" }}
              >
                {" "}
                سجل الدخول
              </NavLink>{" "}
              لكى تستمر. . . . <span>🧡</span>
            </p>
          </main>
          <Footer />
        </>
      );
    }
    if (i18n.language === "en") {
      return (
        <>
          <Header />
          <main>
            {" "}
            <p>
              Please{" "}
              <NavLink
                to="/signin"
                className="wait"
                style={{ margin: "0px 10px" }}
              >
                {" "}
                Sign in
              </NavLink>{" "}
              to continue. . . . <span>🧡</span>
            </p>
          </main>
          <Footer />
        </>
      );
    }
  }

  if (user) {
    if (!user.emailVerified) {
      if (i18n.language === "ar") {
        return (
          <>
            <Header />
            <main>
              <h2> من فضلك قم بتفعيل الحساب</h2>
              <button
                style={{
                  fontSize: "1.3rem",

                  width: "10rem",
                  height: "2rem",
                  marginTop: "10px",
                  backgroundColor: "red",
                  border: "2px solid red",
                }}
              >
                <NavLink to="/signup"> تغعيل</NavLink>
              </button>
            </main>
            <Footer />
          </>
        );
      }
      if (i18n.language === "en") {
        return (
          <>
            <Header />
            <main>
              <h2>Please verify Your account to countine</h2>
              <button
                style={{
                  fontSize: "1.3rem",

                  width: "10rem",
                  height: "2rem",
                  marginTop: "10px",
                  backgroundColor: "red",
                  border: "2px solid red",
                }}
              >
                <NavLink to="/signup"> Verify</NavLink>
              </button>
            </main>
            <Footer />
          </>
        );
      }
    }
  }

  if (user) {
    if (user.emailVerified) {
      if (i18n.language === "ar") {
        return (
          <>
            <Helmet>
              <title>HOME Page</title>
              <meta name="description" content="HOMEEEEEEEEEEEE" />
            </Helmet>

            <Header />
            {showmodal && (
              <Homemodal
                close={close}
                add_title={add_title}
                details_input={details_input}
                add_details={add_details}
                Send_task={Send_task}
                title={title}
                array={array}
                details={details}
                load={load}
              />
            )}

            <main className="flex">
              <AllTasks user={user} />
              <section className="add">
                <button
                  onClick={() => {
                    setshowmodal(true);
                  }}
                >
                  إضافة مهمه جديدة
                </button>
              </section>
              <div
                style={{
                  right: showtoast ? "0" : "-100% ",
                }}
                className="toast"
              >
                <div>المهمه اضيفت بنجاح</div>
                <i class="fa-regular fa-circle-check"></i>
              </div>
            </main>

            <Footer />
          </>
        );
      }
      if(i18n.language === "en"){  return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />
          {showmodal && (
            <Homemodal
              close={close}
              add_title={add_title}
              details_input={details_input}
              add_details={add_details}
              Send_task={Send_task}
              title={title}
              array={array}
              details={details}
              load={load}
            />
          )}

          <main className="flex">
            
            <AllTasks  user={user}/>
            <section className="add">
              <button
                onClick={() => {
                  setshowmodal(true);
                }}
              >
                Add new task +
              </button>
            </section>
            <div
              style={{
                right: showtoast ? "0" : "-100% ",
              }}
              className="toast"
            >
              <div>Task added sucssfuly</div>
              <i class="fa-regular fa-circle-check"></i>
            </div>
          </main>

          <Footer />
        </>
      );}
    }
  }
};

export default Home;
