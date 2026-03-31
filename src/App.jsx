function App() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0b0b12',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Llyneuf
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px' }}>
        Мой личный сайт и портфолио.  
        Здесь будут мои проекты, ссылки и информация обо мне.
      </p>
    </main>
  )
}

export default App