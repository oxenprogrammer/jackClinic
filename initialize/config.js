/*jshint esversion: 6 */
const config = require('config');

module.exports = () => {
    if (!config.get('authJWTPrivateKey')) {
        throw new Error('FATAL ERROR: authJWTPrivateKey not set');
    }
}