import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarHeart,
  Camera,
  Clock3,
  Heart,
  Music2,
  Sparkles,
  Stars,
} from 'lucide-react';
import './styles.css';

const anniversaryMonth = 5;
const anniversaryDay = 23;

const dates = [
  {
    label: 'The day we met',
    value: 'May 7, 2025',
    note: 'The first spark, the first page, the beginning I keep replaying.',
  },
  {
    label: 'Our anniversary',
    value: 'June 23, 2025',
    note: 'The day my favorite word became us.',
  },
];

const montagePhotos = [
  { src: '/montage/photo-01.jpg', caption: 'The soft, silly, close-up kind of love I never want to lose.' },
  { src: '/montage/photo-02.jpg', caption: 'Us under the lights, looking like a memory I already miss.' },
  { src: '/montage/photo-03.jpg', caption: 'Another version of the same perfect little night.' },
  { src: '/montage/photo-04.jpg', caption: 'Dressed up with my favorite person beside me.' },
  { src: '/montage/photo-05.jpg', caption: 'Your birthday, my favorite reason to celebrate.' },
  { src: '/montage/photo-06.jpg', caption: 'Standing next to you and feeling lucky all over again.' },
  { src: '/montage/photo-07.jpg', caption: 'A mirror picture that somehow says everything.' },
  { src: '/montage/photo-08.jpg', caption: 'One of those nights where I just felt happy to be yours.' },
  { src: '/montage/photo-09.jpg', caption: 'Lights, cold air, and your face next to mine.' },
  { src: '/montage/photo-10.jpg', caption: 'A little piece of us that makes me smile.' },
  { src: '/montage/photo-11.jpg', caption: 'A memory I would choose again.' },
  { src: '/montage/photo-12.jpg', caption: 'The kind of picture that feels like home.' },
  { src: '/montage/photo-13.jpg', caption: 'You, me, and another reason to remember this forever.' },
  { src: '/montage/photo-14.jpg', caption: 'My favorite girl in another favorite moment.' },
  { src: '/montage/photo-15.jpg', caption: 'Proof that even ordinary days with you feel special.' },
  { src: '/montage/photo-16.jpg', caption: 'A tiny chapter from the story I love most.' },
  { src: '/montage/photo-17.jpg', caption: 'Every photo of us becomes a place I want to go back to.' },
  { src: '/montage/photo-18.jpg', caption: 'The smile, the moment, the feeling of us.' },
  { src: '/montage/photo-19.jpg', caption: 'Another reminder that loving you is my easiest yes.' },
  { src: '/montage/photo-20.jpg', caption: 'A memory tucked safely into my heart.' },
  { src: '/montage/photo-21.jpg', caption: 'One more reason I love our beginning, middle, and forever.' },
  { src: '/montage/photo-22.jpg', caption: 'Nethra and Pratham, always my favorite picture.' },
];

const storyCards = [
  {
    icon: Sparkles,
    eyebrow: 'The Beginning',
    title: 'I remember when liking you stopped feeling small.',
    body:
      'At first it was just little things. I would notice when you walked into a room, try to see if you were laughing, and look for any excuse to be around you a little longer. I did not have some perfect speech ready. I just knew I was happier when you were there.',
  },
  {
    icon: Music2,
    eyebrow: 'The Story Of Us',
    title: 'The beginning matters to me more than I probably say.',
    body:
      'I could never forget what it felt like to start falling for you. The nervousness, the smiling for no reason, the way one small moment could stay in my head for the rest of the day. That was real to me then, and it is still real to me now.',
  },
  {
    icon: Heart,
    eyebrow: 'What You Are To Me',
    title: 'You became the person I want to tell everything to.',
    body:
      'You are the first person I want when something good happens, and honestly, the person I want when the day feels heavy too. You make me feel understood in a way I did not know I needed. You are my girlfriend, my best friend, and my favorite part of my normal days.',
  },
  {
    icon: Stars,
    eyebrow: 'What I Hope For',
    title: 'I want a future that still feels like us.',
    body:
      'I want more pictures, more late-night talks, more dumb jokes, more birthdays, more anniversaries, and more quiet moments where nothing huge is happening but I still feel lucky because I am next to you. I do not need perfect. I just want us, choosing each other again and again.',
  },
];

const aboutStats = [
  ['Favorite Color', 'Purple, obviously'],
  ['Made By', 'Pratham Shah'],
  ['Made For', 'Nethra Kartheeswaran'],
  ['Next Anniversary', 'June 23'],
];

function getNextAnniversary(now = new Date()) {
  let target = new Date(now.getFullYear(), anniversaryMonth, anniversaryDay);

  if (target <= now) {
    target = new Date(now.getFullYear() + 1, anniversaryMonth, anniversaryDay);
  }

  return target;
}

function getCountdown() {
  const now = new Date();
  const target = getNextAnniversary(now);
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  return {
    target,
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / hour),
    minutes: Math.floor((diff % hour) / minute),
    seconds: Math.floor((diff % minute) / 1000),
  };
}

function WelcomeNote({ onEnter }) {
  return (
    <div className="welcome">
      <div className="welcomePhoto" />
      <section className="welcomePanel" aria-label="Opening note">
        <p>Hello Nethra</p>
        <h1>I love you so much.</h1>
        <span>
          I just wanted to make something for us. A tiny place for our pictures,
          our beginning, our anniversary, and all the little reasons I am so
          happy that it is you.
        </span>
        <button type="button" onClick={onEnter}>
          Open Our Story
        </button>
      </section>
    </div>
  );
}

function SiteNav({ page, setPage }) {
  const goTo = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="nav">
      <button className="brand" type="button" onClick={() => goTo('home')}>
        <Heart size={18} fill="currentColor" />
        Nethra & Pratham
      </button>
      <div className="navLinks">
        <button className={page === 'home' ? 'active' : ''} type="button" onClick={() => goTo('home')}>Home</button>
        <button className={page === 'about' ? 'active' : ''} type="button" onClick={() => goTo('about')}>About Us</button>
        <button className={page === 'extras' ? 'active' : ''} type="button" onClick={() => goTo('extras')}>Extras</button>
        <button className={page === 'letter' ? 'active' : ''} type="button" onClick={() => goTo('letter')}>Letter</button>
      </div>
    </nav>
  );
}

function Countdown() {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="countdown" aria-label="Countdown to next anniversary">
      <div className="countdownHeading">
        <Clock3 size={22} />
        <div>
          <p>Next Anniversary</p>
          <h2>
            June 23, {countdown.target.getFullYear()}
          </h2>
        </div>
      </div>
      <div className="countdownGrid">
        <span><strong>{countdown.days}</strong>days</span>
        <span><strong>{countdown.hours}</strong>hours</span>
        <span><strong>{countdown.minutes}</strong>minutes</span>
        <span><strong>{countdown.seconds}</strong>seconds</span>
      </div>
    </section>
  );
}

function Hero({ setPage }) {
  return (
    <header className="hero">
      <div className="heroGrid">
        <section className="heroCopyBlock">
          <p className="kicker">A little universe made by Pratham Shah</p>
          <h1>For Nethra Kartheeswaran</h1>
          <span>
            This is our little corner of the internet: the photos, the dates,
            the beginning, the memories, and the promise that I will keep loving
            you loudly, softly, and intentionally.
          </span>
          <div className="heroActions">
            <a href="#gallery">See Our Photos</a>
            <button type="button" onClick={() => setPage('about')}>About Us</button>
          </div>
        </section>
      </div>
    </header>
  );
}

function DatesStrip() {
  return (
    <section className="datesStrip" aria-label="Important dates">
      {dates.map((date) => (
        <article className="dateItem" key={date.label}>
          <CalendarHeart size={24} />
          <div>
            <p>{date.label}</p>
            <h2>{date.value}</h2>
            <span>{date.note}</span>
          </div>
        </article>
      ))}
    </section>
  );
}

function PhotoMontage() {
  const doubledItems = useMemo(() => [...montagePhotos, ...montagePhotos], []);

  return (
    <section className="montageSection" id="gallery">
      <div className="sectionHeading">
        <Camera size={26} />
        <div>
          <p>Home</p>
          <h2>Our pictures, moving slowly like a little movie of us.</h2>
        </div>
      </div>
      <div className="photoRail" aria-label="Relationship photo montage">
        <div className="photoTrack">
          {doubledItems.map((photo, index) => (
            <figure className="photoFrame" key={`${photo.src}-${index}`}>
              <img src={photo.src} alt={photo.caption} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="aboutSection">
      <div className="aboutIntro">
        <p>About Us</p>
        <h2>Nethra and Pratham, written in purple.</h2>
        <span>
          We met on May 7, 2025. We became us on June 23, 2025. Somewhere in
          that stretch of time, you went from someone I liked to the person I
          could not stop thinking about. This page is for the memories, the
          inside feelings, and the beginning I never want you to think I forgot.
        </span>
      </div>
      <div className="aboutStats">
        {aboutStats.map(([label, value]) => (
          <article key={label}>
            <p>{label}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function StoryOfUs() {
  return (
    <section className="storySection" id="story">
      <div className="sectionHeading">
        <Sparkles size={26} />
        <div>
          <p>Story Of Us</p>
          <h2>The part where I try to explain how much I remember.</h2>
        </div>
      </div>
      <div className="storyGrid">
        {storyCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="storyBlock" key={card.title}>
              <div className="storyIcon">
                <Icon size={24} />
              </div>
              <div>
                <p>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <span>{card.body}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Letter() {
  return (
    <section className="letter">
      <div className="letterIcon">
        <Heart size={28} fill="currentColor" />
      </div>
      <p>Dear Nethra,</p>
      <h2>I hope this feels like a small piece of my heart on a screen.</h2>
      <span>
        I wanted to make this because sometimes I feel like words disappear too
        quickly when I say them out loud. I love you so much, and I do not ever
        want you to feel like the beginning of us was something small to me. It
        was not. I remember the nervousness, the overthinking, the little moments
        where I hoped you would look at me, and the way I would smile to myself
        after even the smallest interaction with you.
        <br />
        <br />
        You have become such a big part of my life in the most natural way. You
        are the person I want to talk to, the person I want to make proud, the
        person I want to protect, annoy, laugh with, grow with, and come back to.
        I love how beautiful you are, but I love even more how much you feel like
        home to me. I love your laugh, your heart, your voice, your little looks,
        and the way being around you can change my whole mood.
        <br />
        <br />
        Thank you for loving me, for being patient with me, and for making my
        life feel brighter than it did before you. I am so grateful that I get
        to call you my girlfriend and my best friend. I hope this little website
        reminds you that I notice us, I remember us, and I am so serious about
        loving you through every chapter we get.
      </span>
      <strong>Forever yours, Pratham</strong>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <main>
        <DatesStrip />
        <div className="countdownWrap">
          <Countdown />
        </div>
        <PhotoMontage />
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <main className="pageMain">
      <section className="pageHero">
        <p>About Us</p>
        <h1>The beginning, the memories, and the little things I still think about.</h1>
      </section>
      <AboutUs />
      <StoryOfUs />
    </main>
  );
}

function LetterPage() {
  return (
    <main className="pageMain">
      <Letter />
    </main>
  );
}

function ExtrasPage() {
  return (
    <main className="pageMain">
      <section className="pageHero">
        <p>Extras</p>
        <h1>A couple more little things I made for us.</h1>
      </section>
      <section className="extrasGrid" aria-label="Extra memories and games">
        <article className="extraCard">
          <div className="storyIcon">
            <Stars size={24} />
          </div>
          <p>Jeopardy</p>
          <h2>Our own little game.</h2>
          <span>
            A cute little extra for us to play, laugh at, and probably get way
            too competitive about.
          </span>
          <a href="https://jeopardylabs.com/play/nxp" target="_blank" rel="noreferrer">
            Open Jeopardy
          </a>
        </article>
        <article className="extraCard">
          <div className="storyIcon">
            <Sparkles size={24} />
          </div>
          <p>Newspaper Post</p>
          <h2>A tiny keepsake.</h2>
          <span>
            I added this here too, so it can live with the rest of our little
            website instead of being lost in files somewhere.
          </span>
          <a href="/extras/newspaper-post.pdf" target="_blank" rel="noreferrer">
            Open PDF
          </a>
        </article>
      </section>
    </main>
  );
}

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [page, setPage] = useState('home');

  return (
    <>
      {!hasEntered && <WelcomeNote onEnter={() => setHasEntered(true)} />}
      <SiteNav page={page} setPage={setPage} />
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'about' && <AboutPage />}
      {page === 'extras' && <ExtrasPage />}
      {page === 'letter' && <LetterPage />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
