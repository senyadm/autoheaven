// pages/api/location.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Define a type for the response from the geolocation API
interface GeoLocationResponse {
  country_name: string;
  city: string;
  country: string;
}

// Define a type for the handler's response
interface HandlerResponse {
  country: string;
  city: string;
  countryCode: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const location: GeoLocationResponse = await response.json();
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.status(200).json({
    country: location.country_name,
    city: location.city,
    countryCode: location.country,
  });
}
