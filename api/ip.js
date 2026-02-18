import axios from "axios";

export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({
      success: false,
      message: "IP address is required"
    });
  }

  try {
    // API 1
    const ipApi = await axios.get(`http://ip-api.com/json/${ip}`);

    // API 2
    const ipWho = await axios.get(`https://ipwho.is/${ip}`);

    // API 3
    const ipInfo = await axios.get(`https://ipinfo.io/${ip}/json`);

    const data = {
      IP: ip,
      Type: ipWho.data.type || "Unknown",
      Continent: ipWho.data.continent,
      Country: ipApi.data.country,
      Country_Code: ipApi.data.countryCode,
      Region: ipApi.data.regionName,
      City: ipApi.data.city,
      Zip: ipApi.data.zip,
      Latitude: ipApi.data.lat,
      Longitude: ipApi.data.lon,
      Location: `${ipApi.data.lat},${ipApi.data.lon}`,
      ISP: ipApi.data.isp,
      ORG: ipApi.data.org,
      ASN: ipApi.data.as,
      Domain: ipInfo.data.hostname,
      Timezone: ipApi.data.timezone,
      Currency: ipWho.data.currency?.code || null,
      Flag: ipWho.data.flag?.emoji || null,
      Google_Map: `https://www.google.com/maps?q=${ipApi.data.lat},${ipApi.data.lon}`,
      Developer: "@MS_HAC4KER"
    };

    res.status(200).json({
      success: true,
      data: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch IP data",
      error: error.message
    });
  }
}
