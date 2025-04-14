import React, { useState } from 'react';
import logo from '../assets/logo.svg';

function LandingPage() {
  const [language, setLanguage] = useState("ENG");

  const translations = {
    ENG: {
      heroText: "We connect creators and brands with a shop-like experience to close authentic brand-deals - no agencies, just perfect matches.",
      whyChoose: "Why Choose Branbu?",
      feedback: "We value your feedback!",
      surveyText: "Help us create the best experience for creatives like you! Participate in our short survey.",
      takeSurvey: "Take Survey & Get Early Beta Access",
      surveyLink: "https://form.typeform.com/to/LhUBnVCr",
      gridItems: [
        {
          title: "🛍️ Brand-Deal Online-Shop",
          description: "Browse various types of brand-deals like a shop - choose the deals that match your content"
        },
        {
          title: "🤝 Direct Connection with Brands",
          description: "Work directly with brands and skip the agency. Streamline your partnerships and maximize your impact."
        },
        {
          title: "🚀 A Platform That Grows with You",
          description: "Whether you're a small creator or a growing influencer - Branbu supports creators at every stage, helping you expand your reach and monetize effectively."
        },
        {
          title: "⚡ Scalability, Flexibility, and Automation",
          description: "Choose various brand-deals that suit your goals. Branbu automates the process, making it easy to scale and manage partnerships with minimal effort."
        }
      ]
    },
    DE: {
      heroText: "Wir verbinden Creators und Marken mit einem Shop-ähnlichen Erlebnis für authentische Brand-Deals - keine Agenturen, nur perfekte Matches.",
      whyChoose: "Warum Branbu wählen?",
      feedback: "Wir schätzen dein Feedback!",
      surveyText: "Hilf uns, die beste Erfahrung für Kreative wie dich zu schaffen! Nimm an unserer Umfrage teil.",
      takeSurvey: "Umfrage & Early Beta Zugang",
      surveyLink: "https://form.typeform.com/to/T6WYIOQ9",
      gridItems: [
        {
          title: "🛍️ Brand-Deal Online-Shop",
          description: "Durchstöbere verschiedene Arten von Brand-Deals wie in einem Shop - wähle die Deals, die zu deinem Content passen"
        },
        {
          title: "🤝 Direkte Verbindung zu Marken",
          description: "Arbeite direkt mit Marken zusammen und überspringe die Agentur. Optimiere deine Partnerschaften und maximiere deinen Einfluss."
        },
        {
          title: "🚀 Eine Plattform, die mit dir wächst",
          description: "Ob kleiner Creator oder wachsender Influencer - Branbu unterstützt Creators in jeder Phase und hilft dir dabei, deine Reichweite zu erweitern und effektiv zu monetarisieren."
        },
        {
          title: "⚡ Skalierbarkeit, Flexibilität und Automatisierung",
          description: "Wähle verschiedene Brand-Deals, die zu deinen Zielen passen. Branbu automatisiert den Prozess und macht es einfach, Partnerschaften mit minimalem Aufwand zu skalieren und zu verwalten."
        }
      ]
    }
  };

  return (
    <div>
      {/* Language Toggle */}
      <div className="lang-toggle">
        <button onClick={() => setLanguage("ENG")}>ENG</button>
        <button onClick={() => setLanguage("DE")}>DE</button>
      </div>

      {/* Hero Section */}
      <header className="hero">
        <img src={logo} alt="Branbu - Connect. Collaborate. Create." className="logo" />
        <p>{translations[language].heroText}</p>
        <h2>{translations[language].feedback}</h2>
        <p className="survey-text">{translations[language].surveyText}</p>
        <a className="button" href={translations[language].surveyLink}>
          {translations[language].takeSurvey}
        </a>
      </header>

      {/* Why Choose Branbu Section */}
      <section className="sponsorship">
        <h2>{translations[language].whyChoose}</h2>
        <div className="grid-container">
          {translations[language].gridItems.map((item, index) => (
            <div key={index} className="grid-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 