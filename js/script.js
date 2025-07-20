document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const calculators = document.querySelectorAll('.calculator');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.id.replace('-nav', '-calculator');

            calculators.forEach(calc => {
                if (calc.id === targetId) {
                    calc.style.display = 'block';
                } else {
                    calc.style.display = 'none';
                }
            });
        });
    });

    const sipForm = document.getElementById('sip-form');
    sipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const monthlyInvestment = document.getElementById('sip-amount').value;
        const annualRate = document.getElementById('sip-rate').value;
        const years = document.getElementById('sip-time').value;

        const monthlyRate = annualRate / 12 / 100;
        const months = years * 12;
        const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

        const resultsDiv = document.getElementById('sip-results');
        resultsDiv.innerHTML = `
            <p>Invested Amount: ₹${(monthlyInvestment * months).toLocaleString()}</p>
            <p>Estimated Returns: ₹${(futureValue - (monthlyInvestment * months)).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            <p>Total Value: ₹${futureValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
        `;
    });

    const mfForm = document.getElementById('mf-form');
    mfForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const principal = document.getElementById('mf-principal').value;
        const annualRate = document.getElementById('mf-rate').value;
        const years = document.getElementById('mf-time').value;

        const rate = annualRate / 100;
        const futureValue = principal * Math.pow((1 + rate), years);

        const resultsDiv = document.getElementById('mf-results');
        resultsDiv.innerHTML = `
            <p>Invested Amount: ₹${Number(principal).toLocaleString()}</p>
            <p>Estimated Returns: ₹${(futureValue - principal).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            <p>Total Value: ₹${futureValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
        `;
    });

    const emiForm = document.getElementById('emi-form');
    emiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loanAmount = document.getElementById('emi-amount').value;
        const annualRate = document.getElementById('emi-rate').value;
        const years = document.getElementById('emi-tenure').value;

        const monthlyRate = annualRate / 12 / 100;
        const months = years * 12;
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

        const totalAmount = emi * months;
        const totalInterest = totalAmount - loanAmount;

        const resultsDiv = document.getElementById('emi-results');
        resultsDiv.innerHTML = `
            <p>Loan EMI: ₹${emi.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            <p>Total Interest Payable: ₹${totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            <p>Total Payment (Principal + Interest): ₹${totalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
        `;
    });

    const reForm = document.getElementById('re-form');
    reForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const purchasePrice = parseFloat(document.getElementById('re-purchase').value);
        const salePrice = parseFloat(document.getElementById('re-sale').value);
        const expenses = parseFloat(document.getElementById('re-expenses').value);
        const years = parseFloat(document.getElementById('re-years').value);

        const netProfit = salePrice - purchasePrice - expenses;
        const returnOnInvestment = (netProfit / (purchasePrice + expenses)) * 100;
        const annualizedReturn = (Math.pow((salePrice / (purchasePrice + expenses)), (1/years)) - 1) * 100;

        const resultsDiv = document.getElementById('re-results');
        resultsDiv.innerHTML = `
            <p>Net Profit: ₹${netProfit.toLocaleString()}</p>
            <p>Return on Investment (ROI): ${returnOnInvestment.toFixed(2)}%</p>
            <p>Annualized Return: ${annualizedReturn.toFixed(2)}%</p>
        `;
    });

    const fdForm = document.getElementById('fd-form');
    fdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const principal = document.getElementById('fd-principal').value;
        const annualRate = document.getElementById('fd-rate').value;
        const years = document.getElementById('fd-time').value;
        const compounding = document.getElementById('fd-compounding').value;

        const rate = annualRate / 100;
        const futureValue = principal * Math.pow((1 + rate / compounding), (compounding * years));

        const resultsDiv = document.getElementById('fd-results');
        resultsDiv.innerHTML = `
            <p>Principal Amount: ₹${Number(principal).toLocaleString()}</p>
            <p>Total Interest: ₹${(futureValue - principal).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            <p>Maturity Value: ₹${futureValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
        `;
    });
});
