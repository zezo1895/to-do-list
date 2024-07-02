
import    './Footer.css';
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t, i18n } = useTranslation();
  if(i18n.language === "ar"){
    return (
      <div className="myfooter">
            <footer className="ali" dir='rtl'>
              تم التصميم و البرمجه بواسطه زياد عادل
              <span>🧡</span>
            </footer>
      </div>
        );
  }
  if(i18n.language === "en"){
    return (
      <div className="myfooter">
            <footer className="ali">
              Designed and developed by Courses4Arab.com
              <span>🧡</span>
            </footer>
      </div>
        );
  }

};

export default Footer;
