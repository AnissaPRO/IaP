# TimeTravel Agency

> *History is your next destination. Making history accessible since 2087.*

Experience the most exclusive journeys through time. Witness empires rise, walk among legends, and discover moments that shaped our world. Licensed strictly by the **Temporal Regulatory Commission**, our modern platform connects discerning patrons with safely orchestrated historical endpoints.

## 🏗️ Technical Stack
- **Framework:** Angular v18 (Standalone Components)
- **State Management:** Angular Signals & `@if`/`@for` Control Flow
- **Bundler:** Vite (Angular Application Builder)
- **Styling:** Tailwind CSS (Dark Luxury Theme)
- **Media Delivery:** Cloudinary edge optimization via native Angular `@defer` 

## 🗺️ Curated Destinations
1. **Paris 1889:** Witness the Eiffel Tower unveiling. Stroll gaslit boulevards and dine where Impressionists gathered.
2. **Cretaceous (65M BC):** Venture to prehistoric Earth. Observe magnificent creatures from secured temporal observation pods.
3. **Florence 1504:** Stand in Michelangelo's studio as David is unveiled. Witness the golden age of human creativity.

## 🤖 AI Features
* **Time Concierge:** A floating chat assistant powered by Mistral AI (`mistral-small`), tuned explicitly to possess expert historical knowledge on the Belle Époque, the Age of Dinosaurs, and the Renaissance.
* **Personalized Assessment:** A state-matching algorithm calculating a patron's psychological compatibility with specific timelines.

## 🤖 AI used during development
- **Gemini**: Prompt generation and refinement
- **v0 agent**: Site design and deployment handling
- **Framer AI:** Site frame
- **Mistral AI:** Chatbot replies

## 📦 Setup & Deployment
1. Clone the repository: `git clone <gitlab-url>`
2. Install dependencies: `npm install`
3. Add your `MISTRAL_API_KEY` to your environment variables (or route through a backend proxy for production security).
4. Run locally: `npm run start` (Starts the Vite development server)
5. **GitLab Deployment (Vercel):** Include a `.gitlab-ci.yml` that invokes `vercel build --prod` and `vercel deploy --prebuilt --prod` for edge deployment execution.

© 2087 TimeTravel Agency. All rights reserved across all timelines.
Mistral AI, Google Gemini, Vercel, Framer AI
