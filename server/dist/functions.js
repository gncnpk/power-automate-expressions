"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowFunctions = void 0;
// --- Complete Function Data Map ---
exports.workflowFunctions = new Map([
    // A
    [
        "action",
        {
            name: "action",
            minArgs: 0,
            maxArgs: 0,
            paramTypes: [],
            returnType: "Object",
            description: "Return the current action's output object at runtime. Use properties like .outputs, .inputs, .startTime, .endTime, .status, etc. (special context).",
        },
    ],
    [
        "actions",
        {
            name: "actions",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // actionName
            returnType: "Object",
            description: "Return a specific action's output object at runtime, including outputs, inputs, status, etc.",
        },
    ],
    [
        "add",
        {
            name: "add",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike", "NumberLike"], // summand1, summand2
            returnType: "Number",
            description: "Return the result from adding two numbers.",
        },
    ],
    [
        "adddays",
        {
            name: "addDays",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["TimestampString", "Integer", "String"], // timestamp, days, format?
            returnType: "TimestampString",
            description: "Add a number of days to a timestamp.",
        },
    ],
    [
        "addhours",
        {
            name: "addHours",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["TimestampString", "Integer", "String"], // timestamp, hours, format?
            returnType: "TimestampString",
            description: "Add a number of hours to a timestamp.",
        },
    ],
    [
        "addminutes",
        {
            name: "addMinutes",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["TimestampString", "Integer", "String"], // timestamp, minutes, format?
            returnType: "TimestampString",
            description: "Add a number of minutes to a timestamp.",
        },
    ],
    [
        "addproperty",
        {
            name: "addProperty",
            minArgs: 3,
            maxArgs: 3,
            paramTypes: ["Object", "String", "Any"], // object, propertyName, value
            returnType: "Object",
            description: "Add a property and its value to a JSON object. Fails if property already exists.",
        },
    ],
    [
        "addseconds",
        {
            name: "addSeconds",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["TimestampString", "Integer", "String"], // timestamp, seconds, format?
            returnType: "TimestampString",
            description: "Add a number of seconds to a timestamp.",
        },
    ],
    [
        "addtotime",
        {
            name: "addToTime",
            minArgs: 3,
            maxArgs: 4,
            paramTypes: ["TimestampString", "Integer", "String", "String"], // timestamp, interval, timeUnit, format?
            returnType: "TimestampString",
            description: "Add a number of time units to a timestamp.",
        },
    ],
    [
        "and",
        {
            name: "and",
            minArgs: 2,
            maxArgs: -1,
            paramTypes: ["Boolean"], // expression1, expression2, ...
            returnType: "Boolean",
            description: "Check whether all expressions are true.",
        },
    ],
    [
        "array",
        {
            name: "array",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Any"], // value
            returnType: "Array",
            description: "Return an array from a single specified input.",
        },
    ],
    // B
    [
        "base64",
        {
            name: "base64",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // value
            returnType: "Base64String",
            description: "Return the base64-encoded version for a string.",
        },
    ],
    [
        "base64tobinary",
        {
            name: "base64ToBinary",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Base64String"], // value
            returnType: "BinaryString",
            description: "Return the binary version for a base64-encoded string.",
        },
    ],
    [
        "base64tostring",
        {
            name: "base64ToString",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Base64String"], // value
            returnType: "String",
            description: "Return the string version for a base64-encoded string (decoding). Preferred over decodeBase64().",
        },
    ],
    [
        "binary",
        {
            name: "binary",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // value
            returnType: "BinaryString",
            description: "Return the base64-encoded binary version of a string.",
        },
    ],
    [
        "body",
        {
            name: "body",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // actionName
            returnType: "Any",
            description: "Return an action's body output. Shorthand for actions('<actionName>').outputs.body.",
        },
    ],
    [
        "bool",
        {
            name: "bool",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Any"], // value
            returnType: "Boolean",
            description: "Return the Boolean version of a value.",
        },
    ],
    // C
    [
        "chunk",
        {
            name: "chunk",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String | Array", "Integer"], // collection, length
            returnType: "Array",
            description: "Split a string or array into chunks of equal length.",
        },
    ],
    [
        "coalesce",
        {
            name: "coalesce",
            minArgs: 1,
            maxArgs: -1,
            paramTypes: ["Any"], // object1, object2, ...
            returnType: "Any",
            description: "Return the first non-null value from one or more parameters.",
        },
    ],
    [
        "concat",
        {
            name: "concat",
            minArgs: 2,
            maxArgs: -1,
            paramTypes: ["String"], // text1, text2, ...
            returnType: "String",
            description: "Combine two or more strings.",
        },
    ],
    [
        "contains",
        {
            name: "contains",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String | Array | Object", "Any"], // collection, value
            returnType: "Boolean",
            description: "Check whether a collection has a specific item. Case-sensitive.",
        },
    ],
    [
        "convertfromutc",
        {
            name: "convertFromUtc",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["TimestampString", "String", "String"], // timestamp, destinationTimeZone, format?
            returnType: "TimestampString",
            description: "Convert a timestamp from Universal Time Coordinated (UTC) to the target time zone.",
        },
    ],
    [
        "converttimezone",
        {
            name: "convertTimeZone",
            minArgs: 3,
            maxArgs: 4,
            paramTypes: ["TimestampString", "String", "String", "String"], // timestamp, sourceTimeZone, destinationTimeZone, format?
            returnType: "TimestampString",
            description: "Convert a timestamp from the source time zone to the target time zone.",
        },
    ],
    [
        "converttoutc",
        {
            name: "convertToUtc",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["TimestampString", "String", "String"], // timestamp, sourceTimeZone, format?
            returnType: "TimestampString",
            description: "Convert a timestamp from the source time zone to Universal Time Coordinated (UTC).",
        },
    ],
    [
        "createarray",
        {
            name: "createArray",
            minArgs: 1,
            maxArgs: -1,
            paramTypes: ["Any"], // object1, object2, ...
            returnType: "Array",
            description: "Return an array from multiple inputs.",
        },
    ],
    // D
    [
        "datauri",
        {
            name: "dataUri",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // value
            returnType: "DataUriString",
            description: "Return a data uniform resource identifier (URI) for a string.",
        },
    ],
    [
        "datauritobinary",
        {
            name: "dataUriToBinary",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["DataUriString"], // value
            returnType: "BinaryString",
            description: "Return the binary version for a data uniform resource identifier (URI). Preferred over decodeDataUri().",
        },
    ],
    [
        "datauritostring",
        {
            name: "dataUriToString",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["DataUriString"], // value
            returnType: "String",
            description: "Return the string version for a data uniform resource identifier (URI).",
        },
    ],
    [
        "datedifference",
        {
            name: "dateDifference",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["TimestampString", "TimestampString"], // startDate, endDate
            returnType: "TimespanString",
            description: "Return the difference between two timestamps as a timespan string.",
        },
    ],
    [
        "dayofmonth",
        {
            name: "dayOfMonth",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["TimestampString"], // timestamp
            returnType: "Integer",
            description: "Return the day of the month component from a timestamp.",
        },
    ],
    [
        "dayofweek",
        {
            name: "dayOfWeek",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["TimestampString"], // timestamp
            returnType: "Integer",
            description: "Return the day of the week component from a timestamp (Sunday is 0).",
        },
    ],
    [
        "dayofyear",
        {
            name: "dayOfYear",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["TimestampString"], // timestamp
            returnType: "Integer",
            description: "Return the day of the year component from a timestamp.",
        },
    ],
    [
        "decimal",
        {
            name: "decimal",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // value
            returnType: "Number", // Represents a high-precision decimal
            description: "Return a decimal number from a string.",
        },
    ],
    [
        "decodebase64",
        {
            name: "decodeBase64",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Base64String"], // value
            returnType: "String",
            description: "Return the string version for a base64-encoded string. Deprecated, use base64ToString().",
        },
    ],
    [
        "decodedatauri",
        {
            name: "decodeDataUri",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["DataUriString"], // value
            returnType: "BinaryString",
            description: "Return the binary version for a data uniform resource identifier (URI). Not preferred, use dataUriToBinary().",
        },
    ],
    [
        "decodeuricomponent",
        {
            name: "decodeUriComponent",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // value
            returnType: "String",
            description: "Return a string that replaces escape characters with decoded versions.",
        },
    ],
    [
        "div",
        {
            name: "div",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike", "NumberLike"], // dividend, divisor
            returnType: "Number",
            description: "Return the result from dividing two numbers (integer division if both inputs are integers).",
        },
    ],
    // E
    [
        "encodeuricomponent",
        {
            name: "encodeUriComponent",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // value
            returnType: "UriString",
            description: "Return a URI-encoded version for a string by replacing URL-unsafe characters with escape characters. Not preferred, use uriComponent().",
        },
    ],
    [
        "empty",
        {
            name: "empty",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Collection"], // collection (String, Array, or Object)
            returnType: "Boolean",
            description: "Check whether a collection is empty.",
        },
    ],
    [
        "endswith",
        {
            name: "endsWith",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "String"], // text, searchText
            returnType: "Boolean",
            description: "Check whether a string ends with a specific substring. Not case-sensitive.",
        },
    ],
    [
        "equals",
        {
            name: "equals",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["Any", "Any"], // object1, object2
            returnType: "Boolean",
            description: "Check whether both values, expressions, or objects are equivalent.",
        },
    ],
    // F
    [
        "first",
        {
            name: "first",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String | Array"], // collection
            returnType: "Any",
            description: "Return the first item from a string or array.",
        },
    ],
    [
        "float",
        {
            name: "float",
            minArgs: 1,
            maxArgs: 2,
            paramTypes: ["String", "String"], // value, locale?
            returnType: "Float",
            description: "Convert a string version for a floating-point number to an actual floating point number.",
        },
    ],
    [
        "formatdatetime",
        {
            name: "formatDateTime",
            minArgs: 1,
            maxArgs: 3,
            paramTypes: ["TimestampString", "String", "String"], // timestamp, format?, locale?
            returnType: "String",
            description: "Return a timestamp in the specified format.",
        },
    ],
    [
        "formdatamultivalues",
        {
            name: "formDataMultiValues",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "String"], // actionName, key
            returnType: "Array",
            description: "Create an array with the values that match a key name in an action's form-data or form-encoded outputs.",
        },
    ],
    [
        "formdatavalue",
        {
            name: "formDataValue",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "String"], // actionName, key
            returnType: "String",
            description: "Return a single value that matches a key name in an action's form-data or form-encoded output. Throws error if multiple matches.",
        },
    ],
    [
        "formatnumber",
        {
            name: "formatNumber",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["NumberLike", "String", "String"], // number, format, locale?
            returnType: "String",
            description: "Return a number as a string based on the specified format.",
        },
    ],
    // G
    [
        "getfuturetime",
        {
            name: "getFutureTime",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["Integer", "String", "String"], // interval, timeUnit, format?
            returnType: "TimestampString",
            description: "Return the current timestamp plus the specified time units.",
        },
    ],
    [
        "getpasttime",
        {
            name: "getPastTime",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["Integer", "String", "String"], // interval, timeUnit, format?
            returnType: "TimestampString",
            description: "Return the current timestamp minus the specified time units.",
        },
    ],
    [
        "greater",
        {
            name: "greater",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike | String", "NumberLike | String"], // value, compareTo
            returnType: "Boolean",
            description: "Check whether the first value is greater than the second value.",
        },
    ],
    [
        "greaterorequals",
        {
            name: "greaterOrEquals",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike | String", "NumberLike | String"], // value, compareTo
            returnType: "Boolean",
            description: "Check whether the first value is greater than or equal to the second value.",
        },
    ],
    [
        "guid",
        {
            name: "guid",
            minArgs: 0,
            maxArgs: 1,
            paramTypes: ["String"], // format?
            returnType: "String",
            description: "Return a globally unique identifier (GUID) as a string.",
        },
    ],
    // I
    [
        "if",
        {
            name: "if",
            minArgs: 3,
            maxArgs: 3,
            paramTypes: ["Boolean", "Any", "Any"], // expression, valueIfTrue, valueIfFalse
            returnType: "Any",
            description: "Check whether an expression is true or false. Based on the result, return a specified value.",
        },
    ],
    [
        "indexof",
        {
            name: "indexOf",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "String"], // text, searchText
            returnType: "Integer",
            description: "Return the starting position or index value for a substring. Not case-sensitive. Returns -1 if not found.",
        },
    ],
    [
        "int",
        {
            name: "int",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // value
            returnType: "Integer",
            description: "Convert the string version for an integer to an actual integer number.",
        },
    ],
    [
        "intersection",
        {
            name: "intersection",
            minArgs: 2,
            maxArgs: -1,
            paramTypes: ["Array | Object"], // collection1, collection2, ...
            returnType: "Array | Object",
            description: "Return a collection that has only the common items across the specified collections.",
        },
    ],
    [
        "isfloat",
        {
            name: "isFloat",
            minArgs: 1,
            maxArgs: 2,
            paramTypes: ["String", "String"], // string, locale?
            returnType: "Boolean",
            description: "Return a boolean indicating whether a string is a floating-point number.",
        },
    ],
    [
        "isint",
        {
            name: "isInt",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // string
            returnType: "Boolean",
            description: "Return a boolean that indicates whether a string is an integer.",
        },
    ],
    [
        "item",
        {
            name: "item",
            minArgs: 0,
            maxArgs: 0,
            paramTypes: [],
            returnType: "Any",
            description: "Return the current item in an array during a repeating action's current iteration (e.g., inside ForEach applied to array). (special context).",
        },
    ],
    [
        "items",
        {
            name: "items",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // loopName
            returnType: "Any",
            description: "Return the current item from a specific ForEach or Until loop's current cycle. (special context).",
        },
    ],
    [
        "iterationindexes",
        {
            name: "iterationIndexes",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // loopName
            returnType: "Integer",
            description: "Return the index value for the current iteration inside an Until loop. (special context).",
        },
    ],
    // J
    [
        "json",
        {
            name: "json",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String | XmlObject"], // value (String or XML)
            returnType: "Object | Array | Any", // JSON native type
            description: "Return the JavaScript Object Notation (JSON) type value, object, or array for a string or XML.",
        },
    ],
    [
        "join",
        {
            name: "join",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["Array", "String"], // collection, delimiter
            returnType: "String",
            description: "Return a string that has all the items from an array, separated by the specified character.",
        },
    ],
    // L
    [
        "last",
        {
            name: "last",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String | Array"], // collection
            returnType: "Any",
            description: "Return the last item from a collection.",
        },
    ],
    [
        "lastindexof",
        {
            name: "lastIndexOf",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "String"], // text, searchText
            returnType: "Integer",
            description: "Return the starting position or index value for the last occurrence of a substring. Not case-sensitive.",
        },
    ],
    [
        "length",
        {
            name: "length",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String | Array"], // collection
            returnType: "Integer",
            description: "Return the number of items in a string or array.",
        },
    ],
    [
        "less",
        {
            name: "less",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike | String", "NumberLike | String"], // value, compareTo
            returnType: "Boolean",
            description: "Check whether the first value is less than the second value.",
        },
    ],
    [
        "lessorequals",
        {
            name: "lessOrEquals",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike | String", "NumberLike | String"], // value, compareTo
            returnType: "Boolean",
            description: "Check whether the first value is less than or equal to the second value.",
        },
    ],
    [
        "listcallbackurl",
        {
            name: "listCallbackUrl",
            minArgs: 0,
            maxArgs: 0,
            paramTypes: [],
            returnType: "String",
            description: "Return the 'callback URL' that calls a trigger or action. Works only with specific connector types (HttpWebhook, ApiConnectionWebhook). (special context).",
        },
    ],
    // M
    [
        "max",
        {
            name: "max",
            minArgs: 1, // Can be an array or multiple numbers
            maxArgs: -1,
            paramTypes: ["NumberLike | Array"], // number1, number2, ... OR [number1, number2, ...]
            returnType: "Number",
            description: "Return the highest value from a set of numbers or an array.",
        },
    ],
    [
        "min",
        {
            name: "min",
            minArgs: 1, // Can be an array or multiple numbers
            maxArgs: -1,
            paramTypes: ["NumberLike | Array"], // number1, number2, ... OR [number1, number2, ...]
            returnType: "Number",
            description: "Return the lowest value from a set of numbers or an array.",
        },
    ],
    [
        "mod",
        {
            name: "mod",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike", "NumberLike"], // dividend, divisor
            returnType: "Number",
            description: "Return the remainder from dividing two numbers.",
        },
    ],
    [
        "mul",
        {
            name: "mul",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike", "NumberLike"], // multiplicand1, multiplicand2
            returnType: "Number",
            description: "Return the product from multiplying two numbers.",
        },
    ],
    [
        "multipartbody",
        {
            name: "multipartBody",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "Integer"], // actionName, index
            returnType: "Any", // Body content can be anything
            description: "Return the body for a specific part in an action's output that has multiple parts.",
        },
    ],
    // N
    [
        "not",
        {
            name: "not",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Boolean"], // expression
            returnType: "Boolean",
            description: "Check whether an expression is false.",
        },
    ],
    [
        "nthindexof",
        {
            name: "nthIndexOf",
            minArgs: 3,
            maxArgs: 3,
            paramTypes: ["String", "String", "Integer"], // text, searchText, occurrence
            returnType: "Integer",
            description: "Return the starting position or index value where the nth occurrence of a substring appears in a string. Returns -1 if not found.",
        },
    ],
    // O
    [
        "or",
        {
            name: "or",
            minArgs: 2,
            maxArgs: -1,
            paramTypes: ["Boolean"], // expression1, expression2, ...
            returnType: "Boolean",
            description: "Check whether at least one expression is true.",
        },
    ],
    [
        "outputs",
        {
            name: "outputs",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // actionName
            returnType: "Object", // Contains the outputs object
            description: "Return an action's outputs at runtime.",
        },
    ],
    // P
    [
        "parameters",
        {
            name: "parameters",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // parameterName
            returnType: "Any",
            description: "Return the value for a parameter that is described in your workflow definition.",
        },
    ],
    [
        "parsedatetime",
        {
            name: "parseDateTime",
            minArgs: 1,
            maxArgs: 3,
            paramTypes: ["String", "String", "String"], // timestampString, locale?, format?
            returnType: "TimestampString",
            description: "Return the timestamp from a string that contains a timestamp.",
        },
    ],
    // R
    [
        "rand",
        {
            name: "rand",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["Integer", "Integer"], // minValue, maxValue
            returnType: "Integer",
            description: "Return a random integer from a specified range, inclusive of minValue, exclusive of maxValue.",
        },
    ],
    [
        "range",
        {
            name: "range",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["Integer", "Integer"], // startIndex, count
            returnType: "Array", // Array of Integers
            description: "Return an integer array that starts from a specified integer and has the specified count.",
        },
    ],
    [
        "removeproperty",
        {
            name: "removeProperty",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["Object", "String"], // object, propertyName
            returnType: "Object",
            description: "Remove a property from a JSON object and return the updated object.",
        },
    ],
    [
        "replace",
        {
            name: "replace",
            minArgs: 3,
            maxArgs: 3,
            paramTypes: ["String", "String", "String"], // text, oldText, newText
            returnType: "String",
            description: "Replace a substring with the specified string, and return the result string. Case-sensitive.",
        },
    ],
    [
        "result",
        {
            name: "result",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // scopedActionName (e.g., 'For_each')
            returnType: "Array", // Array of action result objects
            description: "Return the results (inputs and outputs) from the top-level actions inside the specified scoped action (For_each, Until, Scope).",
        },
    ],
    [
        "reverse",
        {
            name: "reverse",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Array"], // collection
            returnType: "Array",
            description: "Reverse the order of items in an array.",
        },
    ],
    // S
    [
        "setproperty",
        {
            name: "setProperty",
            minArgs: 3,
            maxArgs: 3,
            paramTypes: ["Object", "String", "Any"], // object, propertyName, value
            returnType: "Object",
            description: "Set the value for a JSON object's property and return the updated object. Adds property if it doesn't exist.",
        },
    ],
    [
        "skip",
        {
            name: "skip",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["Array", "Integer"], // collection, count
            returnType: "Array",
            description: "Remove items from the front of a collection, and return all the other items.",
        },
    ],
    [
        "slice",
        {
            name: "slice",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["String", "Integer", "Integer"], // text, startIndex, endIndex?
            returnType: "String",
            description: "Return a substring by specifying the starting and ending position or value. Character at endIndex is not included.",
        },
    ],
    [
        "sort",
        {
            name: "sort",
            minArgs: 1,
            maxArgs: 2,
            paramTypes: ["Array", "String"], // collection, sortBy? (key name)
            returnType: "Array",
            description: "Sort items in a collection (array). Can sort objects by a key.",
        },
    ],
    [
        "split",
        {
            name: "split",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "String"], // text, delimiter
            returnType: "Array", // Array of Strings
            description: "Return an array that contains substrings, separated by the specified delimiter character.",
        },
    ],
    [
        "startofday",
        {
            name: "startOfDay",
            minArgs: 1,
            maxArgs: 2,
            paramTypes: ["TimestampString", "String"], // timestamp, format?
            returnType: "TimestampString",
            description: "Return the start of the day for a timestamp.",
        },
    ],
    [
        "startofhour",
        {
            name: "startOfHour",
            minArgs: 1,
            maxArgs: 2,
            paramTypes: ["TimestampString", "String"], // timestamp, format?
            returnType: "TimestampString",
            description: "Return the start of the hour for a timestamp.",
        },
    ],
    [
        "startofmonth",
        {
            name: "startOfMonth",
            minArgs: 1,
            maxArgs: 2,
            paramTypes: ["TimestampString", "String"], // timestamp, format?
            returnType: "TimestampString",
            description: "Return the start of the month for a timestamp.",
        },
    ],
    [
        "startswith",
        {
            name: "startsWith",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String", "String"], // text, searchText
            returnType: "Boolean",
            description: "Check whether a string starts with a specific substring. Not case-sensitive.",
        },
    ],
    [
        "string",
        {
            name: "string",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Any"], // value
            returnType: "String",
            description: "Return the string version for a value. Converts null to empty string.",
        },
    ],
    [
        "sub",
        {
            name: "sub",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["NumberLike", "NumberLike"], // minuend, subtrahend
            returnType: "Number",
            description: "Return the result from subtracting the second number from the first number.",
        },
    ],
    [
        "substring",
        {
            name: "substring",
            minArgs: 2,
            maxArgs: 3,
            paramTypes: ["String", "Integer", "Integer"], // text, startIndex, length?
            returnType: "String",
            description: "Return characters from a string, starting from the specified position (index), for the specified length.",
        },
    ],
    [
        "subtractfromtime",
        {
            name: "subtractFromTime",
            minArgs: 3,
            maxArgs: 4,
            paramTypes: ["TimestampString", "Integer", "String", "String"], // timestamp, interval, timeUnit, format?
            returnType: "TimestampString",
            description: "Subtract a number of time units from a timestamp.",
        },
    ],
    // T
    [
        "take",
        {
            name: "take",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["String | Array", "Integer"], // collection, count
            returnType: "String | Array",
            description: "Return items from the front of a collection.",
        },
    ],
    [
        "ticks",
        {
            name: "ticks",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["TimestampString"], // timestamp
            returnType: "Integer", // Large integer (long)
            description: "Return the number of ticks (100-nanosecond intervals) for a specified timestamp.",
        },
    ],
    [
        "tolower",
        {
            name: "toLower",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // text
            returnType: "String",
            description: "Return a string in lowercase format.",
        },
    ],
    [
        "toupper",
        {
            name: "toUpper",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // text
            returnType: "String",
            description: "Return a string in uppercase format.",
        },
    ],
    [
        "trigger",
        {
            name: "trigger",
            minArgs: 0,
            maxArgs: 0,
            paramTypes: [],
            returnType: "Object",
            description: "Return the trigger's output object at runtime.",
        },
    ],
    [
        "triggerbody",
        {
            name: "triggerBody",
            minArgs: 0,
            maxArgs: 0,
            paramTypes: [],
            returnType: "Any",
            description: "Return the trigger's body output at runtime. Shorthand for trigger().outputs.body.",
        },
    ],
    [
        "triggerformdatamultivalues",
        {
            name: "triggerFormDataMultiValues",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // key
            returnType: "Array",
            description: "Create an array with values that match a key name in a trigger's form-data or form-encoded output.",
        },
    ],
    [
        "triggerformdatavalue",
        {
            name: "triggerFormDataValue",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // key
            returnType: "String",
            description: "Return a string with a single value that matches a key name in a trigger's form-data or form-encoded output. Throws error if multiple matches.",
        },
    ],
    [
        "triggermultipartbody",
        {
            name: "triggerMultipartBody",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["Integer"], // index
            returnType: "Any", // Body content can be anything
            description: "Return the body for a specific part in a trigger's output that has multiple parts.",
        },
    ],
    [
        "triggeroutputs",
        {
            name: "triggerOutputs",
            minArgs: 0,
            maxArgs: 0,
            paramTypes: [],
            returnType: "Object", // Contains the outputs object
            description: "Return the trigger's output object at runtime. Shorthand for trigger().outputs.",
        },
    ],
    [
        "trim",
        {
            name: "trim",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // text
            returnType: "String",
            description: "Remove leading and trailing whitespace from a string, and return the updated string.",
        },
    ],
    // U
    [
        "union",
        {
            name: "union",
            minArgs: 2,
            maxArgs: -1,
            paramTypes: ["Array | Object"], // collection1, collection2, ...
            returnType: "Array | Object",
            description: "Return a collection that has all the items from the specified collections. No duplicates.",
        },
    ],
    [
        "uricomponent",
        {
            name: "uriComponent",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // value
            returnType: "UriString",
            description: "Return a URI-encoded version for a string by replacing URL-unsafe characters with escape characters. Preferred over encodeUriComponent().",
        },
    ],
    [
        "uricomponenttobinary",
        {
            name: "uriComponentToBinary",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // value
            returnType: "BinaryString",
            description: "Return the binary version for a uniform resource identifier (URI) component.",
        },
    ],
    [
        "uricomponenttostring",
        {
            name: "uriComponentToString",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // value
            returnType: "String",
            description: "Return the string version for a uniform resource identifier (URI) encoded string (decoding).",
        },
    ],
    [
        "urihost",
        {
            name: "uriHost",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // uri
            returnType: "String",
            description: "Return the host value for a uniform resource identifier (URI).",
        },
    ],
    [
        "uripath",
        {
            name: "uriPath",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // uri
            returnType: "String",
            description: "Return the path value for a uniform resource identifier (URI).",
        },
    ],
    [
        "uripathandquery",
        {
            name: "uriPathAndQuery",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // uri
            returnType: "String",
            description: "Return the path and query values for a uniform resource identifier (URI).",
        },
    ],
    [
        "uriport",
        {
            name: "uriPort",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // uri
            returnType: "Integer",
            description: "Return the port value for a uniform resource identifier (URI).",
        },
    ],
    [
        "uriquery",
        {
            name: "uriQuery",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // uri
            returnType: "String",
            description: "Return the query value for a uniform resource identifier (URI).",
        },
    ],
    [
        "urischeme",
        {
            name: "uriScheme",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["UriString"], // uri
            returnType: "String",
            description: "Return the scheme value for a uniform resource identifier (URI).",
        },
    ],
    [
        "utcnow",
        {
            name: "utcNow",
            minArgs: 0,
            maxArgs: 1,
            paramTypes: ["String"], // format?
            returnType: "TimestampString",
            description: "Return the current timestamp as a string.",
        },
    ],
    // V
    [
        "variables",
        {
            name: "variables",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String"], // variableName
            returnType: "Any",
            description: "Return the value for a specified variable.",
        },
    ],
    // W
    [
        "workflow",
        {
            name: "workflow",
            minArgs: 0,
            maxArgs: 0,
            paramTypes: [],
            returnType: "Object",
            description: "Return details about the workflow itself during run time, including id, name, type, location, run, and tags.",
        },
    ],
    // X
    [
        "xml",
        {
            name: "xml",
            minArgs: 1,
            maxArgs: 1,
            paramTypes: ["String | Object"], // value (String or JSON object)
            returnType: "XmlObject",
            description: "Return the XML version for a string that contains a JSON object.",
        },
    ],
    [
        "xpath",
        {
            name: "xpath",
            minArgs: 2,
            maxArgs: 2,
            paramTypes: ["XmlObject | XmlString", "String"], // xml, xpath
            returnType: "Array | XmlObject | Any", // Array of nodes/values, single node, or single value
            description: "Check XML for nodes or values that match an XPath (XML Path Language) expression, and return the matching nodes or values.",
        },
    ],
]);
//# sourceMappingURL=functions.js.map