let balance = 0.00;

function updateBalance() {
    document.getElementById('balance').innerText = balance.toFixed(2);
}

function topUp() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        updateBalance();
        addTransaction('Top Up', amount);
    } else {
        alert('Please enter a valid amount');
    }
}

function deduct() {
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const digitalWalletChecked = document.getElementById('digitalWallet').checked;
    const savedCardChecked = document.getElementById('savedCard').checked;

    if (!digitalWalletChecked && !savedCardChecked) {
        alert('Please select at least one payment method.');
        return;
    }

    if (!isNaN(amount) && amount > 0) {
        if (digitalWalletChecked) {
            if (amount <= balance) {
                balance -= amount;
                updateBalance();
                addTransaction('Deduct (Digital Wallet)', amount);
            } else {
                alert('Insufficient balance');
            }
        } else if (savedCardChecked) {
            addTransaction('Deduct (Saved Card)', amount);
        }
    } else {
        alert('Please enter a valid amount');
    }
}


function addTransaction(type, amount) {
    const transactionList = document.getElementById('transaction-list');
    const transactionItem = document.createElement('li');
    transactionItem.className = 'list-group-item';
    transactionItem.innerText = `${type}: $${amount.toFixed(2)}`;
    transactionList.appendChild(transactionItem);
}

function redirectToProfile() {
    window.location.href = 'profile.html';
}