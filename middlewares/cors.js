import cors from 'cors';

const mwCors = cors({
  origin: ['http://127.0.0.1:5500', 'www.grimbirb.com'],
})

export default mwCors;