function Gallery() {
  const images = [
    { id: 1, alt: 'Wedding tent setup' },
    { id: 2, alt: 'Outdoor event chairs' },
    { id: 3, alt: 'Funeral tent arrangement' },
    { id: 4, alt: 'Large event tent' },
    { id: 5, alt: 'Table and chair setup' },
    { id: 6, alt: 'Evening event lighting' },
  ]

  return (
    <div className="gallery">
      <h1>Our Work</h1>
      <p>A look at some of our tent and chair setups for past events</p>

      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img.id} className="gallery-item">
            <div className="placeholder-image">{img.alt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery