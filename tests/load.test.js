import http from 'k6/http';
import { sleep } from 'k6';
export default function(){
  const payload = JSON.stringify({ userId: 'USER_ID', amount: Math.floor(Math.random()*100+1) });
  const params = { headers: {'Content-Type': 'application/json'} };
  http.post('http://localhost:3000/api/auction/AUCTION_ID/bid', payload, params);
  sleep(0.1);
}
