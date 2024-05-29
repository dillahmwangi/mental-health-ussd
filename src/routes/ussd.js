const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const router = express.Router();
require('dotenv').config();

const credentials = {
    apiKey: 'e6bd7c3bf8272e96742c0fbcbf862e8b5391f7347a6103450b946ebcee96598f',
    username: 'itAirtime',
}

const Africastalking = require('africastalking')(credentials);

// Get the SMS service
const sms = Africastalking.SMS;
const voice = Africastalking.VOICE;



const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY);


router.post('/', async(req, res) =>{
    const {sessionId, serviceCode, phoneNumber, text} = req.body;

    let response = '';


    if (text === '') {
        // Initial menu
        response = `CON Welcome to Mental Health Support
        1. Mental Health Information
        2. Self-Assessment Tools
        3. Emergency Contacts
        4. Daily Positive Affirmations
        5. Book an Appointment
        6. Anonymous Support Groups
        7. Coping Strategies`;
    } else if (text === '1') {
        try {
           
            let model = genAI.getGenerativeModel({ model: "gemini-pro"});
            let prompt = 'Generate information for mental health' + "Please limit the promote to 100 characters";
            let result = await model.generateContent(prompt);
            let response = await result.response;
            let text = await response.text();
        
            const options = {
                to: [phoneNumber],
                message: `${text}`
            };

            sms.send(options)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });        
            console.log(text);
            response = `END Thank you`
            } catch (error) {
            console.error("Error generating infromation tools:", error);
            response = `END Error generating Information. Please try again later.`;
        }
    } else if (text === '2') {
        try {
           
            let model = genAI.getGenerativeModel({ model: "gemini-pro"});
            let prompt = 'Generate self-assessment tools for mental health' + "Please limit the promote to 100 characters";
            let result = await model.generateContent(prompt);
            let response = await result.response;
            let text = await response.text();
        
            const options = {
                to: [phoneNumber],
                message: `${text}`
            };

            sms.send(options)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });        
        
            console.log(text);
            response = `END Self-Assessment Tools`;
        } catch (error) {
            console.error("Error generating self-assessment tools:", error);
            response = `END Error generating self-assessment tools. Please try again later.`;
        }
    } else if (text === '3') {
        // Make a call to the user
        voice.call({
            callFrom: '+254111052352', // Replace with your Africa's Talking virtual number
            callTo: phoneNumber
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });

        response = `END You will receive a call shortly.`;
    // } else if (text === '3') {
    //     response = `END Emergency Contacts
    //     1. Suicide Prevention Hotline: 123-456-789
    //     2. Local Mental Health Clinics: 987-654-321
    //     3. Crisis Text Line: Text HOME to 741741`;
    } else if (text === '4') {
        response = `END You have subscribed to Daily Positive Affirmations`;
        // Implement subscription logic here
    } else if (text === '5') {
        response = `CON Book an Appointment
        1. Counselor
        2. Psychologist
        3. Psychiatrist`;
    } else if (text === '5*1' || text === '5*2' || text === '5*3') {
        response = `CON Select the time
        1. Morning
        2. Afternoon
        3. Evening`;
    } else if (text.startsWith('5*1*') || text.startsWith('5*2*') || text.startsWith('5*3*')) {
        const textArray = text.split('*');
        if (textArray.length === 3) {
            response = `CON Select appointment type
            1. Physical
            2. Online`;
        } else if (textArray.length === 4) {
            const appointmentTypeMap = {
                '5*1': 'Counselor',
                '5*2': 'Psychologist',
                '5*3': 'Psychiatrist'
            };
            const timeMap = {
                '1': 'Morning',
                '2': 'Afternoon',
                '3': 'Evening'
            };

            const appointmentType = appointmentTypeMap[`${textArray[0]}*${textArray[1]}`];
            const time = timeMap[textArray[2]];
            const sessionType = textArray[3] === '1' ? 'Physical' : 'Online';

            response = `END You have booked an appointment with a ${appointmentType} in the ${time} for a ${sessionType} session. You will receive an SMS confirmation shortly.`;

            // Send SMS confirmation
            const options = {
                to: [phoneNumber],
                message: `Your appointment with a ${appointmentType} in the ${time} for a ${sessionType} session is confirmed.`
            };

            sms.send(options)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    
    } else if (text === '6') {
        response = `CON Anonymous Support Groups
        1. Depression Support Group
        2. Anxiety Support Group
        3. Substance Abuse Support Group`;
       
    } 
    else if (text === '6*2') {
        response = `END Thank you for participating in our anonymous support group for anxiety. We hope you`
    }
    else if (text === '7') {
        response = `CON Coping Strategies
        1. Breathing Exercises
        2. Mindfulness Techniques
        3. Progressive Muscle Relaxation`;
    } else {
        response = `END Thank you for reaching out.`;
    }
    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);

});


module.exports = router;



