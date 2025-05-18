import React, { useContext, useEffect, useState } from 'react'
import { getCardApi } from '../../Network/card.api';
import { LanguageContext } from '../../Context/Language';
import { useNavigate } from 'react-router-dom';
import { deleteEventApi } from '../../Network/admin.api';
import toast from 'react-hot-toast';
import { isLoggedIn } from '../../Network/auth.api';


export default function Admin() {
const [getProducts, setgetProducts] = useState([]);
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
    await getCardApi("product")
      .then((res) => {
        console.log(res);
        setgetProducts(res.data.data);
      })
      .catch((res) => {});
  }


  async function deleteCard(id){
    await deleteEventApi(id)
    .then((res) => {
        getCard()
        toast.success(res.data.message)
    })
    .catch((res) => {
        toast.error(res.response.data.message)
        
    })
}

    useEffect(() => {
      getCard();
      isLogged();
    }, []);

  return (
    <section className='card-admin'>
        <div className="container">
            <div className="row">
                <h2 className='my-2 text-center'></h2>
                <div className="text-start pt-120">
                    <button onClick={() => navigate("/addevent", {state: {category:"product"}})} className="btn btn-warning btn-admin">{language == "en" ? "Add Event" : "اضافه منتج"}</button>
                </div>
                {getProducts?.map((product) => (
                <div className="col-xl-4 col-md-6" key={product._id}>
                    <div className="card card-productd card-product-admin my-2">
                        <div className='img-div'>
                            <img src={product.imageUrl} className="product-img card-img-top" loading="lazy" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">{language === "en" ? product.title : product.titleAr}</h5>
                            <p className="text-black">{language === "en" ? product.description : product.descriptionAr}</p>
                            <p className="text-black">{product.price}</p>
                            <p className="text-black">{product.venue}</p>
                            <p className="text-black">{product.category}</p>
                            <button onClick={() => 
                            navigate("/editevent", {state: {title: product.title,
                                titleAr: product.titleAr,
                                description: product.description,
                                descriptionAr: product.descriptionAr,
                                image: product.imageUrl,
                                date: product.date,
                                category: product.category,
                                price: product.price,
                                venue: product.venue,
                                id: product._id}})} 
                            className='btn btn-warning me-2'>
                                {language === "en" ? "Edit" : "تعديل"}
                            </button>
                            <button onClick={() => deleteCard(product._id)} className='btn btn-danger'>{language === "en" ? "Delete" : "حذف"}</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
  )
}
