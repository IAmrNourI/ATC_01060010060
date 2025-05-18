import React, { useContext, useEffect, useState } from 'react';
import { getBookingId } from '../../Network/card.api';
import { useParams } from 'react-router-dom';
import { LanguageContext } from '../../Context/Language';

export default function CardDetails() {
  const [userCard, setUserCard] = useState(null);
  const { id } = useParams();
  const {language, setLanguage} = useContext(LanguageContext)

  async function getCardWithId() {
    try {
      const res = await getBookingId(id);
      console.log(res)
      setUserCard(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) getCardWithId();
  }, [id]);

  function formatDate(dateString) {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  }

  if (!userCard) return <p>Loading...</p>;

  return (
    <section className="details-container">
      <img
        src={userCard.imageUrl}
        alt={userCard.title}
        className="details-image"
      />
      <h1 className={language === "en" ? "details-title" : "details-title text-end"}>{language === "en" ? userCard.title : userCard.titleAr}</h1>
      <p className={language === "en" ? "details-description": "details-description text-end"}>{language === "en" ? userCard.description : userCard.descriptionAr}</p>
      <p className="details-price">Price: {userCard.price} $</p>
      <p className="details-venue">Venue: {userCard.venue}</p>
      <p className="details-date">Date: {formatDate(userCard.date)}</p>
    </section>
  );
}
