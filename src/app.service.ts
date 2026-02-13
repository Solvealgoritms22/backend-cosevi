import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ENTRAR Backend API</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary: #6366f1;
                --secondary: #a855f7;
                --bg: #0f172a;
                --card-bg: rgba(30, 41, 59, 0.7);
            }
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Outfit', sans-serif;
            }
            body {
                background: radial-gradient(circle at top left, #1e1b4b, #0f172a);
                color: #f8fafc;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                overflow: hidden;
            }
            .background-blobs {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: -1;
                overflow: hidden;
            }
            .blob {
                position: absolute;
                border-radius: 50%;
                filter: blur(80px);
                opacity: 0.4;
                animation: move 20s infinite alternate;
            }
            .blob-1 { width: 400px; height: 400px; background: var(--primary); top: -100px; left: -100px; }
            .blob-2 { width: 300px; height: 300px; background: var(--secondary); bottom: -50px; right: -50px; animation-delay: -5s; }
            
            @keyframes move {
                from { transform: translate(0, 0); }
                to { transform: translate(100px, 50px); }
            }

            .container {
                background: var(--card-bg);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 3rem;
                border-radius: 24px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                text-align: center;
                max-width: 500px;
                width: 90%;
                animation: fadeIn 1s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            h1 {
                font-size: 2.5rem;
                font-weight: 600;
                background: linear-gradient(to right, #818cf8, #c084fc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 1rem;
            }

            p {
                color: #94a3b8;
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 2rem;
            }

            .badge {
                display: inline-flex;
                align-items: center;
                padding: 0.5rem 1rem;
                background: rgba(34, 197, 94, 0.1);
                color: #4ade80;
                border-radius: 99px;
                font-size: 0.875rem;
                font-weight: 600;
                margin-bottom: 2rem;
                border: 1px solid rgba(34, 197, 94, 0.2);
            }

            .badge .dot {
                width: 8px;
                height: 8px;
                background: #4ade80;
                border-radius: 50%;
                margin-right: 8px;
                box-shadow: 0 0 10px #4ade80;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.5; }
                100% { transform: scale(1); opacity: 1; }
            }

            .links {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .btn {
                text-decoration: none;
                padding: 0.8rem 1.5rem;
                border-radius: 12px;
                font-weight: 600;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }

            .btn-primary {
                background: var(--primary);
                color: white;
            }
            .btn-primary:hover {
                background: #4f46e5;
                box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
                transform: translateY(-2px);
            }

            .btn-secondary {
                background: rgba(255, 255, 255, 0.05);
                color: #f8fafc;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

            .footer {
                margin-top: 3rem;
                font-size: 0.75rem;
                color: #64748b;
                letter-spacing: 1px;
                text-transform: uppercase;
            }
        </style>
    </head>
    <body>
        <div class="background-blobs">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
        </div>
        <div class="container">
            <div class="badge">
                <span class="dot"></span>
                API Running Smoothly
            </div>
            <h1>ENTRAR Backend</h1>
            <p>Welcome to the core service layer of the ENTRAR platform. Secure, multi-tenant infrastructure powering safety and logistics.</p>
            
            <div class="links">
                <a href="/api" class="btn btn-primary">API Endpoint</a>
                <a href="#" class="btn btn-secondary">Documentation</a>
            </div>

            <div class="footer">
                &copy; 2026 ENTRAR Infrastructure
            </div>
        </div>
    </body>
    </html>
        `;
    }
}
