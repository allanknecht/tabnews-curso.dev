import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <main>
        <h1>Status</h1>
        <UpdatedAt />
        <DatabaseStatus />
      </main>
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
          margin: 0 0 1.5rem;
          font-size: 1.75rem;
        }
      `}</style>
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Loading...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return (
    <p>
      Updated at <time>{updatedAtText}</time>
      <style jsx>{`
        p {
          margin: 0 0 1.5rem;
          color: #52606d;
        }
        time {
          color: #1f2933;
          font-weight: 600;
        }
      `}</style>
    </p>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Loading...";

  if (!isLoading && data) {
    const database = data.dependencies.database;
    databaseStatusInformation = (
      <dl>
        <div>
          <dt>Version</dt>
          <dd>{database.version}</dd>
        </div>
        <div>
          <dt>Max connections</dt>
          <dd>{database.max_connections}</dd>
        </div>
        <div>
          <dt>Opened connections</dt>
          <dd>{database.opened_connections}</dd>
        </div>
      </dl>
    );
  }

  return (
    <section>
      <h2>Database</h2>
      {databaseStatusInformation}
      <style jsx>{`
        section {
          padding-top: 1.25rem;
          border-top: 1px solid #e4e7eb;
        }
        h2 {
          margin: 0 0 1rem;
          font-size: 1.125rem;
        }
        dl {
          margin: 0;
        }
        div {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.65rem 0;
          border-bottom: 1px solid #f5f7fa;
        }
        div:last-child {
          border-bottom: 0;
        }
        dt {
          color: #52606d;
        }
        dd {
          margin: 0;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
