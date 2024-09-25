const billAmmount = document.querySelector('#billAmmount');
const tipPercent = document.querySelector('#tipPercent');
const noOfPeople = document.querySelector('#noOfPeople');
const tipAmmountElem = document.querySelector('#tipAmmount');
const totalBillElem = document.querySelector('#totalBill');
const splitAmmountElem = document.querySelector('#splitAmmount');
const printbtn = document.querySelector('#print');
const resiltDiv = document.querySelector('.result-data-cotainer');
const resetbtn = document.querySelector('#reset');
const billingData = {};

[billAmmount, tipPercent, noOfPeople].forEach((item) => {
    item.addEventListener('input', function (e) {
        console.log(billingData)
        const value = parseFloat(this.value);
        if (!isNaN(value) && value > 0) {
            billingData[this.id] = value;
        } else {
            billingData[this.id] = 0;  
        }

        if (billingData.billAmmount !== undefined && !isNaN(billingData.tipPercent) && billingData.tipPercent !== undefined) {
            const tip =calcPartOfpercent(billingData.billAmmount, billingData.tipPercent);
            tipAmmountElem.innerText = tip;
        
            const totalBill = tip + billingData.billAmmount;
            totalBillElem.innerText = totalBill.toFixed(2);
        
            if (billingData.noOfPeople && billingData.noOfPeople > 0) {
                const splitAmount = totalBill / billingData.noOfPeople;
                splitAmmountElem.innerText = splitAmount.toFixed(2);
            }
        }
    });
});

document.querySelectorAll('.tip-option').forEach(item => {
    item.addEventListener('click', function(e){
        tipPercent.value = e.target.dataset.value   
        const event = new Event('input', { bubbles: true });
        tipPercent.dispatchEvent(event);
    })
})
printbtn.addEventListener('click', function(e){
    let mywindow = window.open("", "PRINT", 
        "height=400,width=600");

    mywindow.document.write(resiltDiv.innerHTML);

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();

    return true;
})
resetbtn.addEventListener('click', function(e){
    const inputElemList = document.querySelectorAll('input')
    inputElemList.forEach((item) => item.value = '')
})
function calcPartOfpercent(total, percentage) {
    return parseFloat(((percentage / 100) * total).toFixed(2));
}
