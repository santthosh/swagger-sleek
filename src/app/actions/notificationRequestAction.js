export const NOTIFICATION_ACKNOWLEDGED = 'NOTIFICATION_ACKNOWLEDGED';

export const acknowledgeNotification = () => {
    return {
        type: NOTIFICATION_ACKNOWLEDGED
    }
};
