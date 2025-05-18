import React, { useContext, useEffect, useState } from 'react';
import { applyApi, getCardApi, getUserBookingAPi } from '../../Network/card.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LanguageContext } from '../../Context/Language';

export default function Card() {
  const [getProducts, setgetProducts] = useState([]);
  const [getUserBookingId, setgetUserBookingId] = useState([]);
  const [bookedCards, setBookedCards] = useState([]);
  const {language, setLanguage} = useContext(LanguageContext)

  async function getCard() {
    await getCardApi("product")
      .then((res) => {
        console.log(res);
        setgetProducts(res.data.data);
      })
      .catch((res) => {;
        
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

  useEffect(() => {
    getCard();
    getUserBooking();
  }, []);
useEffect(() => {
  const bookedCardIds = getUserBookingId.map(booking => booking.eventId);
  console.log("bookedCardIds:", bookedCardIds);
  setBookedCards(bookedCardIds);
}, [getUserBookingId]);

async function applyNow(id) {
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

  return (
<section>
   <div className="container ">
    <div className="row caardContianer">
      {getProducts.map((card) => (
        <div key={card._id} className="col-md-4"> 
            <div class="center">
              <div class="article-card">
                <Link to={`/card-details/${card._id}`}>

                <div class="content">
                  <p class="date">{formatDate(card.date)}</p>
                  <p class="title">{language === "en" ? card.title : card.titleAr}</p>


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

  );
}
