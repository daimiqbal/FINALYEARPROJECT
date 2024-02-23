import React from 'react';
import Image from "next/image";
import { useState, useEffect } from 'react';
import axios from 'axios';
import heroImg from '../public/images/frontimg.jpeg';
import safe from '../public/images/safe.png';
import download from '../public/images/download.jpg';
import worldwide from '../public/images/worldwide.jpg';
import trainingImg from '../public/images/ddimg.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Register from './register';
const Index = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
      AOS.init();
  }, []);
  return (
    <>
     <section id='home' >
      <div className='container' >
        <div className='hero_wrapper'>
          <div className='hero_content'>
            <h2
              
              className='section_title'
              data-aos='fade-right'
              data-aos-duration='1500'
            >
              Live the <span className='highlights'>Tour</span>{' '}
              Experience
            </h2>
            <p data-aos='fade-up' data-aos-delay='100' data-aos-duration='1800'>
            Travel Ease is a comprehensive travel agency that brings together various tour operators<br/>
             and travel providers to offer a one-stop-shop for all your travel needs. 
             <br/>With a vast network of partners, Travel Ease offers a wide range of packages<br/>
              including flights, hotels, tours, and activities, all conveniently listed on their website. <br/>
            </p>

            <div
              className='hero_btns'
              data-aos='fade-up'
              data-aos-delay='200'
              data-aos-duration='2000'
            >
              <button className='register_btn'><a href='/register'>Get Started </a></button>
            </div>
          </div>

          {/* ======= hero img ====== */}
          <div className='hero_img' data-aos='fade-up' data-aos-delay='100'>
            <div className='hero_img-wrapper'>
              <div className='box-01'>
                <div className='box-2'>
                  <div className='box-3'>
                    <div className='box_img'>
                      <Image src={heroImg} alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id='schedule'>
      <div className='container exercise_container'>
        <div className='exercise_top'>
          <h2 className='section_title'>
            Live the <span className='highlights'>Life</span>
          </h2>

          <p>
          Travel broadens our horizons and opens our minds to new cultures, experiences, and perspectives.<br />  It's an opportunity to explore
           the world and create unforgettable memories that last a lifetime.
          </p>
        </div>

        {/* =====  exercise list ===== */}
        <div className='exercise_wrapper'>
          <div
            className='exercise_item'
            data-aos='zoom-in'
            data-aos-duration='1500'
          >
            <span className='exercise_icon'>
              <Image src={safe} alt='' />
            </span>

            <div className='exercise_content'>
              <h4>Safety and Security:</h4>
              <p>
              As a tour company, We prioritize the safety and security of my clients.
               We take measures to ensure that all activities and accommodations are safe and secure,
                and We have contingency plans in place in case of emergencies.
              </p>
            </div>
          </div>

          <div
            className='exercise_item'
            data-aos='zoom-in'
            data-aos-duration='1500'
          >
            <span className='exercise_icon'>
              <Image src={download} alt='' />
            </span>

            <div className='exercise_content'>
              <h4>Cost savings:</h4>
              <p>
              As a tour company, We have established relationships with hotels,
               transportation companies, and activity providers, which allows me to negotiate better rates and pass the savings on to you.
              </p>
            </div>
          </div>

          <div
            className='exercise_item'
            data-aos='zoom-in'
            data-aos-duration='1500'
          >
            <span className='exercise_icon'>
              <Image src={worldwide} alt='' />
            </span>

            <div className='exercise_content'>
              <h4>Cultural immersion</h4>
              <p>
              As a tour company, I can provide opportunities for cultural immersion and authentic experiences
               that might be difficult to arrange on your own. 
              This can include visits to local markets, cultural events, and interactions with local people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id='classes'>
      <div className='container'>
        <div className='start_wrapper'>
          <div className='start_img'>
            <Image
              src={trainingImg}
              alt=''
              data-aos='fade-left'
              data-aos-duration='1500'
            />
          </div>

          <div
            className='start_content'
            data-aos='fade-right'
            data-aos-duration='1500'
          >
            <h2 className='section_title'>
              Ready to<span className='highlights'> Travel?</span> 
            </h2>
            <p>
            Welcome to Travel Ease, your ultimate destination for all things travel-related!
             We're excited to take you on a journey through some of the most beautiful and awe-inspiring 
             destinations in the world. Whether you're looking to explore new cultures, relax on a beach,
             or immerse yourself in the natural beauty of the great outdoors, Travel Ease has got you covered.
            </p>
            <button className='register_btn'><a href='/register'>Get Started </a></button>
          </div>
        </div>
      </div>
    </section>
    <section id='pricing-plan'>
      <div className='container'>
        <div className='pricing_top'>
          <h2 className='section_title'>
            <span className='highlights'>Tour packages</span>
          </h2>
          <p>
           At Travel Ease, we offer a wide variety of tour packages to suit every traveler's needs and preferences.<br/>
           From cultural tours to adventure packages, we have something for everyone.
            Our tour packages are carefully curated to ensure that you have the best possible experience at every destination.
          </p>
        </div>
      </div>
    </section>

    </>
  );
};

export default Index;
