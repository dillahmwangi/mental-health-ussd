const express = require('express');
const router = express.Router();

router.post('/', (req, res) =>{
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
    } else {
        const textArray = text.split('*');
        const userResponse = textArray[0];

        switch (userResponse) {
            case '1':
                response = `CON Mental Health Information
                1. Understanding Depression
                2. Anxiety Disorders
                3. Stress Management Tips
                4. General Mental Health Tips`;
                break;
            case '2':
                response = `CON Self-Assessment Tools
                1. Depression Assessment
                2. Anxiety Assessment
                3. Stress Level Assessment`;
                break;
            case '3':
                response = `END Emergency Contacts
                1. Suicide Prevention Hotline: 123-456-789
                2. Local Mental Health Clinics: 987-654-321
                3. Crisis Text Line: Text HOME to 741741`;
                break;
            case '4':
                response = `END You have subscribed to Daily Positive Affirmations`;
                // Implement subscription logic here
                break;
            case '5':
                response = `CON Book an Appointment
                1. Counselor
                2. Psychologist
                3. Psychiatrist`;
                break;
            case '6':
                response = `CON Anonymous Support Groups
                1. Depression Support Group
                2. Anxiety Support Group
                3. Substance Abuse Support Group`;
                break;
            case '7':
                response = `CON Coping Strategies
                1. Breathing Exercises
                2. Mindfulness Techniques
                3. Progressive Muscle Relaxation`;
                break;
            default:
                response = `END Invalid option. Please try again.`;
                break;
        }
        res.set('Content-Type', 'text/plain');
        res.send(response);
      }
    });

      
      module.exports = router;
      