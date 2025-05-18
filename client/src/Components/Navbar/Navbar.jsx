import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../../Context/Language";

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const underlineRef = useRef(null);
    const navRefs = useRef([]);
    const {language, setLanguage} = useContext(LanguageContext)
    const location = useLocation();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);
    const [isWiderThan450, setIsWiderThan450] = useState(window.innerWidth > 450);
    const [phone, setPhone] = useState("");

    
    async function getPhone() {
        try {
            const res = await getPhoneApi();
            setPhone(res.data.data);
        } catch (error) {
        }
    }

    useEffect(() => {
        const collapseElement = document.getElementById("navbarSupportedContent");
        if(collapseElement && collapseElement.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });
            bsCollapse.hide();
        }

    }, [location.pathname])

    useEffect(() => {
        getPhone()
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 992);
        setIsWiderThan450(width > 450)
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    
    useEffect(() => {

        if (navRefs.current[activeIndex] && underlineRef.current) {
            const activeElement = navRefs.current[activeIndex];
            const distance = Math.abs(activeIndex - prevIndex);
            const scaleFactor = 1 + distance * 0.5;

            setIsMoving(true);

            if (underlineRef.current) {
                const isMovingRight = activeIndex > prevIndex;
                underlineRef.current.style.setProperty("--underline-right", isMovingRight ? "-20px" : "auto");
                underlineRef.current.style.setProperty("--underline-left", isMovingRight ? "auto" : "-20px");
                underlineRef.current.style.setProperty("--icon-flip", isMovingRight ? "1" : "-1");

                underlineRef.current.style.transformOrigin = activeIndex < prevIndex ? "left" : "right";
                underlineRef.current.style.transform = `scaleX(${scaleFactor})`;
                underlineRef.current.classList.add("moving");
            }

            underlineRef.current.style.width = `${activeElement.offsetWidth}px`;
            underlineRef.current.style.left = `${activeElement.offsetLeft}px`;

            underlineRef.current.style.background = activeIndex < prevIndex 
                ?"linear-gradient(200deg, #19232B, #F4EAD2)" 
                : "linear-gradient(90deg, #19232B, #F4EAD2)";

            

            setPrevIndex(activeIndex);
            setTimeout(() => {
                if (underlineRef.current) {
                    underlineRef.current.classList.remove("moving");
                    underlineRef.current.style.transform = "scaleX(1)";
                }
                setIsMoving(false);
            }, 600);
        }
    }, [activeIndex]);
    
    useEffect(() => {
        const currentPath = location.pathname;
        const index = navItems.findIndex(item => getNavLink(item) === currentPath);
        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [location.pathname]); 

    

const navItems = language === "en"
    ? ["Home", "MyEvents", "All-Events", "Admin"]
    : ["الرئيسية", "فعالياتي","جميع الفاعليات", "لوحه التحكم"];

const getNavLink = (item) => {
    switch (item) {
        case "Home":
        case "الرئيسية":
            return "/";
        case "MyEvents":
        case "فعالياتي":
            return "/myevents";
        case "All-Events":
        case "جميع الفاعليات":
            return "/allevents";
        case "Admin":
        case "لوحه التحكم":
            return "/admin";
        default:
            return "/";
    }
};

    return (
        <>
        {language === "en" ? (
            <>
    <nav className="navbar navbar-expand-lg p-0 position-fixed w-100 py-1">
        <div className="container">

            {!isSmallScreen && (
                <>
                    <div className="imageLogo">
                    </div>
                    <h1 className="navbar-brand logo en-logo" href="#">Events</h1> 
                </>
                )}

            {isSmallScreen ? (
            <>
                <div className="imageLogo">
                </div>

                <h1 className="navbar-brand logo en-logo" href="#">Events</h1> 
            </>
            ) : null}
                <button
                className="navbar-toggler bg-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>


<div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto position-relative">
                    {navItems.map((item, index) => (
                        <li className="nav-item" key={index}>
                            <Link
                                to={getNavLink(item)}
                                className={`nav-link mx-3 ${index === activeIndex ? "active" : ""}`}
                                onClick={() => setActiveIndex(index)}
                                ref={(el) => (navRefs.current[index] = el)}
                            >
                                {item}
                            </Link>
                        </li>
                        
                    ))}
                    <div className={`underline ${isMoving ? "moving" : ""}`} ref={underlineRef}></div>
                </ul>
                <button
                        className="btn btn-light btn-sm ar-en ms-3"
                        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                    >
                        {language === "en" ? "العربية" : "English"}
                </button>
            </div>
        </div>
    </nav>        
            </>
        ): (   
            <>
    <nav className="navbar navbar-expand-lg p-0 position-fixed w-100 py-1">
    <div className="container">

                <button
                className="navbar-toggler bg-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>

        {!isSmallScreen && (
        <button
            className="btn btn-light btn-sm ar-en ms-auto"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        >
            {language === "en" ? "العربية" : "English"}
        </button>
        )}

        {isSmallScreen ? (
            <>
            <h1 className="navbar-brand logo text-white ar-logo mb-2" href="#">فاعليات</h1>

            <div className="imageLogo">
            </div>
        </>
        ) : null}

<div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0 position-relative">
            {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
                <Link
                to={getNavLink(item)}
                className={`nav-link mx-3 pt-2 px-1 ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                ref={(el) => (navRefs.current[index] = el)}
                >
                {item}
                </Link>
            </li>
            ))}
            <li className={`underline ${isMoving ? "moving" : ""}`} ref={underlineRef}></li>

            {isSmallScreen  && (
            <li className="nav-item ms-3 mt-2">
                <button
                className="btn btn-light btn-sm ar-en"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                >
                {language === "en" ? "العربية" : "English"}
                </button>
            </li>
            )}
        </ul>
        </div>

        {!isSmallScreen && (
        <>
            <h1 className="navbar-brand logo text-white ar-logo ms-auto mb-1" href="#">فاعليات</h1>
            <div className="imageLogo">
            </div>
        </>
        )}
    </div>
    </nav>
            </>
        )}
        </>

    );
};

export default Navbar;
