#!/usr/bin/env node

export default function getTimestamp() {
    const result = {
        timestamp: new Date().toISOString(),
    };

    result.safeTimestamp = result.timestamp.replace(/[-:Z]/g, '').replace('T', '-');
    return result;
}
