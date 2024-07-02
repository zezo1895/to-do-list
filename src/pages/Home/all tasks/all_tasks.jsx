import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../config/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import Modal from "../../../shared/Modal/modal";
import Moment from "react-moment";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
import context from "../../context/context"
const AllTasks = ({ user }) => {
  const { theme } = useContext(context)
  const[sort,setsort]=useState(query(collection(db, user.uid), orderBy("id","desc")))
  const [active, setactive] = useState("new");
  const [value, loading, error] = useCollection(sort);
  const [showmodal, setshowmodal] = useState(false);
  const {  i18n } = useTranslation();
  ;

  if (loading) {
    return (<main>
      <section><ReactLoading
              type={"bubbles"}
              color={theme==="Light"? "cyan":"#ca1271"}
              height={400}
              width={400}
            /></section>
    </main>);
  }
  if (error) {
    setshowmodal(true);
    return <>{showmodal && <Modal>
      <h3> Sorry try again</h3>
      </Modal>}</>;
  }
  
if(value){
  if(i18n.language === "ar"){  return (
    <>
  
  
<section className="btns-home">
                <button onClick={() => {
                  setactive("new")
                  setsort(query(collection(db, user.uid), orderBy("id","desc")))
                }} className={`new-art ${active === "new" ? "active" : "notactive"} `}>الجديد اولا </button>
                <button onClick={() => {
                  setactive("old")
                  setsort(query(collection(db, user.uid), orderBy("id","asc")))
                }} className={`old-art ${active === "old" ? "active" : "notactive"} `}>القديم اولا</button>
                <select onChange={(eo) => {
                  if(eo.target.value === "all"){
                    setsort(query(collection(db, user.uid), orderBy("id")))
                  }else if(eo.target.value === "com"){
                    setsort( query(collection(db, user.uid), where("completed", "==", true),orderBy("completed","desc")))
                  }
                  else{
                    setsort( query(collection(db, user.uid), where("completed", "==", false)))
                  
                  }
                }} className="tasks" name="tasks">
                  <option  value="all">
                    جميع المهام
                  </option>
                  <option value="com">مكتمل</option>
                  <option value="nocom">غير مكتمل</option>
                
                </select>
              </section>

    <section className="all-articles flex">
        {value.docs.length === 0 && 
        <h1 dir="rtl">لايوجد مهام ♥</h1>}
      {value.docs.map((item) => {
        return(  
          <Link to={`/edit-task/${item.data().id}`}>
            <article dir="auto">
            <h3>{item.data().title}</h3>
            <ul>
            {item.data().tasks.map((item, index) => {
              if(index <2 )
              return(  <li>{item}</li>)
            
            })}
            </ul>
            <p><Moment
                className="date"
                 fromNow
                date={ item.data().id }
              
              
              /></p>
        </article>
          </Link>
        )
      
      })}
    
    </section>
    </>
  );}
  if(i18n.language === "en"){
    return (
      <>
    
    
  <section className="btns-home">
                  <button onClick={() => {
                    setactive("new")
                    setsort(query(collection(db, user.uid), orderBy("id","desc")))
                  }} className={`new-art ${active === "new" ? "active" : "notactive"} `}>Newest first </button>
                  <button onClick={() => {
                    setactive("old")
                    setsort(query(collection(db, user.uid), orderBy("id","asc")))
                  }} className={`old-art ${active === "old" ? "active" : "notactive"} `}>Oldest first</button>
                  <select onChange={(eo) => {
                    if(eo.target.value === "all"){
                      setsort(query(collection(db, user.uid), orderBy("id")))
                    }else if(eo.target.value === "com"){
                      setsort( query(collection(db, user.uid), where("completed", "==", true),orderBy("completed","desc")))
                    }
                    else{
                      setsort( query(collection(db, user.uid), where("completed", "==", false)))
                    
                    }
                  }} className="tasks" name="tasks">
                    <option  value="all">
                      All tasks
                    </option>
                    <option value="com">Completed</option>
                    <option value="nocom">not Completed</option>
                  
                  </select>
                </section>
  
      <section className="all-articles flex">
          {value.docs.length === 0 && 
          <h1>No tasks added ♥</h1>}
        {value.docs.map((item) => {
          return(  
            <Link to={`/edit-task/${item.data().id}`}>
              <article dir="auto">
              <h3>{item.data().title}</h3>
              <ul>
              {item.data().tasks.map((item, index) => {
                if(index <2 )
                return(  <li>{item}</li>)
              
              })}
              </ul>
              <p><Moment
                  className="date"
                   fromNow
                  date={ item.data().id }
                
                
                /></p>
          </article>
            </Link>
          )
        
        })}
      
      </section>
      </>
    );
  }

}};

export default AllTasks;
