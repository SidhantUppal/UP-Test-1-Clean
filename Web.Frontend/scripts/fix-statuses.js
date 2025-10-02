// Fix Compliant status to Approved
async function fixStatuses() {
  try {
    // Get all records with Compliant status
    const response = await fetch('http://localhost:3000/api/legal-register/database?complianceStatus=Compliant&limit=1000');
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      console.log(`Found ${data.data.length} records with Compliant status`);
      
      for (const item of data.data) {
        console.log(`Updating ${item.Name}...`);
        
        const updateResponse = await fetch(`http://localhost:3000/api/legal-register/database?id=${item.LegalRegisterID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-user-area-id': '1'
          },
          body: JSON.stringify({
            name: item.Name,
            link: item.Link,
            industryName: item.IndustryName,
            riskLevel: item.RiskLevel,
            complianceStatus: 'Approved',
            notes: item.Notes || '',
            legislationType: item.LegislationType
          })
        });
        
        if (updateResponse.ok) {
          console.log(`✓ Updated ${item.Name}`);
        } else {
          console.log(`✗ Failed to update ${item.Name}`);
        }
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log('Done!');
    } else {
      console.log('No Compliant records found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

fixStatuses();