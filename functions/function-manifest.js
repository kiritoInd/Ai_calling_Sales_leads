const tools = [
  {
    type: 'function',
    function: {
      name: 'Yes',
      // say: 'Thank you for your interest! I will mark this as a lead to follow up later.',
      description: 'Marks a lead as positive when user says Yes',
      parameters: {
        type: 'object',
        properties: {
          lead: { 
            type: 'string',
            description: 'positive',
          },
        },
        required: ['lead'],
      },
      returns: {
        type: 'object',
        properties: {
          m: {
            type: 'String',
            description: 'positive'
          }
        }
      }
    },
  },
  {
    type: 'function',
    function: {
      name: 'No',
      // say: 'Noted. I will mark this as a lead to follow up later.',
      description: 'Marks a lead as negative when user says No',
      parameters: {
        type: 'object',
        properties: {
          lead: {
            type: 'string',
            description: 'negitive',
          },
        },
        required: ['lead'],
      },
      returns: {
        type: 'object',
        properties: {
          m: {
            type: 'String',
            description: 'negetive' 
          }
        }
      }
    },
  },
  {
    type: 'function',
    function: {
      name: 'EndCall',
      // say: 'Noted. I will mark this as a lead to follow up later.',
      description: 'End the call',
      parameters: {
        type: 'object',
        properties: {
          lead: {
            type: 'string',
            description: 'Call Ended',
          },
        },
        required: ['callSid'],
      },
      returns: {
        type: 'object',
        properties: {
          m: {
            type: 'String',
            description: 'Call Ended' 
          }
        }
      }
    },
  }
];

module.exports = tools;
