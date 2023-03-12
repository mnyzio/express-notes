const devLogs = (req, res, next) => {
    // GET Color
    const FgBlue = "\x1b[34m";
    // POST Color
    const FgGreen = "\x1b[32m";
    // DELETE Color
    const FgRed = "\x1b[31m";
    // Color Reset
    const ColorReset = "\x1b[0m";

    // LOG all requests to console with different color based on req.method
    switch (req.method) {
        case 'GET': {
            console.info(`${FgBlue}${req.method} request to ${req.path}${ColorReset}`);
            break;
        }
        case 'POST': {
            console.log(`${FgGreen}${req.method} request to ${req.path}${ColorReset}`);
            break;
        }
        case 'DELETE': {
            console.log(`${FgRed}${req.method} request to ${req.path}${ColorReset}`);
            break;
        }
        default:
            console.log();
    }

    next();
}

exports.devLogs = devLogs;