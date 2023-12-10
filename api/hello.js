export default function handler(request, response) {
  response.status(200).json({
    body: "あいうえお",
    query: request.query,
    cookies: request.cookies,
  });
}
