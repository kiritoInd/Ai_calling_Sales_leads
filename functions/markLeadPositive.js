async function markLeadPositive(functionArgs) {
    const { leadId } = functionArgs;
    console.log('GPT -> called markLeadPositive function');
    
    // Logic to mark the lead as positive in your system
    // For demonstration, we'll just log and return a success message
  
    console.log(`Lead with ID ${leadId} marked as positive.`);
    return JSON.stringify({ status: 'Success', message: `Lead ${leadId} marked as positive` });
  }
  
  module.exports = markLeadPositive;
  