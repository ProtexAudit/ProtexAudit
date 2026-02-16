async function checkToken() {

  const contract = document.getElementById("contract").value.trim();
  const resultDiv = document.getElementById("result");

  if (!contract) {
    resultDiv.innerHTML = "Please enter a valid contract address.";
    return;
  }

  resultDiv.innerHTML = "Analyzing...";

  try {

    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contract}`);
    const data = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      resultDiv.innerHTML = "Token not found.";
      return;
    }

    const token = data.pairs[0];

    const website = token.info?.websites?.[0]?.url || "N/A";
    const twitter = token.info?.socials?.find(s => s.type === "twitter")?.url || "N/A";
    const telegram = token.info?.socials?.find(s => s.type === "telegram")?.url || "N/A";

    resultDiv.innerHTML = `
      <div class="card">
        <h2>${token.baseToken.name} (${token.baseToken.symbol})</h2>
        <p><strong>Chain:</strong> ${token.chainId}</p>
        <p><strong>DEX:</strong> ${token.dexId}</p>
        <p><strong>Price:</strong> $${Number(token.priceUsd).toLocaleString()}</p>
        <p><strong>Liquidity:</strong> $${token.liquidity.usd.toLocaleString()}</p>
        <p><strong>24h Volume:</strong> $${token.volume.h24.toLocaleString()}</p>
        <p><strong>Market Cap:</strong> $${token.fdv?.toLocaleString() || "N/A"}</p>
        <hr style="margin:20px 0; border-color: rgba(212,175,55,0.2);">
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Twitter:</strong> ${twitter}</p>
        <p><strong>Telegram:</strong> ${telegram}</p>
      </div>
    `;

  } catch (error) {
    resultDiv.innerHTML = "Error fetching token data.";
  }
}

