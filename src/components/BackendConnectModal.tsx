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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#30264A]/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl border-2 border-[#E7DFFF] bg-white p-5 sm:p-6 shadow-2xl text-[#30264A] max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#746B85] hover:text-[#30264A] hover:bg-[#F2EEFF] transition-colors focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-[#E8F9F8] text-[#20ABA5] border-2 border-[#28C7C0]/40">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#7047EB]">
              Backend Integration Settings
            </h2>
            <p className="text-xs text-[#746B85] font-medium">
              Seamlessly link your final year project backend API with this frontend.
            </p>
          </div>
        </div>

        {/* Mode Switch Card in Warm Cream */}
        <div className="mt-4 p-4 rounded-2xl bg-[#FFF8EC] border-2 border-[#E7DFFF]">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-bold text-[#30264A] block">
                Connect External Backend API
              </span>
              <span className="text-xs text-[#746B85] block mt-0.5 font-medium">
                {enabled
                  ? 'Active: Guesses will be validated and calculated by your backend server.'
                  : 'Inactive: Using client-side built-in Bulls & Cows engine.'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5 accent-[#7047EB] rounded cursor-pointer"
            />
          </label>

          {enabled && (
            <div className="mt-4 space-y-3 pt-3 border-t border-[#E7DFFF]">
              <div>
                <label className="block text-xs font-bold text-[#30264A] mb-1">
                  Guess API Endpoint URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={endpointUrl}
                    onChange={(e) => setEndpointUrl(e.target.value)}
                    placeholder="http://localhost:5000/api/guess"
                    className="flex-1 px-3 py-2 rounded-xl bg-white border-2 border-[#E7DFFF] text-xs font-mono text-[#30264A] focus:outline-none focus:border-[#7047EB]"
                  />
                  <button
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing'}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#E8F9F8] hover:bg-[#D4F3F1] text-[#20ABA5] border-2 border-[#28C7C0]/40 flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50"
                  >
                    {testStatus === 'testing' ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#20ABA5]" />
                    ) : (
                      <Server className="h-3.5 w-3.5" />
                    )}
                    <span>Test Ping</span>
                  </button>
                </div>
              </div>

              {testStatus !== 'idle' && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 border-2 ${
                    testStatus === 'success'
                      ? 'bg-[#E8F9F8] border-[#28C7C0] text-[#197571]'
                      : testStatus === 'error'
                      ? 'bg-[#FFEBEB] border-[#FF6B6B] text-[#C93B3B]'
                      : 'bg-white border-[#E7DFFF] text-[#30264A]'
                  }`}
                >
                  {testStatus === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#28C7C0] mt-0.5" />
                  ) : testStatus === 'error' ? (
                    <AlertCircle className="h-4 w-4 shrink-0 text-[#FF6B6B] mt-0.5" />
                  ) : (
                    <RefreshCw className="h-4 w-4 shrink-0 text-[#7047EB] mt-0.5 animate-spin" />
                  )}
                  <span className="font-semibold">{testMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Expected JSON schema specifications */}
        <div className="mt-4 p-4 rounded-2xl bg-[#FFF8EC] border-2 border-[#E7DFFF]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#746B85] flex items-center gap-1.5">
              <Code className="h-4 w-4 text-[#7047EB]" />
              API Protocol Specs & Ready Snippets
            </span>
            <div className="flex items-center gap-1">
              {(['flask', 'fastapi', 'express'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSnippetTab(tab)}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors font-bold ${
                    activeSnippetTab === tab
                      ? 'bg-[#7047EB] text-white shadow-xs'
                      : 'text-[#746B85] hover:text-[#30264A] hover:bg-white'
                  }`}
                >
                  {tab === 'flask' ? 'Flask' : tab === 'fastapi' ? 'FastAPI' : 'Express'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre className="p-3.5 rounded-xl bg-white text-[#30264A] font-mono text-[11px] overflow-x-auto max-h-40 border-2 border-[#E7DFFF] shadow-inner">
              {getActiveCode()}
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-[#F2EEFF] hover:bg-[#E7DFFF] text-[#7047EB] text-xs flex items-center gap-1 transition-colors border border-[#7047EB]/30 font-bold"
              title="Copy snippet"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#36B56A]" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#E7DFFF]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl text-[#746B85] hover:text-[#30264A] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 text-xs font-extrabold rounded-xl bg-[#7047EB] text-white hover:bg-[#5D35D9] active:scale-95 transition-all shadow-md shadow-[#7047EB]/25"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
