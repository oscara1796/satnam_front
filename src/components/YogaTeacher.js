import React from 'react';
import './YogaTeacher.css'; // Import CSS for custom styles and animations
import teacher_img from '../assets/img/teacher.jpg' // Assuming the uploaded logo image is in the project folder

const YogaTeacher = () => {
    return (
        <div className="yoga-teacher-container">
            
            <section className="bio-section">
                <h1 className="title">Soy Sandy Gururattan</h1>
                <h2 className="subtitle">Yoga Kundalini - Facilitadora de la VIDA</h2>
                <div className="bio-content">
                    <div className="bio-text">
                        <p>Soy activadora y catalizadora para apoyarte en tu camino de transformación.</p>
                        <p>Hola, soy <strong>SANDY GURURATTAN</strong>, incansable buscadora de bienestar, salud y paz en mí. Madre de 3 jóvenes, esposa y transformadora de vidas, eterna estudiante.</p>
                        <p>Mi transformación comenzó cuando mi tercer hijo nació. Pasé por una depresión y ansiedad muy fuertes... Después de un año, comencé a practicar yoga, y al año, todos mis problemas de salud se fueron.</p>
                        <p>En el 2003 me certifiqué como maestra de Yoga Kundalini por KRI. Fundé <strong>Sat Nam Yoga Estudio</strong>, donde enseño y apoyo a otras personas en su camino de transformación y autoconocimiento.</p>
                        <p>Creo que en esta vida venimos a realizarnos y a ser felices. Así es que toma acción. Te abrazo, <em>Sandy Gururattan</em></p>
                    </div>
                    <div className="bio-image">
                        <img src={teacher_img} alt="Sandy Gururattan" className="sandy-image" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default YogaTeacher;
