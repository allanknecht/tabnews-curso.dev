function Home() {
  return (
    <main>
      <h1>Olá</h1>
      <p>Um lugar simples para acompanhar o que está no ar.</p>
      <a href="/status">Ver status</a>
      <style jsx>{`
        main {
          max-width: 32rem;
          margin: 3rem auto;
          padding: 2rem;
          font-family: sans-serif;
          color: #1f2933;
          background: #ffffff;
          border: 1px solid #e4e7eb;
          border-radius: 12px;
        }
        h1 {
          margin: 0 0 0.75rem;
          font-size: 1.75rem;
        }
        p {
          margin: 0 0 1.25rem;
          color: #52606d;
          line-height: 1.5;
        }
        a {
          color: #1f2933;
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}

export default Home;
