async function markLeadPositive(lead) {
  console.log("it is a" + lead);
  return JSON.stringify({ message: 'Thank you for your interest! I will mark this as a lead to follow up later.'});
}

module.exports = markLeadPositive;
