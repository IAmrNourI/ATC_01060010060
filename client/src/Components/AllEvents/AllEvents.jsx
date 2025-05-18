import React, { useContext, useEffect, useState } from 'react'
import { applyApi, getAllEvents, getUserBookingAPi } from '../../Network/card.api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LanguageContext } from '../../Context/Language';
import { isLoggedIn } from '../../Network/auth.api';


export default function AllEvents() {
  const [getProducts, setgetProducts] = useState([]);
  const [getUserBookingId, setgetUserBookingId] = useState([]);
  const [bookedCards, setBookedCards] = useState([]);
  const {language, setLanguage} = useContext(LanguageContext)

      const navigate = useNavigate()
     
  
      async function isLogged(){
          await isLoggedIn()
          .then((res) => {
            console.log("llogin???",res)
          })
          .catch((res) => {
            console.log("llogin???",res)
              navigate("/auth/login");
          })
      }


async function getCard() {
    await getAllEvents("product")
      .then((res) => {
        console.log(res)
        setgetProducts(res.data.data);
      })
      .catch((res) => {
      });
  }

  async function getUserBooking() {
    await getUserBookingAPi()
      .then((res) => {
        console.log(res);
        setgetUserBookingId(res.data.data);
      })
      .catch((res) => {});
  }

async function applyNow(id) {
  console.log("ID :", id)
  try {
    const res = await applyApi(id);
    toast.success("Event Booked Successfully");

    setBookedCards(prev => [...prev, id]);
  } catch (error) {
    toast.error("Booking failed");
    console.log(error)
  }
}

  

  function formatDate(dateString) {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
  }

  useEffect(() => {
    getCard();
    getUserBooking();
    isLogged();
  }, []);

  useEffect(() => {
    const bookedCardIds = getUserBookingId.map(booking => booking.eventId);
    setBookedCards(bookedCardIds);
  }, [getUserBookingId]);


  return (
<section>
  <div className="container">
    <div className="row">
      {getProducts.map((card) => (
        <div key={card._id} className="col-md-4"> 
            <div className="center">
              <div className="article-card">
                                <Link to={`/card-details/${card._id}`}>
              
                <div className="content">
                  <p className="date">{formatDate(card.date)}</p>
                  <p className="title">{language === "en" ? card.title : card.titleAr}</p>

          <div className="btns-hero d-flex">


            <Link to="" className="bt bok me-3 text-decoration-none mt-2">
              <button className="bookBtn" onClick={() => applyNow(card._id)}                       
                      disabled={bookedCards.includes(card._id)}>
                      {bookedCards.includes(card._id)                     
                      ? (language === "en" ? "Booked" : "تم الحجز")
                  : (language === "en" ? "Book now" : "احجز الآن")}
                <span></span>
                <span></span>
                </button>
            </Link>
          </div>
                </div>

                <img src={card.imageUrl} alt="article-cover" />
                                </Link>
                
              </div>
            </div>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}
