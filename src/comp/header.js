import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { auth } from "../config/config";
import context from "../pages/context/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { theme, toogle } = useContext(context);
  const [user, loading, error] = useAuthState(auth);
  const [get, setget] = useState(0);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  if (i18n.language === "ar") {
    return (
      <div className={`myheader `}>
        <header className="hide-when-mobile ali  ">
          <h1>
            <Link to="/">c4a.dev</Link>
          </h1>

          <i
            onClick={() => {
              toogle(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-sun"
          ></i>
          <i
            onClick={() => {
              toogle(theme == "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-moon"
          ></i>

          <ul className="flex headerul">
            {!user && (
              <li className="main-list">
                <NavLink to="/signin" className="main-link">
                  تسجيل الدخول
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="main-list">
                <NavLink to="/signup" className="main-link">
                  انشاء حساب
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="main-list">
                <button className="main-link lan" to="/about">
                  اللغه
                  <ul>
                    <li
                      onClick={() => {
                        i18n.changeLanguage("ar");
                      }}
                      className="flex"
                      dir="rtl"
                    >
                      <p>العربية</p>
                      {i18n.language === "ar" && (
                        <i class="fa-solid fa-check"></i>
                      )}
                    </li>
                    <li
                      onClick={() => {
                        i18n.changeLanguage("en");
                      }}
                      className="flex"
                      dir="ltr"
                    >
                      <p>English</p>
                      {i18n.language === "en" && (
                        <i class="fa-solid fa-check"></i>
                      )}
                    </li>
                  </ul>
                </button>
              </li>
            )}
            {user && (
              <>
              
                <li className="main-list">
                  <NavLink
                    onClick={() => {
                      signOut(auth)
                        .then(() => {
                          // Sign-out successful.
                          navigate("/signin");
                        })
                        .catch((error) => {
                          // An error happened.
                        });
                    }}
                    to=""
                    className="main-link"
                  >
                تسجيل الخروج
                  </NavLink>
                </li>

                <li className="main-list">
                  <NavLink className="main-link" to="/about">
                    عننا
                  </NavLink>
                </li>

                <li className="main-list">
                  <NavLink className="main-link" to="/porfile">
                  حسابى
                  </NavLink>
                </li>
                <li className="main-list">
                  <button className="main-link lan" to="/about">
                  اللغه
                    <ul>
                      <li
                        onClick={() => {
                          i18n.changeLanguage("ar");
                        }}
                        className="flex"
                        dir="rtl"
                      >
                        <p>العربية</p>
                        {i18n.language === "ar" && (
                          <i class="fa-solid fa-check"></i>
                        )}
                      </li>
                      <li
                        onClick={() => {
                          i18n.changeLanguage("en");
                        }}
                        className="flex"
                        dir="ltr"
                      >
                        <p>English</p>
                        {i18n.language === "en" && (
                          <i class="fa-solid fa-check"></i>
                        )}
                      </li>
                    </ul>
                  </button>
                </li>
              </>
            )}
          </ul>
        </header>
      </div>
    );
  }
  if (i18n.language === "en") {
    return (
      <div className={`myheader `}>
        <header className="hide-when-mobile ali  ">
          <h1>
            <Link to="/">c4a.dev</Link>
          </h1>

          <i
            onClick={() => {
              toogle(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-sun"
          ></i>
          <i
            onClick={() => {
              toogle(theme == "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-moon"
          ></i>

          <ul className="flex headerul">
            {!user && (
              <li className="main-list">
                <NavLink to="/signin" className="main-link">
                  Sign in
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="main-list">
                <NavLink to="/signup" className="main-link">
                  Sign up
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="main-list">
                <button className="main-link lan" to="/about">
                  Language
                  <ul>
                    <li
                      onClick={() => {
                        i18n.changeLanguage("ar");
                      }}
                      className="flex"
                      dir="rtl"
                    >
                      <p>العربية</p>
                      {i18n.language === "ar" && (
                        <i class="fa-solid fa-check"></i>
                      )}
                    </li>
                    <li
                      onClick={() => {
                        i18n.changeLanguage("en");
                      }}
                      className="flex"
                      dir="ltr"
                    >
                      <p>English</p>
                      {i18n.language === "en" && (
                        <i class="fa-solid fa-check"></i>
                      )}
                    </li>
                  </ul>
                </button>
              </li>
            )}
            {user && (
              <>
                <li className="main-list">
                  <button className="main-link lan" to="/about">
                    Language
                    <ul>
                      <li
                        onClick={() => {
                          i18n.changeLanguage("ar");
                        }}
                        className="flex"
                        dir="rtl"
                      >
                        <p>العربية</p>
                        {i18n.language === "ar" && (
                          <i class="fa-solid fa-check"></i>
                        )}
                      </li>
                      <li
                        onClick={() => {
                          i18n.changeLanguage("en");
                        }}
                        className="flex"
                        dir="ltr"
                      >
                        <p>English</p>
                        {i18n.language === "en" && (
                          <i class="fa-solid fa-check"></i>
                        )}
                      </li>
                    </ul>
                  </button>
                </li>
                <li className="main-list">
                  <NavLink
                    onClick={() => {
                      signOut(auth)
                        .then(() => {
                          // Sign-out successful.
                          navigate("/signin");
                        })
                        .catch((error) => {
                          // An error happened.
                        });
                    }}
                    to=""
                    className="main-link"
                  >
                    Sign-Out
                  </NavLink>
                </li>

                <li className="main-list">
                  <NavLink className="main-link" to="/about">
                    About
                  </NavLink>
                </li>

                <li className="main-list">
                  <NavLink className="main-link" to="/porfile">
                    Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </header>
      </div>
    );
  }
};

export default Header;
