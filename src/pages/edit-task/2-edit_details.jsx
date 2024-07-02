import React, { useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../config/config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const EditDetails = ({ user, stringid, checkedd, remove }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringid));
  const [showadd, setshowadd] = useState(false);
  const [newadd, setnewadd] = useState("");
  const { t, i18n } = useTranslation();

  if (loading) {
    return (
      <>
        <main>
          <loading />
        </main>
      </>
    );
  }

  if (value) {
    if(i18n.language === "ar"){
      return (
        <>
          <div className="details-task">
            <div className="up-details">
              <div className="created-time "dir="auto">
                منذ:{" "}
                <Moment  className="date" fromNow date={value.data().id} />
              </div>
              <div className="com ">
                <div>مكتمل </div>
                <input
                  onChange={(eo) => {
                    checkedd(eo);
                  }}
                  checked={value.data().completed === true ? true : false}
                  type="checkbox"
                  name=""
                  id=""
                />
              </div>
            </div>
            {value.data().tasks.map((item) => {
              return (
                <div className="sub-details">
                  <div className="details">{item}</div>
                  <i
                    onClick={(eo) => {
                      remove(item);
                    }}
                    class="fa-solid fa-trash"
                  ></i>
                </div>
              );
            })}
            {showadd && (
              <div className="add-details">
                <input
                  placeholder="add new details"
                  value={newadd}
                  onChange={(eo) => {
                    setnewadd(eo.target.value);
                  }}
                  type="text"
                />
                <button
                  onClick={async (eo) => {
                    eo.preventDefault();
                    if (newadd === "") {
                      setshowadd(false);
                    } else {
                      await updateDoc(doc(db, user.uid, stringid), {
                        tasks: arrayUnion(newadd),
                      });
                      setnewadd("");
                    }
                  }}
                >
                إضافة
                </button>
                <button
                  onClick={(eo) => {
                    eo.preventDefault();
                    setshowadd(false);
                  }}
                >
                  إلغاء
                </button>
              </div>
            )}
            <button
              onClick={(eo) => {
                eo.preventDefault();
                setshowadd(true);
              }}
              className="add" dir="rtl"
            >
              إضافة المزيد+
            </button>
          </div>
          </>
      );
    }
    if(i18n.language === "en"){
      return (
        <div>
          <div className="details-task">
            <div className="up-details">
              <div className="created-time">
                Created at:{" "}
                <Moment className="date" fromNow date={value.data().id} />
              </div>
              <div className="com ">
                <div>Completed </div>
                <input
                  onChange={(eo) => {
                    checkedd(eo);
                  }}
                  checked={value.data().completed === true ? true : false}
                  type="checkbox"
                  name=""
                  id=""
                />
              </div>
            </div>
            {value.data().tasks.map((item) => {
              return (
                <div className="sub-details">
                  <div className="details">{item}</div>
                  <i
                    onClick={(eo) => {
                      remove(item);
                    }}
                    class="fa-solid fa-trash"
                  ></i>
                </div>
              );
            })}
            {showadd && (
              <div className="add-details">
                <input
                  placeholder="add new details"
                  value={newadd}
                  onChange={(eo) => {
                    setnewadd(eo.target.value);
                  }}
                  type="text"
                />
                <button
                  onClick={async (eo) => {
                    eo.preventDefault();
                    if (newadd === "") {
                      setshowadd(false);
                    } else {
                      await updateDoc(doc(db, user.uid, stringid), {
                        tasks: arrayUnion(newadd),
                      });
                      setnewadd("");
                    }
                  }}
                >
                  add
                </button>
                <button
                  onClick={(eo) => {
                    eo.preventDefault();
                    setshowadd(false);
                  }}
                >
                  cancel
                </button>
              </div>
            )}
            <button
              onClick={(eo) => {
                eo.preventDefault();
                setshowadd(true);
              }}
              className="add"
            >
              Add more +
            </button>
          </div>
        </div>
      );
    }
    
  }
};

export default EditDetails;
