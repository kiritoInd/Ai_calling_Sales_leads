async function markLeadNegative(functionArgs) {
    const { leadId } = functionArgs;
    console.log('GPT -> called markLeadNegative function');
    
    // Logic to mark the lead as negative in your system
    // For demonstration, we'll just log and return a success message
  
    console.log(`Lead with ID ${leadId} marked as negative.`);
    return JSON.stringify({ status: 'Success', message: `Lead ${leadId} marked as negative` });
  }
  
  module.exports = markLeadNegative;
  