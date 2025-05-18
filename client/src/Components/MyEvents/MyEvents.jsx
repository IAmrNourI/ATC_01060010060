import React, { useContext, useEffect, useState } from "react";
import { applyApi, getBookingId, getUserBookingAPi } from "../../Network/card.api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LanguageContext } from "../../Context/Language";
import { isLoggedIn } from "../../Network/auth.api";

export default function MyEvents() {
  const [bookedCardsDetails, setBookedCardsDetails] = useState([]);
  const [bookedCards, setbookedCards] = useState([])
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


async function applyNow(id) {
  try {
    const res = await applyApi(id);
    toast.success("Added One more ticket");

  } catch (error) {
    toast.error("Booking failed");
    console.log(error)
  }
}

  async function getUserBooking() {
    try {
      const res = await getUserBookingAPi();
      const bookings = res.data.data;
      console.log("bookings: ", bookings);

      const uniqueCardIds = [
        ...new Set(
          bookings.map((b) => {
            console.log( "b: ",b);
            return b.eventId;
          })
        ),
      ];
      console.log("Unique Card IDs:", uniqueCardIds);

      const detailsPromises = uniqueCardIds.map(async (id) => {
        try {
          const cardRes = await getBookingId(id);
          console.log("Card Details for", id, cardRes);
          return cardRes.data?.data;
        } catch (err) {
          console.error("Error fetching card", id, err);
          return null;
        }
      });

      const cardsDetails = await Promise.all(detailsPromises);
      const filteredDetails = cardsDetails.filter(Boolean); // remove undefined/null
      setBookedCardsDetails(filteredDetails);

      console.log("Final Booked Cards Details:", filteredDetails);
    } catch (err) {
      console.error("Error fetching booked cards", err);
    }

    console.log("bookedCardsDetails: ", bookedCardsDetails);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  useEffect(() => {
    getUserBooking();
    isLogged()
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          {bookedCardsDetails.map((card) => (
            <div key={card._id} className="col-md-4">
              <div class="center">
                <div class="article-card">                
                  <Link to={`/card-details/${card._id}`}>
                
                  <div class="content">
                    <p class="date">{formatDate(card.date)}</p>
                    <p class="title">{language === "en" ? card.title : card.titleAr}</p>

                    <div className="btns-hero d-flex">
                      <Link
                        to=""
                        className="bt bok me-3 text-decoration-none mt-2"
                      >
                        <button
                          className="bookBtn"
                          onClick={() => applyNow(card._id)}
                          // disabled={true}
                        >
                          {bookedCardsDetails.includes(card._id)
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
