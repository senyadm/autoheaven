export function getWS(token, chatter_id, product_id) {
  return new WebSocket(
    `ws://seashell-app-p3opp.ondigitalocean.app/ws/${token}/${chatter_id}/${product_id}`
  );
}
