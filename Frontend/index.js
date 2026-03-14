const BaseURL = 'http://localhost:8000'

let mode = 'CREATE'; //add mode data
let selectedID = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id)
    if (id) {
        mode = 'EDIT';
        selectedID = id;
        
        try{
            const response = await axios.get(`${BaseURL}/users/${id}`);
            console.log('response', response.data);
            const user = response.data
            
            let firstNameDOM = document.querySelector('input[name=firstname]');
            let lastNameDOM = document.querySelector('input[name=lastname]');
            let ageDOM = document.querySelector('input[name=age]');
            let descriptionDOM = document.querySelector('textarea[name=description]');
            
            firstNameDOM.value = user.firstname ;
            lastNameDOM.value = user.lastname ;
            ageDOM.value = user.age ?? '';
            descriptionDOM.value = user.description ?? '';

            let genderDOMs = document.querySelectorAll('input[name=gender]');
            let interestDOMs = document.querySelectorAll('input[name=interests]');

            for (let i = 0; i < genderDOMs.length; i++) {
                if (genderDOMs[i].value == user.gender){
                    genderDOMs[i].checked = true;
                }
            }
            for (let i = 0; i < interestDOMs.length; i++) {
                if (user.interests.includes(interestDOMs[i].value)){
                    interestDOMs[i].checked = true;
                }
            }
        }catch (error){
            console.log('error: ' ,error);
        }
            
    }
}

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
        if (mode == 'CREATE') {
            const response = await axios.post(`${BaseURL}/users`, userData);
            console.log('response', response.data)
        } else {
            const response = await axios.put(`${BaseURL}/users/${selectedID}`, userData);
            console.log('response', response.data)
        }

        messageDOM.innerText = "บันทึกข้อมูลสำเร็จ";
        messageDOM.className = "message success";
    } catch (error) {
        console.error('Error submitting data:', error.message);
        console.error('Error details:', error.errors);
        
        if (error.response) {
            console.log('error response', error.response.data.massage);
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }
        
        let htmlData = '<div>';
        htmlData += '<div>' + message + '</div>';
        if (errors.length) {
            htmlData += '<ul>';
            for (let i = 0; i < errors.length; i++) {
                htmlData += '<li>' + errors[i] + '</li>';
            }
            htmlData += '</ul>';
        }
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = "message danger";
    }
}

