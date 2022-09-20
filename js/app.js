// replace these values with those generated in your Video API account
const apiKey = "47574141";
const sessionId = "2_MX40NzU3NDE0MX5-MTY2MzY5NjI5MDUyOH5NcTR2cHBnZU95ckZGTDlXTFQ1Tk8yZTF-fg";
const token = "T1==cGFydG5lcl9pZD00NzU3NDE0MSZzaWc9YTIyYTJmYTEyNjEwNjJkOWU0OTA0ZjZkOWZkMDQ0OWU4Y2M5NWE0NjpzZXNzaW9uX2lkPTJfTVg0ME56VTNOREUwTVg1LU1UWTJNelk1TmpJNU1EVXlPSDVOY1RSMmNIQm5aVTk1Y2taR1REbFhURlExVGs4eVpURi1mZyZjcmVhdGVfdGltZT0xNjYzNjk2MzUyJm5vbmNlPTAuMzQ3NzIyNTgzMDc3NjA1ODQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY2NDMwMTE0OSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

// (optional) add server code here
initializeSession();

function initializeSession() {
    const session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });
    // Create a publisher
    const publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);

    // Connect to the session
    session.connect(token, function(error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
                session.publish(publisher, handleError);
        }
    });
}

