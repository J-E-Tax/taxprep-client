
import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@trussworks/react-uswds';


function TaxResults () {

    const [refund] = useState(300);
    const [income] = useState(50000);
    const [deductions] = useState(10000);
    const [taxableIncome] = useState(40000);
    const [marginalTaxRate] = useState(22);
    const [totalFederalTax] = useState(8800);

  return (
    <div className="results-container" style={{ maxWidth: '500px', margin: '20px auto' }}>
      <Card>
        <CardHeader>
          <h2>Your Estimated Federal Refund</h2>
        </CardHeader>
        <CardBody>

          {refund >= 0 ? <p style={{ color: 'green' }}>Refund: ${refund}.</p> : <p style={{ color: 'red' }}>Owed ${refund}.</p>}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><strong>Income:</strong> ${income}</li>
            <li><strong>Deductions:</strong> ${deductions}</li>
            <li><strong>Taxable Income:</strong> ${taxableIncome}</li>
            <li><strong>Marginal Tax Rate:</strong> {marginalTaxRate}%</li>
            <li><strong>Total Federal Tax:</strong> ${totalFederalTax}</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export default TaxResults;