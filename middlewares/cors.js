import cors from 'cors';

const mwCors = cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5173', 'https://cards-project-38ja.onrender.com'],
})

export default mwCors;