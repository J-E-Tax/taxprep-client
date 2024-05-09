
import { useState, useEffect} from 'react';
import { Card, CardHeader, CardBody } from '@trussworks/react-uswds';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTaxFormsByUserId, calculateAndSaveTaxReturnsForUser } from '../../api/resultsApi';
import { setTaxReturns, calculateTaxReturnSummary, selectTaxReturnSummary } from '../../features/results/resultsSlice';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./groovyWalk.json";
import store, { RootState } from '../../app/store';
import Confetti from 'react-confetti';

function TaxResults () {

    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const taxReturnSummary = useSelector(selectTaxReturnSummary);
    const showConfetti = taxReturnSummary && taxReturnSummary.totalIncome > 0; // This is to only show confetti if tax return has been calculated
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
      calculateAndSaveTaxReturnsForUser(userId)
        .then((res) => {
          console.log(res);
          setTrigger(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    , [userId]);

    // This get will run after calculation is done
    useEffect(() => {
      if (!trigger) return;
      getTaxFormsByUserId(userId)
        .then((res) => {
          dispatch(setTaxReturns(res.data));
          dispatch(calculateTaxReturnSummary());
        })
        .catch((err) => {
          console.error(err);
        });
    }, [dispatch, userId, trigger]);

    return (
      <div className="results-container" style={{ maxWidth: '500px', margin: '20px auto' }}>
        {/* This is the confetti effect, will show if showConfetti is true */}
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <Card>
          <CardHeader className="bg-primary">
            <h2 className="text-white">Your Estimated Federal Refund</h2>
          </CardHeader>
          <CardBody>
              {taxReturnSummary && taxReturnSummary.totalIncome > 0 ? (
                <>
                  {taxReturnSummary.totalTaxRefundOrOwed >= 0 ?
                    <p style={{ color: 'green' }}>Refund: ${taxReturnSummary.totalTaxRefundOrOwed}.</p> :
                    <p style={{ color: 'red' }}>Owed ${taxReturnSummary.totalTaxRefundOrOwed}.</p>
                  }
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li><strong>Income:</strong> ${taxReturnSummary.totalIncome}</li>
                    <li><strong>Deductions:</strong> ${taxReturnSummary.totalDeductions}</li>
                    <li><strong>Taxable Income:</strong> ${taxReturnSummary.totalTaxableIncome}</li>
                    <li><strong>Marginal Tax Rate:</strong> {taxReturnSummary.marginalTaxRate}%</li>
                    <li><strong>Total Federal Tax:</strong> ${taxReturnSummary.totalFederalTax}</li>
                  </ul>
                </>
              ) : (
                <p>Tax results cannot be accessed until your tax forms are completed</p>
              )}
          </CardBody>
        </Card>
        <Lottie animationData={groovyWalkAnimation} />;
      </div>
    );
}

export default TaxResults;
