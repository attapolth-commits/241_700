const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('First name is required');
    }
    if (!userData.lastName) {
        errors.push('Last name is required');
    }
    if (!userData.age) {
        errors.push('Age is required');
    }
    if (!userData.gender) {
        errors.push('Gender is required');
    }
    if (!userData.description) {
        errors.push('Description is required');
    }
    if (!userData.interests) {
        errors.push('Interests are required');
    }
    return errors;
}

const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {};
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message')
    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i != interestDOMs.length - 1) {
                interest += ','
            }
        }

        let userData = {
            firstName: firstNameDOM.value,
            lastName: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }
        console.log('submitData', userData);

        const errors = validateData(userData);
        if (errors.length > 0) {
            throw {
                message: ('please fill in all required fields'),
                errors: errors
            }
        }

        const response = await axios.post('http://localhost:8000/users', userData);
        console.log('response', response)
        messageDOM.innerText = "บันทึกข้อมูลสำเร็จ";
        messageDOM.className = "message success";
    } catch (error) {
        console.error('Error submitting data:', error.message);
        console.error('Error details:', error.errors);
        /*
        if (error.response) {
            console.log('error response', error.response.data.massage);
        }
        */
        let htmlData = '<div>';
        htmlData += '<div>' + error.message + '</div>';
        htmlData += '<ul>';
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += '<li>' + error.errors[i] + '</li>';
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = "message danger";
    }
}
