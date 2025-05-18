import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../Context/Language';
import event1 from '../../assets/ev1.jpeg'
import event2 from '../../assets/ev2.jpeg'
import event3 from '../../assets/ev3.jpeg'
import event4 from '../../assets/ev4.jpg'


export default function Footer() {
const {language, setLanguage} = useContext(LanguageContext)

return (

        <>
        
        <section className='footer p-5 bg-fot'>
          <div className="container">
            <div className="row">

              <div className="col-lg-4 col-md-6">
                <div className="footer-item">
                    {/* <img src={footerLogo} alt="jabaness food" className="mb-4"/> */}
                  <a aria-label='logo' className="navbar-brand logo text-white" href="#">
                    {language === "en" ? "Events" : "فعاليات"}
                  </a>
                                      
                  <p className='text-footer-color text-white'>
                  {language === "en" 
                    ? "Discover the best events happening around you and never miss out on unforgettable experiences."
                    : "اكتشف أفضل الفعاليات التي تحدث من حولك ولا تفوت التجارب التي لا تُنسى."}
                  </p>

                  <div className="social d-flex">
                                        <a aria-label='linkedin' href="https://www.linkedin.com/in/amr-nour-/" target="_blank">
                      <i className="fa-brands fa-linkedin text-white"></i>
                    </a>
                    <a aria-label='github' href="https://github.com/IAmrNourI" target="_blank">
                      <i className="fa-brands fa-github text-white"></i>
                    </a>
                    <a aria-label='instagram' href="#">
                      <i className="fa-brands fa-instagram text-white"></i>
                    </a>
                    <a aria-label='facebook' href="https://www.facebook.com/amr.nour.902/" target="_blank">
                      <i className="fa-brands fa-facebook-f text-white"></i>
                    </a>

                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <ul className='footer-list p-0'>
                  <li><Link aria-label='home' className='footer-link' to="/">{language === "en" ? "Home": "الرئيسيه"}</Link></li> 
                  <li><Link aria-label='home' className='footer-link' to="/allevents">{language === "en" ? "All Events": "جميع الفاعليات"}</Link></li> 
                  <li><Link aria-label='home' className='footer-link' to="/myevents">{language === "en" ? "My Events": "فاعلياتي"}</Link></li> 
                </ul>
              </div>

              <div className="col-lg-2 col-md-6">
                <ul className='footer-list p-0 text-white'>
                  <li>{language === "en" ? "Start Hero" : "ابدأ البطل"}</li>
                  <li>{language === "en" ? "Styleguide" : "دليل الأسلوب"}</li>
                  <li>{language === "en" ? "Pasword Protected" : "محمية بكلمة المرور"}</li>
                  <li>{language === "en" ? "404 Not Found" : "٤٠٤ غير موجود"}</li>
                  <li>{language === "en" ? "Licenses" : "الرخص"}</li>
                  <li>{language === "en" ? "Changeiog" : "تغيير"}</li>

                </ul>
              </div>


              <div className="col-lg-4 col-md-6">
                <p className='text-white fw-500 p-f'>{language === "en" ? "Follow Us On Instagram": "تابعنا علي الانستجرام"}</p>
                <div className='footer-imgs'>
                  <img loading='lazy' className='w-50' src={event1} alt="" />
                  <img loading='lazy' className='w-50' src={event2} alt="" />
                  <img loading='lazy' className='w-50' src={event3} alt="" />
                  <img loading='lazy' className='w-50' src={event4} alt="" />
                </div>
              </div>


            </div>
            

            <div className='but-footer'>
              <span className='line d-flex'></span>
              <div className='d-flex justify-content-center text-center'>
              <p className='text-footer-color mt-4 text-white'>
              Copyright © 2025 #AmrNour. All Rights Reserved
            </p>
              </div>
            </div>
          </div>
        </section>
        
        </>
        
  )

}

