/**
 * dto class for addresses
 */
class AddressDto {
    constructor(addressName, city, state, country, postalCode){
        this.addressName = addressName
        this.city = city
        this.state = state
        this.country = country
        this.postalCode = postalCode
    }
}

module.exports = AddressDto