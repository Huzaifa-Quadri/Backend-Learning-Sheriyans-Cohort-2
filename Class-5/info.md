# Status Codes -

## For Get Request Success - 200

## For Post Request Success - 201

## For Delete Request Success(Not Showing anything) - 204

## For Patch Request Success - 200

Offcial way of api response -
app.<method-name>("<api-endpoint>", (req, res)=>{
//task to do according to api method

    res.status(<status-code according to method>).json({
        <key_name>(any without doubles quotes) : "<Message>"
    });

});
