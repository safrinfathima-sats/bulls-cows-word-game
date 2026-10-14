import React, { useState } from 'react';
import { X, Server, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, Code } from 'lucide-react';
import { BackendConfig } from '../types/game';

interface BackendConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BackendConfig;
  onSaveConfig: (config: BackendConfig) => void;
}

export const BackendConnectModal: React.FC<BackendConnectModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [enabled, setEnabled] = useState(config.enabled);
  const [endpointUrl, setEndpointUrl] = useState(config.endpointUrl || 'http://localhost:5000/api/guess');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');
  const [activeSnippetTab, setActiveSnippetTab] = useState<'flask' | 'fastapi' | 'express'>('flask');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestMessage('Sending test guess "COLD" to endpoint...');

    try {
      const res = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: 'COLD' }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (typeof data.bulls === 'number' && typeof data.cows === 'number') {
        setTestStatus('success');
        setTestMessage(`Connected! Server returned: ${data.bulls} Bulls, ${data.cows} Cows.`);
      } else {
        setTestStatus('success');
        setTestMessage(`Server responded successfully: ${JSON.stringify(data).slice(0, 100)}`);
      }
    } catch (err: unknown) {
      setTestStatus('error');
      const msg = err instanceof Error ? err.message : 'Connection failed';
      setTestMessage(`${msg}. Ensure your backend server is running and CORS is enabled.`);
    }
  };

  const handleSave = () => {
    onSaveConfig({
      enabled,
      endpointUrl,
      autoExtractBullsCows: true,
    });
    onClose();
  };

  const sampleFlask = `# Python Flask Backend (app.py)
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app) # Enable CORS for frontend

SECRET = "CART" # Or generate random 4-letter isogram

@app.route('/api/guess', methods=['POST'])
def check_guess():
    data = request.get_json()
    guess = data.get('guess', '').upper()
    
    if len(guess) != 4 or len(set(guess)) != 4:
        return jsonify({'error': 'Invalid 4-letter isogram'}), 400
        
    bulls = sum(1 for i in range(4) if guess[i] == SECRET[i])
    cows = sum(1 for i in range(4) if guess[i] != SECRET[i] and guess[i] in SECRET)
    
    return jsonify({
        'guess': guess,
        'bulls': bulls,
        'cows': cows,
        'won': bulls == 4
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)`;

  const sampleFastAPI = `# Python FastAPI Backend (main.py)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET = "COLD"

class GuessRequest(BaseModel):
    guess: str

@app.post("/api/guess")
def process_guess(payload: GuessRequest):
    guess = payload.guess.upper()
    bulls = sum(1 for i in range(4) if guess[i] == SECRET[i])
    cows = sum(1 for i in range(4) if guess[i] != SECRET[i] and guess[i] in SECRET)
    return {"guess": guess, "bulls": bulls, "cows": cows, "won": bulls == 4}`;

  const sampleExpress = `// Node.js Express Backend (server.js)
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let secret = 'FARM';

app.post('/api/guess', (req, res) => {
  const guess = (req.body.guess || '').toUpperCase();
  let bulls = 0, cows = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) bulls++;
    else if (secret.includes(guess[i])) cows++;
  }
  res.json({ guess, bulls, cows, won: bulls === 4 });
});

app.listen(5000, () => console.log('Server on port 5000'));`;

  const getActiveCode = () => {
    if (activeSnippetTab === 'flask') return sampleFlask;
    if (activeSnippetTab === 'fastapi') return sampleFastAPI;
    return sampleExpress;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Backend Integration Settings
            </h2>
            <p className="text-xs text-slate-400">
              Seamlessly link your final year project backend API with this frontend.
            </p>
          </div>
        </div>

        {/* Mode Switch */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-white block">
                Connect External Backend API
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                {enabled
                  ? 'Active: Guesses will be validated and calculated by your backend server.'
                  : 'Inactive: Using client-side built-in Bulls & Cows engine.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
          </label>

          {enabled && (
            <div className="mt-4 space-y-3 pt-3 border-t border-slate-800/80">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Guess API Endpoint URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={endpointUrl}
                    onChange={(e) => setEndpointUrl(e.target.value)}
                    placeholder="http://localhost:5000/api/guess"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing'}
                    className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {testStatus === 'testing' ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                    ) : (
                      <Server className="h-3.5 w-3.5" />
                    )}
                    <span>Test Ping</span>
                  </button>
                </div>
              </div>

              {testStatus !== 'idle' && (
                <div
                  className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                    testStatus === 'success'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : testStatus === 'error'
                      ? 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  {testStatus === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  ) : testStatus === 'error' ? (
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                  ) : (
                    <RefreshCw className="h-4 w-4 shrink-0 text-slate-400 mt-0.5 animate-spin" />
                  )}
                  <span>{testMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Expected JSON schema specifications */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-emerald-400" />
              API Protocol Specs & Ready Snippets
            </span>
            <div className="flex items-center gap-1">
              {(['flask', 'fastapi', 'express'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSnippetTab(tab)}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                    activeSnippetTab === tab
                      ? 'bg-slate-800 text-emerald-300 font-bold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab === 'flask' ? 'Flask' : tab === 'fastapi' ? 'FastAPI' : 'Express'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre className="p-3 rounded-lg bg-slate-900 text-emerald-300/90 font-mono text-[11px] overflow-x-auto max-h-40 border border-slate-800">
              {getActiveCode()}
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
              title="Copy snippet"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-95 transition-all shadow-sm"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
