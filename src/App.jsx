import { useState, useEffect } from 'react'
import Navbar from './navbar'
import Hero from './hero'
import AboutUs from './aboutus'
import Services from './services'
import Gallery from './gallery'
import Reviews from './reviews'
import Footer from './footer'
import { client, urlFor } from './sanityClient'

const HERO_QUERY = `*[_type == "hero" && _id == "hero"][0] {
  headline,
  bodyText,
  ctaText,
  image { asset, hotspot, crop, alt }
}`

const ABOUT_QUERY = `*[_type == "aboutUs" && _id == "aboutUs"][0] {
  subheading,
  bodyText,
  image { asset, hotspot, crop, alt }
}`

const SERVICES_QUERY = `*[_type == "siteServices" && _id == "siteServices"][0] {
  services[] {
    title,
    description,
    image { asset, hotspot, crop, alt }
  }
}`

const GALLERY_QUERY = `*[_type == "siteGallery" && _id == "siteGallery"][0] {
  images[] { asset, hotspot, crop, alt }
}`

const REVIEW_QUERY = `*[_type == "review"] | order(orderRank) {
  _id,
  reviewText,
  reviewerName
}`

function App() {
  const [heroData, setHeroData] = useState(null)
  const [aboutData, setAboutData] = useState(null)
  const [servicesData, setServicesData] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    client.fetch(HERO_QUERY).then(setHeroData).catch(console.error)

    client.fetch(ABOUT_QUERY).then(setAboutData).catch(console.error)

    client.fetch(SERVICES_QUERY).then((data) => {
      setServicesData(data?.services ?? [])
    }).catch(console.error)

    client.fetch(GALLERY_QUERY).then((data) => {
      const images = (data?.images ?? [])
        .filter((img) => img?.asset)
        .map((img) => ({
          src: urlFor(img).auto('format').width(800).url(),
          alt: img.alt ?? '',
        }))
      setGalleryImages(images)
    }).catch(console.error)

    client.fetch(REVIEW_QUERY).then((data) => {
      setReviews(
        (data ?? []).map((r) => ({
          text: r.reviewText,
          name: r.reviewerName,
        }))
      )
    }).catch(console.error)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero heroData={heroData} />
      <AboutUs aboutData={aboutData} />
      <Services services={servicesData} />
      <Gallery images={galleryImages} />
      <Reviews reviews={reviews} />
      <Footer />
    </div>
  )
}

export default App
