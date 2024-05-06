export const mergePayload = (launch1_id, launch2_id) => {
    return {
        description: `Merged Launch from ${launch1_id} and ${launch2_id}.`,
        name: 'Merged Launch',
        extendSuitesDescription: true,
        launches: [launch1_id, launch2_id
        ],
        mergeType: 'BASIC',
        mode: 'DEFAULT'
    };
};

export const createPayload = {
    owner: 'anahitrp',
    description: '### **Demonstration launch.**',
    name: 'Posted Api Tests',
    startTime: Date.now(),
    status: 'PASSED',
    mode: 'DEFAULT',
    total: 55
};

export const stopPayload = (id) => {
    return {
        entities: {
            [`${id}`]: {
                endTime: Date.now(),
                status: 'STOPPED'
            }
        }
    };
};
