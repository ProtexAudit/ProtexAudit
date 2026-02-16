async function checkToken() {

  const contract = document.getElementById("contract").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Loading...";

  try {

    const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contract}`);
    const dexData = await dexResponse.json();

    if (!dexData.pairs || dexData.pairs.length === 0) {
      resultDiv.innerHTML = "Token not found.";
      return;
    }

    const token = dexData.pairs[0];

    resultDiv.innerHTML = `
      <h2>${token.baseToken.name} (${token.baseToken.symbol})</h2>
      <p><strong>Price:</strong> $${token.priceUsd}</p>
      <p><strong>Liquidity:</strong> $${token.liquidity.usd}</p>
      <p><strong>24h Volume:</strong> $${token.volume.h24}</p>
      <p><strong>Market Cap:</strong> $${token.fdv}</p>
      <p><strong>DEX:</strong> ${token.dexId}</p>
      <p><strong>Website:</strong> ${token.info?.websites?.[0]?.url || "N/A"}</p>
      <p><strong>Twitter:</strong> ${token.info?.socials?.find(s => s.type === "twitter")?.url || "N/A"}</p>
      <p><strong>Telegram:</strong> ${token.info?.socials?.find(s => s.type === "telegram")?.url || "N/A"}</p>
    `;

  } catch (error) {
    resultDiv.innerHTML = "Error loading data.";
  }
}
