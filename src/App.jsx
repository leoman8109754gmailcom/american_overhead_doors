import { useState, useEffect } from 'react'
import Navbar from './navbar'
import Hero from './hero'
import AboutUs from './aboutus'
import Services from './services'
import Gallery from './gallery'
import Reviews from './reviews'
import Footer from './footer'
import { client, urlFor } from './sanityClient'

const GALLERY_QUERY = `*[_type == "gallery"] | order(order asc) {
  _id,
  title,
  images[] {
    alt,
    asset,
    hotspot,
    crop
  }
}`;

const REVIEW_QUERY = `*[_type == "review"] | order(order asc) {
  _id,
  reviewText,
  reviewerName
}`;

function App() {
  const [galleries, setGalleries] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    client.fetch(GALLERY_QUERY).then((data) => {
      console.log('Sanity galleries:', data);
      const processed = data.map((gallery) => ({
        title: gallery.title,
        images: (gallery.images || []).map((img) => ({
          src: urlFor(img).auto('format').width(800).url(),
          alt: img.alt ?? '',
        })),
      }));
      setGalleries(processed);
    }).catch((err) => console.error('Sanity fetch error:', err));

    client.fetch(REVIEW_QUERY).then((data) => {
      console.log('Sanity reviews:', data);
      setReviews(
        data.map((r) => ({
          text: r.reviewText,
          name: r.reviewerName,
        }))
      );
    }).catch((err) => console.error('Sanity review fetch error:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <Gallery galleries={galleries} />
      <Reviews reviews={reviews} />
      <Footer />
    </div>
  )
}

export default App
