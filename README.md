# 🚫 X-Filter Chrome Extension

An AI-powered Chrome extension developed as a hackathon project, designed to filter political content and advertisements via keywords for x.com.

## ☁︎ Background
- My collegues and I set out to create a Chrome extension leveraging large language models (LLMs).
- In one day, we built a prototype, but the code needed refinement. The original repository is [here](https://github.com/dealwith/x-filter).  
- I started fresh and extracted the best parts to create this polished, working version.

## ✔ Installation & Setup

Follow these steps to get the X-Filter extension running locally:

### 1. Clone the repository
```bash
git clone https://github.com/nuckarronjones/X-Filter-App
cd X-Filter-App
```
### 2. Install dependencies
#### Frontend
```
cd frontend
npm install
```
#### Backend
```
cd ../backend
npm install
```
### 3. Configure environment variables
- In the backend/ directory, create a .env file: OPENAI_API_KEY=your_openai_api_key_here

### 4. Build the frontend
```
cd ../frontend
npm run build
```
- This will generate a dist/ folder containing the production-ready frontend.
### 5. Start the backend server
```
cd ../backend
npm run start
```
- The backend will now be running locally.

### 6. Load the extension in Chrome
- Open Chrome and navigate to chrome://extensions/.
- Enable Developer mode (toggle in the top-right corner).
- Click Load unpacked and select the frontend/dist/ folder.
- The extension should now appear in your Chrome toolbar.

### 7. Enjoy!
- Enjoy your enhanced x.com experience, free of poitical content and advertisements disguised as posts. 
