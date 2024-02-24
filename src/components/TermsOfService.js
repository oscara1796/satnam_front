import React, { useState } from 'react';

const termsSections = [
  {
    title: 'Acuerdo Legal',
    content: `Le informamos que es importante y obligatorio que, en su carácter de Usuario y/o Visitante, lea, entienda y acepte de manera total el contenido de este documento...`
  },
  {
    title: 'Identificación del Prestador del Servicio',
    content: `Razón social: PLATZI, S.A.P.I. de C.V...`
  },
  {
    title: 'Condiciones Generales',
    content: `a. Capacidad legal para la contratación del servicio...`
  },
  // Add more sections as needed
];

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="termsOfService">
      <h1>Términos de Servicio de Platzi.com</h1>
      {termsSections.map((section, index) => (
        <div key={index} className="termsSection">
          <h2 onClick={() => toggleSection(index)}>{section.title}</h2>
          {expandedSection === index && (
            <p>{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TermsOfService;
