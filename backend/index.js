const {
    Expo
} = require('expo-server-sdk');

const accessToken = `YQmI2YQRe0AgHzw1l7jsIoPlytl-_qOvf5dcLkaE`
const expo = new Expo({
    accessToken: accessToken
});

async function sendPushNotification(token, title, body) {
    if (!Expo.isExpoPushToken(token)) {
        console.error('Invalid Expo push token');
        return;
    }

    const messages = [{
        to: token,
        sound: 'default',
        title: title,
        body: body,
    }, ];

    try {
        const chunks = expo.chunkPushNotifications(messages);
        const tickets = [];
        for (const chunk of chunks) {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        }
        console.log('Push notifications sent successfully:', tickets);
    } catch (error) {
        console.error('Error sending push notifications:', error);
    }
}

const recipientToken = 'ExponentPushToken[F0wnz-HQNAiOha9sA3QM6-]';
const notificationTitle = 'Hello';
const notificationBody = 'This is a test notification';

sendPushNotification(recipientToken, notificationTitle, notificationBody);