/* Author : Raman Jain */
 /*
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = element =>
{
    return element.name && element.value;
};

/**
 * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the value should be added, false if not
 */
const isValidValue = element =>
{
    return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};

/**
 * Checks if an input is a checkbox, because checkboxes allow multiple values.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a checkbox, false if not
 */
const isCheckbox = element => element.type === 'checkbox';

/**
 * Checks if an input is a `select` with the `multiple` attribute.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a multiselect, false if not
 */
const isMultiSelect = element => element.options && element.multiple;

/**
 * Retrieves the selected options from a multi-select as an array.
 * @param  {HTMLOptionsCollection} options  the options for the select
 * @return {Array}                          an array of selected option values
 */
const getSelectValues = options => [].reduce.call(options, (values, option) =>
{
    return option.selected ? values.concat(option.value) : values;
}, []);

/**
 * A more verbose implementation of `formToJSON()` to explain how it works.
 *
 * NOTE: This function is unused, and is only here for the purpose of explaining how
 * reducing form elements works.
 *
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON_deconstructed = elements =>
{

    // This is the function that is called on each element of the array.
    const reducerFunction = (data, element) =>
    {

        // Add the current field to the object.
        data[element.name] = element.value;

        // For the demo only: show each step in the reducer’s progress.
        console.log(JSON.stringify(data));

        return data;
    };

    // This is used as the initial value of `data` in `reducerFunction()`.
    const reducerInitialValue = {};

    // To help visualize what happens, log the inital value, which we know is `{}`.
    console.log('Initial `data` value:', JSON.stringify(reducerInitialValue));

    // Now we reduce by `call`-ing `Array.prototype.reduce()` on `elements`.
    const formData = [].reduce.call(elements, reducerFunction, reducerInitialValue);

    // The result is then returned for use elsewhere.
    return formData;
};

/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) =>
{

    // Make sure the element has the required properties and should be added.
    if (isValidElement(element) && isValidValue(element))
    {

        /*
         * Some fields allow for more than one value, so we need to check if this
         * is one of those fields and, if so, store the values as an array.
         */
        if (isCheckbox(element))
        {
            data[element.name] = (data[element.name] || []).concat(element.value);
        }
        else if (isMultiSelect(element))
        {
            data[element.name] = getSelectValues(element);
        }
        else
        {
            data[element.name] = element.value;
        }
    }

    return data;
},
{});

/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleFormSubmit = event =>
{


    // Stop the form from submitting since we’re handling that with AJAX.
    event.preventDefault();

    // Call our function to get the form data.
    const data = formToJSON(form.elements);

    var d = new Date();
    var timestamp = d.getTime();
    var uid = create_UUID();

    timestamp = 
    {
        "_time": timestamp
    };

    
     uid = 
     {
         "uid": uid
     };

     var guid = JSON.parse(JSON.stringify(uid));
     var payload = JSON.parse(JSON.stringify(data));
     timestamp = JSON.parse(JSON.stringify(timestamp));
     var cdata = JSON.stringify({timestamp,guid,payload});
     console.log(cdata);

    $.ajax(
    {
        url: "https://http-inputs-emeacloud.splunkcloud.com/services/collector/raw",
        type: "POST",
        headers:
        {
            Authorization: 'Splunk 6cb23f6e-b478-4c72-af02-d6b5309b7bf5'
        },
       contentType: 'text/plain',
        data: cdata,
      success: function (msg)
        {
            $(".complete").html("Completed").prop("disabled", true);
            window.setTimeout(function ()
            {
                window.location.href = 'thankyou.html';
            }, 2000);


        },





                error: function ()
                {
                    $(".complete").html("Try again");
                    $(".complete").prop("disabled", false);
                }
            }); 
        };

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

const form = document.getElementsByClassName('slive-form')[0];
//console.log(form);
form.addEventListener('submit', handleFormSubmit);






