import React, { useState } from 'react'
import './TermsOfService.css'

const termsSections = [
  {
    title: 'Acuerdo Legal',
    content: `
Le informamos que es importante y obligatorio que, en su carácter de Usuario y/o Visitante, en adelante el “USUARIO”, lea, entienda y acepte de manera total el contenido de este documento, dicho consentimiento se considera como otorgado a favor de SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL, en adelante “Sat Nam Yoga Estudio®”.
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

    .`,
  },
  {
    title: 'CLÁUSULA A. IDENTIFICACIÓN DEL PRESTADOR DEL SERVICIO',
    content: `
Razón social    SANDRA LOPEZ GONZALEZ \n
Nombre comercial    SAT NAM YOGA ESTUDIO\n
RFC    LOGS6801132SA\n
Sitio web    www.satnamyogaestudio.com\n
Giro    "Servicios de Cursos en Línea" y "Servicios educativos y de enseñanza" \n
Teléfono    (52) 3331722660 \n
Domicilio    Plateros 2378, Jardines del Country, Guadalajara, Jalisco, México. \n
Geolocalización    https://maps.app.goo.gl/yNaw3216tj3crjJv9 \n
Contacto    Correo electrónico: satnamyogajal@gmail.com \n
WhatsApp: (52) 3314183347 \n
Horario de atención    Lunes a viernes de 8-20h \n
Sábado de 10-14h \n
    .`,
  },
  {
    title: 'CLÁUSULA B. CONDICIONES GENERALES',
    content: `
a. Capacidad legal para la contratación del servicio

Previo a realizar cualquier uso en el LA PLATAFORMA de Sat Nam yoga Estudio®, el Usuario declara bajo protesta de decir verdad que tiene cumplidos al menos 18 años y está en pleno ejercicio de sus derechos y facultades para obligarse en términos de la legislación mexicana. Si aún no cuenta con esa edad, el Usuario deberá realizar el registro a través de su madre, padre o tutor, entendiéndose que este será responsable de las actividades realizadas en LA PLATAFORMA web.

Cualquier uso o acceso realizado por personas menores de 13 años con o sin consentimiento de su madre, padre o tutor queda limitado a no ser sujeto de derechos, por lo cual en caso de que Sat Nam yoga Estudio® identifique que el Usuario es menor a esa edad cancelará en forma inmediata la cuenta de usuario y anulará cualquier documento emitido, como Constancias o Diplomas obtenidos de nuestros Cursos.

En caso de no ser mayor de edad ni contar con la autorización de madre, padre o tutor, cualquier acción realizada en LA PLATAFORMA carece de validez legal y, por ende, Sat Nam yoga Estudio® se reserva el derecho de anular operaciones realizadas y ejercer todos sus derechos en contra de la persona no autorizada bajo los términos previstos en la legislación mexicana.
b. Descripción del servicio y sus contenidos

El servicio

Sat Nam yoga Estudio® ofrece una plataforma educativa a través de la cual se ofrecen diversos servicios, disponibles para los Usuarios con un Plan de Suscripción Activo, los cuales se enlistan a continuación:

  i. Capacitación a través de cursos individuales cuyo formato puede ser online en el sitio web 
  ii. Capacitación en líneas de especialización de competencias en ramas específicas, principalmente bienestar y recreación
  iii. Lectura y descarga de material educativo de apoyo para los cursos y líneas de especialización
  iv. Mentoría personalizada en cursos seleccionados
  v. Videoconferencias programadas en vivo para abordar temas de actualidad y generar la interacción en la comunidad Sat Nam yoga Estudio®

Los servicios que se indican pueden ser modificados o retirados por Sat Nam yoga Estudio® en cualquier momento, siempre con el fin de mejorar nuestra oferta de servicios a nuestros estudiantes.

Contenido

El contenido que ofrece Sat Nam yoga Estudio® en sus cursos y líneas de especialización es generado por expertos en la industria, cada uno en su ramo, a través del cual se transmite conocimiento práctico al Usuario.

Sat Nam yoga Estudio® junto con su equipo de trabajo y sus colaboradores externos realiza todos los esfuerzos necesarios para ofrecer contenido actualizado en LA PLATAFORMA, sin embargo, estamos sujetos a la disponibilidad de tiempo de nuestros expertos para realizar dicho proceso, bajo este entendido es probable que algunos cursos presenten contenido que aún no haya sido actualizado.

El uso del contenido se ofrece bajo una licencia de uso, el detalle al respecto lo puedes consultar en la sección denominada ‘Propiedad Intelectual’.

¿Qué no es Sat Nam yoga Estudio®?

La capacitación ofrecida en Sat Nam yoga Estudio®, no implica:

  i. La impartición personalizada de cursos en línea bajo un modelo de sistema escolarizado, esto es:
      Sat Nam yoga Estudio® no tiene horarios definidos de clases ya que los cursos están disponibles en todo momento a excepción de la escuela física ubicada en el domicilio fiscal, cuyos horarios el Usuario puede encontrar en la sección [horarios escuela]
      Sat Nam yoga Estudio® no ofrece ninguna cobertura de académica curricular oficial
      Sat Nam yoga Estudio® no ofrece una metodología tradicional de enseñanza-aprendizaje que de retroalimentación en tiempo real de conocimientos adquiridos en forma individual al Usuario
  ii. La impartición de cursos escolarizados con validez oficial en México ante la Secretaria de Educación Pública o cualquier otra Institución que tenga la autorización oficial para otorgar reconocimientos con validez oficial.
  iii. La obtención de un título profesional o grado académico con Reconocimiento de Validez Oficial de Estudios en México (RVOE)

c. Descripción de tipo de suscripciones

Sat Nam yoga Estudio® ofrece distintos planes de suscripción, cada uno de ellos proporciona al Usuario servicios diferentes en LA PLATAFORMA, conforme a los siguientes planes:

  Mensual
  Anual

Las características que tienen las suscripciones son distintas conforme al plan contratado por el Usuario, en términos generales, LA PLATAFORMA ofrece lo siguientes servicios:

  Acceso a todos los cursos contenidos en LA PLATAFORMA
  Mentorías semanales en grupo y en vivo
  Clases en Full HD
  Pago por Paypal® hasta en 12 meses sin intereses
  Pago con depósito bancario y otros métodos
  Precio de la suscripción sin incrementos durante su año de vigencia

Algunos de los servicios y contenidos que se ofrecen a través de LA PLATAFORMA son gratuitos, por lo que el Usuario podrá acceder a los mismos con la única condición de realizar su alta como Usuario.

El detalle de qué características tiene cada una de las suscripciones está disponible para su consulta en https://satnamyogaestudio.com/cursos/, es importante que el Usuario revise constantemente la descripción de los planes que Sat Nam yoga Estudio® ofrece para conocer cambios y nuevos beneficios.
d. ALCANCE DEL SERVICIO CON RESPECTO A LA LICENCIA DE USO

Sat Nam yoga Estudio® otorga una licencia de uso a favor del Usuario respecto a los contenidos de los cursos así como para el uso de la plataforma web , ésta licencia es de carácter gratuita, no exclusiva, revocable y no transferible, la cual queda sujeta y limitada al uso personal del Usuario, ya sea para tomar una decisión de adquisición de los servicios ofrecidos a través de LA PLATAFORMA o para compartir en sus redes sociales o a través de otros mecanismos la experiencia obtenida sólo con fines de recomendación.

El alcance de la licencia en mención no autoriza al Usuario a obtener un beneficio económico derivado del uso del contenido proveído ni a realizar cualquier acción tecnológica que permita (ni apoyar los intentos de otros) eludir, aplicar ingeniería inversa, descifrar, descompilar, desmontar u obtener el código fuente de LA PLATAFORMA. Adicionalmente en la sección de Obligaciones del Usuario se establecen otras limitaciones a la licencia otorgada y a las acciones permitidas al Usuario.

    `,
  },
  {
    title: 'CLÁUSULA C. REGLAS DE CONTRATACIÓN EN LA PLATAFORMA',
    content: `
a. ALTA DE CUENTA DE USUARIO

Para el acceso a los servicios generales de Sat Nam yoga Estudio® no será necesario el registro de los visitantes a LA PLATAFORMA, sin embargo, para determinados servicios como inscribirse a cursos o interactuar con otros Usuarios, es necesaria la creación de un perfil de Usuario, para ello deberá realizar el siguiente procedimiento:

  Indicar Nombre de Usuario, Nombre completo, una dirección de correo electrónico y un teléfono en la sección ‘Log in’
  Confirmar la cuenta de correo electrónico señalada dando clic al enlace de validación que le enviaremos vía email
  Una vez confirmado, el usuario deberá seleccionar la forma en que ingresará a la Plataforma, para ello está disponible la posibilidad de ingresar con su cuenta de Twitter®, con su cuenta de Facebook® o con la combinación de su cuenta de correo electrónico y contraseña asignada por el Usuario

Si el usuario continúa con el proceso autenticándose con la asignación de un Usuario y contraseña

  Indicar Nombre de Usuario y/o correo electrónico
  Indicar Contraseña

Una vez que Sat Nam yoga Estudio® haya realizado satisfactoriamente el proceso de registro, le brindará acceso automático al Usuario a LA PLATAFORMA en modalidad de suscripción tipo ‘Free’.

Es importante que cuide el uso de sus datos de autenticación para acceder a LA PLATAFORMA, como son su ‘Usuario’, correo electrónico y contraseña que asigne al realizar su procedimiento de alta, así como las actualizaciones y/o modificaciones posteriores a dichos datos debido a que estos se reconocen en la legislación mexicana como una firma electrónica, por lo cual toda acción realizada en LA PLATAFORMA, le serán atribuidas a la persona relacionada con el Usuario registrado.

Si comparte sus datos o credenciales para que otra persona inicie sesión en su perfil de Usuario, acepta que asumirá toda la responsabilidad de cualquier actividad que sea realizada en su cuenta. Si El Usuario descubre que otra persona está utilizando su cuenta sin su permiso o bien sospecha que se ha producido alguna otra infracción de seguridad, debe ponerse en contacto inmediatamente con Sat Nam yoga Estudio® para que tome las medidas necesarias.
b. PROCESO DE COMPRA

Compra

La creación de la cuenta de Usuario permite consultar la lista de cursos que se ofrecen a través de LA PLATAFORMA, para que el Usuario esté en condiciones de acceder a algunos de los contenidos de LOS SERVICIOS que se ofrecen debe formalizar el proceso de suscripción a alguno de los perfiles de pago que se ofrecen.

Dentro del proceso de compra, en el Apartado “Mi Suscripción” se exhibe al Usuario los tipos de plan de suscripción disponibles, así como las características específicas de cada uno de ellos, el monto total a pagar dependiendo la suscripción y su desglose previo a la formalización de la compra.

Una vez confirmado por el Usuario el plan de suscripción que contratará, se le proporcionan las opciones actuales que Sat Nam yoga Estudio® ofrece para realizar el pago del servicio elegido.

Precios de la suscripción

Los precios que se indican en LA PLATAFORMA están expresados en pesos mexicanos e incluyen el Impuesto al Valor Agregado (IVA), en caso de que el Usuario no solicite su comprobante fiscal, el costo no tendrá disminución alguna en su monto total.

Los precios están sujetos a cambio sin previo aviso (a la alta o baja), en caso que el precio por suscripción se reduzca las suscripciones previamente formalizadas con su pago se mantendrán en la misma cantidad y no quedan sujetas a devolución alguna a favor del usuario.

Pago

Los planes de suscripción que se contratan en Sat Nam yoga Estudio® como el plan Mensual o el plan Anual están sujetos a un plazo mínimo forzoso, por lo cual aún y cuando el costo mostrado en nuestro sitio esté parcializado a un monto mensual, el Usuario al momento de contratar le será cobrado el monto correspondiente al pago anual.

Métodos de pago

Sat Nam yoga Estudio® pone a su disposición los siguientes métodos de pago dependiendo del tipo de suscripción que desee contratar: 
\`\`\`
+---------------------------+--------------+----------------------------------------------------------------------------------------------------------------+ 
| Método de pago            | Plan         | Características                                                                                                | 
+---------------------------+--------------+----------------------------------------------------------------------------------------------------------------+ 
| Tarjeta de crédito/débito | Mensual      | Formulario para datos de tarjeta. Opciones de pago a meses sin intereses disponibles según la institución.     | 
|                           | Anual        |                                                                                                                | 
+---------------------------+--------------+----------------------------------------------------------------------------------------------------------------+ 
| PayPal                    | Mensual      | Redirección a formulario de PayPal. Opciones de pago a meses sin intereses según la institución.               | 
|                           | Anual        |                                                                                                                | 
+---------------------------+--------------+----------------------------------------------------------------------------------------------------------------+ 
| Depósito bancario BANORTE |              |                                                                                                                | 
| Pago en Oxxo              | Mensual      | Instrucciones detalladas para el pago. Fecha límite de pago importante para promociones. Comisiones adicionales| 
| Bitcoins                  | Anual        | pueden aplicar.                                                                                                | 
+---------------------------+--------------+----------------------------------------------------------------------------------------------------------------+ 
\`\`\`

Sat Nam yoga Estudio® se deslinda de cualquier controversia que surja entre El Usuario y el Proveedor de Pago que haya seleccionado. El Usuario queda sujeto a las condiciones contractuales, transaccionales y de seguridad informática establecidas por cada uno de estos proveedores los cuales están disponibles, al momento en que se emiten los presentes Términos y condiciones en los siguientes links:

PayPal - https://www.paypal.com/mx/webapps/mpp/ua/useragreement-full?locale.x=es_MX

Banorte - https://www.banorte.com/wps/wcm/connect/gfb/12fcf44c-2c14-42a1-bb1a-03049085483c/Clausulado_Multiple.pdf?MOD=AJPERES&ContentCache=NONE

Oxxo Pay - Este servicio es provisto por Conekta por lo cual aplican estos términos y condiciones https://conekta.com/legal/tos

Pago con Bitcoin – El usuario deberá consultar los Términos y Condiciones del proveedor de wallet que utilizará para formalizar su pago

Formalización de pago y activación de la cuenta

El plazo de activación de la suscripción varía en función de la forma de pago utilizada:

  Cuando el Usuario realiza su pago con cargo a su tarjeta de crédito o PayPal®, su servicio es activado de inmediato en forma posterior a recibir la confirmación de pago.
  Si el Usuario opta por pagar mediante depósito bancario, deberá enviar al correo electrónico satnamyogajal@gmail.com o a cualquiera de los medios de contacto establecidos en el apartado de Identificación, el comprobante de pago realizado para que Sat Nam yoga Estudio® realice la validación en sus registros y proceda a la activación de los servicios contratados. Sat Nam yoga Estudio® realiza la validación de sus registros bancarios en los días 1 y 15 de cada mes, por lo que, si El Usuario realiza el pago durante días intermedios a ellos, deberá esperar al día natural siguiente a los señalados para que su suscripción sea activada.
  Cuando el Usuario realiza su pago a través de Oxxo o Bitcoins deberá enviar al correo satnamyogajal@gmail.com o a cualquiera de los medios de contacto establecidos en el apartado de Identificación, el comprobante de pago realizado para que Sat Nam yoga Estudio® realice la validación en sus registros y proceda a la activación de los servicios contratados, una vez confirmado el servicio será activado en un plazo no mayor a 48 horas.

En cualquiera de los casos anteriores, cuando Sat Nam yoga Estudio® realice la comprobación del pago, remitirá un correo electrónico de confirmación al correo electrónico proporcionado por el Usuario al momento de su registro. Aunado a lo anterior, en su cuenta de perfil, el Usuario encontrará el comprobante de pago correspondiente, mismo que podrá consultar y descargar las veces que sea necesario.

Facturación

En caso de requerir la emisión de un comprobante fiscal, el Usuario deberá enviar al correo satnamyogajal@gmail.com, o a cualquiera de los medios de contacto establecidos en el apartado de Identificación, su solicitud indicando nombre completo o razón social, su Registro Federal de Contribuyentes (RFC), correo electrónico y comprobante de su pago. La información de facturación que proporcione deberá ser exacta y completa a efecto de emitir correctamente su comprobante fiscal, de lo contrario, no podrá emitirse nuevamente una factura por el mismo pedido. Su comprobante fiscal será emitido en un plazo máximo de 30 días naturales y será enviado vía correo electrónico a la dirección electrónica que El Usuario indique. En caso de cancelación o devolución de su compra, el comprobante fiscal emitido será cancelado inmediatamente.

Actualización de precios

Sat Nam yoga Estudio® se reserva el derecho de realizar la actualización en los precios de los planes de suscripción que ofrece sin necesidad de dar previo aviso al Usuario, el Usuario se compromete a revisar periódicamente los precios vigentes los cuales se exhiben públicamente en LA PLATAFORMA dentro de la sección correspondiente a ‘Suscripciones’.

Durante la vigencia de su suscripción esta no se verá afectada por las actualizaciones al precio de la suscripción, cuando sea aplicable la renovación de su suscripción, el Usuario deberá pagar el nuevo monto señalado en caso de que éste haya sido actualizado.
c. Cancelación del pago automático de la suscripción

La cancelación de la cuenta tiene como finalidad que el Usuario solicite la no renovación automática de su suscripción, eliminando el cargo automático a su tarjeta de crédito o la aplicación del cargo recurrente vía Paypal®.

Para solicitar esta cancelación requerimos que el Usuario remita en un plazo máximo de quince (15) días naturales antes de la finalización de su suscripción vigente, un escrito libre al correo electrónico satnamyogajal@gmail.com con el asunto “Solicitud de cancelación”. Una vez recibida la solicitud, Sat Nam yoga Estudio® realizará la cancelación en veinticuatro (24) horas contadas a partir del día en el que recibió la solicitud, la cancelación efectiva será comunicada vía correo electrónico a la dirección registrada como Usuario en LA PLATAFORMA.

La cancelación de la cuenta no implica que Sat Nam yoga Estudio® realizará la devolución de cualquier tipo de parcialidad al Usuario.
d. Reembolso

Para solicitar el reembolso de su pago requerimos que el Usuario envíe un escrito libre al correo electrónico satnamyogajal@gmail.com con el asunto “Solicitud de Reembolso”, indicando como mínimo su nombre completo, monto pagado y descripción detallada de su solicitud, en un plazo que no deberá exceder los cinco (5) días naturales después de que haya sucedido alguna de las siguientes situaciones:

  Pagos dobles realizados por errores involuntarios del Usuario
  Error en la contratación de alguno de los planes

Una vez recibida su solicitud, el equipo de Sat Nam yoga Estudio® realizará la evaluación de la información enviada, la cual será informada al Usuario en un plazo no mayor a quince (15) días naturales posteriores a la recepción de la solicitud y en caso de ser procedente se solicitará información para llevar a cabo el reembolso (cuenta bancaria y número CLABE). La decisión final será remitida vía correo electrónico al Usuario.

Para el caso de la suscripción a los planes Expert y Expert Duo, el Usuario tiene la opción de solicitar un reembolso parcial del valor de su suscripción anual a través de un escrito libre al correo electrónico satnamyogajal@gmail.com solo durante los primeros treinta (30) días naturales del uso de los servicios que se ofrecen en LA PLATAFORMA. Una vez que Sat Nam yoga Estudio® realice la evaluación y procedencia de su solicitud, informará en un plazo de quince (15) días naturales su decisión final al Usuario y en caso de ser procedente se solicitará información para llevar a cabo el reembolso (cuenta bancaria y número CLABE). La decisión final será remitida vía correo electrónico al Usuario.

Sat Nam yoga Estudio® tiene la facultad de solicitar al Usuario los documentos necesarios para verificar su identidad previamente a realizar el reembolso.

Solo por los motivos señalados Sat Nam yoga Estudio® realizará el reembolso del pago realizado por suscripción a LA PLATAFORMA.
e. Renovación

Derivado de la obligatoriedad de contratar un plazo mínimo en las suscripciones, Sat Nam yoga Estudio® generará con 30 días naturales de anticipación al vencimiento de su suscripción vigente, una orden de compra que le será enviada vía correo electrónico y estará vigente hasta el último día de vigencia de su suscripción, en caso de no realizar el pago de la orden de compra generada, el acceso a LA PLATAFORMA quedará bloqueado hasta que no sea formalizado el pago de renovación de su suscripción.

El Usuario autoriza a Sat Nam yoga Estudio® a realizar la renovación automática de su plan de suscripción cuando este elija la modalidad de pago con tarjeta de crédito o PayPal. Sin embargo, el Usuario en cualquier momento tiene derecho a cancelar las renovaciones automáticas, en este caso tiene que notificar a Sat Nam yoga Estudio® dicha situación al correo satnamyogajal@gmail.com o a cualquiera de los medios de contacto señalados en el apartado de Identificación de los presentes Términos y Condiciones.
f. Suspensión temporal de la cuenta a solicitud del usuario

El Usuario tiene la opción de solicitar que los servicios contratados en LA PLATAFORMA sean pausados por un determinado tiempo de conformidad con las siguientes condiciones:

  El Usuario deberá mediante el correo electrónico que el Usuario designó al realizar su registro en LA PLATAFORMA su solicitud para pausar los servicios al correo satnamyogajal@gmail.com o a cualquiera de los medios de contacto señalados en el apartado de Identificación de los presentes Términos y Condiciones, indicando su nombre completo y nombre de Usuario
  La suspensión sólo procede por máximo 3 meses, al finalizar este periodo los servicios serán reactivados automáticamente
  Una vez recibida su solicitud, Sat Nam yoga Estudio® procederá a pausar los servicios contratados por el Usuario y le notificará la procedencia a través de la dirección de correo electrónico registrada por el Usuario en nuestra plataforma.
  Durante esta pausa el Usuario no podrá hacer uso de nuestros servicios, sin embargo, tiene la opción de solicitar la reactivación de su cuenta en cualquier momento
  El Usuario acepta que al momento de que se realice la reactivación de su servicio contratado se realizará el ajuste de la vigencia de su plan según corresponda

En caso de que el Usuario requiera que el plazo de suspensión sea extendido, deberá enviar un correo electrónico a satnamyogajal@gmail.com para que Sat Nam yoga Estudio® evalúe su solicitud y le notifique la procedencia de ésta.


    `,
  },
  {
    title: 'CLÁUSULA D. GARANTÍA',
    content: `
Si por alguna razón el Usuario no está satisfecho con el servicio de suscripción del mensual o anual, durante el período de 30 días posteriores a la fecha de inicio de sus Servicios, deberá notificarlo a Sat Nam yoga Estudio® a través de correo electrónico satnamyogajal@gmail.com dentro del período señalado señalando los motivos por los cuales no está satisfecho con LOS SERVICIOS y/o LA PLATAFORMA.

Sat Nam yoga Estudio® propondrá soluciones para subsanar los motivos con la finalidad de continuar con el servicio, si a pesar de ser aplicadas las soluciones propuestas por Sat Nam yoga Estudio® el Usuario quiere solicitar la cancelación de su suscripción, deberá solicitarlo enviando un correo electrónico en seguimiento al correo inicial relacionado con su queja.

Cabe mencionar que LA PLATAFORMA y LOS SERVICIOS están disponibles bajo una modalidad 365/24/7, aun así derivado de la naturaleza de nuestros servicios, Sat Nam yoga Estudio® requiere generar ventanas de actualizaciones, modificaciones y reinstalaciones del software requeridas o automáticas en sus bases de datos y servidores, así como realizar la obtención de parches disponibles para, entre otras razones, resolver cuestiones de seguridad, interoperabilidad y/o funcionamiento en forma periódica o cuando sea necesario, sin previo aviso, en estos casos Sat Nam yoga Estudio® realizará todos los esfuerzos tecnológicos posibles para mantener la continuidad y disponibilidad de LA PLATAFORMA y LOS SERVICIOS.

En el caso de proceder la cancelación del servicio por las razones previstas en esta cláusula, Sat Nam yoga Estudio® realizará la devolución proporcional a los meses calendario pendientes por usar dentro del plazo de suscripción anual inicialmente contratado.

    
    `,
  },
  {
    title: 'CLÁUSULA E. PROMOCIONES Y OFERTAS',
    content: `
En cualquier momento Sat Nam yoga Estudio® presenta ofertas y materiales promocionales a través de su plataforma dirigidas a prospectos de Usuarios y Usuarios activos. La participación en este tipo de ofertas y materiales promocionales estarán sujetos a las condiciones y restricciones particulares de cada una, mismas que serán descritas en su momento en cada promoción. El usuario se compromete a revisar y leer los Términos y Condiciones aplicables antes de realizar la contratación de LOS SERVICIOS.
    `,
  },
  {
    title: 'CLÁUSULA F. OBLIGACIONES DE Sat Nam yoga Estudio®',
    content: `
Para brindarle un mejor servicio Sat Nam yoga Estudio® se compromete a brindar un servicio de calidad, en apego a las siguientes condiciones, así como a las demás establecidas en estos Términos y Condiciones:

Mantener un contenido actualizado y fehaciente de los servicios que se ofrecen en LA PLATAFORMA e informar oportunamente al Usuario de cualquier cambio al alcance de los Servicios, Términos y Condiciones y/o Aviso de Privacidad, a través de los medios habilitados para tal efecto y señalados en diversos apartados
En caso de que haya solicitado un reembolso o la cancelación de los servicios, dar seguimiento oportuno a su solicitud de devolución de pago, informarle la procedencia y tiempos de devolución, así como a justificar los motivos por los cuales no llegase a proceder
Otorgar comprobantes de pago, y en su caso, comprobantes fiscales por los servicios que sean contratados a través de LA PLATAFORMA
Dar cabal cumplimiento a nuestras obligaciones en materia de protección de datos personales
Estar disponible para utilizar medidas auxiliares de solución de conflictos en caso de existir una situación particular con los usuarios de LA PLATAFORMA
Proveer soporte técnico con respecto a LOS SERVICIOS que se ofrecen en LA PLATAFORMA, siempre y cuando la solicitud se realice en horario de atención de lunes a viernes de 10 a 13h o a través de los medios de contacto señalados en el apartado de Identificación, en caso de realizarla en días inhábiles o fuera de los horarios indicados de atención se le dará respuesta en un plazo no mayor a 24 horas
Exhibir el monto total a pagar (con impuestos incluidos) por los servicios ofrecidos en LA PLATAFORMA
Registrar y dar seguimiento a los comentarios y/o quejas realizadas por el Usuario


    `,
  },

  {
    title: 'CLÁUSULA G. OBLIGACIONES DEL USUARIO',
    content: `
Para hacer un uso eficiente de nuestros servicios y evitar la cancelación de su acceso a LA PLATAFORMA, el Usuario se obliga a:

Crear una cuenta de usuario haciendo uso de su identidad real proporcionando información verídica, precisa y actualizada
Utilizar su cuenta de usuario en forma responsable, ya que ésta es de carácter personal, única e intransferible. La contraseña que el Usuario asigne está cifrada, esto es, aun cuando queda guardada en los sistemas de información de Sat Nam yoga Estudio®, éste no tiene forma alguna de conocerla, esto implica que la contraseña es de exclusivo conocimiento por parte del Usuario, por ende, todas las acciones realizadas con la cuenta del Usuario le serán atribuibles a éste
Contar con capacidad natural y jurídica para obligarse a las disposiciones contenidas en estos términos y condiciones, considerando principalmente ser mayor de edad, no tener una suspensión de derechos dictada por alguna autoridad judicial y estar en condiciones mentales suficientes que le permitan entender el alcance del contenido de este documento
Antes de realizar el pago de los servicios, verificar que los servicios y cantidades seleccionados, sean correctos y completos
Realizar los pagos correspondientes a los servicios contratados de conformidad con el ciclo de cobranza seleccionado en su orden de contratación
Verificar la fecha de vencimiento de los servicios contratados y atender los recordatorios de renovación de servicios en tiempo y forma, en caso de solicitar la cancelación del servicio se compromete a realizar el proceso indicado en la sección denominada “Cancelación”
Descargar y utilizar el material de apoyo y/o documentos que se encuentran en LA PLATAFORMA únicamente para uso personal y actividades sin fines de lucro
Solicitar su comprobante fiscal dentro del mes en que fue realizada la compra
Ser el único responsable de cualquier daño o perjuicio ocasionado a terceros y/o a Sat Nam yoga Estudio® consecuencia del uso indebido del contenido y/o de LA PLATAFORMA
Cumplir con las demás condiciones establecidas en este documento


    `,
  },
  {
    title: 'CLÁUSULA H. USOS PERMITIDOS Y LIMITACIONES DE USO DE LA PLATAFORMA',
    content: `
Para realizar la suscripción a LA PLATAFORMA y hacer uso del contenido que se ofrecen a través de Sat Nam yoga Estudio® es necesario que conozca los usos permitidos y no permitidos, los cuales, de manera enunciativa más no limitativa, se indican a continuación:
a. Usos Permitidos

  Consultar el catálogo de servicios que se ofrecen a través de LA PLATAFORMA 365/24/7
  Realizar la suscripción a los planes ofrecidos en LA PLATAFORMA
  Solicitar comprobantes de compra y/o facturación a través de los medios señalados
  Consultar y editar su perfil en forma ilimitada
  Utilizar códigos de descuentos de acuerdo con las especificaciones que se establecen
  Consultar y descargar, reproducir o compartir el material al que tiene acceso derivado de los derechos que su suscripción le da, siempre y cuando sea realizado con fines no lucrativos
  Realizar, compartir, publicar contenido en LA PLATAFORMA que no atente contra derechos de propiedad intelectual, protección de datos personales o sea contrario a las buenas costumbres
  Hacer mención o publicación en redes sociales o cualquier otro medio de carácter no comercial sobre los servicios que ofrecemos en LA PLATAFORMA

b. Usos No Permitidos

  Al realizar alguna actividad de evaluación, solicitar que alguien más lo realice en su nombre o utilizar respuestas que le hayan sido compartidas por otros Usuarios
  Acceder a bases de datos o cualquier medio electrónico en donde almacenamos información de carácter privado
  Copiar, distribuir, descargar, mostrar o transmitir cualquier tipo de contenido de este sitio en cualquier forma o a través de cualquier medio ya sean medios electrónicos, mecánicos, electromecánicos, ópticos, audiovisuales, sonoros o cualquier otro medio superviniente sin autorización de Sat Nam yoga Estudio®
  Dar de alta cuentas de usuario con información falsa o con datos personales de los cuales no es el titular
  Utilizar nombres de usuario obscenos, falsos o inmorales
  Realizar abuso, acoso, amenazas o cualquier acción que atente contra otros Usuarios de LA PLATAFORMA
  Publicar, compartir o transmitir contenido de cualquier tipo que sea abusivo, ofensivo, obsceno, difamatorio, o que infrinja el derecho a la imagen de terceros
  Publicar, compartir y/o transmitir contenido que infrinja derechos de autor o derechos de propiedad industrial de terceros
  Publicar o compartir links de descarga de contenidos o que dirijan a sitios web que alojen links o contenidos que infrinjan derechos de autor o derechos de propiedad industrial de terceros
  Vender o transferir su Cuenta de Usuario
  Enviar correos electrónicos con asuntos que no estén relacionados con LA PLATAFORMA o con atención al cliente
  Obtener información de otros usuarios con fines ajenos a los previstos en LA PLATAFORMA
  Realizar el uso de herramientas automatizadas o tecnologías similares con la intención de extraer, obtener o recopilar cualquier información contenida en LA PLATAFORMA
  Realizar envío de correos masivos a los correos electrónicos pertenecientes a www.satnamyogaestudio.com o utilizando contenido de LA PLATAFORMA
  Utilizar contenidos de LA PLATAFORMA para revender servicios de capacitación o cualquier otro tipo de servicio
  Utilizar los formularios de LA PLATAFORMA para el envío de códigos informáticos o scripts (instrucciones informáticas) que llegasen a afectar el correcto funcionamiento del sitio
  Hacer cualquier uso contrario dentro de LA PLATAFORMA conforme a lo establecido en los presentes Términos y Condiciones

La realización de cualquiera de las actividades no permitidas traerá como consecuencia la cancelación inmediata de la suscripción en LA PLATAFORMA y en caso de que la acción realizada esté vinculada con alguna actividad ilegal, se le dará parte de dicha situación a las autoridades correspondientes.

El Usuario será responsable de los daños y perjuicios que ocasione a Sat Nam yoga Estudio® o a terceros, por:

  Cualquier acto realizado con dolo o mala fe que afecte tanto en aspectos morales como económicos a cualquier persona física o persona moral que provoque que sean instauradas acciones legales en contra de Sat Nam yoga Estudio® y/o de sus socios
  La subutilización de los contenidos para replicar servicios de capacitación a terceros como consecuencia de la intención de obtener un lucro
  Realizar el registro de los contenidos de LA PLATAFORMA a su nombre o a nombre de terceros
  El uso no autorizado de los registros marcarios otorgados por la autoridad a favor de SANDRA LOPÉZ GONZALEZ, PERSONA FISICA CON ACTIVIDAD EMPRESARÍAL
  El uso indebido de LA PLATAFORMA aun y cuando ello no conlleve el daño a terceros
  Introducir en nuestra plataforma cualquier elemento que dañe o afecte su funcionamiento en parte o en su totalidad
  Por cualquier acto u omisión imputables a El Usuario que genere algún tipo de afectación a nuestros sistemas de información, así como a la disponibilidad de LA PLATAFORMA
  Incumplimiento a estos Términos y Condiciones

c. Suspensión de la cuenta por infringir los Términos y Condiciones del servicio

Sat Nam yoga Estudio® suspenderá la cuenta del Usuario si detecta que se ha realizado una violación a cualquiera de las disposiciones contenidas en estos Términos y Condiciones por un plazo de 30 días. Adicionalmente a los Usos señalados como no permitidos en el inciso anterior, se consideran causales de suspensión de LOS SERVICIOS, en forma enunciativa más no limitativa, las siguientes situaciones:

  Si se detecta que el Usuario ha proporcionado: datos falsos, datos que no refieren a su identidad, información de terceros en su nombre o ha realizado usurpación de identidad
  Si se detecta que el Usuario publica contenido no permitido o viola temas relacionados con protección de datos personales o propiedad intelectual
  Si se detecta el registro de varias cuentas a nombre de un mismo Usuario
  Si el Usuario remite correos electrónicos con contenido obscenos, difamatorio, agresivo o utiliza un lenguaje inapropiado en las solicitudes que envíe a satnamyogajal@gmail.com
  Cualquier otra acción que viole cualquier norma jurídica nacional y/o internacional

Si el Usuario identifica que su cuenta ha sido suspendida, deberá enviar desde la misma dirección electrónica utilizada para registrarse como usuario, un correo electrónico a team@platzi.com con el asunto: “Cuenta suspendida” a efecto de que le sea informado el motivo de suspensión y conocer, en caso de que sea procedente, cuál es el proceso para realizar la reactivación de su cuenta.

El tiempo que dure suspendida la cuenta del Usuario por las condiciones establecidas en esta cláusula no será repuesto dentro de la vigencia de la suscripción del usuario salvo en los casos en que la suspensión sea consecuencia de un error por parte de Sat Nam yoga Estudio®
    `,
  },
  {
    title: 'CLÁUSULA I. LIMITACIÓN Y EXCLUSIÓN DE RESPONSABILIDAD',
    content: `
a. Respecto a los proveedores

Si el Usuario determina realizar el pago de su suscripción mediante el pago vía depósito bancario, Paypal u Oxxo Pay, en estos casos Sat Nam yoga Estudio® actúa como usuario de dichas plataformas para realizar el procesamiento de cobro de la suscripción, por lo que queda excluido de cualquier responsabilidad por reclamo de daños y perjuicios derivados de:

  Calidad del servicio brindado por los terceros
  Retraso en el procesamiento de pago solicitado fuera de LA PLATAFORMA
  Actos u omisiones imputables a terceros o al personal que empleen para procesamiento de pago

b. Respecto a los sitios web de terceros

Los Sitios Enlazados en LA PLATAFORMA y sus subdominios, tienen solo el propósito de facilitar al Usuario la información de Sitios de terceros afines a los servicios; debe entenderse que dichas menciones no presuponen, ni establecen la existencia de algún tipo de vínculo jurídico y/o comercial, responsabilidad, obligación entre LA PLATAFORMA con los Sitios de terceros y/o los terceros propietarios de dichos Sitios.

La exclusión de responsabilidad de Sat Nam yoga Estudio® con respecto a los Sitios de terceros incluye:

  Cualquier tipo de daño informático en los equipos de cómputo del Usuario al visitar sitios web de terceros desde nuestro sitio
  Ausencia o imprecisión en obligaciones jurídicas el respectivo cumplimiento a la legislación en materia de comercio electrónico, protección de datos personales, seguridad de la información y derechos del consumidor

    `,
  },
  {
    title: 'CLÁUSULA J. RESPECTO A LA SEGURIDAD INFORMÁTICA',
    content: `

En cumplimiento a las previsiones legales establecidas en la Ley Federal del Protección al Consumidor, el Código de Comercio, el Código Civil Federal, el Código Federal de Procedimientos Civiles y la Norma Mexicana NMX-COE-001-SCFI-2018, Comercio Electrónico - Disposiciones a las que se sujetarán aquellas personas que ofrezcan, comercialicen o vendan bienes, productos o servicios, y la Ley Federal de Protección de Datos Personales en Posesión de los Particulares así como su regulación secundaria, LA PLATAFORMA tiene incorporadas medidas de seguridad informática orientadas a proteger la información que comparte en sus formularios, foros, chats en línea, interacción en los cursos así como en el proceso de compra que el Usuario realiza.

Aun así, como consecuencia de la innovación tecnológica, no se garantiza que el contenido de este sitio y/o los enlaces a sitios web de terceros estén libres de interrupciones, errores, virus o cualquier otro componente nocivo.

El Usuario desde el momento de aceptación de estos Términos y Condiciones de Uso y del Servicio está de acuerdo en que Sat Nam yoga Estudio® no es responsable directo ni indirecto de cualquier daño o perjuicio material o de carácter informático que puedan sufrir los dispositivos electrónicos y/o informáticos utilizados por el Usuario y que se deriven de fallas o configuraciones incorrectas en nuestra plataforma, por virus, malware, ransomware o cualquier otro tipo de tecnología superviniente que llegaré a afectar el equipo del Usuario como consecuencia del uso del sitio o por la descarga de datos, archivos, imágenes y/o contenidos audiovisuales. El Usuario exime de cualquier responsabilidad a Sat Nam yoga Estudio® y renuncia a exigir el pago por perjuicios resultantes de dificultades técnicas o fallas en LA PLATAFORMA.

    `,
  },
  {
    title: 'CLÁUSULA K. PROPIEDAD INTELECTUAL',
    content: `

El contenido que se provee en LA PLATAFORMA como imágenes, iconos, diseños, dibujos, fotografías, audios, vídeos, animaciones multimedia, material didáctico, textos, manuales, el código fuente y código objeto del sitio web y de la aplicación móvil están protegidas por las legislaciones nacionales e internacionales en materia de propiedad intelectual (propiedad industrial y/o derechos de autor). SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL es titular de todos los derechos de propiedad industrial y/o derechos de autor relativos al diseño, funciones y/u operaciones que integran LA PLATAFORMA y sus subdominios, por lo que la licencia de uso otorgada al Usuario no constituye una licencia para utilizar el nombre, contenido, diseños, signos distintivos, marcas y/o cualquier otro contenido. Para efecto de determinar usos autorizados, así como restricciones, definimos a continuación lo siguiente:
a. Marcas

SAT NAM YOGA ESTUDIO son signos distintivos reconocidos por el Instituto Mexicano de la Propiedad Industrial a favor de SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL, el uso de ambos en LA PLATAFORMA y campañas publicitarias es de uso exclusivo de sat nam yoga estudio ®, su inclusión en LOS SERVICIOS no otorga una licencia de uso o cesión de derechos a favor de los Usuarios.
b. Derechos De Autor

Los contenidos en formato de textos, imágenes, audios, contenidos audiovisuales, código fuente y/o código objeto tienen derechos reservados a favor de SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL, esto faculta a establecer limitaciones al uso de estos, los cuales consisten en lo siguiente:
Usos permitidos    Usos no permitidos
Reproducción parcial para fines de estudio no lucrativos
Compartir parcialmente vía redes sociales u otros medios electrónicos sólo con fines de recomendar el sitio     Adjudicación de autoría
Inserción o reproducción de textos parciales o completos en otros sitios web (fijación digital)
Traducción
Adaptación
Generación de Obras derivadas sin autorización del titular

Las marcas y/o signos distintivos de las cuales SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL no sea titular, pertenecen a sus correspondientes titulares y se presentan porque existe un contrato de publicidad entre ellos y Sat Nam yoga Estudio® o porque son proveedores de algún servicio a través de LA PLATAFORMA.

El uso de material protegido por la legislación en materia de derechos de autor en las publicaciones que realice el Usuario quedará sujeto al proceso de Aviso y Contra Aviso al cual estamos obligados en apego a las disposiciones establecidas en la Ley Federal del Derecho de Autor. Si un Usuario o alguien externo tiene conocimiento de violaciones en materia de derechos de autor deberá hacerlo de conocimiento de Sat Nam yoga Estudio® vía correo electrónico al email team@platzi.com

Si Sat Nam yoga Estudio® identifica que el Usuario está publicando links para realizar la descarga directa de obras protegidas por la Ley Federal del Derecho de Autor, dichos links serán eliminados y el perfil del Usuario será suspendido por 30 días sin responsabilidad alguna para Sat Nam yoga Estudio® ante cualquier reclamación por la falta de prestación del servicio.

    `,
  },
  {
    title: 'CLÁUSULA L. PRIVACIDAD',
    content: `

a. Respecto a datos personales sujetos a tratamiento por Sat Nam yoga Estudio®

En cumplimiento con lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su regulación secundaria, hacemos de su conocimiento que Sat Nam yoga Estudio® realiza el tratamiento de sus datos personales bajo estándares estrictos en cumplimiento a los principios de protección de datos personales, derechos y obligaciones establecidos en la ley señalada. La contratación y prestación de nuestros servicios se rige por el Aviso de Privacidad Integral que está a su disposición en el apartado de Privacidad de LA PLATAFORMA.
b. Respecto a datos personales sujetos a tratamiento por terceros

Los sitios web que son señalados por nuestros Usuarios en su cuenta de perfil y que son compartidos con otros Usuarios registrados tienen sus propias prácticas de protección de datos personales y sus correspondientes Avisos de Privacidad, Sat Nam yoga Estudio® no tiene responsabilidad solidaria ni objetiva con las acciones que sus Usuarios realizan en esos sitios web señalados, en caso de tener algún conflicto con ellos el Usuario deberá consultar en cada uno de esos sitios web, los Avisos de Privacidad correspondientes y sus propios procesos implementados para realizar la protección de datos personales dentro de sus servicios.
c. Respecto a su información financiera

Sat Nam yoga Estudio® utiliza sistemas de procesamiento de pago proporcionados por terceros, es importante que realice la consulta de su Aviso de Privacidad en:

  PayPal - https://www.paypal.com/mx/webapps/mpp/ua/privacy-full
  Banorte - https://www.banorte.com/wps/portal/gfb/Home/banorte-te-informa/aviso-de-privacidad/
  Oxxo Pay - Conekta - https://conekta.com/legal/privacy
  Stripe - https://stripe.com/en-mx/privacy
    `,
  },
  {
    title: 'CLÁUSULA M. INTERPRETACIÓN Y JURISDICCIÓN APLICABLE',
    content: `

Los encabezados contenidos en estos Términos del Servicio y Condiciones de LA PLATAFORMA tienen solamente la finalidad de que sean más claras las obligaciones que se contraen, por lo que de ninguna manera podrán considerarse como una limitación al alcance de cualquiera de los términos o estipulaciones de este.

Para la interpretación, ejecución y cumplimiento de estos Términos y Condiciones, las partes interesadas se someterán a lo establecido por el marco legal de la Ciudad de México, México, renunciando a la jurisdicción del domicilio actual o futuro que pudieren tener, por lo que cualquier controversia que llegase a presentarse con SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL será primordialmente resuelta entre las partes. En caso de que no se acuerde una solución entre las partes, el asunto en disputa deberá ser resuelto ante la Procuraduría Federal de Protección al Consumidor (Profeco) quien será la autoridad competente para conocer y resolver la controversia; solo en última instancia el Usuario y SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL acudirán a los Tribunales Competentes en la Ciudad de México, México.

En lo que respecta a controversias que deriven del contenido que alguno de los Usuarios exhiba, envíe o almacene, en caso que estos sean constitutivos de violaciones a disposiciones legales relacionadas con Protección de Datos Personales, Marcas Registradas, Derechos de Autor, Derecho a la imagen, Ciberdelitos, entre otros, deberán ser reportados al correo team@platzi.com para ser analizados por Sat Nam yoga Estudio® quien le enviará una respuesta de la resolución aplicable vía correo electrónico, en su caso, le requeriremos mayor información para atender su denuncia.

Cabe hacer mención que todas sus reclamaciones enviadas en relación con estos asuntos serán resueltas por Sat Nam yoga Estudio®, situación que le señalaremos en su momento invitándole a iniciar los procedimientos legales correspondientes contra los terceros que estén realizando violaciones en las materias señaladas en esta cláusula, esto derivado de que el servicio que ofrecemos no tiene relación directa ni responsabilidad alguna respecto a las acciones que nuestros Usuarios realizan.

    `,
  },
  {
    title: 'CLÁUSULA N. MODIFICACIONES Y/O ACTUALIZACIONES',
    content: `
Estos Términos y Condiciones están sujetos a cambios derivados de modificaciones y/o actualizaciones de la legislación mexicana o bien por cambio a manera de operar de Sat Nam yoga Estudio®, cuando sucedan cambios en el contenido de esta sección le daremos aviso vía correo electrónico. Adicional a lo anterior, le recomendamos que consulte constantemente esta sección en LA PLATAFORMA, así como la sección de Usuario para conocer los cambios que se realicen en la forma en que operamos, ya que, la aceptación de las modificaciones es condicionante para continuar con el uso de los servicios proveídos en este sitio.
    `,
  },
  // Add more sections as needed
]

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  const renderContentWithBreaks = (content) => {
    return content.split('\n').reduce((acc, text, index, array) => {
      // Separar la tabla ASCII del resto del contenido
      if (text.trim().startsWith('+---')) {
        // Suponiendo que todas las líneas de la tabla comienzan así
        acc.push(<pre key={index}>{text}</pre>)
      } else {
        acc.push(
          <React.Fragment key={index}>
            {text}
            {index !== array.length - 1 && <br />}
          </React.Fragment>
        )
      }
      return acc
    }, [])
  }

  return (
    <div className='termsOfService'>
      <h1>Términos de Servicio de Sat Nam Yoga Estudio.com</h1>
      <h4>
        LOS TÉRMINOS Y CONDICIONES DE USO Y DEL SERVICIO APLICABLES A LOS
        ESTADOS UNIDOS MEXICANOS, QUE DETERMINAN LA FORMA EN QUE SE REALIZA EL
        USO DE LA PLATAFORMA DE CURSOS EN LÍNEA QUE OFRECE SANDRA LOPEZ
        GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL LOCALIZADA EN EL
        SITIO WEB &quot;WWW.SATNAMYOGAESTUDIO®.COM&quot; ACUERDO LEGAL
      </h4>
      {termsSections.map((section, index) => (
        <div key={index} className='termsSection'>
          <h3 onClick={() => toggleSection(index)}>{section.title}</h3>
          {expandedSection === index && (
            <pre>{renderContentWithBreaks(section.content)}</pre>
          )}
        </div>
      ))}
      <h4>
        ATENTAMENTE, SANDRA LOPEZ GONZALEZ, PERSONA FÍSICA CON ACTIVIDAD
        EMPRESARIAL IDENTIFICADO COMO SATNAMYOGAESTUDIO® CON DOMICILIO EN CALLE
        PLATEROS 2378, COLONIA JARDINES DEL COUNTRY, CÓDIGO POSTAL 44210,
        GUADALAJARA, JALISCO, MÉXICO Y MEDIOS DE CONTACTO DISPONIBLES EN LA
        SECCIÓN DE IDENTIFICACIÓN EN LOS PRESENTES TÉRMINOS Y CONDICIONES. FECHA
        DE ÚLTIMA ACTUALIZACIÓN: 23/02/2024
      </h4>
    </div>
  )
}

export default TermsOfService
