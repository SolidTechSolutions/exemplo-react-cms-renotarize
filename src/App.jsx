import { useState } from 'react';
import './App.css';

// Example front-end for adding a new ArchiveTimeStamp (renotarization) to an
// existing CMS/CAdES signature — supports both v2 and v3.
//
// Two modes:
// - "backend" (default): talks to the local example backend
//   (exemplo-integracao-cms-renotarize, POST /api/cms/renotarize/form). The
//   API token stays server-side — never exposed to the browser.
// - "direct" (optional): calls the SolidSign API directly from the browser.
//   Convenient for a quick manual check, but it exposes the Bearer token.

const DEFAULT_BACKEND_URL = 'http://localhost:8101';

export default function App() {
  const [mode, setMode] = useState('backend');
  const [backendUrl, setBackendUrl] = useState(DEFAULT_BACKEND_URL);
  const [baseUrl, setBaseUrl] = useState('https://www.solidsign.com.br');
  const [authorization, setAuthorization] = useState('');
  const [documents, setDocuments] = useState([]);
  const [atsVersion, setAtsVersion] = useState('v3');
  const [hashAlgorithm, setHashAlgorithm] = useState('SHA256');
  const [signatureIndex, setSignatureIndex] = useState('');
  const [en319122, setEn319122] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (documents.length === 0) { setError('Select at least one signed .p7s.'); return; }
    if (mode === 'direct' && !authorization.trim()) { setError('Enter the Bearer token.'); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      documents.forEach((f) => fd.append('document', f));
      fd.append('hashAlgorithm', hashAlgorithm);
      if (signatureIndex.trim()) fd.append('signatureIndex', signatureIndex.trim());

      let url;
      if (mode === 'backend') {
        fd.append('atsVersion', atsVersion);
        if (atsVersion === 'v3') fd.append('en319122', String(en319122));
        url = `${backendUrl.replace(/\/$/, '')}/api/cms/renotarize/form`;
      } else {
        fd.append('authorization', authorization.startsWith('Bearer ') ? authorization : `Bearer ${authorization}`);
        fd.append('baseUrl', baseUrl);
        if (atsVersion === 'v3') fd.append('en319122', String(en319122));
        url = `${baseUrl.replace(/\/$/, '')}/solidsign/dsig/extending/cms/add-ats-${atsVersion}`;
      }

      const res = await fetch(url, { method: 'POST', body: fd });
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch { json = null; }

      if (!res.ok) {
        setError(json?.message || text || `HTTP error ${res.status}`);
        return;
      }
      setResult(json);
    } catch (err) {
      setError(`Request failed (${mode === 'backend' ? backendUrl : baseUrl}): ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Renotarize CMS — add ArchiveTimeStamp (React example)</h1>
      <p className="subtitle">
        Example front-end for <code>exemplo-integracao-cms-renotarize</code>. Adds a fresh
        ArchiveTimeStamp (v2 or v3) to an existing CAdES signature. By default talks to the
        local backend, which holds the API credentials server-side.
      </p>

      <form onSubmit={submit} className="form">
        <fieldset>
          <legend>1. Connection</legend>
          <div className="mode-toggle">
            <label><input type="radio" checked={mode === 'backend'} onChange={() => setMode('backend')} /> Via example backend (default)</label>
            <label><input type="radio" checked={mode === 'direct'} onChange={() => setMode('direct')} /> Direct to SolidSign API (optional)</label>
          </div>
          {mode === 'backend' ? (
            <label>Backend URL
              <input value={backendUrl} onChange={(e) => setBackendUrl(e.target.value)} placeholder={DEFAULT_BACKEND_URL} />
            </label>
          ) : (
            <>
              <label>SolidSign API base URL
                <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://www.solidsign.com.br" />
              </label>
              <label>Bearer token
                <input value={authorization} onChange={(e) => setAuthorization(e.target.value)} placeholder="eyJhbGciOi..." />
              </label>
            </>
          )}
        </fieldset>

        <fieldset>
          <legend>2. Document and timestamp parameters</legend>
          <label>Signed .p7s file(s)
            <input type="file" accept=".p7s,.p7b,.p7m" multiple onChange={(e) => setDocuments(Array.from(e.target.files))} />
          </label>
          <label>ArchiveTimeStamp version
            <select value={atsVersion} onChange={(e) => setAtsVersion(e.target.value)}>
              <option value="v3">v3 (id-aa-ets-archiveTimestampV3)</option>
              <option value="v2">v2 (id-aa-ets-archiveTimestamp)</option>
            </select>
          </label>
          <label>Hash algorithm
            <select value={hashAlgorithm} onChange={(e) => setHashAlgorithm(e.target.value)}>
              <option value="SHA256">SHA-256</option>
              <option value="SHA512">SHA-512</option>
            </select>
          </label>
          <label>Signature index (optional — leave blank to renotarize every signature)
            <input value={signatureIndex} onChange={(e) => setSignatureIndex(e.target.value)} placeholder="0" />
          </label>
          {atsVersion === 'v3' && (
            <label className="mode-toggle">
              <input type="checkbox" checked={en319122} onChange={(e) => setEn319122(e.target.checked)} />
              Use EN 319 122 encoding (recommended)
            </label>
          )}
        </fieldset>

        <button type="submit" disabled={loading}>{loading ? 'Renotarizing…' : 'RENOTARIZE'}</button>
      </form>

      {error && <div className="box error">{error}</div>}

      {result && (
        <div className="box success">
          <h3>Success!</h3>
          <p>{result.signatureCount} document(s) renotarized — identifier <code>{result.identifier}</code></p>
          <ul>
            {(result.documents || []).map((d, i) => {
              const href = d._links?.self?.href;
              return <li key={i}>Document {i + 1} — {href ? <a href={href} target="_blank" rel="noreferrer">download</a> : 'link unavailable'}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
