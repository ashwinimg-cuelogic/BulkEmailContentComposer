var handleGetNewsletterContentResponse, handleGetNewsletterDataResponse, handleUpdateNewsletterStatusResponse;

handleGetNewsletterContentResponse = function(error, newsletterData, event) {
    if (error) {
        return { "error": error };
    }
    try{
        newsletterData = JSON.parse(newsletterData);
        if (typeof newsletterData.code !== 'undefined' &&  newsletterData.code !== 200) {
            return { "error": "API Response returns " + newsletterData.messages };
        }
        if (newsletterData === '' || typeof newsletterData.content === 'undefined') {
            return { "error": "NO newsletter found with the given data" };
        }
        return { "content": newsletterData.content };
    } catch(error) {
        return { "error": "parse error" };
    }
}
handleGetNewsletterDataResponse = function(error, newsletterData, event) {
    if (error) {
        return { "error": error };
    }
    try{
        newsletterData = JSON.parse(newsletterData);
        if (typeof newsletterData.code !== 'undefined' &&  newsletterData.code !== 200) {
            return { "error": "API Response returns " + newsletterData.messages };
        }

        if (newsletterData === '' || Object.keys(newsletterData).length == 0) {
            return { "error": "NO newsletter found with the given data" };
        }
        return { "newsletter": newsletterData };
    } catch(error) {
        return { "error": "parse error" };
    }
}

handleUpdateNewsletterStatusResponse = function(error, newsletterData) {
    if (error) {
        return { "error": error };
    }
    try{
        if (typeof newsletterData == 'string') {
            newsletterData = JSON.parse(newsletterData);
        }
        if (typeof newsletterData.code !== 'undefined' &&  newsletterData.code !== 200) {
            return { "error": "API Response returns " + newsletterData.messages };
        }
        return { "newsletter": newsletterData };
    } catch(error) {
        return { "error": "API error" };
    }
}

module.exports = {
    handleGetNewsletterContentResponse: handleGetNewsletterContentResponse,
    handleGetNewsletterDataResponse: handleGetNewsletterDataResponse,
    handleUpdateNewsletterStatusResponse: handleUpdateNewsletterStatusResponse
};
