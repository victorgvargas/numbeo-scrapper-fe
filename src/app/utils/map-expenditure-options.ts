import { ExpenditureOptions } from "../models/expediture-options.model";

export function mapExpenditureOptions(options: ExpenditureOptions) {
    const finalObj = { cityCentre: false, outskirts: false, threeBedroomCityCentre: false, threeBedroomOutskirts: false };

    if (options.numOfPersons === "single") {
        if (options.cityRegion === 'centre') {
            finalObj.cityCentre = true;
        } else if (options.cityRegion === 'outskirts') {
            finalObj.outskirts = true;
        }
    } else if (options.numOfPersons === 'family') {
        if (options.cityRegion === 'centre') {
            finalObj.threeBedroomCityCentre = true;
        } else if (options.cityRegion === 'outskirts') {
            finalObj.threeBedroomOutskirts = true;
        }
    }

    return finalObj;
}