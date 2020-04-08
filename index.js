console.log('This is index.js');

// Initilize no of parameters
let addParamCount = 0;

// Utility function
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If user click on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If user click on Json box, hide the Params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// If user click on + or - button add or remove parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameters ${addParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parametersKey${addParamCount + 2}" placeholder="Enter Parameters ${addParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parametersValue${addParamCount + 2}"
                            placeholder="Enter Parameters ${addParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                  </div>`;

    // Convert element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listner to remove the parameters on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (const item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

    addParamCount++;
})

//  If the user click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show plase wait in the response box to request patience from the user
    document.getElementById('requestJsonText').value = 'plase wait... fecting response...';

    // Fetch all the value user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used param option instead of json, colact all the parameters all the Object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1))) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }

    } else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the value in the console for debugging
    console.log('URL is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('data is', data);

})