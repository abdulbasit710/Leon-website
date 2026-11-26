import React, { useState } from 'react';
import './inner-pages.css';

const asset = '/assets/';

const milestones = [
  { year: '1946', title: 'A Hunslet beginning', text: 'Born in Hunslet, Leeds. A childhood shaped by family, modest means and determination.', chapter: 'The beginning', image: 'timeline-1946.png', imageAlt: 'Archival interior with a tin bath', caption: 'An archival image of a Hunslet childhood setting.' },
  { year: 'School years', title: 'The classroom years', text: 'Low Road School and later Belle Isle Secondary Modern.', chapter: 'Finding his feet', image: 'timeline-school.png', imageAlt: 'Vintage school group photograph', caption: 'A contextual school-years photograph.' },
  { year: '1962', title: 'Leon meets Pat', text: 'Meets Pat at the Old Mecca dance hall.', chapter: 'A new chapter', image: 'timeline-1962.png', imageAlt: 'Leon and Pat standing together in an archival photograph', caption: 'Leon and Pat in an early photograph.' },
  { year: '1962/63', title: 'A New Year together', text: 'Their first New Year’s Eve together.', chapter: 'Together', image: 'timeline-1962-new-year.png', imageAlt: 'Leon and Pat dancing together', caption: 'Leon and Pat celebrating together.' },
  { year: '1975', title: 'Into business', text: 'Enters the scrapyard business.', chapter: 'Hard graft', image: 'timeline-1975.png', imageAlt: 'Young Leon standing outside a brick house', caption: 'An illustrative photograph of Leon from this period.' },
  { year: '1977', title: 'Babington’s', text: 'Takes ownership of Babington’s.', chapter: 'Building a future' },
  { year: '1997', title: 'A family moment', text: 'A treasured moment with grandson Macaulay.', chapter: 'Family first', image: 'timeline-1997.png', imageAlt: 'Leon and a younger family member together', caption: 'A later family photograph related to this chapter.' },
  { year: '1998–2000', title: 'The Lord of Methley', text: 'The period Leon associates with his Lord of Methley title.', chapter: 'An unexpected turn', image: 'timeline-1998-2000.png', imageAlt: 'Leon and Pat dressed for a formal event', caption: 'A later illustrative photograph of Leon and Pat.' },
  { year: '2022', title: 'A royal thank you', text: 'Receives a letter of thanks from Windsor Castle.', chapter: 'A memorable note', image: 'timeline-2022.png', imageAlt: 'Framed letter of thanks from Windsor Castle', caption: 'The framed letter of thanks.' },
  { year: '2026', title: 'The story continues', text: 'Second edition of the memoir.', chapter: 'A new edition', image: 'timeline-2026.png', imageAlt: 'Contemporary photograph of Leon and Pat together', caption: 'A contemporary illustration for the new-edition chapter.' },
];

function PageHero({ eyebrow, title, script, text, image, imageAlt, className = '', actionHref, actionLabel }) {
  return <section className={`inner-hero ${className}`}>
    <div className="inner-hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}<em>{script}</em></h1><p>{text}</p>{actionHref && <a className="button inner-hero-cta" href={actionHref} target="_blank" rel="noopener noreferrer">{actionLabel} <span>↗</span></a>}<div className="inner-hero-rule"><span>LEON PARRISH</span><span>·</span><span>HUNSLET · LEEDS</span></div></div>
    <div className="inner-hero-image"><img src={`${asset}${image}`} alt={imageAlt} /><span className="inner-image-corner">LP</span></div>
  </section>;
}

function Timeline() {
  const [active, setActive] = useState(0);
  const current = milestones[active];
  const step = (direction) => setActive((index) => (index + direction + milestones.length) % milestones.length);
  return <section className="archive-timeline" id="timeline">
    <div className="archive-heading"><p className="eyebrow">05 / Personal archive</p><h2>Memories &amp; Milestones</h2><p>Ten moments along the road. Select a chapter to explore Leon’s story.</p></div>
    <div className="timeline-paper">
      <div className="timeline-list" role="list" aria-label="Leon Parrish milestones">
        {milestones.map((item, index) => <button type="button" role="listitem" key={item.year} className={`milestone ${active === index ? 'selected' : ''}`} onClick={() => setActive(index)} aria-current={active === index ? 'step' : undefined}>
          <span className="milestone-dot" /><strong>{item.year}</strong><span>{item.title}</span><span className="milestone-arrow">↗</span>
        </button>)}
      </div>
      <div className="timeline-detail" aria-live="polite"><div className="timeline-detail-top"><span>CHAPTER {String(active + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}</span><span>{current.chapter}</span></div><div className="timeline-detail-body" key={current.year}><div className="timeline-detail-copy"><span className="timeline-big-year">{current.year}</span><h3>{current.title}</h3><p>{current.text}</p></div>{current.image ? <figure className="timeline-image"><img src={`${asset}${current.image}`} alt={current.imageAlt} /><figcaption>{current.caption}</figcaption></figure> : <div className="timeline-no-photo"><span>1977</span><p>No verified photograph was supplied for this milestone.</p><a href="#business">Read about Babington Car Spares ↓</a></div>}</div><div className="timeline-controls"><button type="button" onClick={() => step(-1)} aria-label="Previous milestone">← Previous</button><span>{String(active + 1).padStart(2, '0')} <span className="timeline-controls-line">/</span> {String(milestones.length).padStart(2, '0')}</span><button type="button" onClick={() => step(1)} aria-label="Next milestone">Next →</button></div></div>
    </div>
  </section>;
}

const businessYears = [
  { year: '1977', text: 'Leon became the sole owner of Babington Car Spares Vehicle Dismantlers.' },
  { year: '1997', text: 'Babington modernised and invested in its premises, preparing for future vehicle-dismantling legislation. The business says it was the first in the UK to be ready for those changes.' },
  { year: '2003', text: 'After new legislation for breakers yards, Babington became a registered Authorised Treatment Facility (ATF) and was among the first vehicle dismantlers to qualify for the licence.' },
  { year: '2014', text: 'The yard bought a Tabarelli RB6000 car baler from JMC Recycling Systems Ltd.' },
];

function BusinessSection() {
  const [selected, setSelected] = useState(0);
  return <section className="business-section" id="business">
    <div className="business-intro"><div><p className="eyebrow">06 / A family business</p><h2>It started<br /><em>with an idea.</em></h2><span className="business-rule" /></div><div><p className="business-kicker">BABINGTON CAR SPARES</p><p>Back in 1975 Leon Parrish decided to become a partner in Peter Babington’s vehicle dismantling business. Breakers yards in the 1970s were very different from today, but it seemed like a good fit for Leon. In 1977 he bought his partners out.</p><p>As his sons grew up, they joined him in the yard and it became a family business. Leon retired from active duty in 2000; his sons Quinn and Marcus continue to run the yard.</p><a className="business-link" href="https://babingtoncarspares.com/" target="_blank" rel="noopener noreferrer">Visit Babington Car Spares <span>↗</span></a></div></div>
    <div className="business-history"><div className="business-history-title"><p className="eyebrow">Our history</p><h3>Built through<br /><em>the years.</em></h3><p>Select a year to see how the business grew.</p></div><div className="business-year-grid">{businessYears.map((item, index) => <button key={item.year} type="button" className={`business-year ${selected === index ? 'active' : ''}`} onClick={() => setSelected(index)} aria-pressed={selected === index}><strong>{item.year}</strong><span>{index === 0 ? 'Ownership' : index === 1 ? 'Modernisation' : index === 2 ? 'ATF registration' : 'A new crusher'}</span></button>)}</div><div className="business-year-detail" aria-live="polite"><span>{businessYears[selected].year}</span><p>{businessYears[selected].text}</p></div></div>
  </section>;
}

function AboutPage() {
  return <>
    <PageHero eyebrow="The person behind the pages" title="ABOUT" script="Leon Parrish." text="A Yorkshire beginning. A lifetime of family, laughter, hard work, and stories worth passing on." image="leon-and-pat.png" imageAlt="Leon and Pat smiling together" className="about-page-hero" />
    <section className="inner-intro"><div><p className="eyebrow">01 / The man behind the memoir</p><h2>Some lives are<br /><em>made of stories.</em></h2></div><div><p className="inner-lede">Leon Michael Davies Parrish grew up in Hunslet, Leeds, with modest means and a determination to make the most of every opportunity.</p><p>His story follows the people, places, and moments that mattered: from school days and meeting Pat to work, family, and adventures he never could have predicted.</p><a className="text-link" href="#timeline">Explore the milestones <span>↓</span></a></div></section>
    <section className="photo-interlude"><img src={`${asset}leon-travel.png`} alt="Leon smiling during his travels" /><div><span>“</span><p>Never forget where you came from.</p><small>LEON’S STORY · HUNSLET TO BEYOND</small></div></section>
    <Timeline />
    <BusinessSection />
    <section className="inner-cta"><p className="eyebrow">The story in full</p><h2>There is more<br /><em>between the years.</em></h2><a className="button" href="/books">Discover the memoir <span>↗</span></a></section>
  </>;
}

const bookTabs = [
  { label: 'The story', heading: 'One life. Quite a read.', text: 'The Story of Lord Leon and the Gaffer Above brings together Leon’s Hunslet beginnings, family, faith, work, and unexpected turns in a candid memoir.' },
  { label: 'Inside the book', heading: 'From Hunslet, with heart.', text: 'A personal account of the places Leon came from, the people he met, and the memories that stayed with him. It is a story of hard graft, humour, and gratitude.' },
  { label: 'The editions', heading: 'A story to keep.', text: 'Explore the supplied book cover and hardcover mockup. Ask about the current edition and availability using the contact page.' },
];

function BooksPage() {
  const [tab, setTab] = useState(0);
  return <>
    <PageHero eyebrow="The memoir" title="MY" script="Books." text="A lifetime of memories, bound together in The Story of Lord Leon and the Gaffer Above." image="book-mockup.png" imageAlt="Hardcover mockup of The Story of Lord Leon and the Gaffer Above" className="books-page-hero" actionHref="https://a.co/d/08ZZRfTA" actionLabel="Buy a copy on Amazon" />
    <section className="book-feature"><div className="book-feature-art"><img src={`${asset}book-cover.webp`} alt="The Story of Lord Leon and the Gaffer Above cover" /><div className="book-feature-glow" /></div><div className="book-feature-copy"><p className="eyebrow">01 / Featured memoir</p><h2>THE STORY OF<br /><em>LORD LEON</em><small>AND THE GAFFER ABOVE</small></h2><p>From a childhood in Hunslet to a life full of extraordinary turns, Leon’s memoir is a heartfelt account of family, faith, hard work, and Yorkshire humour.</p><div className="actions"><a className="button" href="https://a.co/d/08ZZRfTA" target="_blank" rel="noopener noreferrer">Buy a copy on Amazon <span>↗</span></a><a className="text-link" href="/contact">Ask about the book <span>→</span></a></div></div></section>
    <section className="book-explore"><div className="book-explore-heading"><p className="eyebrow">02 / Explore the pages</p><h2>A story with<br /><em>many chapters.</em></h2></div><div className="book-tabs"><div className="book-tab-list" role="tablist" aria-label="Book information">{bookTabs.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={tab === index} className={tab === index ? 'active' : ''} onClick={() => setTab(index)}>{String(index + 1).padStart(2, '0')} &nbsp; {item.label}</button>)}</div><div className="book-tab-panel" role="tabpanel"><h3>{bookTabs[tab].heading}</h3><p>{bookTabs[tab].text}</p><div className="book-tab-progress"><span style={{ width: `${((tab + 1) / bookTabs.length) * 100}%` }} /></div></div></div></section>
    <section className="book-edition"><div><p className="eyebrow">03 / The book in your hands</p><h2>MADE TO BE<br /><em>passed along.</em></h2><p>A memoir that invites you to linger, remember, and share your own stories.</p><a className="button" href="/contact">Enquire about a copy <span>↗</span></a></div><img src={`${asset}book-mockup.png`} alt="Hardcover mockup of Leon Parrish's memoir" loading="lazy" /></section>
  </>;
}

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', subject: 'A note for Leon', message: '' });
  const update = (event) => setValues({ ...values, [event.target.name]: event.target.value });
  const prepare = async (event) => {
    event.preventDefault();
    const note = `From: ${values.name} <${values.email}>\nSubject: ${values.subject}\n\n${values.message}`;
    try { await navigator.clipboard.writeText(note); setCopied(true); } catch { setCopied(false); }
  };
  return <>
    <PageHero eyebrow="A note from you is always welcome" title="LET'S" script="Talk." text="A memory, a question, or a connection to Hunslet? Every good story begins with a conversation." image="leon-and-pat.png" imageAlt="Leon and Pat smiling together" className="contact-page-hero" />
    <section className="contact-inner"><div className="contact-inner-copy"><p className="eyebrow">01 / Write a note</p><h2>HAVE A STORY?<br /><em>We’d love to hear it.</em></h2><p>Share what the memoir meant to you, ask about the book, or tell Leon about a memory of your own.</p><div className="contact-detail"><span className="contact-detail-line" aria-hidden="true" /><div><strong>Reader messages</strong><small>Thoughts, memories, and questions are welcome.</small></div></div><div className="contact-detail"><span className="contact-detail-line" aria-hidden="true" /><div><strong>Book enquiries</strong><small>Ask about editions and availability.</small></div></div></div><form className="contact-form" onSubmit={prepare}><p className="form-kicker">YOUR NOTE TO LEON</p><div className="form-row"><label>Your name<input name="name" value={values.name} onChange={update} required placeholder="Your name" /></label><label>Email address<input name="email" type="email" value={values.email} onChange={update} required placeholder="you@example.com" /></label></div><label>Subject<select name="subject" value={values.subject} onChange={update}><option>A note for Leon</option><option>About the memoir</option><option>A Hunslet memory</option><option>Book availability</option></select></label><label>Your message<textarea name="message" value={values.message} onChange={update} required rows="6" placeholder="Tell us your story..." /></label><button className="button" type="submit">Copy my message <span>↗</span></button><p className="form-note" role="status">{copied ? 'Your message is copied. Once a confirmed contact email is added, you can send it to Leon.' : 'The contact email is still being confirmed. This button prepares and copies your message; it does not send it.'}</p></form></section>
    <section className="inner-cta"><p className="eyebrow">Keep reading</p><h2>THE STORY<br /><em>continues.</em></h2><a className="button" href="/about">Explore Leon’s timeline <span>↗</span></a></section>
  </>;
}

export function InnerPage({ page }) {
  if (page === 'about') return <AboutPage />;
  if (page === 'books') return <BooksPage />;
  if (page === 'contact') return <ContactPage />;
  return null;
}
