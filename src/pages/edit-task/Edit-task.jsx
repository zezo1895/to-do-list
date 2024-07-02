import React from "react";
import "./edit.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../comp/Loading";
import Error404 from "../Error/Error404";
import { Helmet } from "react-helmet-async";
import { auth, db } from "../../config/config";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Address from "./1-address";
import EditDetails from "./2-edit_details";
import Editbtn from "./3-edit_btn";
import { Navigate, useParams } from "react-router-dom";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"

const EditTask = () => {
  let { stringid } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  /*========================================
============== + fun of edit+ ===========
==========================================
*/
  const edit_adderss = async (eo) => {
    await updateDoc(doc(db, user.uid, stringid), {
      title: eo.target.value,
    });
  };
  const checkedd = async (eo) => {
    if (!eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringid), {
        completed: false,
      });
    } else {
      await updateDoc(doc(db, user.uid, stringid), {
        completed: true,
      });
    }
  };
const remove = async (item) => {
  await updateDoc(doc(db, user.uid, stringid), {
    tasks: arrayRemove(item),
 });
}

const deletee = async() => {
  navigate("/",{replace:true})
  await deleteDoc(doc(db, user.uid, stringid));
  
}




  console.log(stringid);
  if (loading) {
    return (
      <>
        <Loading />
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

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Edit</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          <Header />
          <main className="flex">
            <Address
              user={user}
              stringid={stringid}
              edit_adderss={edit_adderss}
            />
            <EditDetails user={user} stringid={stringid} checkedd={checkedd} remove={remove} />
            <Editbtn user={user} stringid={stringid} deletee={deletee} />
          </main>
          <Footer />
        </>
      );
    }
  }
};
export default EditTask;
