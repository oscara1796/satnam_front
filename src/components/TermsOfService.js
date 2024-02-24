import React, { useState } from 'react';

const termsSections = [
  {
    title: 'Acuerdo Legal',
    content: `Le informamos que es importante y obligatorio 
    que, en su carácter de Usuario y/o Visitante, en adelante el “USUARIO”, 
    lea, entienda y acepte de manera total el contenido de este documento, dicho consentimiento se considera como otorgado a favor de SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL,
    en adelante “Sat Nam Yoga Estudio®”.

    Al consultar, registrarse, solicitar y/o usar los servicios (aun gratuitamente), denominado en lo subsecuente como el “SERVICIO”, que se presentan a través del sitio web 
    www.satnamyogaestudio.com, denominados en lo subsecuente como “LA PLATAFORMA”, implica la adhesión a estos Términos y Condiciones de Uso y del Servicio.

    La importancia de que el Usuario conozca el contenido de estos términos y condiciones radica en que estos disponen las reglas establecidas por Sat Nam yoga Estudio®, 
    para el uso de LA PLATAFORMA en los Estados Unidos Mexicanos, así como los derechos y obligaciones que tiene el Usuario como consumidor, 
    salvo las excepciones previstas en diversas cláusulas.

    El marco jurídico que en los Estados Unidos Mexicanos protege los derechos y obligaciones tanto de Sat Nam Yoga Estudio® como del Usuario se rigen por la legislación mexicana, específicamente 
    la Ley Federal del Protección al Consumidor, el Código de Comercio, el Código Civil Federal, el Código Federal de Procedimientos Civiles y la Norma Mexicana ‘NMX-COE-001-SCFI-2018, 
    Comercio Electrónico - Disposiciones a las que se sujetarán aquellas personas que ofrezcan, comercialicen o vendan bienes, productos o servicios’, la legislación mexicana señalada en 
    su conjunto reglamenta el uso de servicios en línea para establecer tanto disposiciones normativas como sanciones en caso de que se realice la violación a los derechos de los 
    consumidores en línea, por lo cual si usted considera que sus derechos como Usuario no están siendo protegidos bajo dicho marco legal, deberá conciliar inicialmente las 
    quejas y reclamaciones del SERVICIO con Sat Nam Yoga Estudio® utilizando los medios que indican en estos términos y condiciones y, en caso de no obtener una respuesta satisfactoria, 
    el Usuario puede utilizar los mecanismos establecidos en la Ley ante la Procuraduría Federal del Consumidor.

    Si usted es un Usuario no establecido en México, deberá consultar los Términos y Condiciones que Sat Nam Yoga Estudio®  pone a disposición para Usuarios que radiquen en países distintos a México.

    .`
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
      <h1>Términos de Servicio de Sat Nam Yoga Estudio.com</h1>
      <h2>LOS TÉRMINOS Y CONDICIONES DE USO Y DEL SERVICIO APLICABLES A LOS ESTADOS UNIDOS MEXICANOS, QUE DETERMINAN LA FORMA 
        EN QUE SE REALIZA EL USO DE LA PLATAFORMA DE CURSOS EN LÍNEA QUE OFRECE SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL LOCALIZADA EN EL SITIO 
        WEB "WWW.SATNAMYOGAESTUDIO®.COM ”
        ACUERDO LEGAL
      </h2>
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
