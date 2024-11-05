document.addEventListener('DOMContentLoaded', () => {
    const fromamountelement = document.querySelector(".fromamount");
    const convertedamountelement = document.querySelector(".converted-amount");
    const fromcurrencyelement = document.querySelector(".from_currency");
    const tocurrencyelement = document.querySelector(".To_currency");
    const resultelement = document.querySelector(".result");
    const ontainerr = document.querySelector(".converter-container")
    // ARRAY TO POPULATE THE SELECT COUNTRIES
    const countries = [
        { code: "USD", Name: "United States Dollar" },
        { code: "EUR", Name: "Euro" },
        { code: "JPY", Name: "Japanese Yen" },
        { code: "GBP", Name: "British Pound Sterling" },
        { code: "AUD", Name: "Australian Dollar" },
        { code: "CAD", Name: "Canadian Dollar" },
        { code: "CHF", Name: "Swiss Franc" },
        { code: "CNY", Name: "Chinese Yuan Renminbi" },
        { code: "INR", Name: "Indian Rupee" },
        { code: "AFN", Name: "Afghan Afghani" },
        { code: "PKR", Name: "Pakistani Rupee" },
        { code: "BRL", Name: "Brazilian Real" },
        { code: "ZAR", Name: "South African Rand" },
        { code: "MXN", Name: "Mexican Peso" },
        { code: "RUB", Name: "Russian Ruble" },
        { code: "KRW", Name: "South Korean Won" },
        { code: "SGD", Name: "Singapore Dollar" },
        { code: "HKD", Name: "Hong Kong Dollar" },
        { code: "NZD", Name: "New Zealand Dollar" },
        { code: "SEK", Name: "Swedish Krona" },
        { code: "NOK", Name: "Norwegian Krone" },
        { code: "TRY", Name: "Turkish Lira" }
    ];

    // Showing countries from array to select tag
    countries.forEach(country => {
        const option1 = document.createElement('option');
        option1.value = country.code;
        option1.textContent = `${country.code} (${country.Name})`;
        fromcurrencyelement.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = country.code;
        option2.textContent = `${country.code} (${country.Name})`;
        tocurrencyelement.appendChild(option2);
    });

    // Setting default values
    fromcurrencyelement.value = "USD";
    tocurrencyelement.value = "AFN";

    const getschange = async () => {
        const amount = parseFloat(fromamountelement.value);
        const fromcurrency = fromcurrencyelement.value;
        const tocurrency = tocurrencyelement.value;

        if (isNaN(amount) || amount <= 0) {
            convertedamountelement.value = '';
            return;
        }

        try {
            // Fetch data from the API
            const response = await fetch(`https://v6.exchangerate-api.com/v6/2234e5eb64eca303dac56234/latest/${fromcurrency}`);
            const data = await response.json();

            // Correctly access conversion rates
            const conversionRate = data.conversion_rates[tocurrency];
            const convertedamount = (amount * conversionRate).toFixed(2); // format to 2 decimal places
            convertedamountelement.value = convertedamount;
            resultelement.textContent='fetching currency';
            resultelement.textContent =`${amount} ${fromcurrency} =${convertedamount} ${tocurrency}`
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            ontainerr.innerHTML = "eror while fetchin excange rates";
        }
    };

    // Add event listeners
    fromamountelement.addEventListener('input', getschange);
    fromcurrencyelement.addEventListener('change', getschange);
    tocurrencyelement.addEventListener('change', getschange);
});
