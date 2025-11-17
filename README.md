# 🚫 X-Filter Chrome Extension

#### A hackathon project undertaken to create an AI powered chrome extension.

# ☁︎ Background
- My team of friends and collegues embarked on a mission to create a chrome extension which leverages the power of LLMs.
- In one day we managed to put something together; however, the code needed a lot of refinement and tuning. Original repository [here](https://github.com/dealwith/x-filter).
- I decided to start fresh, and take what I needed from the previous repository. Here is the polished, working version.

# ✔Installation
### 1) Clone or download the repository
```
git clone https://github.com/nuckarronjones/X-Filter-App
```
### 2) Install the dependencies in both frontend/backend
```
cd frontend/
npm install

cd backend/
npm install
```
### 3) Create .env file in backend/
- Create a .env folder in the backend directory, and populate OPENAI_API_KEY={your key}. You can obtain an API key from the following link https://platform.openai.com/api-keys.
### 4) Build the frontend
```
cd frontend/
npm run build
```
- Output will be in dist/ folder
### 5) Run the backend
```
cd backend/
npm run start
```
### 6) Upload dist folder to chrome browser
- Extensions -> manage extensions -> load unpacked -> [upload dist folder]

