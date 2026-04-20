/**
 * score = (infra * 0.35) + (demand * 0.25) + (priceMomentum * 0.20) + (rentYield * 0.10) - (competition * 0.10) + (policyBoost * 0.20)
 */
export const calculateGrowthScore = (data) => {
  const { infraScore, demandScore, priceHistory, rentalYield, competition, policyBoost } = data;
  
  // Calculate Price Momentum (percentage growth over last 3 periods if available)
  const momentum = priceHistory.length >= 2 
    ? ((priceHistory[priceHistory.length - 1] - priceHistory[0]) / priceHistory[0]) * 100 
    : 0;

  // Normalized momentum (capped at 100 for score calculation)
  const normalizedMomentum = Math.min(momentum * 2, 100); 

  const score = (infraScore * 0.35) + 
                (demandScore * 0.25) + 
                (normalizedMomentum * 0.20) + 
                (rentalYield * 10 * 0.10) - 
                (competition * 0.10) + 
                (policyBoost * 0.20);

  return Math.min(Math.round(score), 100);
};

export const getClassification = (score) => {
  if (score < 40) return { label: 'Weak', color: 'text-red-500', bg: 'bg-red-500/10' };
  if (score < 60) return { label: 'Watchlist', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
  if (score < 80) return { label: 'Strong Buy', color: 'text-orange-500', bg: 'bg-orange-500/10' };
  return { label: 'Prime Hotspot', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
};
