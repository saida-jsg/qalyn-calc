document.getElementById('submit').addEventListener('click', () => {
    let name = document.getElementById('name').value;
    let price = parseFloat(document.getElementById('startingBid').value);
    let loveLetter = document.getElementById('loveLetter').value;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = '';

    if (!name || isNaN(price)) {
        errorMessage.textContent = "Please enter both name and starting bid";
        return;
    }

    const education = parseFloat(document.getElementById('education').value);
    price *= education;

    const netWorth = parseFloat(document.getElementById('networth').value);
    price *= netWorth;

    const caste = parseFloat(document.getElementById('caste').value);
    price += caste;

    const skillElements = document.querySelectorAll('input[type="checkbox"][class="skills"]:checked');
    const skillsBonus = Array.from(skillElements)
        .map(skill => parseFloat(skill.value))
        .reduce((acc, val) => acc + val, 0);
    price += skillsBonus;

    const age = parseFloat(document.querySelector('input[name="age"]:checked').value);
    price *= age;

    const reputationElements = document.querySelectorAll('input[type="checkbox"][class="reputation"]:checked');
    for (let i = 0; i < reputationElements.length; i++) {
        const value = parseFloat(reputationElements[i].value);
        if (value < 1) {
            price *= value; 
        } else {
            price += value; 
        }
    }

    const person = {
        name,
        price: price.toFixed(2),
        loveLetter
    };

    document.getElementById('finalPrice').innerHTML = `
        Your price for ${person.name} is $${person.price}<br>
        <strong>Love letter:</strong> ${person.loveLetter}
    `;
});