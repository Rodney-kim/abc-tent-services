import Home from './Home'
import Gallery from './Gallery'
import Contact from './Contact'

function Landing() {
  return (
    <>
      <section id="home"><Home /></section>
      <section id="gallery"><Gallery /></section>
      <section id="contact"><Contact /></section>
    </>
  )
}

export default Landing