import { GoogleGenerativeAI }  from "@google/generative-ai";
const express = require('express');
const router = express.Router();
require('dotenv').config();

const credentials = {
    apiKey: 'MyAppAPIkey',
    username: 'MyAppUsername',
}

const Africastalking = require('africastalking')(credentials);

// Get the SMS service
const sms = Africastalking.SMS;


// Import the OpenAI library
const { OpenAI } = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);



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
            const completion = await openai.complete({
                engine: 'davinci', // You can use other engines based on your preference
                prompt: "Generate information on mental health.",
                maxTokens: 150 // Adjust the token count as needed
            });
            response = `END Mental Health Information: ${completion.data.choices[0].text.trim()}`;
        } catch (error) {
            console.error("Error generating mental health information:", error);
            response = `END Error generating mental health information. Please try again later.`;
        }
    } else if (text === '2') {
        try {
            const completion = await openai.complete({
                engine: 'davinci', // You can use other engines based on your preference
                prompt: "Generate self-assessment tools for mental health.",
                maxTokens: 150 // Adjust the token count as needed
            });
            response = `END Self-Assessment Tools: ${completion.data.choices[0].text.trim()}`;
        } catch (error) {
            console.error("Error generating self-assessment tools:", error);
            response = `END Error generating self-assessment tools. Please try again later.`;
        }
    } else if (text === '3') {
        // Make a call to the user
        voice.call({
            callFrom: 'your_africas_talking_virtual_number', // Replace with your Africa's Talking virtual number
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
    } else if (text === '7') {
        response = `CON Coping Strategies
        1. Breathing Exercises
        2. Mindfulness Techniques
        3. Progressive Muscle Relaxation`;
    } else {
        response = `END Invalid option. Please try again.`;
    }
    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);

});


module.exports = router;



