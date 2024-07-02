
import Header from '../../comp/header';
import Footer from '../../comp/Footer';
import { Helmet  } from 'react-helmet-async';

import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/config";
import { useContext, useEffect } from 'react';

import Error404 from '../Error/Error404';
import ReactLoading from "react-loading";
import context from "../context/context"


const About = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme } = useContext(context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  },[user])
  if (loading) {
    return (
      <section><ReactLoading
      type={"bubbles"}
      color={theme==="Light"? "cyan":"#ca1271"}
      height={400}
      width={400}
    /></section>
    );

  }
  if(error){
    <Error404/>
  }
  return (
    <>
         <Helmet>
        <title>HTML Page</title>
        <meta name="description" content="HTMLLLLLLLLLLLLLLLL" />
      </Helmet>
    <Header />
      <main>
      <section><ReactLoading
              type={"bubbles"}
              color={theme==="Light"? "cyan":"#ca1271"}
              height={400}
              width={400}
            /></section>
      </main>
    <Footer />
  </>
  );
}


export default About;
