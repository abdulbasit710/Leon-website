import React, { useEffect, useState } from 'react';
import './styles.css';
import './loader.css';
import { InnerPage } from './InnerPages.jsx';

const A = '/assets/';

function Reveal({ children, className = '', id, ...props }) {
  return <section id={id} className={`${className} reveal`} {...props}>{children}</section>;
}

function BookCover({ className = '', alt = 'The Story of Lord Leon and the Gaffer Above book cover' }) {
  return <img className={`real-book-cover ${className}`} src={`${A}book-cover.webp`} alt={alt} loading="lazy" />;
}

function Brand({ footer = false }) {
  return <a className={`brand brand-image ${footer ? 'footer-brand' : ''}`} href="/" aria-label="Leon Parrish home">
    <img src={`${A}leon-parrish-logo.png`} alt="Leon Parrish author logo" />
  </a>;
}

function LogoLoader() {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const exitTimer = window.setTimeout(() => setPhase('exit'), reducedMotion ? 100 : 1200);
    const finishTimer = window.setTimeout(() => setPhase('done'), reducedMotion ? 130 : 1720);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (phase === 'done') document.body.style.overflow = '';
  }, [phase]);

  if (phase === 'done') return null;
  return <div className={`logo-loader ${phase === 'exit' ? 'logo-loader-exit' : ''}`} role="status" aria-label="Loading Leon Parrish website">
    <div className="loader-frame" aria-hidden="true"><span /><span /><span /><span /></div>
    <div className="loader-center">
      <div className="loader-emblem"><img src={`${A}leon-parrish-logo.png`} alt="Leon Parrish" /></div>
      <div className="loader-rule" aria-hidden="true"><span /></div>
      <p>A LIFE WELL LIVED. A STORY WORTH TELLING.</p>
    </div>
    <div className="loader-footer"><span>HUNSLET, LEEDS</span><span>EST. 1946</span></div>
  </div>;
}

export default function App() {
  const page = ['about', 'books', 'contact'].includes(window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : 'home';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView());
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <>
    <LogoLoader />
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    <div className="topline"><span>Hunslet, Leeds &nbsp; · &nbsp; A story that began in 1946</span><span>From Hunslet, with love</span></div>
    <header className="site-header" id="home">
      <div className="header-inner">
        <div className="header-brand-row">
          <div className="header-social" aria-label="Social profiles">
            <span className="social-label">FOLLOW THE STORY</span>
            <a className="social-icon" href="https://www.facebook.com/author.leon.parrish/" target="_blank" rel="noopener noreferrer" title="Leon Parrish on Facebook" aria-label="Leon Parrish on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5H17V3.2c-.3 0-1.4-.2-2.6-.2-2.7 0-4.5 1.6-4.5 4.6v2H7v3.2h2.9V21h3.8Z"/></svg></a>
            <a className="social-icon" href="https://www.instagram.com/author_leonparrish/" target="_blank" rel="noopener noreferrer" title="Leon Parrish on Instagram" aria-label="Leon Parrish on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle className="solid" cx="17.5" cy="6.5" r="1"/></svg></a>
            <a className="social-icon social-icon-threads" href="https://www.threads.com/@lmdparrish" target="_blank" rel="noopener noreferrer" title="Leon Parrish on Threads" aria-label="Leon Parrish on Threads"><span aria-hidden="true">@</span></a>
          </div>
          <Brand />
          <span className="header-aside header-aside-right">Yorkshire born<br />A story worth telling</span>
        </div>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'}><span /><span /><span /></button>
        <nav id="main-nav" className={`main-nav ${menuOpen ? 'open' : ''}`} onClick={(event) => { if (event.target.closest('a')) setMenuOpen(false); }} aria-label="Main navigation">
          <a className={page === 'home' ? 'active' : ''} href="/">Home</a><a className={page === 'about' ? 'active' : ''} href="/about">About Leon</a><a className={page === 'books' ? 'active' : ''} href="/books">My Books</a><a href="/#faqs">FAQs</a><a href="/#reader-words">Reader Words</a><a className={`nav-cta ${page === 'contact' ? 'active' : ''}`} href="/contact">Get in touch <span>↗</span></a>
        </nav>
      </div>
    </header>

    <main className="page-enter">
      {page === 'home' ? <>
      <section className="hero frame" aria-labelledby="hero-title">
        <div className="hero-copy reveal is-visible">
          <p className="eyebrow">The remarkable tale of an ordinary life</p>
          <h1 id="hero-title">A LITTLE<br /><span>GRIT.</span><em>A lot of story.</em></h1>
          <p className="hero-lede">From a tin bath in Hunslet<br />to a life beyond imagination.</p>
          <p className="body-copy">Welcome to Leon Parrish’s world: stories of family, hard work, laughter, faith, and the unexpected turns in a life well lived.</p>
          <div className="actions"><a className="button" href="/about">Meet the man <span>↗</span></a><a className="text-link" href="/books">Discover the book <span>→</span></a></div>
          <div className="signature">Leon Parrish <small>Author &amp; lifelong storyteller</small></div>
        </div>
        <div className="hero-art" aria-label="Photographs and memories from Leon's story">
          <div className="paper-note note-left"><span>THE BOY<br />FROM THE<br />TIN BATH</span><small>A Hunslet beginning</small></div>
          <figure className="hero-photo"><img src={`${A}leon-and-pat.png`} alt="Leon and Pat smiling together at a celebration" fetchPriority="high" /><figcaption className="photo-caption">Leon &amp; Pat, together</figcaption></figure>
          <figure className="hero-archive"><img src={`${A}leon-archive.png`} alt="Archival photograph of a young couple dancing" /><figcaption>The early chapters</figcaption></figure>
          <div className="stamp">1946<br /><small>HUNSLET</small></div>
          <div className="paper-note note-right">One life.<br />Quite a<br />read.</div>
          <div className="scribble">“You couldn't<br />make it up.”</div>
        </div>
        <div className="hero-bottom"><span>A story worth telling</span><span>Hunslet roots &nbsp; · &nbsp; A lifetime of adventure</span><span>Every life holds a story</span></div>
      </section>

      <div className="ribbon">EVERY LIFE HAS A STORY. THIS ONE HAS A FEW MORE TWISTS.</div>
      <div className="section-index">THE STORY <span>·</span> THE AUTHOR <span>·</span> THE BOOK <span>·</span> YOUR WORDS</div>

      <Reveal id="author" className="section author-section">
        <div className="author-visual">
          <div className="memory-card">FROM<br />HUNSLET,<br />WITH<br />LOVE.<small>A memoir, in moments</small></div>
          <figure className="author-photo"><img src={`${A}leon-travel.png`} alt="Leon smiling in a travel photograph" loading="lazy" /><figcaption>Never forget where it came from.</figcaption></figure>
          <div className="mini-card">HUNSLET<br /><small>EST. 1946</small></div>
        </div>
        <div className="section-copy"><p className="eyebrow">01 / About the author</p><h2>THE MAN BEHIND<br /><em>the memoir.</em></h2><p className="large-copy">Leon Michael Davies Parrish.<br />A Yorkshire lad with a lifetime to tell.</p><p>Born in Hunslet, Leeds, in 1946, Leon grew up with very little. His mother Amy taught him the value of hard work and generosity. That beginning became the first page of a remarkable story.</p><p>Through it all came Pat, family, faith, and some wonderfully unlikely adventures. His memoir is a tribute to the people and moments that shaped his life.</p><div className="timeline"><div><strong>1946</strong><span>Hunslet beginnings</span></div><div><strong>1962</strong><span>A world opens up</span></div><div><strong>1975</strong><span>Family &amp; beyond</span></div></div><p className="timeline-caption">A life that started small, found its own way, and was never short of a good story.</p><a className="button" href="/books">Discover the memoir <span>↗</span></a><div className="signature small">Leon Parrish</div></div>
      </Reveal>

      <Reveal id="books" className="section books-section">
        <div className="books-copy"><p className="eyebrow">02 / The memoir</p><h2>A LIFETIME,<br /><em>on your shelf.</em></h2><p className="large-copy">One memoir. Two ways to treasure it.<br />A story to hold and pass on.</p><p>Stories from Hunslet. A journey through grit, family, love, and a life lived to the full.</p><div className="actions"><a className="button" href="/books">Explore the book <span>↗</span></a><a className="text-link" href="/contact">Enquire <span>→</span></a></div><p className="script-quote">The Story of Lord Leon<br />and the Gaffer Above</p></div>
        <div className="book-display"><BookCover className="book-one" /><BookCover className="book-two" /><div className="shelf" /><p>A story of courage &nbsp; · &nbsp; A lifetime of memories</p></div>
      </Reveal>

      <Reveal id="featured" className="section featured-section">
        <div className="featured-book"><img className="real-mockup" src={`${A}book-mockup.png`} alt="Hardcover mockup of The Story of Lord Leon and the Gaffer Above" loading="lazy" /><span>The memoir by Leon Parrish</span></div>
        <div className="section-copy"><p className="eyebrow">03 / A story to hold</p><h2>THE BOY.<br />THE JOURNEY.<br /><em>The Gaffer Above.</em></h2><p>From the back-to-backs of Hunslet to a life filled with extraordinary turns. A memoir of hard graft, family, faith, and the kind of Yorkshire humour you couldn't make up.</p><div className="actions"><a className="button" href="/contact">Ask about the memoir <span>↗</span></a><a className="text-link" href="/about">Meet the author <span>→</span></a></div><p className="tiny-note">Honest memories. Unexpected moments. A story for anyone who has ever wondered where life might lead.</p></div>
      </Reveal>

      <Reveal id="faqs" className="section faq-section"><div><p className="eyebrow">04 / Frequently asked questions</p><h2>CURIOUS?<br /><em>Good.</em></h2><p>Every story brings questions.<br />Turn the first page.</p><a className="text-link" href="/contact">Ask another question <span>→</span></a></div><div className="faq-list"><details open><summary>What is the book about?</summary><p>The Story of Lord Leon and the Gaffer Above is a candid memoir about growing up in Hunslet, finding family and faith, and discovering how an ordinary life can become an extraordinary story.</p></details><details><summary>Is it based on a true story?</summary><p>Yes. It is Leon’s account of the people, places, challenges, and unexpected turns that shaped his life.</p></details><details><summary>Which edition is featured here?</summary><p>The cover and hardcover mockup are shown here. Get in touch for current edition details.</p></details><details><summary>Where can I buy a copy?</summary><p>Use the contact section below to ask about ordering a copy and available formats.</p></details><details><summary>How can I contact Leon?</summary><p>Use the contact information below when it becomes available.</p></details></div></Reveal>

      <Reveal id="reader-words" className="reader-section"><p className="eyebrow">05 / Your chapter</p><h2>THE NEXT CHAPTER?<br /><em>Your words.</em></h2><p>A place for readers to share what stayed with them.</p><div className="reader-grid"><blockquote><span>“</span><strong>A moment that<br />made you smile.</strong><p>Perhaps a familiar place, a voice, or a memory of your own.</p></blockquote><blockquote><span>“</span><strong>A story that<br />stayed with you.</strong><p>Some stories stay long after the final page.</p></blockquote><blockquote><span>“</span><strong>A book you'd<br />pass along.</strong><p>Because the best stories are the ones we share.</p></blockquote></div><div className="reader-bottom"><em>Read the memoir? Tell Leon what you thought.</em><a className="button" href="/contact">Share your thoughts <span>↗</span></a></div></Reveal>

      <Reveal id="contact" className="contact-section"><div><p className="eyebrow">A note from you is always welcome</p><h2>HAVE A STORY?<br /><em>Let's talk.</em></h2></div><div><p>A memory, a question, or a connection to Hunslet: stories grow when we share them.</p><a className="button" href="/contact">Get in touch <span>↗</span></a><small>Visit the contact page to prepare your note.</small></div></Reveal>
      </> : <InnerPage page={page} />}
    </main>

    <footer><div className="footer-main"><div><Brand footer /><p>A Yorkshire life. A lifetime of stories.<br />From the tin bath to the unexpected.</p></div><div><h3>Find your way</h3><a href="/">Home</a><a href="/about">My Story</a><a href="/books">The Book</a><a href="/contact">Say Hello</a></div><div><h3>More to explore</h3><a href="/about">About the Author</a><a href="/books">The Memoir</a><a href="/#reader-words">Reader Words</a><a href="/#faqs">FAQs</a></div><div><h3>Stay in the story</h3><p>Good stories are best shared.<br />Write a note to Leon anytime.</p><a className="text-link" href="/contact">Write to Leon →</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Leon Parrish. All rights reserved.</span><span>Made with heart, from Hunslet.</span><a href="/">Back to top ↑</a></div></footer>
  </>;
}



