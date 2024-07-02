import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/config";
import { useEffect } from "react";
import Moment from "react-moment";
import "moment-timezone";
import Loading from "../../comp/Loading";
import Error404 from "../Error/Error404";
import { deleteUser } from "firebase/auth";
import "./pro.css"

const Porfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user && !user.emailVerified && !loading) {
      navigate("/");
    }
  }, );

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    <Error404 />;
  }
  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Porfile</title>
            <meta name="description" content="JAVASCRIPTTTTTTTTTTTTTTTTTTTTT" />
            <style type="text/css">{`
    
        
    `}</style>
          </Helmet>
          <Header />

          <main>
            <div className="user">
              user_names <span>🧡</span>: {user.displayName}
            </div>
            <div className="email">
              Email<span>🧡</span>: {user.email}
            </div>
            <div className="create">
              Created at <span>🧡</span>:{" "}
              <Moment className="date" format="YYYY/MM/DD">
                {user.metadata.creationTime}
              </Moment>{" "}
            </div>
            <div className="last">
              last Sign <span>🧡</span>:
              <Moment
                className="date"
                tz="Egypt/Cairo"
                date={user.metadata.lastSignInTime}
                format="hh:mm:ss"
                durationFromNow
              />{" "}
            </div>
            <button className="del"
              onClick={() => {
                deleteUser(user)
                  .then(() => {
                    // User deleted.
                    console.log("done")
                    navigate("/");
                  })
                  .catch((error) => {
                    // An error ocurred
                    // ...
                    console.log(error.code)
                  });
              }}
            >
              Delete
            </button>
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default Porfile;
